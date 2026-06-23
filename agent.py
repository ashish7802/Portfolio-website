import os
import json
import logging
import asyncio
import re
from playwright.async_api import async_playwright
from groq import AsyncGroq

logger = logging.getLogger(__name__)

# Initialize the Groq client using the environment variable
try:
    client = AsyncGroq(api_key=os.environ.get("GROQ_API_KEY"))
except Exception as e:
    logger.error(f"Failed to initialize Groq client: {e}")
    client = None

async def run_agent(url: str, instruction: str) -> list:
    """
    1. Launches headless Playwright to navigate to the target URL.
    2. Runs a loop (up to 3 times) to handle pagination.
    3. Extracts the page's visible text (innerText), with DOM sanitization and token limits.
    4. Uses Groq Llama 3 to process the text, extract structured JSON data ("data" array), 
       and determine the "next_button_text".
    5. Clicks the next button using Playwright and repeats if applicable.
    6. Returns the aggregated list of data.
    """
    if client is None:
        raise RuntimeError("Groq client is not initialized. Ensure GROQ_API_KEY is set.")

    all_extracted_data = []

    logger.info(f"Navigating to {url}")
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True, args=["--disable-blink-features=AutomationControlled"])
            context = await browser.new_context(
                viewport={"width": 1920, "height": 1080},
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            )
            page = await context.new_page()
            
            try:
                await page.goto(url, wait_until="networkidle", timeout=30000)
                await asyncio.sleep(3)  # Allow lazy-loaded/dynamic elements to populate
            except Exception as e:
                logger.error(f"Playwright failed to load URL {url}: {e}")
                await browser.close()
                raise ValueError(f"Failed to load URL: {e}")

            for page_num in range(1, 4):  # Max 3 pages
                logger.info(f"Processing page {page_num}...")
                
                # Sanitize the DOM but keep structural HTML attributes (href, class) for Llama
                await page.evaluate("""() => {
                    const elements = document.querySelectorAll('script, style, svg, noscript, footer, iframe, nav, link, meta, img');
                    elements.forEach(el => el.remove());
                    // Keep the DOM structure but strip unnecessary attributes to save tokens
                    document.querySelectorAll('*').forEach(el => {
                        const attrs = el.attributes;
                        if (attrs) {
                            for(let i = attrs.length - 1; i >= 0; i--) {
                                if (!['href', 'class', 'id'].includes(attrs[i].name)) {
                                    el.removeAttribute(attrs[i].name);
                                }
                            }
                        }
                    });
                }""")
                page_text = await page.evaluate("() => document.body.innerHTML")
                
                if not page_text or not page_text.strip():
                    logger.warning("No visible HTML could be extracted from the page.")
                    break
                    
                page_text = re.sub(r'>\s+<', '><', page_text)
                page_text = re.sub(r'\s+', ' ', page_text).strip()
                if len(page_text) > 80000:
                    logger.warning(f"Truncating page_text from {len(page_text)} to 80000 characters.")
                    page_text = page_text[:80000]
                
                logger.info(f"Extracted {len(page_text)} characters from page {page_num}.")
                
                messages = [
                    {
                        "role": "system",
                        "content": "You are an expert data extraction AI. Your goal is to extract information strictly based on the user's instruction.\n\nYou MUST return a JSON object with EXACTLY TWO fields:\n1. \"data\": An array containing the extracted items.\n2. \"next_button_text\": The exact visible text of the button or link to go to the next page (e.g., \"Next\", \"Older posts\", \"→\"). Return null or an empty string if there is no next page or if the user's instruction is fully satisfied.\n\nCRUCIAL: Ensure all string values are properly escaped for valid JSON parsing. If a title or text contains double quotes, replace them with single quotes or escape them as \\\" so that json.loads() never breaks."
                    },
                    {
                        "role": "user",
                        "content": f"User Instruction: {instruction}\n\nWebpage Text:\n{page_text}"
                    }
                ]

                extracted_json = None
                
                # Try up to 3 times to handle errors
                for attempt in range(3):
                    try:
                        response = await client.chat.completions.create(
                            model="llama-3.3-70b-versatile",
                            messages=messages,
                            response_format={"type": "json_object"}
                        )
                        
                        if not response.choices or not response.choices[0].message.content:
                            logger.warning("Groq returned an empty response. Falling back to empty data.")
                            extracted_json = {"data": [], "next_button_text": None}
                            break
                            
                        raw_text = response.choices[0].message.content.strip()
                        try:
                            extracted_json = json.loads(raw_text)
                        except json.JSONDecodeError:
                            # Fallback: attempt to clean up markdown code blocks or invalid JSON
                            logger.warning("Initial JSON parsing failed. Attempting to clean the text via regex...")
                            cleaned_text = re.sub(r'^```(?:json)?\s*', '', raw_text, flags=re.IGNORECASE)
                            cleaned_text = re.sub(r'\s*```$', '', cleaned_text, flags=re.IGNORECASE)
                            
                            try:
                                extracted_json = json.loads(cleaned_text)
                            except json.JSONDecodeError as inner_e:
                                logger.error(f"Failed to decode cleaned Groq response as JSON. Cleaned response: {cleaned_text}")
                                raise ValueError(f"Failed to parse LLM response as valid JSON: {inner_e}")
                        break

                    except Exception as e:
                        if attempt < 2:
                            logger.warning(f"Received error from Groq ({e}), retrying attempt {attempt + 1}...")
                            await asyncio.sleep(2 ** attempt)  # Exponential backoff
                            continue
                        else:
                            logger.error(f"Groq generation error: {e}")
                            raise RuntimeError(f"AI Generation error: {e}")

                if not extracted_json:
                    break

                # Merge data
                items = extracted_json.get("data", [])
                if isinstance(items, list):
                    all_extracted_data.extend(items)
                elif isinstance(items, dict):
                    all_extracted_data.append(items)
                else:
                    all_extracted_data.append(items)
                    
                next_btn = extracted_json.get("next_button_text")
                logger.info(f"Page {page_num} extraction complete. Found {len(items) if isinstance(items, list) else 1} items. Next button: {next_btn}")
                
                if not next_btn or page_num == 3:
                    break
                    
                # Try to click the next button
                logger.info(f"Attempting to click next button with text: '{next_btn}'")
                try:
                    # Search for the element
                    locator = page.get_by_text(next_btn, exact=True).first
                    if await locator.count() == 0:
                        locator = page.locator(f"text={next_btn}").first
                        
                    if await locator.count() > 0:
                        await locator.click(timeout=10000)
                        await page.wait_for_load_state("networkidle", timeout=30000)
                        await asyncio.sleep(3)
                    else:
                        logger.warning(f"Could not find next button matching: {next_btn}")
                        break
                except Exception as e:
                    logger.warning(f"Failed to click next button '{next_btn}': {e}")
                    break
                    
            await browser.close()
            
    except Exception as e:
        logger.error(f"Playwright error: {e}")
        raise ValueError(f"Web scraping error: {e}")

    logger.info(f"Extraction finished. Total items extracted: {len(all_extracted_data)}")
    return all_extracted_data

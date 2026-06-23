import os
import json
import asyncio
import requests
from bs4 import BeautifulSoup
from typing import Optional, List
from pydantic import BaseModel, Field
from groq import AsyncGroq

class IndianLead(BaseModel):
    client_name: str = Field(description="Name of the client or company")
    contact_info: str = Field(description="Strict contact method: Real Email, direct Platform URL, or valid social handle")
    client_need: str = Field(description="Detailed technical requirements and project scope")
    location_evidence: str = Field(description="Evidence of Indian context or globalization intent")
    original_post_url: str = Field(description="The absolute URL to the source post")

async def fetch_rss_feed(url: str, headers: dict) -> List[dict]:
    scraped_data = []
    try:
        response = await asyncio.to_thread(requests.get, url, headers=headers, timeout=10)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, features="xml")
            items = soup.find_all("item")
            for item in items[:10]: # Limit to 10 per feed to prevent LLM overload
                title = item.title.text if item.title else ""
                link = item.link.text if item.link else ""
                description = item.description.text if item.description else ""
                
                # Broad web dev heuristic
                if "engineer" in title.lower() or "developer" in title.lower() or "web" in title.lower():
                    scraped_data.append({
                        "url": link,
                        "text": f"Title: {title}\nLink: {link}\n\nDescription: {description}",
                        "author": "RSS Feed Client"
                    })
    except Exception as e:
        print(f"[!] RSS Scraper failed for {url}: {e}")
    return scraped_data

async def fetch_json_feed(url: str, headers: dict) -> List[dict]:
    scraped_data = []
    try:
        response = await asyncio.to_thread(requests.get, url, headers=headers, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                for job in data[1:11]: # skip legal header if remoteOK
                    title = job.get("position", "")
                    link = job.get("url", "")
                    description = job.get("description", "")
                    company = job.get("company", "Unknown")
                    if "developer" in title.lower() or "engineer" in title.lower():
                        scraped_data.append({
                            "url": link,
                            "text": f"Title: {title}\nCompany: {company}\n\nDescription: {description}",
                            "author": company
                        })
    except Exception as e:
        print(f"[!] JSON Scraper failed for {url}: {e}")
    return scraped_data

async def fetch_reddit_feed(sub: str, headers: dict) -> List[dict]:
    scraped_data = []
    url = f"https://www.reddit.com/r/{sub}/new.json?limit=10"
    try:
        response = await asyncio.to_thread(requests.get, url, headers=headers, timeout=10)
        if response.status_code == 200:
            data = response.json()
            children = data.get("data", {}).get("children", [])
            for child in children:
                post_data = child.get("data", {})
                title = post_data.get("title", "")
                selftext = post_data.get("selftext", "")
                post_url = post_data.get("url", "")
                author = post_data.get("author", "Unknown_User")
                permalink = post_data.get("permalink", "")
                
                absolute_url = f"https://www.reddit.com{permalink}" if permalink else post_url
                
                if "[hiring]" in title.lower() or "need" in title.lower() or "looking for" in title.lower():
                    combined_text = f"Title: {title}\nAuthor: {author}\n\n{selftext}"
                    scraped_data.append({
                        "url": absolute_url,
                        "text": combined_text,
                        "author": author
                    })
    except Exception as e:
        print(f"[!] Reddit Scraper failed for {sub}: {e}")
    return scraped_data

async def scout_public_feeds(keywords: List[str]) -> List[dict]:
    """
    Aggregates multi-source open web developer feeds simultaneously.
    """
    scraped_data = []
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    # 1. RSS Feeds (e.g. WeWorkRemotely programming jobs)
    rss_urls = [
        "https://weworkremotely.com/categories/remote-programming-jobs.rss"
    ]
    
    # 2. JSON APIs (e.g. RemoteOK)
    json_urls = [
        "https://remoteok.com/api"
    ]
    
    # 3. Reddit Platforms
    subreddits = ["forhire", "freelance_forhire"]

    # Gather feeds concurrently
    tasks = []
    for url in rss_urls:
        tasks.append(fetch_rss_feed(url, headers))
    for url in json_urls:
        tasks.append(fetch_json_feed(url, headers))
    for sub in subreddits:
        tasks.append(fetch_reddit_feed(sub, headers))
        
    results = await asyncio.gather(*tasks)
    
    for res in results:
        scraped_data.extend(res)
        
    print(f"[*] Aggregated {len(scraped_data)} raw web contract leads from multi-source cloud endpoints.")
    return scraped_data

async def extract_indian_lead(raw_text: str, post_url: str) -> Optional[IndianLead]:
    """
    Analyzes raw web text to extract validated web development leads with strict contact requirements.
    """
    client = AsyncGroq(api_key=os.environ.get("GROQ_API_KEY"))
    
    parsed_author = "Unknown"
    for line in raw_text.split('\n'):
        if line.startswith("Author: ") or line.startswith("Company: "):
            parsed_author = line.split(":", 1)[1].strip()
            break
            
    system_prompt = """
    You are a Principal Lead Intelligence AI for "DesiClient Hunter AI".
    Your task is to parse aggregated multi-source tech contract data and extract high-signal web development leads.
    
    CRITICAL INSTRUCTIONS:
    1. FILTER: Instantly reject any post that is NOT hiring for web/software development.
    2. STRICT CONTACT VERIFICATION: You MUST find a valid way to contact the client. If there is no real email, no legitimate social/professional handle, and no clear application URL explicitly in the text, you MUST return an empty JSON object {}.
    3. TARGET CONTEXT: We prefer Indian clients or global clients open to remote contractors. Ensure you map evidence of their localization or remote flexibility.
    4. FORMAT: Return the native JSON object exactly matching the schema. No markdown, no pre-text.
    
    JSON SCHEMA:
    {
        "client_name": "string (Extract real name/company if available. If not, output 'Unknown')",
        "contact_info": "string (Real email, direct application URL, or valid social handle. DO NOT GUESS. If missing, output 'Unknown')",
        "client_need": "string (Detailed technical requirements and project scope)",
        "location_evidence": "string (Evidence of Indian context or remote flexibility)",
        "original_post_url": "string"
    }
    """

    user_prompt = f"Original Post URL: {post_url}\n\nRaw Text:\n{raw_text}"

    try:
        response = await client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            model="llama-3.3-70b-versatile",
            response_format={"type": "json_object"},
            temperature=0.0
        )
        
        result_content = response.choices[0].message.content
        if not result_content or result_content.strip() == "{}" or result_content.strip() == "":
            return None
            
        data = json.loads(result_content)
        if "client_name" not in data or "client_need" not in data:
            return None
            
        # Strict fallback validations
        if data["client_name"].lower() == "unknown" or not data["client_name"].strip():
             data["client_name"] = parsed_author
             
        if "contact_info" not in data or data["contact_info"].lower() == "unknown" or not data["contact_info"].strip():
             # If AI couldn't find contact info in the text, fallback to the absolute original post URL
             data["contact_info"] = post_url
             
        if "original_post_url" not in data or not data["original_post_url"]:
             data["original_post_url"] = post_url
             
        return IndianLead(**data)
        
    except Exception as e:
        return None

import os
import json
import asyncio
from typing import Optional, List
from pydantic import BaseModel, Field
from groq import AsyncGroq

class IndianLead(BaseModel):
    client_name: str = Field(description="Name of the client or company")
    contact_info: str = Field(description="Email, Phone, or Direct Profile URL if email/phone aren't in the text")
    client_need: str = Field(description="Concise summary of their web development requirements")
    location_evidence: str = Field(description='Why the AI classified this as an Indian lead (e.g., "Mentioned INR", "Location Mumbai", "+91 country code")')
    original_post_url: str = Field(description="The URL of the original post")

async def scout_public_feeds(keywords: List[str]) -> List[dict]:
    """
    Mimics a Playwright stealth scraping process across public developer forum directories.
    In a fully productionized environment, this would initialize a stealth browser context
    and run search queries on platforms like Reddit, Facebook groups, or LinkedIn.
    """
    # Simulating network latency for the autonomous crawling phase
    await asyncio.sleep(2)
    
    mock_scraped_data = []
    
    # Generate simulated raw text posts based on the targeted keywords
    if "web development hire india" in keywords:
        mock_scraped_data.append({
            "url": "https://forum.example.com/india-dev-jobs/post1",
            "text": "Urgent! We are a startup in Bangalore looking for a React and Node.js developer for a 3-month contract. Please send your portfolio to tech@startup.in. Budget: 80k/month."
        })
        mock_scraped_data.append({
            "url": "https://forum.example.com/india-dev-jobs/post2",
            "text": "Need a freelance web developer urgently. Tech stack: Python/Django. Location: Remote (India only). Reach out to Amit at amit.kumar@example.in."
        })
    if "looking for website designer mumbai" in keywords:
        mock_scraped_data.append({
            "url": "https://social.example.com/mumbai-tech/designer-needed",
            "text": "Looking for a website designer in Mumbai to revamp our corporate site. Must have experience with Figma and Tailwind. Call me directly on +91-9876543210."
        })
        mock_scraped_data.append({
            "url": "https://social.example.com/mumbai-tech/spam",
            "text": "Get cheap followers here! Not related to development."
        })
    if "need e-commerce developer inr" in keywords:
        mock_scraped_data.append({
            "url": "https://boards.example.com/ecommerce/need-dev",
            "text": "Hey all, need an e-commerce developer to build a Shopify store from scratch. Budget is 1,50,000 INR. Drop your GitHub and LinkedIn links below."
        })
    if "freelance web dev urgent post" in keywords:
        mock_scraped_data.append({
            "url": "https://freelance.example.com/urgent-web",
            "text": "Urgent post: Need a freelance WordPress dev to fix my site. Willing to pay ₹25,000. Located in Delhi. Profile: linkedin.com/in/delhiclient"
        })
        mock_scraped_data.append({
            "url": "https://freelance.example.com/urgent-web-pune",
            "text": "Looking for a React dev in Pune for a quick landing page setup. Willing to pay good money. Send me a DM at facebook.com/pune-agency-owner"
        })
        
    return mock_scraped_data

async def extract_indian_lead(raw_text: str, post_url: str) -> Optional[IndianLead]:
    """
    Analyzes raw web text to extract Indian web development leads.
    """
    client = AsyncGroq(api_key=os.environ.get("GROQ_API_KEY"))
    
    system_prompt = """
    You are an expert data extraction AI for "DesiClient Hunter AI".
    Your task is to analyze raw web text chunks (scraped from groups/forums) and identify potential clients looking to hire for web development.
    
    CRITICAL INSTRUCTIONS:
    1. FILTER: Instantly filter out anything that is NOT a web development hiring requirement. If the text does not contain a web development lead, return an empty JSON object {}.
    2. SCREEN FOR INDIAN CONTEXT: Aggressively screen for Indian context. Validate through language style, names (e.g., Amit, Kumar), local tech hubs (e.g., Bangalore, Mumbai, Delhi, Pune, Noida), country domains (.in), currency (INR, ₹, Rs, k/month, lakhs), or phone codes (+91). Be robust—if the location or name strongly suggests India, classify it as valid even if currency isn't explicitly mentioned.
    3. FORMAT: If a valid Indian web development lead is found, format the output directly into a native JSON object matching the exact schema below. Do not include any other text.
    
    JSON SCHEMA:
    {
        "client_name": "string (extract name if available, otherwise use 'Unknown')",
        "contact_info": "string (Email, Phone, or Direct Profile URL)",
        "client_need": "string (Concise summary of their web development requirements)",
        "location_evidence": "string (Why the AI classified this as an Indian lead, e.g., 'Mentioned Bangalore', 'Used +91')",
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
        # Ensure it has all required fields before returning, otherwise skip
        if "client_name" not in data or "client_need" not in data:
            return None
            
        # Ensure original_post_url is present
        if "original_post_url" not in data or not data["original_post_url"]:
             data["original_post_url"] = post_url
             
        return IndianLead(**data)
        
    except Exception as e:
        print(f"Error during extraction: {e}")
        return None

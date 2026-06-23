import sys
import asyncio

# Fix for Playwright on Windows raising NotImplementedError for subprocesses
if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

import logging
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, StreamingResponse
import io
import pandas as pd
from pydantic import BaseModel
from agent import run_agent

# Configure logging for the application
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="AI Stealth Web Agent API",
    description="An API to extract structured JSON data from URLs using Playwright and Google Gemini.",
    version="1.0.0"
)

# Mount the static directory to serve frontend files
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def serve_frontend():
    return FileResponse("static/index.html")

# Pydantic schema for the incoming request
class ExtractionRequest(BaseModel):
    url: str
    instruction: str

@app.post("/api/extract")
async def extract_data(request: ExtractionRequest):
    """
    Extracts structured data from a given URL based on the user's instruction.
    """
    logger.info(f"Received extraction request for URL: {request.url}")
    
    try:
        # Execute the Playwright & Gemini pipeline
        extracted_data = await run_agent(request.url, request.instruction)
        return {"status": "success", "data": extracted_data}
        
    except ValueError as e:
        # Catch specific client-side errors like invalid URL or parsing failure
        logger.warning(f"Client error during extraction: {e}")
        raise HTTPException(status_code=400, detail=str(e))
        
    except RuntimeError as e:
        # Catch specific server-side errors like missing API key or generation failure
        logger.error(f"Server error during extraction: {e}")
        raise HTTPException(status_code=500, detail=str(e))
        
    except Exception as e:
        # Catch any other unhandled exceptions
        logger.error(f"Unhandled exception during extraction: {e}")
        raise HTTPException(status_code=500, detail="An internal server error occurred.")

@app.post("/api/download-excel")
async def download_excel(data: list[dict]):
    try:
        df = pd.DataFrame(data)
        buffer = io.BytesIO()
        df.to_excel(buffer, index=False, engine='openpyxl')
        buffer.seek(0)
        
        headers = {
            'Content-Disposition': 'attachment; filename="extracted_leads.xlsx"'
        }
        return StreamingResponse(
            buffer, 
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers=headers
        )
    except Exception as e:
        logger.error(f"Error generating Excel: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate Excel file.")

if __name__ == "__main__":
    # Run the application using Uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, loop="asyncio")

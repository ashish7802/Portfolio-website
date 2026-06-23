import os
import io
import asyncio
from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse, StreamingResponse
from pydantic import BaseModel
import pandas as pd

# Hardcoded fallback key for monolithic deployment
if not os.environ.get("GROQ_API_KEY"):
    os.environ["GROQ_API_KEY"] = "YOUR_GROQ_API_KEY_HERE"

from hunter import scout_public_feeds, extract_indian_lead, IndianLead

app = FastAPI(title="DesiClient Hunter AI")

class ExportRequest(BaseModel):
    leads: List[dict]

TARGET_KEYWORDS = [
    "web development hire india",
    "looking for website designer mumbai",
    "need e-commerce developer inr",
    "freelance web dev urgent post"
]

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DesiClient Hunter AI</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
        .spinner {
            border: 3px solid rgba(255,255,255,0.1);
            border-radius: 50%;
            border-top: 3px solid #60a5fa;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
            display: inline-block;
            vertical-align: middle;
            margin-right: 12px;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .glow-btn {
            box-shadow: 0 0 25px rgba(59, 130, 246, 0.4);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glow-btn:hover {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.7);
            transform: translateY(-3px) scale(1.02);
        }
    </style>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen font-sans selection:bg-blue-500/30">
    <div class="max-w-7xl mx-auto p-6 md:p-10">
        <header class="mb-14 text-center mt-12 animate-fade-in-down">
            <h1 class="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 tracking-tight mb-4">
                DesiClient Hunter AI
            </h1>
            <p class="text-slate-400 text-lg md:text-2xl font-light tracking-wide">
                Autonomous Indian Web Dev Lead Intelligence
            </p>
        </header>

        <div class="flex justify-center mb-16">
            <button id="hunt-btn" class="glow-btn bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-bold text-xl py-5 px-12 rounded-full flex items-center justify-center">
                <span id="hunt-spinner" class="spinner hidden"></span>
                <span id="hunt-text">🚀 Start Autonomous Desi Lead Hunt</span>
            </button>
        </div>

        <div id="results-container" class="hidden transition-all duration-500">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-slate-200 flex items-center gap-3">
                    <span class="w-3 h-3 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
                    Live Filtered Leads
                </h2>
                <button id="download-btn" class="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-2.5 px-6 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all flex items-center gap-2 transform hover:-translate-y-0.5">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Download Excel (.xlsx)
                </button>
            </div>
            
            <div class="overflow-x-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-800 text-slate-300 text-xs uppercase tracking-widest font-bold">
                            <th class="p-5 border-b border-slate-700/50">Client Name</th>
                            <th class="p-5 border-b border-slate-700/50">Contact Info</th>
                            <th class="p-5 border-b border-slate-700/50 w-1/3">Client Need</th>
                            <th class="p-5 border-b border-slate-700/50">Location Evidence</th>
                        </tr>
                    </thead>
                    <tbody id="leads-table-body" class="text-sm text-slate-300 divide-y divide-slate-700/50">
                    </tbody>
                </table>
                <div id="empty-state" class="hidden p-16 text-center text-slate-500 text-lg font-light">
                    No verified Indian leads discovered during this hunt cycle.
                </div>
            </div>
        </div>
    </div>
    <script>
        let currentLeads = [];
        const huntBtn = document.getElementById('hunt-btn');
        const huntSpinner = document.getElementById('hunt-spinner');
        const huntText = document.getElementById('hunt-text');
        const resultsContainer = document.getElementById('results-container');
        const tableBody = document.getElementById('leads-table-body');
        const emptyState = document.getElementById('empty-state');
        const downloadBtn = document.getElementById('download-btn');

        huntBtn.addEventListener('click', async () => {
            huntBtn.disabled = true;
            huntBtn.classList.remove('from-blue-600', 'via-indigo-600', 'to-blue-500', 'glow-btn');
            huntBtn.classList.add('bg-slate-700', 'cursor-not-allowed');
            huntSpinner.classList.remove('hidden');
            huntText.textContent = "Scouting Public Channels...";
            resultsContainer.classList.add('hidden');
            tableBody.innerHTML = '';
            
            try {
                // Fetch to relative path since it's a monolith
                const response = await fetch('/api/hunt-leads', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });
                
                if (!response.ok) throw new Error('Failed to fetch leads');
                
                currentLeads = await response.json();
                resultsContainer.classList.remove('hidden');
                
                if (currentLeads.length > 0) {
                    emptyState.classList.add('hidden');
                    currentLeads.forEach(lead => {
                        const tr = document.createElement('tr');
                        tr.className = 'hover:bg-slate-700/30 transition-colors duration-200';
                        tr.innerHTML = `
                            <td class="p-5 font-medium text-slate-100 align-top">${escapeHTML(lead.client_name)}</td>
                            <td class="p-5 align-top"><span class="bg-indigo-900/30 text-indigo-300 px-3 py-1.5 rounded-md text-xs border border-indigo-700/50 break-all font-mono shadow-sm">${escapeHTML(lead.contact_info)}</span></td>
                            <td class="p-5 align-top text-slate-300 leading-relaxed font-light">${escapeHTML(lead.client_need)}</td>
                            <td class="p-5 align-top"><span class="bg-cyan-900/30 text-cyan-400 px-3 py-1.5 rounded-md text-xs border border-cyan-800/50 flex items-center gap-1.5 inline-flex shadow-sm"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>${escapeHTML(lead.location_evidence)}</span></td>
                        `;
                        tableBody.appendChild(tr);
                    });
                } else {
                    emptyState.classList.remove('hidden');
                }
            } catch (error) {
                console.error("Hunt failed:", error);
                alert("Autonomous hunt failed. Check server logs.");
            } finally {
                huntBtn.disabled = false;
                huntBtn.classList.remove('bg-slate-700', 'cursor-not-allowed');
                huntBtn.classList.add('from-blue-600', 'via-indigo-600', 'to-blue-500', 'glow-btn');
                huntSpinner.classList.add('hidden');
                huntText.textContent = "🚀 Start Autonomous Desi Lead Hunt";
            }
        });

        downloadBtn.addEventListener('click', async () => {
            if (currentLeads.length === 0) return;
            try {
                const originalContent = downloadBtn.innerHTML;
                downloadBtn.disabled = true;
                downloadBtn.innerHTML = '<span class="spinner" style="width:16px;height:16px;border-width:2px;margin-right:8px;"></span> Generating...';
                
                const response = await fetch('/api/download-excel', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ leads: currentLeads })
                });
                
                if (!response.ok) throw new Error('Export failed');
                
                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = downloadUrl;
                a.download = 'desiclient_leads.xlsx';
                document.body.appendChild(a);
                a.click();
                
                window.URL.revokeObjectURL(downloadUrl);
                a.remove();
                
                downloadBtn.innerHTML = originalContent;
                downloadBtn.disabled = false;
            } catch (error) {
                console.error("Download failed:", error);
                alert("Failed to download Excel file.");
                downloadBtn.disabled = false;
            }
        });

        function escapeHTML(str) {
            if (!str) return '';
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }
    </script>
</body>
</html>
"""

@app.get("/", response_class=HTMLResponse)
async def serve_spa():
    """
    Serve the complete SPA dashboard.
    """
    return HTML_TEMPLATE

@app.post("/api/hunt-leads", response_model=List[IndianLead])
async def hunt_leads():
    """
    Triggers the internal autonomous scraping search engine directly.
    """
    extracted_leads = []
    
    # Scout public feeds autonomously using the targeted keywords
    scraped_posts = await scout_public_feeds(TARGET_KEYWORDS)
    
    # Process the raw text results concurrently through Llama 3.3
    tasks = []
    for post in scraped_posts:
        tasks.append(extract_indian_lead(post["text"], post["url"]))
        
    results = await asyncio.gather(*tasks)
    
    # Filter valid Indian leads natively structured via the LLM schema
    for lead in results:
        if lead is not None:
            extracted_leads.append(lead)
            
    return extracted_leads

@app.post("/api/download-excel")
async def download_excel(request: ExportRequest):
    """
    Converts JSON leads into an Excel file for download.
    """
    if not request.leads:
        raise HTTPException(status_code=400, detail="No leads provided for export.")
        
    df = pd.DataFrame(request.leads)
    
    # Create an in-memory buffer
    output = io.BytesIO()
    
    with pd.ExcelWriter(output, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Indian Leads')
        
    output.seek(0)
    
    return StreamingResponse(
        output,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=desiclient_leads.xlsx"}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

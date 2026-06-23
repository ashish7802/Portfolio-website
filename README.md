# 🕵️‍♂️ Stealth Web Agent

> **Transform unstructured web data into structured lead intelligence.**

Stealth Web Agent is an autonomous, AI-powered web extraction engine. By combining the browsing capabilities of Playwright with the ultra-fast semantic processing of Groq's Llama 3.3 model, this agent bypasses rigid CSS selector logic. It effortlessly navigates dynamic websites, parses deep structural DOM components, handles pagination automatically, and exports structured datasets directly to native Excel spreadsheets.

---

## 🚀 Core Architecture Features

1. **Autonomous Multi-Page Loops**
   Dynamic coordination using Llama 3.3 to extract semantic content. The AI intelligently determines pagination controls (e.g., `next_button_text`) and seamlessly directs Playwright through multi-page loops until the extraction goal is met.
2. **Playwright Stealth Stack**
   Headless automation equipped with browser fingerprint masking and lazy-load delays. This bypasses basic bot-detection mechanisms and eliminates the need for brittle, hard-coded CSS selectors.
3. **Native Excel Exporter**
   Memory-efficient streaming utilizing Pandas and openpyxl. Raw JSON extractions are dynamically converted into clean, downloadable `.xlsx` files with proper data-alignment and missing-field mapping directly from the backend.
4. **Ultra-Fast Groq Inference**
   Powered by the `llama-3.3-70b-versatile` model operating in strict Native JSON Mode. This architecture completely bypasses heavy legacy constraints and 503 rate-limits, delivering blazing-fast structured JSON outputs at minimal token cost.

---

## 🛠️ Tech Stack Breakdown

- **Backend Framework:** [FastAPI](https://fastapi.tiangolo.com/)
- **AI Processing:** [Groq SDK](https://console.groq.com/docs/quickstart) (Llama 3.3)
- **Web Scraping:** [Playwright (Python)](https://playwright.dev/python/)
- **Data Serialization:** [Pandas](https://pandas.pydata.org/) & [Openpyxl](https://openpyxl.readthedocs.io/)
- **Frontend UI:** Vanilla JS + [Tailwind CSS](https://tailwindcss.com/)

---

## 💻 Local Setup & Installation Guide

Follow these steps to deploy the agent locally:

### 1. Clone the Repository
```bash
git clone https://github.com/ashish7802/Stealth-Web-Agent.git
cd Stealth-Web-Agent
```

### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 3. Install Playwright Browsers
```bash
playwright install chromium
```

### 4. Configure Environment Variables
Set your Groq API key in your environment variables.
```bash
# On Linux/Mac:
export GROQ_API_KEY="your_groq_api_key_here"

# On Windows (PowerShell):
$env:GROQ_API_KEY="your_groq_api_key_here"
```

### 5. Run the FastAPI Server
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --loop asyncio
```
The intuitive web dashboard will now be live at `http://localhost:8000`.

---

## ☁️ Render Deployment

The Stealth Web Agent is optimized for modern cloud infrastructure. The environment is fully Dockerized and pre-configured via `render.yaml` for instant deployment. 

By linking this repository to [Render.com](https://render.com/), the free-tier Blueprint architecture will automatically detect the Dockerfile, build the Playwright environment, configure the `PORT`, and launch the web service in minutes.

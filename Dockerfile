FROM python:3.11-slim

WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install pip dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install Playwright browser and its OS dependencies
RUN playwright install --with-deps chromium

# Copy application source code
COPY . .

# Expose Render default port
EXPOSE 8000

# Start the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--loop", "asyncio"]

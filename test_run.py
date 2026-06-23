import asyncio
import json
import os
import sys

# Ensure environment variables are loaded before importing agent
# Alternatively, set them in powershell before running this script.

from agent import run_agent

async def main():
    print("Starting test run...")
    try:
        url = "https://news.ycombinator.com"
        instruction = "Extract the top 5 stories with their titles and source links as a clean JSON array."
        
        result = await run_agent(url, instruction)
        print("\n--- FINAL JSON OUTPUT ---")
        print(json.dumps(result, indent=2))
        print("-------------------------")
    except Exception as e:
        print(f"Error during execution: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main())

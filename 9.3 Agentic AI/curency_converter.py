import os
import requests
from dotenv import load_dotenv
from tavily import TavilyClient
from langchain.tools import tool
from langchain.agents import create_agent
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from typing import Dict, Any

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
tavily_client = TavilyClient(api_key=TAVILY_API_KEY)

# Use the same model name you used in class if it differs.
llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash-lite", api_key=GEMINI_API_KEY)

@tool(
    "exchange_rate",
    description=(
        "Get the latest currency exchange rate from one currency to another. "
        "Use 3-letter ISO currency codes, e.g. base='USD', quote='MYR'."
    ),
)
def tool(base: str, quote: str) -> Dict[str, Any] | str:
    try:
        url = f"https://api.frankfurter.dev/v2/rate/{base.upper()}/{quote.upper()}"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        return f"Error: {e}"


tools = [tool]
agent = create_agent(
    model=llm,
    tools=tools,
    system_prompt="You are a helpful assistant.",
)

text = "What is the current exchange rate from US dollars to Malaysian Ringgit?"
question = HumanMessage(content=text)
response = agent.invoke({"messages": [question]})

print(text + "\n")
final_message = response["messages"][-1]
print(final_message.text)

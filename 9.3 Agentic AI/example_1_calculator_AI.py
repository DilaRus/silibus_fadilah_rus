import os
from dotenv import load_dotenv
from langchain.tools import tool
from langchain.agents import create_agent
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash-lite", api_key=GEMINI_API_KEY)

@tool("calculator", description="Performs mathematical calculations.")
def tool1(expression: str) -> str:
    try:
        result = eval(expression)
        return str(result)
    except Exception as e:
        return f"Error: {e}"

tools = [tool1]
agent = create_agent(
    model=llm,
    tools=tools,
    system_prompt="You are a helpful assistant."
)

question = HumanMessage(content="What's the result of an investment of $10,000 growing at 8 percent annually for 5 years with compound interest?")
response = agent.invoke({"messages": [question]})

final_message = response['messages'][-1]
print(final_message.text)    
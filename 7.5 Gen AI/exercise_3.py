import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    google_api_key=os.getenv("GEMINI_API_KEY")
)

llm_with_url = llm.bind_tools([{"url_context": {}}])
URL = "https://www.yahoo.com/news/politics/articles/races-might-predict-blue-wave-110000809.html"

chain = llm_with_url | StrOutputParser()

response = chain.invoke([
    HumanMessage(content=f"Please write Q&A accoding to this page: {URL}")
])

print(response)
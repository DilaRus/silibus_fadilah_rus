import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
THINKING_LEVEL = "high"

llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    google_api_key=os.getenv("GEMINI_API_KEY"),
    thinking_level = THINKING_LEVEL
)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("human", "{question}")
])

chain = prompt | llm | StrOutputParser()

response = chain.invoke({
    "question": "what is the sum of the first 50 prime numbers."
})

print(f"Thinking Level : {THINKING_LEVEL}")
print(f"Response       : \n{response}")
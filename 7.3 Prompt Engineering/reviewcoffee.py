
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate
from langchain_core.output_parsers import StrOutputParser
#
from fastapi import FastAPI

app = FastAPI()

@app.get("/analyze")
def analyze(review: str):
    return {"sentiment": chain.invoke({"input": review}).strip()}

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash-lite", api_key=GEMINI_API_KEY)

examples = [
    {"review": "Great quality for reasonable price. Excellent!", "sentiment": "Positive"},
    {"review": "The beans were stale and bitter. Disappointing.", "sentiment": "Negative"},
    {"review": "Standard medium roast coffee. Nothing special.", "sentiment": "Neutral"}
]

example_prompt = PromptTemplate(
    input_variables=["review", "sentiment"],
    template="Coffee Review: {review}\nSentiment: {sentiment}"
)

prompt = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,
    prefix="Analyze the coffee review sentiment.\nRespond with ONLY ONE WORD: Positive, Negative, Mixed, or Neutral.\n",
    suffix="Coffee Review: {input}\nSentiment:",
    input_variables=["input"]
)

chain = prompt | llm | StrOutputParser()


print("Coffee Review Sentiment Analyzer (type 'quit' to exit)")
while True:
    review = input("Enter coffee review: ").strip()
    if not review:
        continue
    if review.lower() == 'quit':
        break
    try:
        response = chain.invoke({"input": review})
        print(response.strip())
    except Exception as e:
        print(f"Error: {e}")

print("\nProgram ended.")

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
    {"review": "It is super cute!", "sentiment": "Adorable"},
    {"review": "It sleeps all day.", "sentiment": "Blank"},
    {"review": "It is growling.", "sentiment": "Mad"}
]

example_prompt = PromptTemplate(
    input_variables=["review", "sentiment"],
    template="Pet Vibe: {review}\nSentiment: {sentiment}"
)

prompt = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,
    prefix="Analyze the pet's vibe.\nRespond with ONLY ONE WORD: Adorable, Blank, or Mad.\n",
    suffix="Pet Vibe: {input}\nSentiment:",
    input_variables=["input"]
)

chain = prompt | llm | StrOutputParser()


print("Pet's Analyzer (type 'quit' to exit)")
while True:
    review = input("Enter a pet's vibe: ").strip()
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
import os
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from fastapi.responses import FileResponse


load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash-lite", api_key=GEMINI_API_KEY)

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a helpful assistant that translates {input_language} to {output_language}.Translate the provided sentence only."
        ),
        (
            "human",
            "{input}",
        ),
    ]
)

chain = prompt | llm | StrOutputParser()

app = FastAPI()


class TranslateRequest(BaseModel):
    text: str
    bahasa_masuk: str
    bahasa_keluar: str

class TranslateRequest2(BaseModel):
    text_output: str 

@app.post("/penukarbahasa", response_model=TranslateRequest2) 
def input_german(mintak: TranslateRequest):
    result = chain.invoke({
        "input_language": mintak.bahasa_masuk,
        "output_language": mintak.bahasa_keluar,
        "input": mintak.text,
    })
    return TranslateRequest2(text_output=result)


@app.get("/")
def root():
    return{"message": "gemini tengah buat kerja"}

@app.get("/app")
def frontend():
    return FileResponse("index.html")
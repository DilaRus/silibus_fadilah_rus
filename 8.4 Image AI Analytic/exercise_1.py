import os, base64
from fastapi import FastAPI, File, UploadFile, HTTPException
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
from typing import Dict
import streamlit as st
from fastapi.responses import FileResponse

load_dotenv()
llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    api_key=os.getenv("GEMINI_API_KEY")
)

app = FastAPI()

@app.get("/")
def home():
    return FileResponse("food.html")    

def encode_image(image_content: bytes) -> str:
    return base64.b64encode(image_content).decode()

@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)) -> Dict[str, str]:

    if not file.content_type or file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid or missing file type. Only JPEG and PNG are allowed.")

    contents = await file.read()

    if len(contents) > 10_000_000:
        raise HTTPException(status_code=400, detail="File too large. Maximum size is 10MB.")

    image = encode_image(contents)

    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a nutrition expert capable of analyzing food images and providing detailed nutritional advice."),
        ("human", [
            {
                "type": "text",
                "text": """Analyze the image and provide a comprehensive nutritional breakdown and health advice. Follow these steps:
                1. Give calorie count.
                2. Give the color of the food.
                3. Guess the weight of the food. 
                """
            },
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:{file.content_type};base64,{image}",
                }
            },
        ]),
    ])

    try:
        chain = prompt | llm | StrOutputParser()
        res = await chain.ainvoke({})
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail="An error occurred while analyzing the image.")

    return {"analysis": res}    
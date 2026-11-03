import os, base64
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    api_key=os.getenv("GEMINI_API_KEY")
)

video_file_path = "test_video.mp4"
with open(video_file_path, "rb") as video_file:
    encoded_video = base64.b64encode(video_file.read()).decode()

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert video analyst. Analyze videos carefully and provide detailed descriptions."),
    ("human", [
        {
            "type": "text",
            "text": "{analysis_request}"
        },
        {
            "type": "media",
            "data": "{video_data}",
            "mime_type": "{mime_type}"
        }
    ])
])    

chain = prompt | llm | StrOutputParser()
print("Analyzing video...")

response = chain.invoke({
    "analysis_request": "Create a quiz with an answer key based on the information in this video.",
    "video_data": encoded_video,
    "mime_type": "video/mp4"
})

print("Analysis completed")
print("\nResults:\n" + "-" * 40)
print(response)
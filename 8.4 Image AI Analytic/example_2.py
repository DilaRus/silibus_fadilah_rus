# intro to Streamlit
import os, base64
import streamlit as st
from datetime import date
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    api_key=os.getenv("GEMINI_API_KEY")
)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "You are a helpful assistant that can verify identification documents"),
        ("human",
            [
                {"type": "text", "text": "Verify the identification details"},
                {"type": "text", "text": "Name: {user_name}"},
                {"type": "text", "text": "DOB: {user_dob}"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "data:{mime_type};base64,{image}",
                    },
                },
            ],
        ),
    ]
)

chain = prompt | llm | StrOutputParser()

st.title("KYC Verification Application")

col1, col2 = st.columns(2)

with col1:
    uploaded_file = st.file_uploader("Upload your ID document", type=["jpg", "png"])

with col2:
    if uploaded_file is not None:
        image_bytes = uploaded_file.read()
        st.image(image_bytes)
    else:
        st.write("Image Preview")

user_name = st.text_input("Enter your name")
user_dob = st.date_input("Enter your date of birth", min_value=date(1900, 1, 1))

if uploaded_file is not None and user_name and user_dob:
    image = base64.b64encode(image_bytes).decode()
    res = chain.invoke({"user_name": user_name, "user_dob": user_dob,
                        "image": image, "mime_type": uploaded_file.type})
    st.write(res)


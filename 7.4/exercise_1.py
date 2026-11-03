import os, json
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from typing import List

load_dotenv()
llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    api_key=os.getenv("GEMINI_API_KEY")
)

class VVIP(BaseModel):
    nama: str = Field(description="Name of the person")
    umur: int = Field(description="Age of the person this year")
    tempat_lahir: str = Field(description="Name of the birth city of the person")
    perwatakan: List[str] = Field(description="List of personal traits of the person")
    iq_level: int = Field(description="IQ level of the person")
    

output_parser = JsonOutputParser(pydantic_object=VVIP)

chat_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """Choose one smart person that is still alive today and provide the person's information in the specified JSON format.
        """
    ),
    (
        "human",
        "{request}\n{format_instructions}"
    )
])

chain = chat_prompt | llm | output_parser

response = chain.invoke({
    "request": "Pick someone from the field of science",
    "format_instructions": output_parser.get_format_instructions()
})

print("\nResponse:")
print(json.dumps(response, indent=4))
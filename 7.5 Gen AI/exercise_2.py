import os
from io import BytesIO
from pypdf import PdfReader
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, HTTPException
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser

app = FastAPI()
load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    api_key=os.getenv("GEMINI_API_KEY")
)

# ---------- General summary chain (unchanged) ----------
prompt_template = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant that summarizes documents."),
    ("human", "Write a concise summary of the following:\n\n{text}\n\nCONCISE SUMMARY:")
])

chain = prompt_template | llm | StrOutputParser()

# ---------- Resume chain (new) ----------
# Note: no literal { } in these strings, because the template treats
# curly braces as variables. Keys are described in words instead.
resume_prompt = ChatPromptTemplate.from_messages([
    ("system",
     "You are an experienced recruiter screening resumes. "
     "Only use information that is actually in the resume. "
     "If something is missing, use null instead of guessing. "
     "Reply with a single JSON object and nothing else."),
    ("human",
     "Analyze the resume below and return a JSON object with these keys:\n"
     "- name: the candidate's full name (string or null)\n"
     "- headline: one-sentence summary of the candidate (string)\n"
     "- years_experience: estimated total years of work experience (number or null)\n"
     "- key_skills: the most important skills (list of strings, max 8)\n"
     "- education: degrees and institutions (list of strings)\n"
     "- recent_roles: up to 3 most recent roles, each written as 'Title at Company' (list of strings)\n"
     "- strengths: 2 to 3 strengths a recruiter would notice (list of strings)\n"
     "- concerns: gaps, red flags, or unclear points (list of strings)\n\n"
     "RESUME:\n\n{text}")
])

resume_chain = resume_prompt | llm | JsonOutputParser()


def read_pdf_file(file_contents: BytesIO) -> str:
    try:
        pdf_reader = PdfReader(file_contents)
        return "\n".join(page.extract_text() or "" for page in pdf_reader.pages)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading PDF: {e}")


async def extract_text_from_upload(file: UploadFile) -> str:
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    contents = await file.read()
    text = read_pdf_file(BytesIO(contents))
    if not text.strip():
        raise HTTPException(status_code=400, detail="No readable text found.")
    return text


@app.post("/summarize")
async def summarize_pdf(file: UploadFile = File(...)):
    text = await extract_text_from_upload(file)

    try:
        summary = await chain.ainvoke({"text": text})
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="An error occurred while summarizing the document.")

    return {"summary": summary}


@app.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
    text = await extract_text_from_upload(file)

    try:
        analysis = await resume_chain.ainvoke({"text": text})
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="An error occurred while analyzing the resume.")

    return {"analysis": analysis}
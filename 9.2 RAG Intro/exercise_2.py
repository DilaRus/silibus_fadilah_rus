# exercise_2.py: use fastapi get
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from embeddings import embeddings
from fastapi import FastAPI
from fastapi.responses import FileResponse

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MONGODB_URI = os.getenv("MONGODB_ATLAS_CLUSTER_URI")

# Initialize the LLM
llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash-lite", api_key=GEMINI_API_KEY)
client = MongoClient(MONGODB_URI)
DB_NAME = "test_db"
COLLECTION_NAME = "test_collection_pdf"
ATLAS_VECTOR_SEARCH_INDEX_NAME = "test-index-pdf"
MONGODB_COLLECTION = client[DB_NAME][COLLECTION_NAME]

# Vector store and retriever
# k=10 returns the top 10 most relevant chunks
vector_store = MongoDBAtlasVectorSearch(
    collection=MONGODB_COLLECTION,
    embedding=embeddings,
    index_name=ATLAS_VECTOR_SEARCH_INDEX_NAME,
    relevance_score_fn="cosine",
)
retriever = vector_store.as_retriever(search_kwargs={"k": 10})
# Define the system prompt with instructions for the AI
system_prompt = (
    """
    Please answer within context only.
    Context:\n{context}
    """
)

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}"),
])
# Merge the retrieved chunks into one string
def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

# Retrieve, build the prompt, call the LLM, parse the text
rag_chain = (
    {"context": retriever | format_docs, "input": RunnablePassthrough()}
    | prompt | llm | StrOutputParser()
)

# Execute the query
# print("Querying Vector DB...")
# response = rag_chain.invoke("What are the symptom of diabetes?")
# print(f"\nAI Response: {response}")
# client.close()

app = FastAPI()

@app.get("/")
def home():
    return FileResponse("index.html")

@app.get("/ask")
def soalancepumas(question: str):
    response = rag_chain.invoke(question)
    return {"question": question, "answer": response}
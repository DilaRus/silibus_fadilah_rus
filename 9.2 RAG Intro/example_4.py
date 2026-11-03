# example_4.py: save the PDF in the vector store
import os
import time
from pypdf import PdfReader
from dotenv import load_dotenv
from pymongo import MongoClient
from langchain_core.documents import Document
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_text_splitters import RecursiveCharacterTextSplitter
from embeddings import embeddings

load_dotenv()
MONGODB_URI = os.getenv("MONGODB_ATLAS_CLUSTER_URI")

client = MongoClient(MONGODB_URI)
DB_NAME = "test_db"
COLLECTION_NAME = "test_collection_pdf"
ATLAS_VECTOR_SEARCH_INDEX_NAME = "test-index-pdf"
MONGODB_COLLECTION = client[DB_NAME][COLLECTION_NAME]

vector_store = MongoDBAtlasVectorSearch(
    collection=MONGODB_COLLECTION,
    embedding=embeddings,
    index_name=ATLAS_VECTOR_SEARCH_INDEX_NAME,
    relevance_score_fn="cosine",
)

# Start clean, then re-embed everything
MONGODB_COLLECTION.delete_many({})
print("Previous documents cleared")

# Set up the text splitter
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=100,
)
# Custom PDF loader: one Document per page
def load_pdf_document(file_path: str) -> list[Document]:
    reader = PdfReader(file_path)
    docs = []
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        if text:
            # Page numbers tell the LLM where info came from
            docs.append(Document(
                page_content=text,
                metadata={"source": file_path, "page": i + 1},
            ))
    return docs

print("Loading PDF...")
pdf_docs = load_pdf_document("diabetes.pdf")
# Split the pages into chunks
docs = text_splitter.split_documents(pdf_docs)
print(f"Total chunks: {len(docs)}")

# Add in batches; wait and retry on errors
BATCH_SIZE = 50
for i in range(0, len(docs), BATCH_SIZE):
    batch = docs[i:i + BATCH_SIZE]
    for attempt in range(5):
        try:
            vector_store.add_documents(batch)
            break
        except Exception as e:
            wait = 15 * 2 ** attempt
            print(f"Retry in {wait}s: {e}")
            time.sleep(wait)
    time.sleep(60) # free tier: 100 RPM
client.close()
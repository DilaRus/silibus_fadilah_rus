# Exercise (lesson 6.3): Todos & Books API
# Instruction (copied from the slide):
#   Implement router using fastapi package to combine books and todos endpoints from previous day slides.
#   Sample folder structure: main.py plus routers/books.py and routers/todos.py
# Run with: uvicorn main:app --reload   then open localhost:8000/docs
from fastapi import FastAPI
from routers import books, todos

app = FastAPI()

@app.get('/')
async def read_root():
    return {"message": "Welcome to the To-Do List FastAPI!"}

app.include_router(
    books.router,
    prefix="/books",
    tags=["Books"]
)

app.include_router(
    todos.router,
    prefix="/todos",
    tags=["Todos"]
)

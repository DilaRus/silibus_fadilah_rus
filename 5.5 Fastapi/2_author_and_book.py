from fastapi import FastAPI, Body

app = FastAPI()

BOOKS = [
    {"title": "Fourth Wing", "author": "Rebecca Yarros", "published_year": 2023},
    {"title": "On Freedom", "author": "Timothy Snyder", "published_year": 2024},
    {"title": "It Starts with Us", "author": "Colleen Hoover", "published_year": 2022},
    {"title": "The Book of Bill", "author": "Alex Hirsh", "published_year": 2024},
    {"title": "On Tyranny", "author": "Timothy Snyder", "published_year": 2017},
]

@app.get("/")
async def read_root():
    return {"message" : "Hello World!"}

# 1. List All Books (using GET)
@app.get("/books")
async def getAllBooks():
    return BOOKS

# Find Book by Title - Path Parameter
@app.get("/books/{book_title}")
async def get_book(book_title: str):
    for book in BOOKS:
        if book.get("title").casefold() == book_title.casefold():
            return book

    return "Book Not Found"

# Find Book by Author - Query Parameter (slide 30), then
# Find Book by Author and Published Year - Query Parameters (slide 33)
# Note: the slides first show this endpoint with only "author: str"; the version below
# is the one from slide 33 that replaces it.
@app.get("/books/")
async def get_book_by_query(author: str, published_year: int):
    books_to_return = []
    for book in BOOKS:
        if book.get("author").casefold() == author.casefold() and \
            book.get("published_year") == published_year:
            books_to_return.append(book)

    return books_to_return

# 2. Add New Book (using POST)
@app.post("/books/create_book")
async def create_book(new_book=Body()):
    BOOKS.append(new_book)

    return "Book Record Created Successfully!"

# 3. Update Old Book (using PUT)
@app.put("/books/update_book")
async def update_book(updated_book = Body()):
    for i in range(len(BOOKS) ):
        if BOOKS[i].get("title").casefold() == updated_book.get("title").casefold():
            BOOKS[i] = updated_book
            return "Book Record Updated Successfully!"

    return "Book Not Found"

# 4. Delete Book (using DELETE)
@app.delete("/books/delete_book/{book_title}")
async def delete_book(book_title: str):
    for i, book in enumerate(BOOKS):
        if book.get("title").casefold() == book_title.casefold():
            BOOKS.pop(i)
            return "Book Record Deleted Successfully!"

    return "Book Not Found"
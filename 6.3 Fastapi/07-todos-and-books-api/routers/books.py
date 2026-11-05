# Books endpoints from lesson 5.5, moved into a router (mounted at "/books" in main.py).
from fastapi import APIRouter, Body

router = APIRouter()

BOOKS = [
    {"title": "Fourth Wing", "author": "Rebecca Yarros", "published_year": 2023},
    {"title": "On Freedom", "author": "Timothy Snyder", "published_year": 2024},
    {"title": "It Starts with Us", "author": "Colleen Hoover", "published_year": 2022},
    {"title": "The Book of Bill", "author": "Alex Hirsh", "published_year": 2024},
    {"title": "On Tyranny", "author": "Timothy Snyder", "published_year": 2017},
]

@router.get("")
async def getAllBooks():
    return BOOKS

@router.get("/{book_title}")
async def get_book(book_title: str):
    for book in BOOKS:
        if book.get("title").casefold() == book_title.casefold():
            return book

    return "Book Not Found"

@router.get("/")
async def get_book_by_query(author: str, published_year: int):
    books_to_return = []
    for book in BOOKS:
        if book.get("author").casefold() == author.casefold() and \
            book.get("published_year") == published_year:
            books_to_return.append(book)

    return books_to_return

@router.post("/create_book")
async def create_book(new_book=Body()):
    BOOKS.append(new_book)

    return "Book Record Created Successfully!"

@router.put("/update_book")
async def update_book(updated_book = Body()):
    for i in range(len(BOOKS) ):
        if BOOKS[i].get("title").casefold() == updated_book.get("title").casefold():
            BOOKS[i] = updated_book
            return "Book Record Updated Successfully!"

    return "Book Not Found"

@router.delete("/delete_book/{book_title}")
async def delete_book(book_title: str):
    for i, book in enumerate(BOOKS):
        if book.get("title").casefold() == book_title.casefold():
            BOOKS.pop(i)
            return "Book Record Deleted Successfully!"

    return "Book Not Found"

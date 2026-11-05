# Exercise (lesson 6.4), Backend: add relevant endpoints or database modification to improve the application
# (i.e. adding more information fields such as the book's price, genre, customer review, etc.)
# This version adds price and genre columns. Create an empty database named books_plus_db first.
from database import Base
from sqlalchemy import Column, Integer, String, Float

class Books(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    author = Column(String)
    published_year = Column(Integer)
    price = Column(Float)
    genre = Column(String)

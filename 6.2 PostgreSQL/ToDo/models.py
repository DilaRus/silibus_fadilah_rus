# Exercise (lesson 6.2): Develop a database to store your to-do list items and implement
# CRUD (Create, Read, Update, Delete) endpoints to communicate with your to-do list database.
# This file defines the table. Create an empty PostgreSQL database named todo_db first.
from database import Base
from sqlalchemy import Column, Integer, String

class Items(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(String)
    user = Column(String)
    task = Column(String)
    priority = Column(Integer)

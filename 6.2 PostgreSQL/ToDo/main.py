# Exercise (lesson 6.2): Develop a database to store your to-do list items and implement
# CRUD (Create, Read, Update, Delete) endpoints to communicate with your to-do list database.
# Run with: uvicorn main:app --reload   then open localhost:8000/docs
from fastapi import FastAPI, Depends, Path, HTTPException
import models
from models import Items
from database import engine, SessionLocal
from typing import Annotated
from sqlalchemy.orm import Session
from pydantic import BaseModel, StrictInt, Field

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

class ItemRequest(BaseModel):
    date: str = Field(min_length=10, max_length=10)  # format YYYY-MM-DD
    user: str = Field(min_length=3, max_length=1000)
    task: str = Field(min_length=3, max_length=1000)
    priority: StrictInt = Field(gt=0, lt=6)

# Read all items
@app.get("/items")
async def read_all(db: db_dependency):
    return db.query(Items).all()

# Read one item by id
@app.get("/items/{item_id}")
async def get_item_by_id(db: db_dependency, item_id: int = Path(gt=0)):
    item_result = db.query(Items).filter(Items.id == item_id).first()

    if item_result is not None:
        return item_result

    raise HTTPException(status_code=404, detail="Item not found")

# Create an item
@app.post("/items")
async def create_item(db: db_dependency, item_request: ItemRequest):
    new_item = Items(date=item_request.date, user=item_request.user, task=item_request.task, priority=item_request.priority)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return {"message": "Item successfully added"}

# Update an item
@app.put("/items/{item_id}")
async def update_item(db: db_dependency,
                      item_request: ItemRequest,
                      item_id: int = Path(gt=0)):
    item_result = db.query(Items).filter(Items.id == item_id).first()

    if item_result is None:
        raise HTTPException(status_code=404, detail="Item not found")

    item_result.date = item_request.date
    item_result.user = item_request.user
    item_result.task = item_request.task
    item_result.priority = item_request.priority

    db.add(item_result)
    db.commit()
    return {"message": "Item successfully updated"}

# Delete an item
@app.delete("/items/{item_id}")
async def delete_item(db: db_dependency, item_id: int = Path(gt=0)):
    item_result = db.query(Items).filter(Items.id == item_id).first()

    if item_result is None:
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        db.delete(item_result)
        db.commit()
        return {"message": "Item successfully deleted"}

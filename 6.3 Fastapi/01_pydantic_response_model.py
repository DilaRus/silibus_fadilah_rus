# Lesson 6.3 slide 4: Pydantic response models.
# Run with: uvicorn 01_pydantic_response_model:app --reload
# Compare /receipt-with-no-model (leaks the password) with /receipt-with-model (hides it).
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

class Receipt(BaseModel):
    # FIX: the slide wrote "dat: str" but the data below uses the key "date". With "dat" the response model
    # would fail validation (missing field) on /receipt-with-model. Renamed to "date" to match the data.
    date: str
    terminal: str
    transaction: str
    amount_RM: float

atm_database = [
    {
        "date": "06/08/202",
        "terminal": "642251",
        "transaction": "WITHDRAWAL",
        "amount_RM": "500.01",
        "password": "P@$$w0rd123",
        "house_possessed": 6,
        "car_possessed": 7
    }
]

@app.get("/receipt-with-no-model")
def get_receipt_no_model():
    return atm_database

@app.get("/receipt-with-model", response_model=List[Receipt])
def get_receipt_with_model():
    return atm_database

# Lesson 6.3 slide 6: Router - main (main.py)
# Run with: uvicorn main:app --reload
from fastapi import FastAPI
# FIX: the slide imports "right_windows, left_windows" but the files on slides 5 and 7 are named
# left_window.py and right_window.py. Import names changed to match the file names.
from routers import right_window, left_window

app = FastAPI()

app.include_router(
    right_window.router,
    prefix="/right",
    tags=["Right Window Buttons"]
)

app.include_router(
    left_window.router,
    prefix="/left",
    tags=["Left Window Buttons"]
)

# Exercise (lesson 6.3 slide 7): Do the same for the right_window.py
# Hint from the slide: change any "left" to "right"
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class RightWindowAction(BaseModel):
    action: str  #Up or Down

right_current_position = []

@router.put("/action")
def operate_right_window(command: RightWindowAction):
    right_current_position.append(command)
    return {"Result": f"Window moved {command.action}"}

@router.get("/current")
def get_window_status():
    return {"Current_Position": right_current_position}

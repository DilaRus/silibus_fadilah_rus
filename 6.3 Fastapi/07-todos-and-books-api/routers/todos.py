# Todos endpoints from the presenter notes of the slide, moved into a router (mounted at "/todos" in main.py).
from fastapi import APIRouter, Body
from datetime import date

router = APIRouter()

TODOS = [
    {"id": 1, "task": "Learn Python", "completed": False, "due_date": "2025-11-15"},
    {"id": 2, "task": "Practice coding", "completed": False, "due_date": "2025-11-12"},
    {"id": 3, "task": "Take a break", "completed": False, "due_date": "2025-11-12"},
    {"id": 4, "task": "Build FastAPI project", "completed": False, "due_date": "2025-11-18"}
]

next_id = 5

@router.get('')
async def get_all_todos():
    return TODOS

@router.get('/filter_by_completed')
async def get_todos_by_completed_query(completed: bool):
    completed_todos = []
    for todo in TODOS:
        if todo.get("completed") == completed:
            completed_todos.append(todo)
    return completed_todos

@router.get('/filter_by_completed_and_date')
async def get_todos_by_completed_and_date_query(completed: bool, due_date: str):
    todos_to_return = []
    for todo in TODOS:
        if todo.get("completed") == completed and todo.get("due_date").casefold() == due_date.casefold():
            todos_to_return.append(todo)
    return todos_to_return

@router.get('/{task_name}')
async def get_todo_by_task(task_name: str):
    for todo in TODOS:
        if todo.get("task").casefold() == task_name.casefold():
            return todo
    return "Task not found"

@router.post('/create_task')
async def add_task(new_task_body=Body()):
    global next_id

    task_name = new_task_body.get("task")
    due_date_str = new_task_body.get("due_date")

    if not task_name:
        return "Task name is required."

    if not due_date_str:
        due_date_str = date.today().isoformat()

    new_task = {
        "id": next_id,
        "task": task_name,
        "completed": False,
        "due_date": due_date_str
    }
    TODOS.append(new_task)
    next_id += 1

    return "Task created successfully!"

@router.put('/update_task')
async def update_task(updated_task_body=Body()):
    for i in range(len(TODOS)):
        if TODOS[i].get("task").casefold() == updated_task_body.get("task").casefold():
            TODOS[i] = updated_task_body
            return "Task updated successfully!"

    return "Task not found"

@router.delete('/delete_task/{task_name}')
async def delete_task(task_name: str):
    for i, todo in enumerate(TODOS):
        if todo.get("task").casefold() == task_name.casefold():
            TODOS.pop(i)
            return "Task deleted successfully!"

    return "Task not found"

from fastapi import FastAPI, Body

app = FastAPI()

ITEMS = [
    {"task_id": 456, "date": "2025-05-15", "user": "John", "task": "Learn React", "priority": 5},
    {"task_id": 123, "date": "2025-05-16", "user": "Kelly", "task": "Read a novel", "priority": 3},
    {"task_id": 100, "date": "2025-06-22", "user": "Luke", "task": "Clean living room", "priority": 3},
    {"task_id": 211, "date": "2025-07-12", "user": "John", "task": "Write a blog", "priority": 4},
]

# Endpoint 1: return all items
@app.get("/items")
async def get_all_items():
    return ITEMS

# Endpoint 2: path parameter (user)
@app.get("/items/{user}")
async def get_items_by_user(user: str):
    items_to_return = []
    for item in ITEMS:
        if item.get("user").casefold() == user.casefold():
            items_to_return.append(item)

    return items_to_return

# Endpoint 3: query parameters (date and user)
@app.get("/items/")
async def get_items_by_date_and_user(date: str, user: str):
    items_to_return = []
    for item in ITEMS:
        if item.get("date") == date and item.get("user").casefold() == user.casefold():
            items_to_return.append(item)

    return items_to_return

# Endpoint 4: create
@app.post("/items/create_item")
async def create_item(new_item=Body()):
    ITEMS.append(new_item)

    return "Item Created Successfully!"

# Endpoint 5: update (matched by task_id)
@app.put("/items/update_item")
async def update_item(updated_item=Body()):
    for i in range(len(ITEMS)):
        if ITEMS[i].get("task_id") == updated_item.get("task_id"):
            ITEMS[i] = updated_item
            return "Item Updated Successfully!"

    return "Item Not Found"

# Endpoint 6: delete by task_id path parameter
@app.delete("/items/delete_item/{task_id}")
async def delete_item(task_id: int):
    for i, item in enumerate(ITEMS):
        if item.get("task_id") == task_id:
            ITEMS.pop(i)
            return "Item Deleted Successfully!"

    return "Item Not Found"
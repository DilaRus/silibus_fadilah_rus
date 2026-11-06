todos = [
    {"task": "Learn Python", "completed": False},
    {"task": "Practice coding", "completed": False},
    {"task": "Take a break", "completed": False}
]

def display_lists():
    """Display pending and completed tasks with counts"""
    pending = [item for item in todos if not item["completed"]]
    done = [item for item in todos if item["completed"]]

    print("\nPending Tasks:")
    if not pending:
        print("No tasks yet.")
    for index, item in enumerate(pending, 1):
        print(f"{index}. {item['task']}")

    print("\nDone Tasks:")
    if not done:
        print("No tasks yet.")
    for index, item in enumerate(done, 1):
        print(f"{index}. {item['task']}")

    print("\n--- Summary ---")
    print(f"Pending : {len(pending)} tasks")
    print(f"Done    : {len(done)} tasks")

def add_task():
    """Ask user for a new task and add it to the list"""
    task = input("Enter a new task: ")
    todos.append({"task": task, "completed": False})
    print(f"Added: {task}")

def complete_task():
    """Mark a pending task as completed"""
    pending = [item for item in todos if not item["completed"]]
    display_lists()
    try:
        number = input("Enter the number of the task you finished: ")
        index = int(number) - 1
        if index >= 0 and index < len(pending):
            pending[index]["completed"] = True
            print("Task marked as done.")
        else:
            print("Invalid task number.")
    except ValueError:
        print("Please enter a number.")

# Main program loop
running = True
while running:
    print("\n=== To-Do Menu ===")
    print("1. Show tasks")
    print("2. Add task")
    print("3. Complete task")
    print("4. Exit")
    choice = input("Choose an option: ")

    if choice == "1":
        display_lists()
    elif choice == "2":
        add_task()
    elif choice == "3":
        complete_task()
    elif choice == "4":
        print("Goodbye!")
        running = False
    else:
        print("Invalid choice, please try again.")

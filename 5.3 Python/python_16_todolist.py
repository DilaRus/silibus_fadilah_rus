todos = []
completed_tasks = []

# Add initial tasks
todos.append("Learn Python")
todos.append("Practice coding")
todos.append("Take a break")

def display_lists():
    """Display both to-do and completed task lists with counts"""
    print("\nPending Tasks:")
    if not todos:
        print("No tasks yet.")
    for index, task in enumerate(todos, 1):
        print(f"{index}. {task}")

    print("\nDone Tasks:")
    if not completed_tasks:
        print("No tasks yet.")
    for index, task in enumerate(completed_tasks, 1):
        print(f"{index}. {task}")

    print("\n--- Summary ---")
    print(f"Pending : {len(todos)} tasks")
    print(f"Done    : {len(completed_tasks)} tasks")

def add_task():
    """Ask user for a new task and add it to the to-do list"""
    task = input("Enter a new task: ")
    todos.append(task)
    print(f"Added: {task}")

def complete_task():
    """Mark a task as complete and move it to the completed list"""
    display_lists()
    try:
        number = input("Enter the number of the task you finished: ")
        index = int(number) - 1
        if index >= 0 and index < len(todos):
            completed_tasks.append(todos.pop(index))
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

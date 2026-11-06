fruits = ["apple", "banana", "orange"]
fruits.append("grape")
fruits.insert(2, "mango")
fruits.remove("apple")
print(fruits)
print(fruits[0])
print(fruits[-1])

numbers = [3, 1, 4, 1, 5, 9, 2]
numbers.sort()
print(numbers)
numbers.reverse()
print(numbers)
print(numbers.index(1))

first = numbers.index(1)
second = numbers.index(1,  first  + 1)
print (second)

todos = []
todos.append("buy groceries")
todos.append("clean the house")
todos.append("pay the bills")
print("to-do-list:")
for index, task in enumerate(todos, 1):
    print(f"{index}.{task}")

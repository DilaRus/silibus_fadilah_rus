for i in range(1, 6):
    print(f"Number: {i}")

for i in range(1, 6):
    print(f"Number: {i}")
    if i == 3:
        break
print("Loop ended")

for i in range(1, 11):
    if i % 2 == 0:
        continue
    print(f"Odd Number: {i}")
print("Loop ended")

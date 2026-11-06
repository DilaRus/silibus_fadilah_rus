person = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}
print(person["name"])
person["email"] = "alice@email.com"
print(person)
for key in person:
    print(key)
for value in person.values():
    print(value)
for key, value in person.items():
    print(f"{key}: {value}")

def greet_user():
    print("Hello")
    print("Hello2")
    print("Hello3")
greet_user()

lenght1 = float(input("Enter length: "))
width1 = float(input("Enter width: "))

def calculate_area(length, width):
    area=length * width
    return area
result = calculate_area(lenght1,width1)
print(f"Area: {result}")
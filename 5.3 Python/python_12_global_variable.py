x = 10

def without_global():
    global x       # this line makes the function use the global x
    print(f"Global x seen from inside: {x}")
    x = 5          # now this changes the global x instead of creating a local one
    print(f"x after change: {x}")

without_global()
print(f"Global x: {x}")  # Output: Global x: 5

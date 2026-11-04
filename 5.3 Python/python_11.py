try:
    result = 10/0
except:
    print("Error")
finally:
    ("closing")

try:
    numerator = 10
    denominator = int ( input( "enter a denominator: "))
    result = numerator/denominator

except:
    print("Error oi")
    print("Closing")
else:
    print(f"success {result}")
    print("Closing")

    
# and -> BOTH sides must be True
# or -> AT LEAST ONE side must be True
# not -> flips True to False, False to True

age = float(input( "Enter a number: ") )
print(age > 0 and age < 10)
print(age > 0 or  age > 10)
print(not(age > 3))

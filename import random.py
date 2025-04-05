import random
input = input("Enter a number 1-1000: ")
try:
    input = int(input)
except ValueError:
    print("Invalid input. Please enter a number.")
    exit(1)
if input < 1 or input > 1000:
    print("Invalid input. Please enter a number between 1 and 1000.")
    exit(1)
number = random.randint(1, 1000)

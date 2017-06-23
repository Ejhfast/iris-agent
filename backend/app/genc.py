iris_env = {}

def store_command(value, name):
    iris_env[name] = value
    return value

def generate_number():
        import random
        return random.randint(0,100)

def add_two_numbers(x, y):
        return x + y

iris_env["__MEMORY__"]=add_two_numbers(2,9)
iris_env["__MEMORY__"]=store_command(iris_env["__MEMORY__"],"my_num")
iris_env["__MEMORY__"]=add_two_numbers(iris_env["my_num"],generate_number())

print(iris_env["__MEMORY__"])

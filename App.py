from flask import Flask

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello World"


@app.route("/user")
def user():
    return "<li> Salim Azouaoui</li> <li> Sahil Azouaoui</li>"


app.run()

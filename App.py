from flask import Flask

app = Flask(__name__)


@app.route("/")
def hello_world():
    return 'Bekijk hier de <a href="Admin"> admins!</a> '


@app.route("/Admin")
def Admin():
    return "<li> Salim Azouaoui</li> <li> Sahil Qari</li> "


app.run()

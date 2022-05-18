from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route("/")
def hello_world():
    return 'Bekijk hier de <a href="./frontend/index.html"> admins!</a> '


@app.route("/Admin")
def Admin():
    return "<li> Salim Azouaoui</li> <li> Sahil Qari</li> "


@app.route('/postexample', methods=['POST'])
def postExample():
    print(request.json)
    return jsonify(msg='succes')


app.run()

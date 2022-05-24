from webbrowser import get
from flask import Flask, jsonify, request
import sqlite3 as sql

app = Flask(__name__)


def get_db_connection():
    conn = sql.connect('./database/Auto.db')
    conn.row_factory = sql.Row
    return conn


def convertRows(rows):
    return [dict(row) for row in rows]


@app.route("/")
def hello_world():
    return 'Bekijk hier de <a href="Admin"> admins!</a> '


@app.route("/Admin")
def Admin():
    return "<li> Salim Azouaoui</li> <li> Sahil Qari</li> "


@app.route('/postexample', methods=['POST'])
def postExample():
    print(request.json)
    return jsonify(msg='succes')


@app.route("/order_lines")
def order_lines():
    conn = get_db_connection()
    rows = conn.execute("select * from order_lines").fetchall()
    data = convertRows(rows)
    conn.close()
    return jsonify(data)


if __name__ == '__main__':
    app.run()

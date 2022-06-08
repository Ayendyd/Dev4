import imp
from flask_cors import CORS
from resources.user import create_user
import sqlite3 as sql
from flask import Flask, jsonify, request
from resources.auto import create_auto
from flask_jwt_extended import JWTManager
from security import login
from security import me
from resources.orders import create_orders
from resources.auto import update_auto


app = Flask(__name__)

app.debug = True

CORS(app)

app.config['JWT_SECRET_KEY'] = 'token'
jwt = JWTManager(app)


def get_db_connection():
    conn = sql.connect('./database/Auto.db')
    conn.row_factory = sql.Row
    return conn


def convertRows(rows):
    return [dict(row) for row in rows]

# ============================ Routes ============================


@app.route("/")
def hello_world():
    return 'Bekijk hie de <a href="Admin"> admins!</a> '


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


@app.route("/categories")
def categories():
    conn = get_db_connection()
    rows = conn.execute("select * from categories").fetchall()
    data = convertRows(rows)
    conn.close()
    return jsonify(data)


@app.route("/auto")
def auto():
    conn = get_db_connection()
    rows = conn.execute("select * from auto").fetchall()
    data = convertRows(rows)
    conn.close()
    return jsonify(data)


@app.route("/userroles")
def userroles():
    conn = get_db_connection()
    rows = conn.execute("select * from userroles").fetchall()
    data = convertRows(rows)
    conn.close()
    return jsonify(data)


@app.route("/orders")
def orders():
    conn = get_db_connection()
    rows = conn.execute("select orders.id, orders.begin_datum, orders.eind_datum, orders.user_id, orders.betaald, orders.vrije_kilometers, orders.auto_id, users.id, users.firstname, users.Tussenvoegsel, users.lastname, auto.Naam, auto.Model, auto.Kleur, auto.Bouwjaar, auto.id from orders INNER JOIN users on orders.user_id = users.id INNER JOIN auto on orders.auto_id = auto.id").fetchall()
    data = convertRows(rows)
    conn.close()
    return jsonify(data)


# @app.route("/orders", methods=['GET', 'POST'])
# def orders():
#     if request.method == 'GET':
#         conn = get_db_connection()
#         rows = conn.execute("select orders.id, orders.begin_datum, orders.eind_datum, orders.betaald, orders.vrije_kilometers, orders.auto_id, users.id, users.firstname, users.Tussenvoegsel, users.lastname from orders INNER JOIN users on orders.user_id = users.id").fetchall()
#         data = convertRows(rows)
#         conn.close()
#         return jsonify(data)
#     elif request.method == 'POST':


@app.route("/orders/<id>")
def order(id):
    conn = get_db_connection()
    rows = conn.execute(
        "SELECT * from orders where orders.id=?", [id]).fetchall()
    data = convertRows(rows)
    conn.close()
    return jsonify(data)


# @app.route('/users/<int:user_id>/orders')
# def orderMe(user_id):
#     conn = get_db_connection()
#     rows = conn.execute(
#         "SELECT * from orders where user_id=?", [user_id]).fetchall()
#     data = convertRows(rows)
#     conn.close()
#     return jsonify(data)


@app.route("/users")
def users():
    conn = get_db_connection()
    rows = conn.execute("select * from users").fetchall()
    data = convertRows(rows)
    conn.close()
    return jsonify(data)


@app.route("/auto/<id>")
def autos(id):
    conn = get_db_connection()
    rows = conn.execute(
        "SELECT * from auto where auto.id=?", [id]).fetchall()
    data = convertRows(rows)
    conn.close()
    return jsonify(data)


app.add_url_rule("/me", None, me, methods=['GET'])


app.add_url_rule('/auto', None, create_auto, methods=['POST'])

app.add_url_rule('/orders', None, create_orders, methods=['POST'])
app.add_url_rule('/auto/<id>', None, update_auto, methods=['PATCH'])


# JWT routes
app.add_url_rule('/users', None, create_user, methods=['POST'])
app.add_url_rule('/auth', None, login, methods=['POST'])


if __name__ == '__main__':
    app.run()

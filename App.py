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
from resources.auto import delete_auto
from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    get_jwt_identity
)


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


@jwt_required
@app.route('/postexample', methods=['POST'])
def postExample():
    print(request.json)
    return jsonify(msg='succes')


@app.route("/auto")
def auto():
    conn = get_db_connection()
    rows = conn.execute("select * from auto").fetchall()
    data = convertRows(rows)
    conn.close()
    return jsonify(data)


@jwt_required
@app.route("/userroles")
def userroles():
    User = get_jwt_identity()

    if (User['userroles_id'] == 2):
        return{'message': 'Geen medewerker'}, 401
    conn = get_db_connection()
    rows = conn.execute("select * from userroles").fetchall()
    data = convertRows(rows)
    conn.close()
    return jsonify(data)


@jwt_required
@app.route("/orders")
def orders():
    User = get_jwt_identity()

    if (User['userroles_id'] == 2):
        return{'message': 'Geen medewerker'}, 401
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

@jwt_required
@app.route("/orders/<id>")
def order(id):
    User = get_jwt_identity()

    if (User['userroles_id'] == 2):
        return{'message': 'Geen medewerker'}, 401
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
# UPDATE auto SET  Naam =?,Model =?,Kleur =?,Brandstof=?,Transmissie =?,GPS =?,Bouwjaar =?,Vermogen =?,Categorie_id =? WHERE id = ?;
#  cur.execute("UPDATE auto SET  Naam =?,Model =?,Kleur =?,Brandstof=?,Transmissie =?,GPS =?,Bouwjaar =?,Vermogen =?,Categorie_id =? WHERE id = ?;,",
#                     (args['Naam'], args['Model'], args['Kleur'], args['Brandstof'], args['Transmissie'], args['GPS'], args['Bouwjaar'], args['Vermogen'], args['Categorie_id'], id))
@jwt_required
@app.route("/users")
def users():
    User = get_jwt_identity()

    if (User['userroles_id'] == 2):
        return{'message': 'Geen medewerker'}, 401
    conn = get_db_connection()
    rows = conn.execute("select * from users").fetchall()
    data = convertRows(rows)
    conn.close()
    return jsonify(data)



@jwt_required
@app.route("/auto/<id>")
def autos(id):
    User = get_jwt_identity()

    if (User['userroles_id'] == 2):
        return{'message': 'Geen medewerker'}, 401
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
app.add_url_rule('/auto/<id>', None, delete_auto, methods=['DELETE'])


# JWT routes
app.add_url_rule('/users', None, create_user, methods=['POST'])
app.add_url_rule('/auth', None, login, methods=['POST'])


if __name__ == '__main__':
    app.run()

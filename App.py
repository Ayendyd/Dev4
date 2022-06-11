from flask_cors import CORS
from database.autodb import DB
from resources.user import create_user
import sqlite3 as sql
from flask import Flask, jsonify, request
from resources.auto import create_auto, delete_auto
from flask_jwt_extended import JWTManager
from security import login
from security import me
from resources.orders import create_orders
from resources.auto import update_auto
from resources.orders import update_order

from resources.orders import del_order


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


@jwt_required()
@app.route("/")
def hello_world():
    return 'Bekijk hie de <a href="Admin"> admins!</a> '


@app.route("/Admin")
def Admin():
    return "<li> Salim Azouaoui</li> <li> Sahil Qari</li> "


@jwt_required()
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


@jwt_required()
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

@jwt_required()
def orderr(id):
    User = get_jwt_identity()

    if (User['userroles_id'] == 2):
        return{'message': 'Geen medewerker'}, 401
    conn = get_db_connection()
    rows = conn.execute(
        "select orders.id, orders.begin_datum, orders.eind_datum, orders.user_id, orders.betaald, orders.vrije_kilometers, orders.auto_id, users.id, users.firstname, users.Tussenvoegsel, users.lastname, auto.Naam, auto.Model, auto.Kleur, auto.Bouwjaar, auto.id from orders INNER JOIN users on orders.user_id = users.id INNER JOIN auto on orders.auto_id = auto.id WHERE orders.id=?", [id]).fetchall()
    data = convertRows(rows)
    conn.close()
    return jsonify(data)


@jwt_required()
def orderMe():

    user = get_jwt_identity()

    qry = "SELECT * from orders where user_id={}".format(user['id'])

    rows = DB.all(qry)

    return jsonify(rows)


# UPDATE auto SET  Naam =?, Model =?, Kleur =?, Brandstof =?, Transmissie =?, GPS =?, Bouwjaar =?, Vermogen =?, Categorie_id =? WHERE id = ?
# cur.execute("UPDATE auto SET  Naam =?,Model =?,Kleur =?,Brandstof=?,Transmissie =?,GPS =?,Bouwjaar =?,Vermogen =?,Categorie_id =? WHERE id = ?;,",
#             (args['Naam'], args['Model'], args['Kleur'], args['Brandstof'], args['Transmissie'], args['GPS'], args['Bouwjaar'], args['Vermogen'], args['Categorie_id'], id))


@jwt_required()
def users():
    User = get_jwt_identity()

    if (User['userroles_id'] == 2):
        return{'message': 'Geen medewerker'}, 401
    conn = get_db_connection()
    rows = conn.execute("select * from users").fetchall()
    data = convertRows(rows)
    conn.close()
    return jsonify(data)


@jwt_required()
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


# @jwt_required()
# @app.route("/auto/<id>")
# def autos(id):
#     User = get_jwt_identity()

#     if (User['userroles_id'] == 2):
#         return{'message': 'Geen medewerker'}, 401
#     conn = get_db_connection()
#     rows = conn.execute(
#         "SELECT * from auto where auto.id=?", [id]).fetchall()
#     data = convertRows(rows)
#     conn.close()
#     return jsonify(data)


# @jwt_required
# def delete_orderr(id):

#     qry = "DELETE FROM orders WHERE id={}".format(id)

#     DB.delete(qry)
#     return {"message": "Product succesvol verwijderd"}, 200


app.add_url_rule("/me", None, me, methods=['GET'])


app.add_url_rule('/auto', None, create_auto, methods=['POST'])

app.add_url_rule('/orders', None, create_orders, methods=['POST'])
app.add_url_rule('/orders', None, orders, methods=['GET'])
# app.add_url_rule('/me/orders', None, delete_orderr, methods=['DELETE'])
app.add_url_rule('/auto/<id>', None, update_auto, methods=['PATCH'])
app.add_url_rule('/me/orders/<id>', None, del_order, methods=['DELETE'])
app.add_url_rule('/auto/<id>', None, delete_auto, methods=['DELETE'])
# app.add_url_rule('/orderss/<sid>', None, order_delete, methods=['DEETE'])
app.add_url_rule('/me/orders', None, orderMe, methods=['GET'])
app.add_url_rule('/orders/<id>', None, orderr, methods=['GET'])
app.add_url_rule('/orders/<id>', None, update_order, methods=['PATCH'])
app.add_url_rule('/auto/<id>', None, autos, methods=['GET'])
app.add_url_rule('/users', None, users, methods=['GET'])
# app.add_url_rule('/orders/<id>', None, update_order, methods=['PATCH'])

# app.add_url_rule('/me/orders/<id>', None, del_order, methods=['DELETE'])

app.add_url_rule

# JWT routes
app.add_url_rule('/users', None, create_user, methods=['POST'])
app.add_url_rule('/auth', None, login, methods=['POST'])


if __name__ == '__main__':
    app.run()

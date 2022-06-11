from database.autodb import DB
from flask import request
from ast import arg

from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    get_jwt_identity
)


@jwt_required
def order_delete(id):
    User = get_jwt_identity()

    if (User['userroles_id'] == 1):
        return{'message': 'Geen klant'}, 401

    qry = "DELETE FROM orders WHERE id={}".format(id)

    DB.delete(qry)
    return {"message": "Order succesvol verwijderd"}, 200


@jwt_required
def del_order(id):
    user = get_jwt_identity()

    if (user['userroles_id'] == 1):
        return{'message': 'Geen klant'}, 401

    qry = "DELETE FROM orders WHERE id={}".format(id)

    DB.delete(qry)
    return {'message': "Order succesvol verwijderd"}, 200

@jwt_required()
def create_orders():

    # Parse all arguments for validity

    args = request.get_json()

    # Make the insert query with parameters
    qry = '''''''''''''''
 INSERT INTO

       `orders`
           (`user_id`, `begin_datum`, `eind_datum`, `vrije_kilometers`, `auto_id`, `levering`, `optie1`, `optie2`, `optie3`)

      VALUES
      
           (:user_id, :begin_datum, :eind_datum, :vrije_kilometers, :auto_id, :levering, :optie1, :optie2, :optie3)

   '''''''''''''''

    # Insert the user into the database

    id = DB.insert(qry, args)

    # Return a message and the user id

    return{'message': 'success', 'id': id}, 201


def update_order(id):

    args = request.get_json()

    # Make the insert query with parameters

    qry = '''''''''''''''
 	UPDATE orders SET 

    Kleur = coalesce(:Kleur,Kleur),  

    Model = coalesce(:Model,Model), 

	vrije_kilometers = coalesce(:vrije_kilometers,vrije_kilometers)
	

    WHERE id = {}

   '''''''''''''''.format(id)

    # Insert the user into the database
    # Bouwjaar = coalesce(:Bouwjaar, Bouwjaar),
    #    # begin_datum = coalesce(:begin_datum,begin_datum),

    # betaald = coalesce(:betaald,betaald),

    # eind_datum = coalesce(:eind_datum,eind_datum),

    data = {

        # "Bouwjaar": args["Bouwjaar"] if "Bouwjaar" in args else None,
        "Model": args["Model"] if "Model" in args else None,
        # "Transmissie": args["Transmissie"] if "Transmissie" in args else None,
        # "Brandstof": args["Brandstof"] if "Brandstof" in args else None,
        "Kleur": args["Kleur"] if "Kleur" in args else None,
        # "Naam": args["Naam"] if "Naam" in args else None,
        # "betaald": args["betaald"] if "betaald" in args else None,
        # "begin_datum": args["begin_datum"] if "begin_datum" in args else None,
        # "eind_datum": args["eind_datum"] if "eind_datum" in args else None,
        "vrije_kilometers": args["vrije_kilometers"] if "vrije_kilometers" in args else None,

    }

    DB.update(qry, data)

    # Return a message and the user id

    return{'message': 'success', 'id': id}, 200

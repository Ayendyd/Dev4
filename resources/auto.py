from database.autodb import DB
from flask import request
from ast import arg

from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    get_jwt_identity
)


@jwt_required()
def delete_auto(id):

    User = get_jwt_identity()

    if (User['userroles_id'] == 2):
        return{'message': 'Geen medewerker'}, 401

    qry = "DELETE FROM auto WHERE auto.id={}".format(id)

    DB.delete(qry)
    return {"message": "Product succesvol verwijderd"}, 200


@jwt_required()
def create_auto():

    User = get_jwt_identity()

    if (User['userroles_id'] == 2):
        return{'message': 'Geen medewerker'}, 401

    # Parse all arguments for validity

    args = request.get_json()

    # Make the insert query with parameters
    qry = '''''''''''''''
 INSERT INTO

       `auto`
           (`Naam`, `Model`, `Kleur`, `Brandstof`, `Transmissie`, `GPS`, `Bouwjaar`, `Vermogen`)

      VALUES
      
           (:Naam, :Model, :Kleur, :Brandstof, :Transmissie, :GPS, :Bouwjaar, :Vermogen)

   '''''''''''''''

    # Insert the user into the database

    id = DB.insert(qry, args)

    # Return a message and the user id

    return{'message': 'success', 'id': id}, 201


# UPDATE auto SET

#     Naam = coalesce(?,Naam),

#     Model = coalesce(?,Model),

#     Kleur = coalesce(?,Kleur),

#     Brandstof = coalesce(?,Brandstof),

#     Transmissie = coalesce(?,Transmissie),

# 	GPS = coalesce(?,GPS),

# 	Bouwjaar = coalesce(?,Bouwjaar),

# 	Vermogen = coalesce(?,Vermogen),

#     Categorie_id = coalesce(?,Categorie_id)

#     WHERE id = ?

@jwt_required()
def update_auto(id):

    args = request.get_json()

    # Make the insert query with parameters

    qry = '''''''''''''''
 	UPDATE auto SET 

    Naam = coalesce(:Naam, Naam),  

    Model = coalesce(:Model,Model),  

    Kleur = coalesce(:Kleur,Kleur), 

    Brandstof = coalesce(:Brandstof,Brandstof), 

    Transmissie = coalesce(:Transmissie,Transmissie), 
	
	GPS = coalesce(:GPS,GPS), 
	
	Bouwjaar = coalesce(:Bouwjaar,Bouwjaar), 
	
	Vermogen = coalesce(:Vermogen,Vermogen)

    WHERE id = {}

   '''''''''''''''.format(id)

    # Insert the user into the database

    data = {

        "Naam": args["Naam"] if "Naam" in args else None,
        "Model": args["Model"] if "Model" in args else None,
        "Transmissie": args["Transmissie"] if "Transmissie" in args else None,
        "Brandstof": args["Brandstof"] if "Brandstof" in args else None,
        "Kleur": args["Kleur"] if "Kleur" in args else None,
        "GPS": args["GPS"] if "GPS" in args else None,
        "Bouwjaar": args["Bouwjaar"] if "Bouwjaar" in args else None,
        "Vermogen": args["Vermogen"] if "Vermogen" in args else None,

    }

    DB.update(qry, data)

    # Return a message and the user id

    return{'message': 'success', 'id': id}, 200

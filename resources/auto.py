from database.autodb import DB
from flask import request
from ast import arg

from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    get_jwt_identity
)


def delete_auto(id):
    args = request.get_json()
    qry = ("DELETE FROM auto WHERE id=?", (id,))
    id = DB.delete(qry, id, args)
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


def update_auto(id):

    args = request.get_json()

    # Make the insert query with parameters
    qry = '''''''''''''''
 	UPDATE auto SET 

    Naam = coalesce(?,Naam),  

    Model = coalesce(?,Model),  

    Kleur = coalesce(?,Kleur), 

    Brandstof = coalesce(?,Brandstof), 

    Transmissie = coalesce(?,Transmissie), 
	
	GPS = coalesce(?,GPS), 
	
	Bouwjaar = coalesce(?,Bouwjaar), 
	
	Vermogen = coalesce(?,Vermogen)

    WHERE id = ? 

   '''''''''''''''

    # Insert the user into the database

    id = DB.update(id, qry, args)

    # Return a message and the user id

    return{'message': 'success', 'id': id}, 201

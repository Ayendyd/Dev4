
from flask import request
from ast import arg
from database.autodb import DB
from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    get_jwt_identity
)


@jwt_required()
def create_auto():

    # Parse all arguments for validity

    args = request.get_json()

    # Make the insert query with parameters
    qry = '''''''''''''''
 INSERT INTO

       `auto`
           (`Naam`, `Model`, `Kleur`, `Brandstof`, `Transmissie`, `GPS`, `Bouwjaar`, `Vermogen`, `Categorie_id`)

      VALUES
      
           (:Naam, :Model, :Kleur, :Brandstof, :Transmissie, :GPS, :Bouwjaar, :Vermogen, :Categorie_id)

   '''''''''''''''

    # Insert the user into the database

    id = DB.insert(qry, args)

    # Return a message and the user id

    return{'message': 'success', 'id': id}, 201


def update_auto(id):

    args = request.get_json()

    # Make the insert query with parameters
    qry = '''''''''''''''
 UPDATE 

       `auto`
set

           (`Naam`, `Model`, `Kleur`, `Brandstof`, `Transmissie`, `GPS`, `Bouwjaar`, `Vermogen`, `Categorie_id`)

      VALUES
      
           (:Naam, :Model, :Kleur, :Brandstof, :Transmissie, :GPS, :Bouwjaar, :Vermogen, Categorie_id)

   '''''''''''''''

    # Insert the user into the database

    id = DB.insert(qry, args)

    # Return a message and the user id

    return{'message': 'success', 'id': id}, 201

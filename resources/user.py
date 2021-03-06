
from asyncio import constants
from flask import request
from ast import arg
from database.autodb import DB
from flask_bcrypt import generate_password_hash
from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    get_jwt_identity
)


def create_user():

    # Parse all arguments for validity

    args = request.get_json()

    # Make the insert query with parameters
    qry = '''''''''
     INSERT INTO

       `users`
           (`firstname`, `Tussenvoegsel`, `lastname`, `email`, `password`, `Telefoonnummer`, `Straat`, `Postcode`)

      VALUES
      
           (:firstname, :Tussenvoegsel, :lastname, :email, :password, :Telefoonnummer, :Straat, :Postcode)
 
    '''''''''
    # Hash the password before inserting

    args['password'] = generate_password_hash(args['password'])

    # Insert the user into the database

    id = DB.insert(qry, args)

    # Return a message and the user id

    return{'message': 'success', 'id': id}, 201


from flask import request
from ast import arg
from database.autodb import DB
from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    get_jwt_identity
)


@jwt_required()
def create_orders():

    # Parse all arguments for validity

    args = request.get_json()

    # Make the insert query with parameters
    qry = '''''''''''''''
 INSERT INTO

       `orders`
           (`user_id`, `begin_datum`, `eind_datum`, `vrije_kilometers`, `auto_id`, `levering`)

      VALUES
      
           (:user_id, :begin_datum, :eind_datum, :vrije_kilometers, :auto_id, :levering)

   '''''''''''''''

    # Insert the user into the database

    id = DB.insert(qry, args)

    # Return a message and the user id

    return{'message': 'success', 'id': id}, 201

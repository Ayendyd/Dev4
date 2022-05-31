
from flask import request
from ast import arg
from database.autodb import DB
from flask_bcrypt import generate_password_hash


def create_user():

    # Parse all arguments for validity

    args = request.get_json()

    # Make the insert query with parameters
    qry = '''''''''''''''
 INSERT INTO

       `users`
           (`Voornaam`, `Tussenvoegsel`, `Achternaam`, `Email`, `Wachtwoord`, `Telefoonnummer`, `Straat`, `Postcode`, `Huisnummer`, `BSN`, `Creditcard`, `Rijbewijs`)

      VALUES
      
           (:Voornaam, :Tussenvoegsel, :Achternaam, :Email, :Wachtwoord, :Telefoonnummer, :Straat, :Postcode, :Huisnummer, :BSN, :Creditcard, :Rijbewijs)

   '''''''''''''''
    # Hash the password before inserting

    args['Wachtwoord'] = generate_password_hash(args['Wachtwoord'])

    # Insert the user into the database

    id = DB.insert(qry, args)

    # Return a message and the user id

    return{'message': 'success', 'id': id}, 201

from flask import Flask, jsonify  # , request
import sqlite3 as sql


conn = sql.connect('./database/Auto.db')
conn.row_factory = sql.Row

rows = conn.execute("select * from order_lines").fetchall()

[dict(row) for row in rows]

conn.close()

from registro_ig import app, VERSION
from flask import jsonify, render_template,request
from registro_ig.models import *
import sqlite3
from http import HTTPStatus

@app.route("/")
def index():
        return render_template("index.html")

@app.route(f"/api/{VERSION}/all")
def all_movements():
    datos= select_all()

    try:
        return jsonify(
         { 
            "data": datos,
            "status": "OK"
         }
    ),HTTPStatus.OK        
    except sqlite3.Error as e:
        return jsonify(
         { 
            "data": str(e),
            "status": "OK"
         }
    ),HTTPStatus.BAD_REQUEST



@app.route(f"/api/{VERSION}/new", methods=["POST"])
def new():
    registro = request.json
    try:
        insert([registro['date'],[registro['concept'],registro['quantity']]])
        return jsonify(
         { 
            "status": "OK"
         }
    ),HTTPStatus.CREATED        
    except sqlite3.Error as e:
        return jsonify(
         { 
            "data": str(e),
            "status": "OK"
         }
    ),HTTPStatus.NOT_FOUND

@app.route(f"/api/{VERSION}/update/<int:id>", methods=["PUT"])
def update():
    return f"Aqui realizamos una modificacion con el id:{id}"

@app.route(f"/api/{VERSION}/update/<int:id>", methods=["DELETE"])
def remove():
    return f"Aqui eliminamos el registro con el id:{id}"



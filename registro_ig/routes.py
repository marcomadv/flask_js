from registro_ig import app, VERSION
from flask import jsonify, render_template
from registro_ig.models import *

@app.route("/")
def index():
        return render_template("index.html")

@app.route(f"/api/{VERSION}/all")
def all_movements():
    datos= select_all()
    return jsonify(datos)

@app.route(f"/api/{VERSION}/new", methods=["POST"])
def new():
    return "Aqui realizamos un alta"

@app.route(f"/api/{VERSION}/update/<int:id>", methods=["PUT"])
def update():
    return f"Aqui realizamos una modificacion con el id:{id}"

@app.route(f"/api/{VERSION}/update/<int:id>", methods=["DELETE"])
def remove():
    return f"Aqui eliminamos el registro con el id:{id}"



from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

ORIGIN_DATA = 'data/movimientos.sqlite'
VERSION = 'v1.0'

from registro_ig.routes import *
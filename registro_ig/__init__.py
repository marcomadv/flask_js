from flask import Flask

app = Flask(__name__)

ORIGIN_DATA = 'data/movimientos.sqlite'
VERSION = 'v1.0'

from registro_ig.routes import *
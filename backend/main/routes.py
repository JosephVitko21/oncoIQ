from flask import Blueprint
from backend.config import Config


main = Blueprint('main', __name__)


@main.route('/')
def home():
    return main.send_static_file('index.html')

from flask import Blueprint
from backend.config import Config


main = Blueprint('main', __name__, static_folder='../../frontend/build', static_url_path='/')


@main.route('/')
def home():
    return main.send_static_file('shuffle.html')

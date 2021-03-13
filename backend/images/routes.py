from flask_praetorian import auth_required, current_user
from flask import Blueprint, request
from backend import guard, db, bcrypt
from backend.models import User, create_all_model_db
from backend.images.utils import save_picture


images = Blueprint('images', __name__)


@images.route('/api/upload_image', methods=['POST'])
@auth_required
def upload_image():
    if not request.files:
        return 'Error: No image was included with upload'
    else:
        file = request.files['file']
        save_picture(file)
        return 'image saved', 200


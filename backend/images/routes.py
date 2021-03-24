import os

from flask_praetorian import auth_required, current_user
from flask import Blueprint, request
from backend.extensions import guard, db, bcrypt
from backend.models import User, create_all_model_db, Image, SubImage
from backend.images.utils import save_picture, calculate_risk_score, split
from backend.ai import get_modelled_risk_score
from backend import breast_idc_model
import json


images = Blueprint('images', __name__)


@images.route('/api/upload_image', methods=['POST'])
@auth_required
def upload_image():
    print("uploading image")
    if not request.files:
        print("no image")
        return 'Error: No image was included with upload', 400
    else:
        print("request qqq:", request.files['file'])
        try:
            req = request.get_json(force=True)
        except:
            req = {
                "name": 'Unnamed',
                "description": 'none'
            }
        file = request.files['file']
        image_file = str(save_picture(file))
        image = Image(image_file=image_file, name=req.get('name', None), description=req.get('description', None), uploader=current_user())
        image.risk_factor = get_modelled_risk_score(
            os.path.join(os.path.dirname(os.path.dirname(__file__)), 'static/tissue_images', image.image_file),
            breast_idc_model)[0]
        db.session.add(image)
        db.session.commit()
        print("hello world")
        print(image)
        print(Image.query.all())
        sub_images = split(image_file)
        data_to_return = json.dumps({
            "image_file": image_file,
            "overall_risk": image.risk_factor,
            "tiles": str(sub_images)
        })

        return str(data_to_return), 200


@images.route('/api/get_tiles', methods=['POST'])
@auth_required
def get_tiles():
    if current_user is None:
        return "Error: no user currently logged in", 401
    try:
        req = request.get_json(force=True)
    except:
        return 'Error: data cannot be blank', 400

    image_to_get_tiles = req.get('image_file', None)
    im = Image.query.filter_by(image_file=image_to_get_tiles).first()
    print("Image to get tiles:", im)

    if not im:
        return 'Error: That image does not exist', 404
    if im.uploader.username != current_user().username:
        return 'Error: Cannot get tiles from other user ' + im.uploader.username + ', current user is ' + current_user().username, 401

    sub_images = SubImage.query.filter_by(super_im=im).order_by(SubImage.index.asc())
    tiles = {
        "image_file": im.image_file,
        "name": "Unnamed" if not im.name else im.name,
        "description": "" if not im.description else im.description,
        "risk_level": 0 if not im.risk_factor else im.risk_factor,
        "tiles": []
    }

    for sub_image in sub_images:
        tiles["tiles"].append({
            'file_name': sub_image.image_file,
            'risk_level': sub_image.risk_factor
        })
    return json.dumps(tiles), 200


@images.route('/api/get_user_images', methods=['POST'])
@auth_required
def get_user_images():
    images = Image.query.filter_by(uploader=current_user()).order_by(Image.date_uploaded.desc())
    result = []
    for im in images:
        result.append({
            "image_file": str(im.image_file),
            "name": "Unnamed" if not im.name else im.name,
            "description": "" if not im.description else im.description,
            "date": str(im.date_uploaded)
        })
    return json.dumps(result), 200

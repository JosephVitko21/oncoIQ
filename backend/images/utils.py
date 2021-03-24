import os
import secrets
from flask import url_for, current_app
import PIL.Image as PIL_Image
import requests
from image_slicer import slice
from backend.models import SubImage, Image
from backend.extensions import db
from backend import breast_idc_model
from backend.ai import get_modelled_risk_score


def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = "large.png"
    os.mkdir(os.path.join(current_app.root_path, 'static/tissue_images', random_hex))
    picture_path = os.path.join(current_app.root_path, 'static/tissue_images', random_hex, picture_fn)

    output_size = ([250, 250])
    i = PIL_Image.open(form_picture)
    i = i.resize(output_size)
    i.save(picture_path)

    return random_hex


def calculate_risk_score(file_name):
    url = "https://api.clarifai.com/v2/models/idcpathology/outputs"
    image_url = "http://oncoiq-backend.herokuapp.com/static/tissue_images/" + file_name
    payload = '{"inputs": [{"data": {"image": {"url": "' + image_url + '"}}}]}'
    headers = {
        'Authorization': 'Key 38cfda9257b64c6ca0d93e2682018598',
        'Content-Type': 'application/json'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    risk = float(response.json().get("outputs")[0]['data']['concepts'][0]['value'])
    if response.json().get("outputs")[0]['data']['concepts'][0]['id'] == 'negative':
        risk = 1 - risk
    return risk


def split(super_image_file):
    picture_path = os.path.join(current_app.root_path, 'static/tissue_images', super_image_file, 'large.png')
    tiles = slice(picture_path, col=5, row=5)
    risk_scores = get_modelled_risk_score(os.path.join(current_app.root_path, 'static/tissue_images', super_image_file), breast_idc_model)
    image_files = []
    index = 0
    while index < len(tiles):
        image_file = str(tiles[index]).split(' - ')[1][:-1]
        image_files.append(image_file)
        risk = risk_scores[index + 1]
        super_image = Image.query.filter_by(image_file=super_image_file).first()
        subImage = SubImage(image_file=image_file, risk_factor=risk, super_im=super_image, index=index)
        db.session.add(subImage)
        index += 1
    db.session.commit()
    return image_files

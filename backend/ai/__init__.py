from fastai.vision import *
from backend.ai.utils import download_file_from_google_drive
import os
from os.path import dirname
from pathlib import Path


def download_models():
    paths = ["models/breast-idc-model-1"]

    # breast cancer IDC
    model_path = os.path.join(dirname(dirname(__file__)), paths[0] + ".pth")
    if os.path.exists(model_path):
        print("model ", paths[0], "already exists")
    else:
        download_file_from_google_drive("1D51jhAm4Rub6h3oLrBvpoOWV7V84PE-a", paths[0] + ".pth")

    return paths


def initialize_model(model_path):
    # modelPath should be absolute
    model_path = os.path.join(dirname(dirname(__file__)), model_path)
    dummy_images_path = os.path.join(dirname(dirname(__file__)), 'static/dummy_images')
    print(dummy_images_path)

    # setting up path for training data
    pattern = r'([^/_]+).png$'
    fnames = get_files(dummy_images_path, recurse=True)
    tfms = get_transforms(flip_vert=True, max_warp=0., max_zoom=0., max_rotate=0.)

    # Data loading for training
    print("loading data")
    data = ImageDataBunch.from_name_re(dummy_images_path, fnames, pattern, ds_tfms=tfms, size=50, bs=1).normalize()

    learn = cnn_learner(data, models.resnet18, metrics=accuracy)
    learn.load(model_path)
    return learn


def get_modelled_risk_score(images_path, model):
    print("getting risk:", images_path)
    # images path should be a path to a directory in which images to score are located
    risk_scores = []
    images_path = Path(images_path)
    for f in images_path.iterdir():
        print(f)
        pred_class, _, outputs = model.predict(open_image(f))
        risk_scores.append(float(outputs[1]))
    print(risk_scores)
    return risk_scores

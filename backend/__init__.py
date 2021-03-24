from flask import Flask
from backend.config import Config
from backend.extensions import db, bcrypt, login_manager, mail, guard, rest_api, cors
from backend.models import User, Image, SubImage
from os.path import dirname, join


def create_app(config_class=Config):
    # create app
    app = Flask(__name__)
    app.config.from_object(config_class)

    # initialize app with extension objects
    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)
    guard.init_app(app, User)
    cors.init_app(app)

    # import blueprints
    from backend.main.routes import main
    from backend.users.routes import users
    from backend.images.routes import images

    # register blueprints
    app.register_blueprint(main)
    app.register_blueprint(users)
    app.register_blueprint(images)

    # add api resources
    rest_api.init_app(app)

    # return app
    return app

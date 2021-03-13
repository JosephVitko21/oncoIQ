from flask import Flask
from backend.config import Config
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, current_user
from flask_bcrypt import Bcrypt
from flask_mail import Mail

# create flask extension objects
db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()
login_manager.login_view = 'users.login'
login_manager.login_message_category = 'info'
mail = Mail()
rest_api = Api()


def create_app(config_class=Config):
    # create app
    app = Flask(__name__)
    app.config.from_object(config_class)

    # initialize app with extension objects
    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)

    # import blueprints
    from backend.main.routes import main

    # register blueprints
    app.register_blueprint(main)

    # add api resources
    rest_api.init_app(app)

    # return app
    return app

from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, current_user
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from flask_praetorian import Praetorian
from flask_cors import CORS

# create flask extension objects
db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()
login_manager.login_view = 'users.login'
login_manager.login_message_category = 'info'
mail = Mail()
rest_api = Api()
guard = Praetorian()
cors = CORS()
from datetime import datetime
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from flask import current_app
from backend import db, login_manager
from flask_login import UserMixin


def create_all_model_db():
    db.create_all()


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    # image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    # posts = db.relationship('Post', backref='author', lazy=True)
    images = db.relationship('Image', backref='uploader', lazy=True)

    def get_reset_token(self, expires_sec=1800):
        s = Serializer(current_app.config['SECRET_KEY'], expires_sec)
        return s.dumps({'user_id': self.id}).decode('utf-8')

    @property
    def rolenames(self):
        try:
            return self.roles.split(',')
        except Exception:
            return []

    @staticmethod
    def verify_reset_token(token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token)['user_id']
        except:
            return None
        return User.query.get(user_id)

    @classmethod
    def lookup(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id

    def is_valid(self):
        return self.is_active

    def __repr__(self):
        return f"User(''{self.username}', '{self.email}')"


class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=True)
    description = db.Column(db.Text, nullable=True)
    date_uploaded = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    image_file = db.Column(db.String(20), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    sub_images = db.relationship('SubImage', backref='super_im', lazy=True)
    risk_factor = db.Column(db.Float, nullable=True)

    def __repr__(self):
        return f"Image('{self.id}', '{self.image_file}', '{self.user_id}')"


# represents a portion of an image uploaded
class SubImage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_uploaded = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    image_file = db.Column(db.String(20), nullable=False)
    super_id = db.Column(db.Integer, db.ForeignKey('image.id'), nullable=False)
    risk_factor = db.Column(db.Float, nullable=True)
    index = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"Image('{self.id}', '{self.image_file}', '{self.super_image}')"
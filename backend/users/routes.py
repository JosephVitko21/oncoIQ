from flask_praetorian import auth_required, current_user
from flask import Blueprint, request
from backend import guard, db, bcrypt
from backend.models import User, create_all_model_db


users = Blueprint('users', __name__)


@users.route('/api/login', methods=['POST'])
def login():
    """
    Logs a user in by parsing a POST request containing user credentials and
    issuing a JWT token.
    .. example::
       $ curl http://localhost:5000/api/login -X POST \
         -d '{"username":"Yasoob","password":"strongpassword"}'
    """
    req = request.get_json(force=True)
    username = req.get('username', None)
    password = req.get('password', None)
    user = guard.authenticate(username, password)
    ret = {'access_token': guard.encode_jwt_token(user)}
    return ret, 200


@users.route('/api/register', methods=['POST'])
def register():
    req = request.get_json(force=True)
    email = req.get('email', None)
    username = req.get('username', None)
    password = guard.hash_password(req.get('password', None)).decode('utf-8')

    user = User.query.filter_by(username=username).first()
    if user:
        return 'Username taken. Please choose another one', 400

    user = User.query.filter_by(email=email).first()
    if user:
        return 'Email taken. Please use another one', 400

    user = User(username=username, email=email, password=password)
    db.session.add(user)
    db.session.commit()
    return str(user), 200


@users.route('/api/remove_user', methods=['POST'])
def remove_user():
    req = request.get_json(force=True)
    username = req.get('username', None)

    user = User.query.filter_by(username=username).first()
    if user is None:
        return 'User to remove does not exist', 400
    user.delete()
    db.session.commit()
    return "user has been deleted", 200


@users.route('/api/create_all', methods=['GET'])
def create_all_database():
    create_all_model_db()
    return "Created db", 200


@users.route('/api/refresh', methods=['GET'])
@auth_required
def refresh():
    """
    Refreshes an existing JWT by creating a new one that is a copy of the old
    except that it has a refrehsed access expiration.
    .. example::
       $ curl http://localhost:5000/api/refresh -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    # TODO: Fix this
    print("refresh request")
    old_token = request.headers.get('Authorization').split(' ')[1]
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return ret, 200


@users.route('/api/protected')
@auth_required
def protected():
    """
    A protected endpoint. The auth_required decorator will require a header
    containing a valid JWT
    .. example::
       $ curl http://localhost:5000/api/protected -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    print("current user:", str(current_user()))
    return f'protected endpoint (allowed user {current_user().username})'

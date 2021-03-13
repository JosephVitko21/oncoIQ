from flask import url_for, current_app
from flask_mail import Message
from backend import mail


def send_reset_email(user):
    token = user.get_reset_token()
    msg = Message('Password Reset Request', sender='noreply@alualgae.com', recipients=[user.email])
    msg.body = f'''To Reset your password, visit the following link:
{url_for('users.reset_token', token=token, _external=True)}

If you did not make this request then ignore this email and no changes will be made.
'''
    mail.send(msg)

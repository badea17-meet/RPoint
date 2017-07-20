from flask import Flask, url_for, flash, render_template, redirect, request, g, send_from_directory
from flask import session as login_session
from werkzeug.utils import secure_filename
import locale, os
from datetime import datetime

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.secret_key = "MY_SUPER_SECRET_KEY"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER




def allowed_file(filename):
	return '.' in filename and \
		   filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# App routes and website backend here


@app.route("/")
def Index():
	return render_template("homepage.html")

@app.route("/GoogleMaps/<string:types>")
def googlemap(types):
	return render_template("rpoint.html", types = types)

@app.route("/results/<int:id>")
def Results(id):
	return render_template("Results.html")


if __name__ == '__main__':
    app.run(debug=True)


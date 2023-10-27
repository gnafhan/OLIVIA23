from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from lib.connect import connect_to_mongodb, close_mongodb_connection
from api.model.nlp.nlp_api import nlp_api_bp
from middleware.secret_key import check_api_key
from api.model.regression.regression_api import regression_api_bp

app = Flask(__name__)
db = connect_to_mongodb()
load_dotenv()
CORS(app)

app.before_request(check_api_key)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.errorhandler(404)
def not_found(e):
    return {
        "status":404,
        "message":"Not Found"
    }, 404

@app.errorhandler(500)
def server_error(e):
    return {
        "status":500,
        "message":"Server Error"
    }, 500

app.register_blueprint(nlp_api_bp, url_prefix='/api/model/nlp')
app.register_blueprint(regression_api_bp, url_prefix='/api/model/regression')


@app.teardown_appcontext
def close_db_connection(exception=None):
    close_mongodb_connection(db)


if __name__ == '__main__':
    app.run()
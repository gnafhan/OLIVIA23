from flask import request, jsonify
import os

secret_api_key = os.getenv("SECRET_KEY")

def check_api_key():
    api_key = request.headers.get('secret')
    if api_key != secret_api_key:
        return jsonify({
            "status":{
                "code": 401,
                "message": "Unauthorized"
            },
            "data":[]
            }), 401
import json
import time
import os
from bson import json_util
from flask import Blueprint, request, jsonify
from api.model.regression.prediction.predict import regression

regression_api_bp = Blueprint('regression_api', __name__)

@regression_api_bp.route('/', methods=['POST'])
def analyze():
    luas_panen = float(request.json.get('luas_panen'))
    luas_sawah = float(request.json.get('luas_sawah'))
    suhu = float(request.json.get('suhu'))
    curah_hujan = float(request.json.get('curah_hujan'))

    result = regression(luas_panen, luas_sawah, suhu, curah_hujan)

    return {
        "status": 200,
        "message": "OK",
        "data": result
    }, 200

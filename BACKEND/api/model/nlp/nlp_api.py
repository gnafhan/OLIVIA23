import json
import time
import os
from bson import json_util
from flask import Blueprint, request, jsonify
from api.model.nlp.youtube.fetch_youtube import search_videos_by_keyword, get_video_details, get_video_comments
from api.model.nlp.predcition.predict import nlp_sentiment
from lib.connect import close_mongodb_connection, connect_to_mongodb

nlp_api_bp = Blueprint('nlp_api', __name__)

db = connect_to_mongodb()
@nlp_api_bp.route('/', methods=['POST'])
def analyze():
    # Get the keyword from the request body
    keyword = request.json.get('keyword')

    keyword = keyword.lower()

    # Get the API key from the request header
    api_key = os.getenv("API-KEY")

    # Get the videos from the YouTube API
    videos = search_videos_by_keyword(api_key, keyword)

    
    return {
        "status": 200,
        "message": "OK",
        "data": videos
    }, 200

@nlp_api_bp.route('/detail', methods = ['GET'], defaults={'id': None})
@nlp_api_bp.route('/detail/<string:id>', methods = ['GET'])
def get_video(id):
    # Get the API key from the request header
    api_key = os.getenv("API-KEY")
    isExist = False

    if not id:
        try:
            collection = db["nlp_predictions"]
            data = collection.find()
            if data:
                return jsonify({
                    "status": 200,
                    "message": "OK",
                    "data": json.loads(json_util.dumps(data))
                }), 200
        except Exception as e :
            close_mongodb_connection(db)
            return f"Terjadi kesalahan saat mengambil data : {e}", 500
    # If video id already exists in db, return the data
    try:
        collection = db["nlp_predictions"]
        data = collection.find_one({"id": id})
        if data:
            isExist = True
            return jsonify({
                "status": 200,
                "message": "OK",
                "data": json.loads(json_util.dumps(data))
            }), 200
    except Exception as e :
        close_mongodb_connection(db)
        return f"Terjadi kesalahan saat mengambil data : {e}", 500
        
    # If video id not exists in db, get the data from YouTube API
    if not isExist:
        # Get the video from the YouTube API
        video = get_video_details(api_key, id)

        # Get model from query parameter
        model = request.args.get('model')

        # Set status video to pending
        video["status"] = "pending"

        # Set expected time to complete
        if model == "speed":
            video["expectedTime"] = (0.05 * int(video["commentCount"]) +1)
        elif model == "accuracy":
            video["expectedTime"] = (1.362 * int(video["commentCount"]) +1)

        # Get the comments from the YouTube API
        comments = get_video_comments(api_key, id)
        
        # Save video detail to db
        try:
            collection = db["nlp_predictions"]
            collection.insert_one(json.loads(json_util.dumps(video)))
        except Exception as e :
            close_mongodb_connection(db)
            return f"Terjadi kesalahan saat mengambil data : {e}", 500

        # Predict the sentiment of the comments
        for comment in comments:
            comment["sentiment"] = nlp_sentiment(model, comment['text'])

        # Update video status to completed
        try:
            collection = db["nlp_predictions"]
            collection.update_one({"id": video["id"]}, {"$set": {"status": "completed", "completedAt": time.time()}})
            print("Video status updated to db")
        except Exception as e :
            close_mongodb_connection(db)
            return f"Terjadi kesalahan saat mengambil data : {e}", 500
        
        # Update video comments to db
        try:
            collection = db["nlp_predictions"]
            collection.update_one({"id": video["id"]}, {"$set": {"comments": comments}})
            print("Video comments updated to db")
        except Exception as e :
            close_mongodb_connection(db)
            return f"Terjadi kesalahan saat mengambil data : {e}", 500
        

        return {
            "status": 200,
            "message": "OK",
            "data": {
                "video": video,
                "comments": comments
            }
        }, 200
    
@nlp_api_bp.route('/detail/<string:id>', methods = ['PUT'])
def updatePredict(id):
    if not id:
        return {
            "status": 400,
            "message": "Bad Request"
        }, 400
    # Get the API key from the request header
    api_key = os.getenv("API-KEY")

    # Get model from query parameter
    model = request.args.get('model')

    # Get the comments from the YouTube API
    comments = get_video_comments(api_key, id)

    # Get the video detail from database
    try:
        collection = db["nlp_predictions"]
        data = collection.find_one({"id": id})
        if data:
            video = data
        else:
            return {
                "status": 404,
                "message": "Not Found"
            }, 404
    except Exception as e :
        close_mongodb_connection(db)
        return f"Terjadi kesalahan saat mengambil data : {e}", 500
    
    # if completed time less than 1 day, return the data
    if (time.time() - video["completedAt"]) < 86400:
        return jsonify({
            "status": 400,
            "message": "Cannot update the data less than 1 day",
        }), 400
    
    # Set expected time to complete to database
    if model == "speed":
        video["expectedTime"] = (0.05 * int(video["commentCount"]) +1)
    elif model == "accuracy":
        video["expectedTime"] = (1.362 * int(video["commentCount"]) +1)

    # Update expected time to complete to db
    try:
        collection = db["nlp_predictions"]
        collection.update_one({"id": id}, {"$set": {"expectedTime": video["expectedTime"]}})
        print("Video expected time updated to db")
    except Exception as e :
        close_mongodb_connection(db)
        return f"Terjadi kesalahan saat mengambil data : {e}", 500
    

    # Update video status to pending
    try:
        collection = db["nlp_predictions"]
        collection.update_one({"id": id}, {"$set": {"status": "pending"}})
        print("Video status updated to db")
    except Exception as e :
        close_mongodb_connection(db)
        return f"Terjadi kesalahan saat mengambil data : {e}", 500
    
    # Predict the sentiment of the comments
    for comment in comments:
        comment["sentiment"] = nlp_sentiment(model, comment['text'])

    # Update video status to completed
    try:
        collection = db["nlp_predictions"]
        collection.update_one({"id": id}, {"$set": {"status": "completed", "completedAt": time.time()}})
        print("Video status updated to db")
    except Exception as e :
        close_mongodb_connection(db)
        return f"Terjadi kesalahan saat mengambil data : {e}", 500
    
    # Update video comments to db
    try:
        collection = db["nlp_predictions"]
        collection.update_one({"id": id}, {"$set": {"comments": comments}})
        print("Video comments updated to db")
    except Exception as e :
        close_mongodb_connection(db)
        return f"Terjadi kesalahan saat mengambil data : {e}", 500
    
    return {
        "status": 200,
        "message": "OK",
        "data": {
            "comments": comments
        }
    }, 200
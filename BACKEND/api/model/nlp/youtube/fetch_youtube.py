import googleapiclient.discovery
import googleapiclient.errors
import os

def search_videos_by_keyword(api_key, keyword):
    youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=os.getenv("API-KEY"))

    request = youtube.search().list(
        part="id,snippet",
        q=keyword,
        type="video",
        maxResults=30,
        order="relevance"
    )
    response = request.execute()

    videos = []
    for item in response["items"]:
        video = {
            "id": item["id"]["videoId"],
            "title": item["snippet"]["title"],
            "description": item["snippet"]["description"],
            "thumbnail": item["snippet"]["thumbnails"]["default"]["url"],
            "hdThumbnail": item["snippet"]["thumbnails"]["high"]["url"],
            "publishedAt": item["snippet"]["publishedAt"],
            "channelId": item["snippet"]["channelId"],
            "channelTitle": item["snippet"]["channelTitle"],
            "liveBroadcastContent": item["snippet"]["liveBroadcastContent"],
        }
        videos.append(video)

    return videos

def get_video_details(api_key, video_id):
    youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=os.getenv("API-KEY"))

    request = youtube.videos().list(
        part="id,snippet,contentDetails,statistics",
        id=video_id
    )
    response = request.execute()
    video = {
        "id": response["items"][0]["id"],
        "title": response["items"][0]["snippet"]["title"],
        "description": response["items"][0]["snippet"]["description"],
        "thumbnail": response["items"][0]["snippet"]["thumbnails"]["default"]["url"],
        "publishedAt": response["items"][0]["snippet"]["publishedAt"],
        "duration": response["items"][0]["contentDetails"]["duration"],
        "viewCount": response["items"][0]["statistics"]["viewCount"],
        "likeCount": response["items"][0]["statistics"]["likeCount"],
        "commentCount": response["items"][0]["statistics"]["commentCount"]
    }

    return video

def get_video_comments(api_key, video_id):
    youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=os.getenv("API-KEY"))

    request = youtube.commentThreads().list(
        part="id,snippet",
        videoId=video_id,
        maxResults=500
    )
    response = request.execute()

    comments = []
    for item in response["items"]:
        comment = {
            "id": item["id"],
            "author": item["snippet"]["topLevelComment"]["snippet"]["authorDisplayName"],
            "authorChannelId": item["snippet"]["topLevelComment"]["snippet"]["authorChannelId"]["value"],
            "authorChannelUrl": item["snippet"]["topLevelComment"]["snippet"]["authorChannelUrl"],
            "authorProfileImageUrl": item["snippet"]["topLevelComment"]["snippet"]["authorProfileImageUrl"],
            "text": item["snippet"]["topLevelComment"]["snippet"]["textDisplay"],
            "publishedAt": item["snippet"]["topLevelComment"]["snippet"]["publishedAt"],
            "likeCount": item["snippet"]["topLevelComment"]["snippet"]["likeCount"],
            "totalReplyCount": item["snippet"]["totalReplyCount"]
        }
        comments.append(comment)

    return comments

def get_video_transcript(api_key, video_id):
    youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=os.getenv("API-KEY"))

    request = youtube.captions().list(
        part="id,snippet",
        videoId=video_id
    )
    response = request.execute()

    captions = []
    for item in response["items"]:
        caption = {
            "id": item["id"],
            "language": item["snippet"]["language"],
            "name": item["snippet"]["name"],
            "audioTrackType": item["snippet"]["audioTrackType"],
            "isAutoSynced": item["snippet"]["isAutoSynced"],
            "isCC": item["snippet"]["isCC"],
            "isDraft": item["snippet"]["isDraft"],
            "isEasyReader": item["snippet"]["isEasyReader"],
            "isLarge": item["snippet"]["isLarge"],
            "isSimpleText": item["snippet"]["isSimpleText"],
            "isUploaded": item["snippet"]["isUploaded"],
            "lastUpdated": item["snippet"]["lastUpdated"],
            "trackKind": item["snippet"]["trackKind"]
        }
        captions.append(caption)

    return captions

def get_video_transcript_text(api_key, video_id, caption_id):
    youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=os.getenv("API-KEY"))

    request = youtube.captions().download(
        id=caption_id,
        tfmt="vtt"
    )
    response = request.execute()

    return response

def get_video_transcript_text(api_key, video_id, caption_id):
    youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=os.getenv("API-KEY"))

    request = youtube.captions().download(
        id=caption_id,
        tfmt="vtt"
    )
    response = request.execute()

    return response

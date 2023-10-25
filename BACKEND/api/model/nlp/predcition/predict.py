import pickle
# from transformers import pipeline
import requests
import os

def nlp_sentiment(model, comments):
    if model == "speed":
        label_index = {'0': 'negative', '1': 'neutral', '2': 'positive'}

        model_logistic = pickle.load(open('api/model/nlp/predcition/models/lr_pangan.pkl', 'rb'))

        prediction = model_logistic.predict([comments])

        score = model_logistic.predict_proba([comments])

        return {
            "model": "speed",
            "prediction": label_index[str(prediction[0])],
            "score": {
                "negative": score[0][0],
                "neutral": score[0][1],
                "positive": score[0][2]
            }
        }
    

    elif model == "accuracy":
        # pretrained_name = "w11wo/indonesian-roberta-base-sentiment-classifier"

        # model_bert = pipeline(
        #     "sentiment-analysis",
        #     model=pretrained_name,
        #     tokenizer=pretrained_name
        # )

        huggingface_api_token = os.getenv("HUGGING_API")
        headers = {"Authorization": f"Bearer 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"}
        payload = {
            "inputs": comments
        }
        response = requests.post("https://api-inference.huggingface.co/models/w11wo/indonesian-roberta-base-sentiment-classifier", headers=headers, json=payload).json()
        # print(response)

        sublist = response[0]
        label = None
        score_api = 0
        for item in sublist:
            if item["score"] > score_api:
                score_api = item["score"]
                label = item["label"]

        # pred_model_bert = model_bert.predict([comments])

        # print(pred_model_bert)

        # prediction = pred_model_bert[0]["label"]

        # score = pred_model_bert[0]["score"]

        # return {
        #     "model": "accuracy",
        #     "prediction": prediction,
        #     "score": score
        # }
        return {
            "model": "accuracy",
            "prediction": label,
            "score": score_api
        }
    


# nlp_sentiment("accuracy", "jelek sekali barangnya")
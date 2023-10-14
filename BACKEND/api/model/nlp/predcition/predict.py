import pickle
from transformers import pipeline

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
        pretrained_name = "w11wo/indonesian-roberta-base-sentiment-classifier"

        model_bert = pipeline(
            "sentiment-analysis",
            model=pretrained_name,
            tokenizer=pretrained_name
        )

        pred_model_bert = model_bert.predict([comments])

        prediction = pred_model_bert[0]["label"]

        score = pred_model_bert[0]["score"]

        return {
            "model": "accuracy",
            "prediction": prediction,
            "score": score
        }
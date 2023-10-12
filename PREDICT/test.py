import pickle
from transformers import pipeline

pretrained_name = "w11wo/indonesian-roberta-base-sentiment-classifier"

text = "kebijakan ini menyusahkan rakyat"

label_index = {'0': 'negative', '1': 'neutral', '2': 'positive'}

model_logistic = pickle.load(open('lr_pangan.pkl', 'rb'))

pred_model_logistic = model_logistic.predict([text])

pred_model_logistic = label_index[str(pred_model_logistic[0])]

model_bert = pipeline(
    "sentiment-analysis",
    model=pretrained_name,
    tokenizer=pretrained_name
)

pred_model_bert = model_bert.predict([text])

pred_model_bert = pred_model_bert[0]['label']

print("Logistic Regression: ", pred_model_logistic)
print("BERT: ", pred_model_bert)

'''
Citation :
@misc {wilson_wongso_2023,
    author       = { {Wilson Wongso} },
    title        = { indonesian-roberta-base-sentiment-classifier (Revision e402e46) },
    year         = 2023,
    url          = { https://huggingface.co/w11wo/indonesian-roberta-base-sentiment-classifier },
    doi          = { 10.57967/hf/0644 },
    publisher    = { Hugging Face }
}
'''

import pickle
import sklearn
# print(sklearn.__version__)
vectorizer = pickle.load(open('vectorizer.pkl', 'rb'))
model = pickle.load(open('model_nlp_pangan.pkl', 'rb'))

x = vectorizer.transform(['']).toarray()
x = model.predict(x)
print(x)
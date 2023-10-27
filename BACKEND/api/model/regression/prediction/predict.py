import pickle
def regression(luas_panen, luas_sawah, suhu, curah_hujan):
    model = pickle.load(open('api/model/regression/prediction/models/model.pkl', 'rb'))
    prediction = model.predict([[luas_panen, luas_sawah, suhu, curah_hujan]])
    
    return {
        'luas_panen': luas_panen,
        'luas_sawah': luas_sawah,
        'suhu': suhu,
        'curah_hujan': curah_hujan,
        'prediction': prediction[0]
    }

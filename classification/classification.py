from tensorflow.keras.models import load_model

class Classifier:
    def __init__(self):
        model = load_model('./model/base.model2')

    

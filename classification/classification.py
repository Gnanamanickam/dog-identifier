from tensorflow.keras.models import load_model

class Classifier:
    def __init__(self):
        self.model = load_model('./model/base.model2')

    
    def get_model(self):
        return self.model
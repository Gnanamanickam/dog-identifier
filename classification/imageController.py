import flask
import os
import io
from classification import Classifier
from PIL import Image
import base64
import werkzeug
import webbrowser
import cv2
import numpy as np

app = flask.Flask(__name__)
classifier = Classifier()
model = classifier.get_model()
UPLOAD_FOLDER = '/path/to/the/uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
labels = ['Afghan_hound', 'Blenheim_spaniel', 'Chihuahua', 'Japanese_spaniel', 'Maltese_dog', 'Pekinese', 'Tzu', 'basset', 'papillon', 'toy_terrier']


def process_inout_image():
    img = cv2.imread("image.jpg")
    img = cv2.resize(img, (150, 150))
    return np.array(img)/255

def do_prediction(img):
    prediction = model.predict(img.reshape(-1, 150, 150, 3))
    return np.argmax(prediction)

def stringToImage(base64_string):
    imgdata = base64.b64decode(base64_string)
    return Image.open(io.BytesIO(imgdata))

@app.route("/")
def home():
    return "App running"


@app.route('/image', methods = ['POST'])
def handle_request():
    if flask.request.method == 'POST': 
        image = stringToImage(flask.request.form['file'])
        image.save("image.jpg")
        return labels[do_prediction(process_inout_image())]

app.run(host="127.0.0.1", port=5000, debug=True)
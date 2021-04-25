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
UPLOAD_FOLDER = '/path/to/the/uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def process_inout_image(image):
    print(type(image))
    img = cv2.imread(image)
    print(img)
    img = cv2.resize(img, (150, 150))
    return np.array(img)/255

def do_prediction(img):
    prediction = classifier.predict(img.reshape(-1, 150, 150, 3))
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
        # print(image)
        # return do_prediction(process_inout_image(image))

        image.save("image.jpg")
        return "Golden Retreiver"

app.run(host="127.0.0.1", port=5000, debug=True)
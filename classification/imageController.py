import flask
# from PIL import Image
import werkzeug

app = flask.Flask(__name__)

@app.route("/")
def home():
    return "App running"

@app.route('/image', methods = ['POST'])
def handle_request():
    
    image = flask.request.form['file']
    print(image)
    # imagefile = Image.open(image)
    # filename = werkzeug.utils.secure_filename(imagefile.filename)
    # print("\nReceived image File name : " + imagefile.filename)
    # imagefile.save("image.jpg")
    return "Send the dog name here"

app.run(host="127.0.0.1", port=5000, debug=True)
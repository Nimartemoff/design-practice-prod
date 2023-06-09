from flask import Flask
from to_clean_json import data_update

app = Flask(__name__)

@app.route("/")
def data_updater():
    data_update()
    return "<p>Data has been updated</p>"
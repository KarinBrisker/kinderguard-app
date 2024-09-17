from flask import Flask, render_template, request, jsonify
from dotenv import dotenv_values
#from VideoIndexerClient.VI_Client import VideoIndexerService
#from VideoIndexerClient.Consts import Consts
import os
from pprint import pprint

app = Flask(__name__)

# Load configuration from .env file
config = dotenv_values('.env')

# Define constants from the .env file or default values

# Create Video Indexer Client
#client = VideoIndexerService(consts)
# Authenticate
#client.authenticate_async()
#client.get_account_async()

@app.route('/')
def index():
    return {} #render_template('index.html')

@app.route('/run_script')
def widgets():
    return {} #render_template('widgets.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0')

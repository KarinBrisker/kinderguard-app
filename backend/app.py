import threading
import time

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

def background_task(file, video_id, account_id, access_token, location):
    # Simulating a long-running task with a delay
    print("Started background task...")
    print(f"Video ID: {video_id}, Account ID: {account_id}")
    print(f"Location: {location}, Access Token: {access_token}")
    
    time.sleep(10)

    print("Background task completed.")

@app.route('/upload_test', methods=['GET'])
def upload_test():
    # Predefined values for testing
    file = "dummy_file.mp4"  # Simulated file
    video_id = "123456"
    account_id = "account_abc"
    access_token = "token_xyz"
    location = "New York"

    # Start background processing in a thread
    thread = threading.Thread(
        target=background_task,
        args=(file, video_id, account_id, access_token, location)
    )
    thread.start()

    # Respond immediately to the client
    response = {'message': 'Background processing started'}
    return jsonify(response), 202

@app.route('/upload', methods=['POST'])
def upload_file():
    # Get data from the request
    file = request.files.get('file')
    video_id = request.form.get('video_id')
    account_id = request.form.get('account_id')
    access_token = request.form.get('access_token')
    location = request.form.get('location')

    # Immediately return a response to the client
    response = {"status": "Accepted", "message": "File upload started"}
    
    # Validate the request parameters
    if not all([file, video_id, account_id, access_token, location]):
        return jsonify({"error": "Missing required parameters"}), 400

    # Start the background task
    thread = threading.Thread(
        target=background_task, 
        args=(file, video_id, account_id, access_token, location)
    )
    thread.start()
    
    return jsonify(response), 202

@app.route('/')
def index():
    return {} #render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0')

import json
import threading
import time

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from dotenv import dotenv_values
#from VideoIndexerClient.VI_Client import VideoIndexerService
#from VideoIndexerClient.Consts import Consts
import os
from pprint import pprint

from YAMNet import YAMNetAudioClassifier

app = Flask(__name__)

# Enable CORS for all routes and all origins
CORS(app)

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
    
        
    classifier = YAMNetAudioClassifier()
    json_custom_insights = classifier(file)
    patch_index_async(account_id, location, video_id, access_token, json_custom_insights)

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
    print("Upload video request from frontend.")
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

def patch_index_async(account_id: str, location: str, video_id: str, access_token: str, custom_insights: dict, custom_insights_already_exists: bool = False, embedded_path: str =  "/videos/0/insights/customInsights", apiEndpoint: str = 'https://api.videoindexer.ai'):
    """Patch the index with custom insights."""
    
    params = {
        'accessToken': access_token
    }
    
    url = f'{apiEndpoint}/{location}/Accounts/{account_id}/Videos/{video_id}'

    # Prepare the payload
    wrapper = [
        {
            "op": "replace" if custom_insights_already_exists else "add",
            "value": custom_insights,
            "path": embedded_path,
        }
    ]

    # Serialize the payload to JSON
    json_payload = json.dumps(wrapper)
    headers = {'Content-Type': 'application/json'}

    # Send the PATCH request
    response = requests.patch(url, params=params, data=json_payload, headers=headers)
    response.raise_for_status()

    """
    Example for custom insights for sentiment (from audio):
    custom_insights = [
            {
            "name": "yamnet",
            "displayName": "sound labels",
            "displayType": "Capsule",
            "results": [
                {
                    "instances": [
                        {
                            "confidence": 0.9474669098854065,
                            "adjustedStart": "00:00:00",
                            "adjustedEnd": "00:00:01",
                            "start": "00:00:00",
                            "end": "00:00:01"
                        }
                    ],
                    "type": "Cat",
                    "id": 1
                },
                {
                    "instances": [
                        {
                            "confidence": 0.9592831134796143,
                            "adjustedStart": "00:00:01",
                            "adjustedEnd": "00:00:02",
                            "start": "00:00:01",
                            "end": "00:00:02"
                        }
                    ],
                    "type": "Animal",
                    "id": 2
                },
                {
                    "instances": [
                        {
                            "confidence": 0.7056165933609009,
                            "adjustedStart": "00:00:02",
                            "adjustedEnd": "00:00:03",
                            "start": "00:00:02",
                            "end": "00:00:03"
                        }
                    ],
                    "type": "Animal",
                    "id": 3
                },
                {
                    "instances": [
                        {
                            "confidence": 0.7956385016441345,
                            "adjustedStart": "00:00:03",
                            "adjustedEnd": "00:00:04",
                            "start": "00:00:03",
                            "end": "00:00:04"
                        }
                    ],
                    "type": "Animal",
                    "id": 4
                },
                {
                    "instances": [
                        {
                            "confidence": 0.8624411821365356,
                            "adjustedStart": "00:00:04",
                            "adjustedEnd": "00:00:05",
                            "start": "00:00:04",
                            "end": "00:00:05"
                        }
                    ],
                    "type": "Animal",
                    "id": 5
                },
                {
                    "instances": [
                        {
                            "confidence": 0.7540692090988159,
                            "adjustedStart": "00:00:05",
                            "adjustedEnd": "00:00:06",
                            "start": "00:00:05",
                            "end": "00:00:06"
                        }
                    ],
                    "type": "Animal",
                    "id": 6
                },
                {
                    "instances": [
                        {
                            "confidence": 0.29660871624946594,
                            "adjustedStart": "00:00:06",
                            "adjustedEnd": "00:00:07",
                            "start": "00:00:06",
                            "end": "00:00:07"
                        }
                    ],
                    "type": "Animal",
                    "id": 7
                },
                {
                    "instances": [
                        {
                            "confidence": 0.8998731374740601,
                            "adjustedStart": "00:00:07",
                            "adjustedEnd": "00:00:08",
                            "start": "00:00:07",
                            "end": "00:00:08"
                        }
                    ],
                    "type": "Animal",
                    "id": 8
                },
                {
                    "instances": [
                        {
                            "confidence": 0.9692713022232056,
                            "adjustedStart": "00:00:08",
                            "adjustedEnd": "00:00:09",
                            "start": "00:00:08",
                            "end": "00:00:09"
                        }
                    ],
                    "type": "Animal",
                    "id": 9
                }
            ]
        }
        ]

    """

@app.route('/')
def index():
    return {} #render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0')

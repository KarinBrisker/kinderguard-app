import json
import threading
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import dotenv_values
import os
import librosa
from io import BytesIO
import numpy as np
from YAMNet import YAMNetAudioClassifier  # Ensure this module is correctly implemented

app = Flask(__name__)
CORS(app)

# Configure logging with timestamp and log level
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s %(levelname)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

# Load configuration from .env file
config = dotenv_values('.env')


import librosa
import numpy as np
from io import BytesIO

def background_task(file_content, video_id, account_id, access_token, location):
    try:
        app.logger.info("Started background task...")
        app.logger.debug(f"Video ID: {video_id}, Account ID: {account_id}")
        app.logger.debug(f"Location: {location}, Access Token: {access_token}")

        # Load audio using librosa
        waveform, sr = librosa.load(BytesIO(file_content), sr=None, mono=True)

        # Initialize the classifier
        classifier = YAMNetAudioClassifier()

        # Get insights by passing waveform and sample rate
        classifier(waveform, sr)  # This will save insights to JSON

        # Proceed with further processing if needed
        patch_index_async(account_id, location, video_id, access_token, {"main_sound": "Sample"})

        app.logger.info("Background task completed.")
    except Exception as e:
        app.logger.error(f"Error in background_task: {e}")
        

@app.route('/upload', methods=['POST'])
def upload_file():
    app.logger.info("Upload video request from frontend.")

    # Get data from the request
    uploaded_file = request.files.get('file')
    video_id = request.form.get('video_id', "0")
    account_id = request.form.get('account_id')
    access_token = request.form.get('access_token')
    location = request.form.get('location')

    # Log received parameters
    app.logger.debug(f"Received video_id: {video_id}")
    app.logger.debug(f"Received account_id: {account_id}")
    app.logger.debug(f"Received access_token: {access_token}")
    app.logger.debug(f"Received location: {location}")

    # Validate the request parameters
    if not all([uploaded_file, video_id, account_id, access_token, location]):
        app.logger.warning("Missing required parameters in upload request.")
        return jsonify({"error": "Missing required parameters"}), 400
    try:
        # Read file content while the file is still open
        file_content = uploaded_file.read()

        # Start the background task with file content
        thread = threading.Thread(
            target=background_task,
            args=(file_content, video_id, account_id, access_token, location)
        )
        thread.start()

        # Respond immediately to the client
        response = {"status": "Accepted", "message": "File upload started"}
        app.logger.info(f"Started background task for video_id: {video_id}")
        return jsonify(response), 202

    except Exception as e:
        app.logger.error(f"Error during file upload: {e}")
        return jsonify({"error": "Internal server error"}), 500

def patch_index_async(account_id: str, location: str, video_id: str, access_token: str, custom_insights: dict, custom_insights_already_exists: bool = False, embedded_path: str = "/videos/0/insights/customInsights", apiEndpoint: str = 'https://api.videoindexer.ai'):
    """Patch the index with custom insights."""
    import requests  # Ensure requests is imported here

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

    try:
        # Send the PATCH request
        response = requests.patch(url, params=params, data=json_payload, headers=headers)
        response.raise_for_status()
        app.logger.info(f"Successfully patched index for video_id: {video_id}")
    except requests.exceptions.RequestException as e:
        app.logger.error(f"Error patching index for video_id {video_id}: {e}")
        # Optionally, handle retries or other logic here

@app.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Hello from the backend!"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
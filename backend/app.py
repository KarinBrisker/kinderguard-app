import json
import threading
import logging
import time
import requests
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from dotenv import dotenv_values
import os
import librosa
from io import BytesIO
import numpy as np

from config import app  # יבוא במקום מתוך YAMNet
from YAMNet import YAMNetAudioClassifier


# Constants and configurations
UPLOAD_FOLDER = '/uploads'

# Enable CORS for all routes
CORS(app)

# Configure logging with timestamp and log level
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s %(levelname)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

# Load configuration from .env file
config = dotenv_values('.env')


def background_task(file_content_or_path, video_id, account_id, access_token, location, is_file_path=False):
    """Handles background processing of uploaded files."""
    try:
        app.logger.info("Started background task...")
        app.logger.debug(f"Video ID: {video_id}, Account ID: {account_id}, Location: {location}")

        if is_file_path:
            with open(file_content_or_path, 'rb') as file_storage:
                classifier = YAMNetAudioClassifier()
                insights = classifier(file_storage)
        else:
            waveform, sr = librosa.load(BytesIO(file_content_or_path), sr=None, mono=True)
            classifier = YAMNetAudioClassifier()
            insights = classifier(waveform, sr)

        patch_index_async(account_id, location, video_id, access_token, insights)
        app.logger.info("Background task completed.")

        if is_file_path:
            os.remove(file_content_or_path)

    except Exception as e:
        app.logger.error(f"Error in background_task: {e}")


@app.route('/upload', methods=['POST'])
def upload_file():
    """Handles the upload request."""
    app.logger.info("Upload video request from frontend.")
    
    uploaded_file = request.files.get('file')
    video_id = request.form.get('video_id', "0")
    account_id = request.form.get('account_id')
    access_token = request.form.get('access_token')
    location = request.form.get('location')

    if not all([uploaded_file, video_id, account_id, access_token, location]):
        app.logger.warning("Missing required parameters in upload request.")
        return jsonify({"error": "Missing required parameters"}), 400

    try:
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)

        temp_filename = os.path.join(UPLOAD_FOLDER, uploaded_file.filename)
        uploaded_file.save(temp_filename)

        thread = threading.Thread(
            target=background_task,
            args=(temp_filename, video_id, account_id, access_token, location, True)
        )
        thread.start()

        response = {"status": "Accepted", "message": "File upload started"}
        return jsonify(response), 202

    except Exception as e:
        app.logger.error(f"Error during file upload: {e}")
        return jsonify({"error": "Internal server error"}), 500


def patch_index_async(account_id, location, video_id, access_token, custom_insights, custom_insights_already_exists=False, 
                      embedded_path="/videos/0/insights/customInsights", apiEndpoint='https://api.videoindexer.ai'):
    """Patch the video index with custom insights."""
    try:
        url = f'{apiEndpoint}/{location}/Accounts/{account_id}/Videos/{video_id}/Index'
        params = {'accessToken': access_token}

        payload = [
            {
                "op": "replace" if custom_insights_already_exists else "add",
                "value": custom_insights,
                "path": embedded_path,
            }
        ]

        response = requests.patch(url, params=params, json=payload, headers={'Content-Type': 'application/json'})
        response.raise_for_status()
        app.logger.info(f"Successfully patched index for video_id: {video_id}")

    except requests.exceptions.RequestException as e:
        app.logger.error(f"Error patching index for video_id {video_id}: {e}")


@app.route('/')
def index():
    """Default route."""
    return jsonify({"message": "Hello from the backend!"})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
from flask import Flask, render_template, request, jsonify
from dotenv import dotenv_values
from VideoIndexerClient.VI_Client import VideoIndexerService
from VideoIndexerClient.Consts import Consts
import os
from pprint import pprint

app = Flask(__name__)

# Load configuration from .env file
config = dotenv_values("kinderguard/.env")

# Define constants from the .env file or default values
consts = Consts(
    ApiVersion=config.get('ApiVersion', '2024-01-01'),
    ApiEndpoint=config.get('ApiEndpoint', 'https://api.videoindexer.ai'),
    AzureResourceManager=config.get('AzureResourceManager', 'https://management.azure.com'),
    AccountName=config.get('AccountName'),
    ResourceGroup=config.get('ResourceGroup'),
    SubscriptionId=config.get('SubscriptionId'),
    TenantId=config.get('TenantId')
)

# Create Video Indexer Client
client = VideoIndexerService()
# Authenticate
client.authenticate_async()
client.get_account_async()

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/upload-video-file', methods=['POST'])
def upload_video_file():
    if 'videoFile' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['videoFile']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Specify the directory where you want to save the files
    save_directory = '/Users/karin.brisker/kinderguard/kinderguard/resources/save_dir'
    
    # Ensure the directory exists
    if not os.path.exists(save_directory):
        os.makedirs(save_directory)

    # Save the file to the directory
    file_path = os.path.join(save_directory, file.filename)
    file.save(file_path)

    # Process the file as needed
    excluded_ai = request.form.getlist('excludedAI')
    video_id = client.file_upload_async(file_path, excluded_ai=excluded_ai)

    # Process video insights and widgets
    client.wait_for_index_async(video_id)
    insights = client.get_video_async(video_id)
    pprint(insights)
    client.get_insights_widgets_url_async(video_id, widget_type='Keywords')
    client.get_player_widget_url_async(video_id)
    prompt_content = client.get_prompt_content(video_id)
    pprint(prompt_content)
    
    return jsonify({"video_id": video_id, "insights": insights, "prompt_content": prompt_content})

@app.route('/get-insights/<video_id>')
def get_insights(video_id):
    insights = client.get_video_async(video_id)
    return jsonify(insights)

@app.route('/get-widgets/<video_id>')
def get_widgets(video_id):
    insights_url = client.get_insights_widgets_url_async(video_id, widget_type='Keywords')
    player_url = client.get_player_widget_url_async(video_id)
    return jsonify({"insights_url": insights_url, "player_url": player_url})


@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/widgets')
def widgets():
    return render_template('widgets.html')

if __name__ == '__main__':
    app.run(debug=True)


if __name__ == '__main__':
    app.run(debug=True)
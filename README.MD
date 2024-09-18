# KinderGuard

KinderGuard is a web application designed to protect children using advanced audio insights. The application leverages Azure Video Indexer to analyze audio content and provide valuable insights.


### Video Indexer Capabilities

| Capability Name         | Uses                | Decision | Notes                                                    |
|-------------------------|---------------------|---------------------|----------------------------------------------------------|
| Face Detection          | Video               | No                  | 
|**Emotion Detection**       | Text       | **Yes**                 | Can help identify  emotions|
| **Sentiment Analysis**      | Text                | **Yes**                 | Analyzes text sentiment |
| Speaker Identification  | Audio               | No                  | 
| Keyframe Extraction     | Video               | No                 | 
| Visual Text Recognition | Video               | No                  |
| **Audio Transcription**     | Audio               | **Yes**                 | Converts speech to text            |
| Keyword Extraction      | Text                | No                 | 
| Object Detection        | Video               | No                 | 
| Scene Detection         | Video               | No                 |
| Translation             | Text                | No                  |
| Language Identification | Audio, Text         | No                  |
| **Audio Event Detection**   | Audio               | **Yes**                 | Detects specific sounds      |
| Topic Modeling          | Text                | No                 

- Emotions: Anger, Fear, Joy, Sad, None
- Sentiments: Positive, Negative, Neutral
- Speaker Identification: (Sorted indexes - Speaker_1,..., Speaker_n)
- [Audio Event Detection](https://learn.microsoft.com/en-us/azure/azure-video-indexer/audio-effects-detection-insight) - Silence, Crowd Reactions, Silence, Breaking glass, Alarm or siren,
Laughter, Crying, Music playing, Screaming

## Table of Contents  --

- [Project Structure](#project-structure)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Running in Docker](#running-in-docker)
- [Contributing](#contributing)
- [License](#license)

## Project Structure
- [VI](https://www.videoindexer.ai/media/library)

## How to run the app
### Prerequisites
Make sure you have Docker installed on your computer. If Docker is not installed, download and install Docker for your operating system.

### First-Time Setup: Build and Run the Application:
From the root directory of the project, run the following command to build and start the containers for the first time:
- **docker-compose build && docker-compose up**
This will build both the frontend and backend Docker images and start the application.

### Subsequent Usage: Starting and Stopping the Containers:
After the initial setup, you can use the following commands to start and stop the application:
- Start the containers:
- **docker-compose up**
- Stop the containers:
- **docker-compose down**

**Access the Application:**
- The frontend (React app) will be accessible at http://localhost:3000.
- The backend (Python app) will be running on port 5000.

## How to use free Azure credits with this app (microsoft employees only) 
- Follow this guide: [How to get Free Azure Credits - Microsoft Employees Only ](https://www.osgwiki.com/wiki/Azure_Credit)
- Keep your new personal alias written somewhere, let's say `israelisraeli`
- Install powershell for your operating system
- clone the code from github into `kinderguard` folder
- open a powershell terminal 
- cd into `kinderguard`
- run ./setup.ps1
- The script will ask for your alias and domain. 
Make sure to properly enter your alias and your domain. For instance if your personal account is `israelisraeli@outlook.com`, the alias is `israelisraeli` and the domain is `outlook`
- The script will run everything automatically and should open a window where you will login with your personal account
- After the script finishes running, it will provide you with an URL where you can generate an access token for Video Indexer. 
- You can also find the URL in the .env file as so:
```angular2html
GenerateTokenUrl='https://portal.azure.com/#@israelisraelioutlook.onmicrosoft.com/resource/subscriptions/<subscriptionid>/resourceGroups/<resourcegroupname>/providers/Microsoft.VideoIndexer/accounts/<accountname>/management_api_item'
```
- You can also access this via portal.azure.com -> resource groups -> youralias-rg -> viaccountyouralias -> Management -> Management API -> Access Token Generate 


## Contributing

We welcome contributions to KinderGuard! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch to your fork.
4. Create a pull request to the main repository.


## Resources
[Video Indexer Official Website](https://www.videoindexer.ai/)

[Video Indexer API](https://api-portal.videoindexer.ai/api-details#api=Operations&operation=Get-Account-Access-Token)

[How to get Free Azure Credits - Microsoft Employees Only ](https://www.osgwiki.com/wiki/Azure_Credit)

[Azure Video Indexer API Samples](https://github.com/Azure-Samples/azure-video-indexer-samples/tree/master/API-Samples)

[Embed Azure Video Indexer Widgets](https://learn.microsoft.com/en-us/azure/azure-video-indexer/video-indexer-embed-widgets)

## License

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

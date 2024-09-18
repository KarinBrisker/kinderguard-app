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

## Setup
### Prerequisites
Make sure you have Docker installed on your computer. If Docker is not installed, download and install Docker for your operating system.

### Build and Run the Application:
From the root directory of the project, run the following command to build and start the containers:

- **docker-compose build && docker-compose up**

This will build both the frontend and backend Docker images and start the application.

**Access the Application:**
The frontend (React app) will be accessible at http://localhost:3000.
The backend (Python app) will be running on port 5000.

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

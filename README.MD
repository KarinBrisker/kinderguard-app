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
- [Audio Event Detection](https://learn.microsoft.com/en-us/azure/azure-video-indexer/audio-effects-detection-insight) - Silence

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

### Requirements

- Python (3.8+)

### Python Setup

1. Navigate to the [`kinderguard`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkarin.brisker%2Fkinderguard%2Fkinderguard%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2201648d0c-ee00-45d8-bedb-99e8ff75446c%22%5D "/Users/karin.brisker/kinderguard/kinderguard") directory:

    ```bash
    cd kinderguard
    ```

2. Install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```
## Running the Application

### Python API

1. Navigate to the [`kinderguard`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkarin.brisker%2Fkinderguard%2Fkinderguard%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2201648d0c-ee00-45d8-bedb-99e8ff75446c%22%5D "/Users/karin.brisker/kinderguard/kinderguard") directory:

    ```bash
    cd kinderguard
    ```

2. Start the API server:

    ```bash
    python app.py
    ```

## Running in Docker



## Contributing

We welcome contributions to KinderGuard! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch to your fork.
4. Create a pull request to the main repository.

## License

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
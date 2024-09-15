# KinderGuard

KinderGuard is a web application designed to protect children using advanced audio insights. The application leverages Azure Video Indexer to analyze audio content and provide valuable insights.

## Table of Contents

- [Project Structure](#project-structure)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Running in Docker](#running-in-docker)
- [Contributing](#contributing)
- [License](#license)

## Project Structure


## Setup

### Requirements

- Python (3.8+)
- Node.js (14+)
- npm or yarn

### Python Setup

1. Navigate to the [`kinderguard`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkarin.brisker%2Fkinderguard%2Fkinderguard%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2201648d0c-ee00-45d8-bedb-99e8ff75446c%22%5D "/Users/karin.brisker/kinderguard/kinderguard") directory:

    ```bash
    cd kinderguard
    ```

2. Install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

3. Set the `AZURE_COSMOS_CONNECTION_STRING` environment variable to the connection string for your MongoDB/CosmosDB.

### Node.js Setup

1. Navigate to the `kinderguard/src/web` directory:

    ```bash
    cd kinderguard/src/web
    ```

2. Install the required Node.js packages:

    ```bash
    npm install
    ```

## Running the Application

### Python API

1. Navigate to the [`kinderguard`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkarin.brisker%2Fkinderguard%2Fkinderguard%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2201648d0c-ee00-45d8-bedb-99e8ff75446c%22%5D "/Users/karin.brisker/kinderguard/kinderguard") directory:

    ```bash
    cd kinderguard
    ```

2. Start the API server:

    ```bash
    uvicorn app:app --port 3100 --reload
    ```

### Web Application

1. Navigate to the `kinderguard/src/web` directory:

    ```bash
    cd kinderguard/src/web
    ```

2. Start the development server:

    ```bash
    npm run dev
    ```

## Running in Docker

1. Build the Docker image:

    ```bash
    docker build . -t kinderguard
    ```

2. Run the Docker container:

    ```bash
    docker run --env-file ./kinderguard/.env -p 8080:8080 -t kinderguard
    ```

## Contributing

We welcome contributions to KinderGuard! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch to your fork.
4. Create a pull request to the main repository.

## License

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
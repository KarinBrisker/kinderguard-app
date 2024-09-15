import os
import time
from urllib.parse import urlparse
from dotenv import dotenv_values
import requests
from typing import Optional, List

from VideoIndexerClient.Consts import Consts
from VideoIndexerClient.account_token_provider import get_arm_access_token, get_account_access_token_async


def get_file_name_no_extension(file_path: str) -> str:
    """Get the file name without the extension."""
    return os.path.splitext(os.path.basename(file_path))[0]


# Load configuration from .env file
config = dotenv_values("/Users/karin.brisker/kinderguard/kinderguard/.env")

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


class VideoIndexerService:
    def __init__(self) -> None:
        self.arm_access_token = ''
        self.vi_access_token = ''
        self.account = None
        self.consts = consts

    def authenticate_async(self) -> None:
        """Authenticate and obtain access tokens."""
        self.arm_access_token = get_arm_access_token(self.consts)
        self.vi_access_token = get_account_access_token_async(self.consts, self.arm_access_token)

    def get_account_async(self) -> None:
        """Get information about the Video Indexer account."""
        if self.account is not None:
            return self.account

        headers = {
            'Authorization': f'Bearer {self.arm_access_token}',
            'Content-Type': 'application/json'
        }

        url = f'{self.consts.AzureResourceManager}/subscriptions/{self.consts.SubscriptionId}/resourcegroups/' + \
              f'{self.consts.ResourceGroup}/providers/Microsoft.VideoIndexer/accounts/{self.consts.AccountName}' + \
              f'?api-version={self.consts.ApiVersion}'

        response = requests.get(url, headers=headers)
        response.raise_for_status()

        self.account = response.json()
        print(f'[Account Details] Id:{self.account["properties"]["accountId"]}, Location: {self.account["location"]}')

    def upload_url_async(self, video_name: str, video_url: str, excluded_ai: Optional[List[str]] = None,
                         wait_for_index: bool = False, video_description: str = '', privacy: str = 'private') -> str:
        """Upload a video from a URL and start indexing."""
        if excluded_ai is None:
            excluded_ai = []

        # Validate video_url
        parsed_url = urlparse(video_url)
        if not parsed_url.scheme or not parsed_url.netloc:
            raise ValueError(f'Invalid video URL: {video_url}')

        self.get_account_async()

        url = f'{self.consts.ApiEndpoint}/{self.account["location"]}/Accounts/{self.account["properties"]["accountId"]}/Videos'

        params = {
            'accessToken': self.vi_access_token,
            'name': video_name,
            'description': video_description,
            'privacy': privacy,
            'videoUrl': video_url
        }

        if excluded_ai:
            params['excludedAI'] = ','.join(excluded_ai)

        response = requests.post(url, params=params)
        response.raise_for_status()

        video_id = response.json().get('id')
        print(f'Video ID {video_id} was uploaded successfully')

        if wait_for_index:
            self.wait_for_index_async(video_id)

        return video_id

    def file_upload_async(self, media_path: str, video_name: Optional[str] = None, excluded_ai: Optional[List[str]] = None,
                          video_description: str = '', privacy: str = 'private', partition: str = '',
                          language_code: str = 'auto', indexing_preset: str = 'AdvancedAudio') -> str:
        """Upload a local video file and start indexing."""
        if excluded_ai is None:
            excluded_ai = []

        if video_name is None:
            video_name = get_file_name_no_extension(media_path)

        if not os.path.exists(media_path):
            raise FileNotFoundError(f'Could not find the local file {media_path}')

        self.get_account_async()

        url = f'{self.consts.ApiEndpoint}/{self.account["location"]}/Accounts/{self.account["properties"]["accountId"]}/Videos'

        params = {
            'accessToken': self.vi_access_token,
            'name': video_name[:80],  # Ensure video name length is within limits
            'description': video_description,
            'privacy': privacy,
            'partition': partition,
            'language': language_code,
            'indexingPreset': indexing_preset
        }

        if excluded_ai:
            params['excludedAI'] = ','.join(excluded_ai)

        print('Uploading a local file using multipart/form-data post request...')
        with open(media_path, 'rb') as media_file:
            response = requests.post(url, params=params, files={'file': media_file})

        response.raise_for_status()

        video_id = response.json().get('id')
        return video_id

    def wait_for_index_async(self, video_id: str, language: str = 'English', timeout_sec: Optional[int] = None) -> None:
        """Wait until the video indexing is complete."""
        self.get_account_async()

        url = f'{self.consts.ApiEndpoint}/{self.account["location"]}/Accounts/{self.account["properties"]["accountId"]}/' + \
              f'Videos/{video_id}/Index'

        params = {
            'accessToken': self.vi_access_token,
            'language': language
        }

        print(f'Checking if video {video_id} has finished indexing...')
        processing = True
        start_time = time.time()
        while processing:
            response = requests.get(url, params=params)
            response.raise_for_status()

            video_result = response.json()
            video_state = video_result.get('state')

            if video_state == 'Processed':
                processing = False
                print(f'The video index has completed. Here is the full JSON of the index for video ID {video_id}: \n{video_result}')
            elif video_state == 'Failed':
                processing = False
                print(f"The video index failed for video ID {video_id}.")
            else:
                print(f'The video index state is {video_state}')

            if timeout_sec and time.time() - start_time > timeout_sec:
                print(f'Timeout of {timeout_sec} seconds reached. Exiting...')
                break

            time.sleep(10)  # wait 10 seconds before checking again

    def is_video_processed(self, video_id: str) -> bool:
        """Check if the video has been processed."""
        self.get_account_async()

        url = f'{self.consts.ApiEndpoint}/{self.account["location"]}/Accounts/{self.account["properties"]["accountId"]}/' + \
              f'Videos/{video_id}/Index'
        params = {
            'accessToken': self.vi_access_token,
        }

        response = requests.get(url, params=params)
        response.raise_for_status()

        video_state = response.json().get('state')
        return video_state == 'Processed'

    def get_video_async(self, video_id: str) -> dict:
        """Retrieve the video index."""
        self.get_account_async()

        url = f'{self.consts.ApiEndpoint}/{self.account["location"]}/Accounts/{self.account["properties"]["accountId"]}/' + \
              f'Videos/{video_id}/Index'

        params = {
            'accessToken': self.vi_access_token
        }

        response = requests.get(url, params=params)
        response.raise_for_status()

        search_result = response.json()
        print(f'Here are the search results: \n{search_result}')
        return search_result

    def generate_prompt_content_async(self, video_id: str) -> None:
        """Initiate generation of new prompt content for the video."""
        self.get_account_async()

        url = f'{self.consts.ApiEndpoint}/{self.account["location"]}/Accounts/{self.account["properties"]["accountId"]}/' + \
              f'Videos/{video_id}/PromptContent'

        headers = {
            "Content-Type": "application/json"
        }

        params = {
            'accessToken': self.vi_access_token
        }

        response = requests.post(url, headers=headers, params=params)
        response.raise_for_status()
        print(f"Prompt content generation for video ID {video_id} started...")

    def get_prompt_content_async(self, video_id: str, raise_on_not_found: bool = True) -> Optional[dict]:
        """Retrieve the prompt content for the video."""
        self.get_account_async()

        url = f'{self.consts.ApiEndpoint}/{self.account["location"]}/Accounts/{self.account["properties"]["accountId"]}/' + \
              f'Videos/{video_id}/PromptContent'

        headers = {
            "Content-Type": "application/json"
        }

        params = {
            'accessToken': self.vi_access_token
        }

        response = requests.get(url, params=params)
        if not raise_on_not_found and response.status_code == 404:
            return None

        response.raise_for_status()
        return response.json()

    def get_prompt_content(self, video_id: str, timeout_sec: Optional[int] = None,
                           check_already_exists: bool = True) -> Optional[dict]:
        """Wait for the prompt content to be ready and retrieve it."""
        if check_already_exists:
            prompt_content = self.get_prompt_content_async(video_id, raise_on_not_found=False)
        if prompt_content is not None:
            print(f"Prompt content already exists for video ID {video_id}.")
        return prompt_content
    
        self.generate_prompt_content_async(video_id)

        start_time = time.time()
        prompt_content = None
        while prompt_content is None:
            prompt_content = self.get_prompt_content_async(video_id, raise_on_not_found=False)

            if timeout_sec and time.time() - start_time > timeout_sec:
                print(f'Timeout of {timeout_sec} seconds reached. Exiting...')
                break

            print('Prompt content is not ready yet. Waiting 10 seconds before checking again...')
            time.sleep(10)

        return prompt_content

    def get_insights_widgets_url_async(self, video_id: str, widget_type: str, allow_edit: bool = False) -> str:
        """Retrieve the insights widget URL for a video."""
        self.get_account_async()

        video_scope_access_token = get_account_access_token_async(
            self.consts, self.arm_access_token,
            permission_type='Contributor', scope='Video',
            video_id=video_id
        )

        params = {
            'widgetType': widget_type,
            'allowEdit': str(allow_edit).lower(),
            'accessToken': video_scope_access_token
        }

        url = f'{self.consts.ApiEndpoint}/{self.account["location"]}/Accounts/{self.account["properties"]["accountId"]}/' + \
            f'Videos/{video_id}/InsightsWidget'

        response = requests.get(url, params=params)
        response.raise_for_status()

        insights_widget_url = response.url
        print(f'Got the insights widget URL: {insights_widget_url}')
        return insights_widget_url

    def get_player_widget_url_async(self, video_id: str) -> str:
        """Retrieve the player widget URL for a video."""
        self.get_account_async()

        video_scope_access_token = get_account_access_token_async(
            self.consts, self.arm_access_token,
            permission_type='Contributor', scope='Video',
            video_id=video_id
        )

        params = {
            'accessToken': video_scope_access_token
        }

        url = f'{self.consts.ApiEndpoint}/{self.account["location"]}/Accounts/{self.account["properties"]["accountId"]}/' + \
            f'Videos/{video_id}/PlayerWidget'

        response = requests.get(url, params=params)
        response.raise_for_status()

        player_widget_url = response.url
        print(f'Got the player widget URL: {player_widget_url}')
        return player_widget_url
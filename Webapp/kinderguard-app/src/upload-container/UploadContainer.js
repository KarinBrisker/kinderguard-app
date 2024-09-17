import React,  {useState} from 'react';
import { EmbedContainer } from '../EmbedContainer/EmbedContainer';
import './UploadContainer.css';

export function UploadContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [location, setLocation] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file?.type === 'audio/wav') {
      // Handle the file upload logic here
      console.log('File uploaded:', file);
      setIsLoading(true);
      await uploadToVideoIndexer(file);

      // Uploaded
      setIsUploaded(true);
    } else {
      console.log('Please upload a WAV file.');
    }
  };

  const uploadToVideoIndexer = async (file) => {
    const accountId = 'e5c83407-1cab-492f-aae8-80ad44418217';
    const token = '';
    const location = 'trial';

    if (!accountId || !token) {
      console.error('Account ID or token is missing.');
      return;
    }

    // Create a from data from the file
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`https://api.videoindexer.ai/${location}/Accounts/${accountId}/Videos?name=audio_test&privacy=public&indexingPreset=AdvancedAudio`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Upload successful:', data);

      // Get video status and check if it's processed
       await fetchVideoStatus(data.id, accountId, token, location);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  const fetchVideoStatus = async (currentVID, accountId, token, location) => {
    try {
      const response = await fetch(`https://api.videoindexer.ai/${location}/Accounts/${accountId}/Videos/${currentVID}/Index`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Video status:', data);

      if (data?.state === 'Processed') {
        setVideoId(currentVID);
        setAccountId(accountId);
        setLocation(location);
        setIsLoading(false);
      } else {
        // Wait for 10 seconds before checking again
        await new Promise(resolve => setTimeout(resolve, 10000));
        await fetchVideoStatus(currentVID, accountId, token, location);
      }
    } catch (error) {
      console.error('Error fetching video status:', error);
    }
  };


  return (
      <div className="container">
        {isLoading && <div className="loader"></div>}
        {!isUploaded && !isLoading && (
          <input type="file" accept=".wav" onChange={handleFileUpload} />
        )}
        {videoId && <EmbedContainer videoId={videoId} accountId={accountId} location={location}  /> }
      </div>
    );
}

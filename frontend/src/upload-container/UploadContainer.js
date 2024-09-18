import React, { useState } from 'react';
import { EmbedContainer } from '../EmbedContainer/EmbedContainer';
import { MDBFile } from 'mdb-react-ui-kit';
import './UploadContainer.css';

const styles = {
    container: {
        backgroundColor: '#1e1e1e',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    filePicker: {
        width: '500px',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid #333',
        backgroundColor: '#2c2c2c',
        color: '#ffffff',
        fontSize: '1em',
        boxSizing: 'border-box',
        cursor: 'pointer',
    },
    debugInputs: {
        fontSize: '0.5em'
    }
};

export function UploadContainer(props) {
    const { token, accountId, location, videoId, setVideoId } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);

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

        if (!accountId || !token) {
            console.error('Account ID or token is missing.');
            return;
        }

        // Create a from data from the file
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`https://api.videoindexer.ai/${location}/Accounts/${accountId}/Videos?name=${file.name}&privacy=public&indexingPreset=AdvancedAudio`, {
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

    const debugInputs = (
        <div style={styles.debugInputs}>
            <div>Using token {token}</div>
            <div>Using accountId {accountId}</div>
            <div>Location {location}</div>
        </div>
    );

    return (
        <div style={{ padding: '15px' }}>
            {/*{debugInputs}*/}
            {isLoading && <div className="loader"></div>}
            {!isUploaded && !isLoading && (
                <MDBFile  accept=".wav" onChange={handleFileUpload}/>
            )}
            {videoId && <EmbedContainer videoId={videoId} accountId={accountId} location={location}/>}
        </div>
    );
}

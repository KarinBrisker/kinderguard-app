import React from 'react';

export function UploadContainer(props) {
    const { token, accountId, location } = props;
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'audio/wav') {
            // Handle the file upload logic here
            console.log('File uploaded:', file);
            await uploadToVideoIndexer(file);
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
            const response = await fetch(`https://api.videoindexer.ai/${location}/Accounts/${accountId}/Videos?name=audio_test&privacy=public`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    body: formData,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Upload successful:', data);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            // Revoke the Blob URL to free up memory
        }
    }

    return (
        <div>
            <p>Using token {token}</p>
            <p>Using accountId {accountId}</p>
            <p>Location {location}</p>
            <input type="file" accept=".wav" onChange={handleFileUpload}/>
        </div>
    );
}

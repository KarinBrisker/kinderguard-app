import React, { useState } from 'react';
import { ClickableList } from "./ClickableList/ClickableList";

const styles = {
    container: {
        backgroundColor: '#1e1e1e',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    button: {
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

export function VideosFetcher(props) {
    const { token, accountId, location } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [videoIdsList, setVideoIdsList] = useState([]);
    const [videoId, setVideoId] = useState(null);

    const fetchExistingVideos = async (event) => {
        setIsLoading(true)
        console.log('Fetching existing video ids')
        const data = await fetchVideosFromVideoIndexer();
        setVideoIdsList(data);
        setIsFetched(true)
        setIsLoading(false)
    };

    const fetchVideosFromVideoIndexer = async (file) => {
        debugger
        if (!accountId || !token) {
            console.error('Account ID or token is missing.');
            return;
        }

        // Create a from data from the file
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`https://api.videoindexer.ai/${location}/Accounts/${accountId}/Videos/Search`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Fetch successful:', data);
            return data;

            // Get video status and check if it's processed
            // await fetchVideoStatus(data.id, accountId, token, location);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    }


    const videoIdsListElement = videoIdsList?.length > 0 ?
        <ClickableList ids={videoIdsList} onClickItem={setVideoId}/> : null;

    return (
        <div className="container" style={styles.container}>
            {isLoading && <div className="loader"></div>}
            {!isFetched && !isLoading && (
                <button style={styles.button} onClick={fetchExistingVideos}>
                    <span style={styles.icon}>Fetch existing videos</span>
                </button>
            )
            }
            {
                videoIdsList && videoIdsListElement
            }
        </div>
    )
        ;
}

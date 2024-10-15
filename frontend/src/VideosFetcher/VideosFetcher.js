import React, { useState } from 'react';
import { ClickableList } from "./ClickableList/ClickableList";
import {
    MDBBtn,
  } from 'mdb-react-ui-kit';

export function VideosFetcher(props) {
    const { token, accountId, location, setVideoId } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [videosList, setVideosList] = useState([]);

    const fetchExistingVideos = async (event) => {
        setIsLoading(true)
        console.log('Fetching existing video ids')
        const data = await fetchVideosFromVideoIndexer();
        setVideosList(data);
        setIsFetched(true)
        setIsLoading(false)
    };

    const fetchVideosFromVideoIndexer = async (file) => {
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
            return data.results;

            // Get video status and check if it's processed
            // await fetchVideoStatus(data.id, accountId, token, location);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    }


    const videoIdsListElement = videosList?.length > 0 ?
        <ClickableList videos={videosList} onClickItem={setVideoId}/> : null;

    return (
        <div style={{padding: "15px"}}>
            {isLoading && <div className="loader"></div>}
            {!isLoading && (
                <MDBBtn onClick={fetchExistingVideos}> Fetch existing videos </MDBBtn>
            )
            }
            {
                videoIdsListElement
            }
        </div>
    )
        ;
}

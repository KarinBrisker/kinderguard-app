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
        if (file?.type === 'audio/wav' || file?.type === 'audio/mp3' || file?.type === 'video/mp4') {
            // Handle the file upload logic here
            console.log('File uploaded:', file);
            setIsLoading(true);
            await uploadToVideoIndexer(file);

            // Uploaded
            setIsUploaded(true);
        } else {
            console.log('Please upload a WAV/MP4/MP3 file.');
        }
    };

    const uploadToVideoIndexer = async (file) => {

        if (!accountId || !token) {
            console.error('Account ID or token is missing.');
            return;
        }
        // Add a unique timestamp to the file name to avoid conflicts
        const uniqueFileName = `${Date.now()}_${file.name}`;
        // Create a from data from the file
        const formData = new FormData();
        formData.append('file', file);
        let videoId = null;

        try {
            const response = await fetch(`https://api.videoindexer.ai/${location}/Accounts/${accountId}/Videos?name=${uniqueFileName}&privacy=public&indexingPreset=AdvancedAudio&language=he-IL`, {
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

            videoId = data.id;
        } catch (error) {
            console.error('Error uploading file:', error);
        }
       
        
        formData.append('video_id', videoId);
        formData.append('account_id', accountId);
        formData.append('access_token', token);
        formData.append('location', location);

        try {
            // Make the POST request to the backend
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData, // Send the FormData object as the request body
            });

            // Check for HTTP response status
            if (response.ok) {
                const data = await response.json();
                console.log('Response:', data);
            } else {
                console.error('Upload failed:', response.statusText);
            }

            // Get video status and check if it's processed
            await fetchVideoStatus(videoId, accountId, token, location);
        } catch (error) {
            console.error('Error:', error);

            // Get video status and check if it's processed even if failed
            await fetchVideoStatus(videoId, accountId, token, location);
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
                await findBadWords(data);
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

    const findBadWords = async (videoIndex) =>{
        const badWords = ["טיפש",
            "חצוף",
            "חוצפן",
            "חוצפנית",
            "תחטוף",
            "תחטפי",
            "טיפשון",
            "טיפשון",
            "טיפשה",
            "טיפשים",
            "טיפשות",
            "מכוער",
            "מכוערת",
            "מכוערים",
            "מכוערות",
            "שמן",
            "שמנה",
            "בכיין",
            "מעצבן",
            "קרציה",
            "מכוער",
            "אידיוט",
            "זוז",
            "זוזו",
            "תעוף מפה",
            "לא מקבל",
            "לא מקבלת",
            "עונש",
            "די",
            "כוס אמא שלך",
            "כוס אמא",
            "תמות",
            "תמותי",
            "תמותו",
            "תיחנק",
            "תיחנקי",
            "תיחנקו",
            "סתום",
            "סתמי",
            "סתמו",
            "סתומה",
            "סתומות",
            "סתומים",
            "לא תצא",
            "לא תאכל",
            "תעמוד בפינה",
            "תעמדי בפינה",
            "תעמוד בצד",
            "תעמדי בצד",
            "אמא לא תבוא",
            "אבא לא יבוא",
            "חסר ערך",
            "מטומטם",
            "שקרן",
            "פחדן",
            "חסר תועלת",
            "מגעיל",
            "עצלן",
            "עצלנית",
            "עצלנים",
            "עצלניות",
            "חסר ערך",
            "חסרת ערך",
            "חסרי ערך",
            "חסרות ערך",
            "מטומטם",
            "מטומטמת",
            "מטומטמים",
            "מטומטמות",
            "שקרן",
            "שקרנית",
            "שקרנים",
            "שקרניות",
            "פחדן",
            "פחדנית",
            "פחדנים",
            "פחדניות",
            "מגעיל",
            "מגעילה",
            "מגעילים",
            "מגעילות",
            "מרושע",
            "מרושעת",
            "מרושעים ",
            "מרושעות",
            "מפגר ",
            "מפגרת",
            "מפגרים",
            "מפגרות",
            "שב בשקט",
            "שבי בשקט",
            "לא לזוז",
            "אל תזוז",
            "אל תזוזו",
            "אל תזוזי",
            "מכות"
            ];

            const shownWords = [];
            const transcripts = videoIndex?.videos?.[0]?.insights?.transcript || [];

            badWords.forEach((word, index) => {
                const results = transcripts.filter(transcript => transcript?.text.includes(word));
                let instances = [];
                results.forEach(element => {
                    instances = [...instances, ...element.instances];
                });
                if (instances.length) {
                    shownWords.push({
                        "instances": instances,
                        "type": word,
                        "id": index
                    });
                }
            });

            if (shownWords?.length) {
                const fullObj = [
                    {
                        "name": "suspiciousWords",
                        "displayName": "Suspicious Words",
                        "displayType": "Capsule",
                        "results":shownWords
                    }
                ]

                // Update insights
                try {
                    const response = await fetch(`https://api.videoindexer.ai/${location}/Accounts/${accountId}/Videos/${videoIndex.id}/Index?language=he-IL`, {
                        method: 'PATCH',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify([{
                            value: fullObj,
                            "path": "/videos/0/insights/customInsights",
                            "op": "add"
                          }])
                    });
        
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
        
                    const data = await response.json();
                    console.log('Video status:', data);
                } catch (error) {
                    console.error('Error fetching video status:', error);
                }
            }
    }

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
                <MDBFile  accept=".wav,.mp4,.mp3" onChange={handleFileUpload}/>
            )}
            {videoId && <EmbedContainer videoId={videoId} accountId={accountId} location={location}/>}
        </div>
    );
}

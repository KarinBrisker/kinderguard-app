import logo from './kinderguard_logo.png';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css';
import { UploadContainer } from './upload-container/UploadContainer';
import { CredentialsInput } from "./credentials-input/CredentialsInput";
import { useEffect, useState } from "react";
import { Footer } from "./footer/footer";
import { VideosFetcher } from "./VideosFetcher/VideosFetcher";
import React from 'react';

const styles = {
    body: {
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMessage: {
        color: 'red',
        fontSize: '0.9em',
        marginTop: '10px',
    }
};

function App() {
    const [token, setToken] = useState('');
    const [accountId, setAccountId] = useState('');
    const [location, setLocation] = useState('');
    const [videoId, setVideoId] = useState(null);
    const [error, setError] = useState('');  // Error message state

    // Function to validate input fields
    const validateFields = () => {
        if (!token || !accountId || !location) {
            setError("Please fill in all fields."); // Display error message
            return false;
        }
        setError(''); // Clear error message
        return true;
    };

    // Function to handle the upload click
    const handleUploadClick = () => {
        if (validateFields()) {
            // Proceed with the upload if all fields are filled
            setVideoId(null); // Reset video ID if necessary
        }
    };

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = ''; // Standard way to trigger the confirmation dialog
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Welcome to Kinderguard App</h1>
            </header>
            <main style={styles.body}>
                <CredentialsInput 
                    token={token} 
                    onChangeToken={setToken}
                    accountId={accountId} 
                    onChangeAccountId={setAccountId}
                    location={location} 
                    onChangeLocation={setLocation}
                />
                
                {/* Display error message if fields are missing */}
                {error && <p style={styles.errorMessage}>{error}</p>}
                
                {/* Upload and Fetch buttons */}
                <div>
                    <UploadContainer 
                        token={token} 
                        accountId={accountId} 
                        location={location} 
                        videoId={videoId} 
                        setVideoId={setVideoId} 
                        onClick={handleUploadClick} // Trigger validation on click
                    />
                    <strong>OR</strong>
                    <VideosFetcher 
                        token={token} 
                        accountId={accountId} 
                        location={location} 
                        videoId={videoId} 
                        setVideoId={setVideoId} 
                        onClick={handleUploadClick} // Trigger validation on click
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default App;
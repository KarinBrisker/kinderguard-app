import logo from './kinderguard_logo.png';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css';
import { UploadContainer } from './upload-container/UploadContainer';
import { CredentialsInput } from "./credentials-input/CredentialsInput";
import { useEffect, useState } from "react";
import { Disclaimer } from "./disclaimer/disclaimer";
import { VideosFetcher } from "./VideosFetcher/VideosFetcher";
import { Footer } from "./footer/footer";


const styles = {
    body: {
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

function App() {
    const [token, setToken] = useState('');
    const [accountId, setAccountId] = useState('');
    const [location, setLocation] = useState('');
    const [videoId, setVideoId] = useState(null);

    // prevent reload of the page since it will delete all the credentials
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = ''; // Standard way to trigger the confirmation dialog
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Welcome to kinderguard app
                </p>
            </header>
            <body style={styles.body}>
            <div style={styles.container}>
                <div style={{padding: "15px"}}><Disclaimer/></div>
                <br></br>
                <CredentialsInput token={token} onChangeToken={setToken}
                                  accountId={accountId} onChangeAccountId={setAccountId}
                                  location={location} onChangeLocation={setLocation}
                />
                <UploadContainer token={token} accountId={accountId} location={location} videoId={videoId} setVideoId={setVideoId}/>
                <strong>OR</strong>
                <VideosFetcher token={token} accountId={accountId} location={location} videoId={videoId} setVideoId={setVideoId}/>
            </div>
            </body>
            <Footer />
        </div>
    );
}

export default App;

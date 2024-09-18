import logo from './kinderguard_logo.png';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css';
import { UploadContainer } from './upload-container/UploadContainer';
import { CredentialsInput } from "./credentials-input/CredentialsInput";
import { useState } from "react";
import { Disclaimer } from "./disclaimer/disclaimer";
import { VideosFetcher } from "./VideosFetcher/VideosFetcher";

const LOCATION_DEFAULT = 'trial';

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
    const [location, setLocation] = useState(LOCATION_DEFAULT);
    const [videoId, setVideoId] = useState(null);

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
        </div>
    );
}

export default App;

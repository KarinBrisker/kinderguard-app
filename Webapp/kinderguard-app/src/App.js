import logo from './kinderguard_logo.png';
import './App.css';
import { UploadContainer } from './upload-container/UploadContainer';
import { CredentialsInput } from "./credentials-input/CredentialsInput";
import { useState } from "react";

const LOCATION_DEFAULT = 'trial';

function App() {
    const [token, setToken] = useState('');
    const [accountId, setAccountId] = useState('');
    const [location, setLocation] = useState(LOCATION_DEFAULT);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Welcome to kinderguard app
                </p>
            </header>
            <CredentialsInput token={token} onChangeToken={setToken}
                              accountId={accountId} onChangeAccountId={setAccountId}
                              location={location} onChangeLocation={setLocation}
            />
            <UploadContainer token={token} accountId={accountId} location={location}/>
        </div>
    );
}

export default App;

import logo from './kinderguard_logo.png';
import './App.css';
import CredentialsInput from "./credentialsInput/credentialsInput";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to kinderguard app
        </p>
          <CredentialsInput />
      </header>
    </div>
  );
}

export default App;

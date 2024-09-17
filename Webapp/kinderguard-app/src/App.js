import logo from './kinderguard_logo.png';
import './App.css';
import { UploadContainer } from './upload-container/UploadContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to kinderguard app
        </p>
      </header>
      <UploadContainer/>
    </div>
  );
}

export default App;

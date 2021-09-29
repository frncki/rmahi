import "./App.css"
import * as React from 'react';
import AppDataContext from "./context/AppDataContext";
import Header from "./components/Header/Header";
import Attach from "./components/Attach/Attach"
import Upload from "./components/Upload/Upload"
import Download from "./components/Download/Download";
import Messages from "./components/Messages/Messages";
import Reload from "./components/Reload/Reload";

function App() {
  const [files, setFiles] = React.useState([]);
  const [message, setMessage] = React.useState('Tutaj będzie info');
  const [id, setID] = React.useState('');
  const [status, setStatus] = React.useState('attach');

  const initialContext = {
    files: files,
    setFiles: setFiles,
    message: message,
    setMessage: setMessage,
    id: id,
    setID: setID,
    status: status,
    setStatus: setStatus
  }

  const showMessages = () => {
    return status === 'upload' || status === 'download' || status === 'error';
  }

  const showAttach = () => {
    return status === 'attach' || status === 'upload';
  }

  const showUpload = () => {
    return status === 'upload';
  }

  const showDownload = () => {
    return status === 'download';
  }

  const showReload = () => {
    return status === 'error';
  }

  

  return (
    <AppDataContext.Provider value={initialContext}>
      <Header />
      {showMessages() && <Messages />}
      {showAttach() && <Attach />}
      {showUpload() && <Upload />}
      {showDownload() && <Download />}
      {showReload() && <Reload />}
    </AppDataContext.Provider>
  );
}

export default App;

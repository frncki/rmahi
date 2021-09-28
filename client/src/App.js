import "./App.css"
import * as React from 'react';
import AppDataContext from "./context/AppDataContext";
import Header from "./components/Header/Header";
import Attach from "./components/Attach/Attach"
import Upload from "./components/Upload/Upload"
import Download from "./components/Download/Download";

function App() {
  const [files, setFiles] = React.useState([]);
  const [message, setMessage] = React.useState('');
  const [id, setID] = React.useState('');

  const initialContext = {
    files: files,
    setFiles: setFiles,
    message: message,
    setMessage: setMessage,
    id: id,
    setID: setID
  }

  return (
    <AppDataContext.Provider value={initialContext}>
      <Header />
      <Attach />
      <Upload />
      <Download />
    </AppDataContext.Provider>
  );
}

export default App;

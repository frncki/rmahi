import "./App.css"
import * as React from 'react';
import AppDataContext from "./context/AppDataContext";
import Header from "./components/Header/Header";
import Attach from "./components/Attach/Attach"
import Upload from "./components/Upload/Upload"
import Button from "./components/Button/Button"

function App() {
  const [files, setFiles] = React.useState([]);
  const [message, setMessage] = React.useState('');

  const initialContext = {
    files: files,
    setFiles: setFiles,
    message: message,
    setMessage: setMessage
  }

  return (
    <AppDataContext.Provider value={initialContext}>
      <Header />
      <Attach />
      <Upload />
      <Button type="download" />
    </AppDataContext.Provider>
  );
}

export default App;

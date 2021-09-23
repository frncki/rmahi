import "./App.css"
import Header from "./components/Header/Header";
import Button from "./components/Button/Button"
import Base64Upload from "./components/Base64Upload/Base64Upload";

function App() {

  return (
    <div>
      <Header />
      <Button type="upload" />
      <Button type="download" />
      <Base64Upload />
    </div>
  );
}

export default App;

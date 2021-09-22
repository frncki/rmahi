import "./App.css"
import Header from "./components/Header/Header";
import Button from "./components/Button/Button"

function App() {

  return (
    <div>
      <Header />
      <Button type="upload" />
      <Button type="download" />
    </div>
  );
}

export default App;

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import SinglePoke from "./pages/SinglePoke";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<SinglePoke />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

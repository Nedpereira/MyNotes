import "./App.css";
import Header from "./Components/Header";
import ChatIA from "./Pages/Chat-IA";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ChatIA" element={<ChatIA />} />
        <Route path="/Documentacao" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

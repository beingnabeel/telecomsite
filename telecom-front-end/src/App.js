// import logo from "./logo.svg";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import socketConnection from "./utilities/socketConnection";
import MainVideoPage from "./videoComponents/MainVideoPage";

const Home = () => <h1>Hello, Home page</h1>;
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/join-video" Component={MainVideoPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

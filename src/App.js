import { useSelector } from "react-redux";
import "./App.css";
import Login from "./components/Pages/Login";
import NavPage from "./components/Navbar/Navbar";
import Chatbox from "./components/Pages/Chatbox";
import Sidebar from "./components/Pages/Sidebar";
import Inbox from "./components/Pages/Inbox";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SentBox from "./components/Pages/SentBox";
import ViewEmail from "./components/Pages/ViewEmail";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
    <BrowserRouter>
      {isLoggedIn && <NavPage />}
      {isLoggedIn && <Sidebar/>}
      <Routes>
          {!isLoggedIn && <Route path="*" element={<Login />} />}
          {isLoggedIn && <Route path="/inbox" element={<Inbox/>} />}
          {isLoggedIn && <Route path="/inbox/:mailId" element={<ViewEmail/>} />}
          {isLoggedIn && <Route path="/compose" element={<Chatbox/>} />}
          {isLoggedIn && <Route path="/sent" element={<SentBox/>} />}
          {isLoggedIn && <Route path="*" element={<Inbox/>} />}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

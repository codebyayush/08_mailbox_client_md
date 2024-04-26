import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Login from "./components/Pages/Login";
import NavPage from "./components/Navbar/Navbar";
import Chatbox from "./components/Pages/Chatbox";
import Sidebar from "./components/Pages/Sidebar";
import Inbox from "./components/Pages/Inbox";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SentBox from "./components/Pages/SentBox";
import ViewEmail from "./components/Pages/ViewEmail";
import { mailActions } from "./Store";
import { useEffect } from "react";
import useFetchInbox from "./hooks/useFetchInbox";
import useFetchSentbox from "./hooks/useFetchSentbox";


function App() {
  
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  const email = localStorage.getItem("email");
  let userMail = "";
  if(email){
    userMail = email.replace(/[@.]/g, "");
  }
  const inboxURL = `https://mailbox-client-md-default-rtdb.firebaseio.com/chatbox/${userMail}/inbox.json`;
  const sentBoxURL = `https://mailbox-client-md-default-rtdb.firebaseio.com/chatbox/${userMail}/sent.json`;

  useFetchInbox(inboxURL);
  useFetchSentbox(sentBoxURL);

  return (
    <>
      <BrowserRouter>
        {isLoggedIn && <NavPage />}
        {isLoggedIn && <Sidebar />}
        <Routes>
          {!isLoggedIn && <Route path="*" element={<Login />} />}
          {isLoggedIn && <Route path="/inbox" element={<Inbox />} />}
          {isLoggedIn && (
            <Route path="/inbox/:mailId" element={<ViewEmail />} />
          )}
          {isLoggedIn && <Route path="/compose" element={<Chatbox />} />}
          {isLoggedIn && <Route path="/sent" element={<SentBox />} />}
          {isLoggedIn && <Route path="/sent/:mailId" element={<ViewEmail/>}/>}
          {isLoggedIn && <Route path="*" element={<Inbox />} />}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
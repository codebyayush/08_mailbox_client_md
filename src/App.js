import { useSelector } from "react-redux";
import "./App.css";
import Login from "./components/Authentication/Login";
import NavPage from "./components/Navbar/Navbar";
import Chatbox from "./components/Compose/Chatbox";
import Sidebar from "./components/Navbar/Sidebar";
import Inbox from "./components/Inbox/Inbox";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SentBox from "./components/Sentbox/SentBox";
import ViewEmail from "./components/Viewmail/ViewEmail";
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
          {isLoggedIn && <Route path="*" element={<Chatbox />} />}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
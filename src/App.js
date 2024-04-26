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


function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const inbox = useSelector((state) => state.mail.inboxArr);
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  const userMail = email.replace(/[@.]/g, "");

  //fetchInbox & SentBox on app mount
  useEffect(() => {
    const fetchInbox = async () => {
      const url = `https://mailbox-client-md-default-rtdb.firebaseio.com/chatbox/${userMail}/inbox.json`;
      try {
        const resp = await fetch(url);
        const data = await resp.json();
        console.log("inbox ", data);
        let inboxArr = [];

        for (let [key, value] of Object.entries(data)) {
          value.key = key;
          inboxArr.push(value);
        }

        dispatch(mailActions.inboxHandler(inboxArr));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSentBox = async () => {
      const url = `https://mailbox-client-md-default-rtdb.firebaseio.com/chatbox/${userMail}/sent.json`;
      try {
        const resp = await fetch(url);
        const data = await resp.json();
        console.log("sentArr ", data);
        let newArr = [];

        for (let [key, value] of Object.entries(data)) {
          value.key = key;
          newArr.push(value);
        }
        dispatch(mailActions.sentHandler(newArr));
      } catch (error) {
        console.log(error);
      }
    };
    fetchInbox();
    fetchSentBox();
  }, []);

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

import { useSelector } from "react-redux";
import "./App.css";
import Login from "./components/Pages/Login";
import NavPage from "./components/Navbar/Navbar";
import Chatbox from "./components/Pages/Chatbox";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      {!isLoggedIn && <Login />}
      {isLoggedIn && <NavPage />}
      {isLoggedIn && <Chatbox/>}
    </>
  );
}

export default App;

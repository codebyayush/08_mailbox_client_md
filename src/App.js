import { useSelector } from 'react-redux';
import './App.css';
import Login from './components/Pages/Login';
import HomePage from './components/Home/HomePage';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
   <>
    {isLoggedIn && <HomePage/>}
    {!isLoggedIn && <Login/>}
   </>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pages from './Pages/Pages';
import axios from 'axios';
import { ToastContainer, Slide, Bounce, Zoom, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header/Header';
import Layout from './components/layout/Layout';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getLoginStatus, getUserData } from './services/authService';
import { SET_LOGIN, SET_USER } from './redux/features/auth/authSlice';
import { createGlobalStyle } from 'styled-components';


axios.defaults.withCredentials = true;

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;
function App() {
  const dispatch = useDispatch();

  //Get login status on first app mounted
  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      if (status) {
        const user = await getUserData();
        if (user?.profil) {
          dispatch(SET_USER(user));
        }

      }
      dispatch(SET_LOGIN(status));
    }

    loginStatus();
  }, [dispatch])

  return (
    <BrowserRouter>
      <ToastContainer 
      position='top-right'
      autoClose={2000}
      limit={6}
      transition={Bounce}
      closeOnClick={true}
      pauseOnHover={true}

      />
      <Pages />
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import Header from './components/header';
import BottomNav from './components/BottomNav';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adddata, cleardata } from './utils/credentialSlice';
import { useEffect } from 'react';
import { apiFetch, clearToken, getToken } from './utils/api';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    let active = true;
    async function userValidation() {
      try {
        if (getToken()) {
          const data = await apiFetch('/validuser', { auth: true });
          if (!active) return;
          const user = { ...data, validuser: true };
          dispatch(adddata({ user }));
        } else {
          dispatch(cleardata());
        }
      } catch {
        clearToken();
        if (active) dispatch(cleardata());
      }
    }
    userValidation();
    return () => {
      active = false;
    };
  }, [location.pathname, dispatch]);

  return (
    <>
      <Header />
      <Outlet />
      <BottomNav />
    </>
  );
}

export default App;

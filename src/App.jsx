import './App.css'
import Header from './components/header';
import { Outlet , useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adddata, cleardata, fetchdata } from './utils/credentialSlice'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch()
  const location = useLocation();

  useEffect(() => {
    async function userValidation() {
      try {
        console.log('hello');
        const accessToken = localStorage.getItem('key'); // make sure to retrieve the accessToken
        if (accessToken !== "undefined" && accessToken) {
          const response = await fetch("http://localhost:5100/validuser", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `JWT ${accessToken}`
            }
          });
          const data = await response.json();
          if (!data.email) {
            throw new Error(data.message)
          }
          const user = { ...data, validuser: true };
          dispatch(adddata({ user }));
        } else {
          dispatch(cleardata());
        }
      } catch (error) {
        console.error('Error validating user:', error.message);
        localStorage.removeItem('key')
        dispatch(cleardata());
      }
    }
    userValidation()
  },[location.pathname])

  return (
    <>
      <Header />
      <Outlet />
    </>
    // <sidebarstatus.Provider value={{visible : sidebar}}>

    // </sidebarstatus.Provider>
  )
}

export default App

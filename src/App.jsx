import './App.css'
import Header from './components/header';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adddata, cleardata, fetchdata } from './utils/credentialSlice'
import { useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch()

  const accessToken = localStorage.getItem('key');
  async function userValidation(){
    console.log('hello')
    if( accessToken !== "undefined" && accessToken){
      const response = await fetch("http://localhost:5100/validuser",{
        method: "GET",
        headers:{
          "Content-Type":"application/json",
          "Authorization": `JWT ${localStorage.getItem('key')}`
        }
      }).then(data => data.json()).then(user => {
        user.validuser = true;
        dispatch(adddata({user}))
      })  
    }
    else{
      dispatch(cleardata())
    }
  }

  userValidation()


  return (
    <>
      <Header/>
      <Outlet />
    </>
    // <sidebarstatus.Provider value={{visible : sidebar}}>

    // </sidebarstatus.Provider>
  )
}

export default App

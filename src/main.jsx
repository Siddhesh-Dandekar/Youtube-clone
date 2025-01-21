import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Channel from './components/channel.jsx'
import Watchvideo from './components/watchvideo.jsx';
import Body from './components/body.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/signup';
import Login from './components/login.jsx';
import { Provider } from 'react-redux';
import appStore from './utils/configureStore.js';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Body />
      },
      {
        path: '/watch',
        element: <Watchvideo />
      },
      {
        path:'/channel',
        element: <Channel />
      }
    ]
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  }

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={appRouter} ></RouterProvider>
    </Provider>

  </StrictMode>,
)

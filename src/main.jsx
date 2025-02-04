import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import appStore from './utils/configureStore.js';
import { lazy, Suspense } from 'react';
import Loading from './components/loading.jsx';
import Error404 from './components/error404.jsx';

const Body = lazy(() => import('./components/body.jsx'));
const Watchvideo = lazy(() => import('./components/watchvideo.jsx'));
const Channel = lazy(() => import('./components/channel.jsx'));
const Studio = lazy(() => import('./components/studio.jsx'));
const Signup = lazy(() => import('./components/signup.jsx'));
const Login = lazy(() => import('./components/login.jsx'));

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Suspense fallback={<Loading />}><Body /></Suspense>
      },
      {
        path: '/watch/:id',
        element: <Suspense fallback={<Loading />}><Watchvideo /></Suspense>
      },
      {
        path: '/channel/:id',
        element: <Suspense fallback={<Loading />}><Channel /></Suspense>
      }
      ,
      {
        path: '/channel/studio',
        element: <Suspense fallback={<Loading />}><Studio /></Suspense>
      }
    ],
    errorElement : <Error404 />
  },
  {
    path: '/signup',
    element: <Suspense fallback={<Loading />}><Signup /></Suspense>
  },
  {
    path: '/login',
    element: <Suspense fallback={<Loading />}><Login /></Suspense>
  }

])
createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} ></RouterProvider>
  </Provider>
)

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import appStore from './utils/configureStore.js';
import { lazy, Suspense } from 'react';
import Loading from './components/loading.jsx';
import Error404 from './components/error404.jsx';

//Using Lazy Loading Hook For Smoother Experience

const Body = lazy(() => import('./components/body.jsx'));
const Watchvideo = lazy(() => import('./components/watchvideo.jsx'));
const Channel = lazy(() => import('./components/channel.jsx'));
const Studio = lazy(() => import('./components/studio.jsx'));
const Signup = lazy(() => import('./components/signup.jsx'));
const Login = lazy(() => import('./components/login.jsx'));
const LibraryPage = lazy(() => import('./components/LibraryPage.jsx'));
const PasswordReset = lazy(() => import('./components/PasswordReset.jsx'));
const VerifyEmail = lazy(() => import('./components/VerifyEmail.jsx'));
const SimplePage = lazy(() => import('./components/SimplePage.jsx'));


//Creating Router Path
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Suspense fallback={<Loading />}><Body mode="home" /></Suspense>
      },
      {
        path: '/search',
        element: <Suspense fallback={<Loading />}><Body mode="search" /></Suspense>
      },
      {
        path: '/shorts',
        element: <Suspense fallback={<Loading />}><Body mode="shorts" /></Suspense>
      },
      {
        path: '/trending',
        element: <Suspense fallback={<Loading />}><Body mode="trending" /></Suspense>
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
      },
      {
        path: '/subscriptions',
        element: <Suspense fallback={<Loading />}><LibraryPage section="subscriptions" /></Suspense>
      },
      {
        path: '/library/:section',
        element: <Suspense fallback={<Loading />}><LibraryPage /></Suspense>
      },
      {
        path: '/account',
        element: <Suspense fallback={<Loading />}><SimplePage title="Account" description="Profile and account management for this clone." /></Suspense>
      },
      {
        path: '/settings',
        element: <Suspense fallback={<Loading />}><SimplePage title="Settings" description="Settings controls can be added here as the clone grows." /></Suspense>
      },
      {
        path: '/help',
        element: <Suspense fallback={<Loading />}><SimplePage title="Help" description="Find help for signing in, channels, comments, and library features." /></Suspense>
      },
      {
        path: '/feedback',
        element: <Suspense fallback={<Loading />}><SimplePage title="Feedback" description="Feedback collection is ready for a future form or support workflow." /></Suspense>
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
  },
  {
    path: '/password-reset',
    element: <Suspense fallback={<Loading />}><PasswordReset /></Suspense>
  },
  {
    path: '/verify-email',
    element: <Suspense fallback={<Loading />}><VerifyEmail /></Suspense>
  }

])
createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} ></RouterProvider>
  </Provider>
)

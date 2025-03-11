import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import {Home, SignUpPage, Login, PublishVideoPage, DashBoardPage, VideoplayerPage} from './pages/index.js'
import HistoryPage from './pages/HistoryPage.jsx';
import { AuthLayout } from './Components/index.js';


const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authenticationRequired={false}>
            <Home />
          </AuthLayout>
        )
      },
      {
        path: "/sign-up",
        element: (
          (
            <AuthLayout authenticationRequired={false}>
              <SignUpPage />
            </AuthLayout>
          )
        )
      },
      {
        path: "/login",
        element: (
          <AuthLayout authenticationRequired={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/upload-video",
        element: (
          (
            <AuthLayout authenticationRequired={true}>
              <PublishVideoPage />
            </AuthLayout>
          )
        )
      },
      {
        path: "/dashboard",
        element: (
          <AuthLayout authenticationRequired={true}>
            <DashBoardPage />
          </AuthLayout>
        )
      },
      {
        path: "/watch-history",
        element: (
          <AuthLayout authenticationRequired={true}>
            <HistoryPage />
          </AuthLayout>
        )
      },
      {
        path: "/video/:videoId",
        element: (
          <AuthLayout authenticationRequired={false}>
            <VideoplayerPage />
          </AuthLayout>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <RouterProvider router={routes} />
    </Provider>
  </StrictMode>,
)

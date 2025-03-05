import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import {Home, SignUpPage, Login, PublishVideoPage, DashBoardPage} from './pages/index.js'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/sign-up",
        element: <SignUpPage />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/upload-video",
        element: <PublishVideoPage />
      },
      {
        path: "/dashboard",
        element: <DashBoardPage />
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

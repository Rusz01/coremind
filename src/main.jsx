import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";


import Home from './pages/home/Home'
import Login from './pages/login/Login';
import ChatHome from './pages/chatHome/chatHome';
import Profile from './pages/chatHome/profile/Profile';
import AllSettings from './pages/chatHome/allSettings/AllSettings';


const router = createBrowserRouter(
    createRoutesFromElements(
      
      <>
        
        <Route path="/" element={<Home />} />
        <Route path="/auth/:mode" element={<Login />} />
        <Route path="/auth/:mode" element={<Login />} />
        <Route path="/chat/*" element={<ChatHome />}>
          <Route path="profile" element={<Profile />} />
          <Route path="allSettings" element={<AllSettings />} />
        </Route>

      </>
    )
)

createRoot(document.getElementById('root')).render( 
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

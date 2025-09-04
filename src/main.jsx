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


const router = createBrowserRouter(
    createRoutesFromElements(
      
      <>
        
        <Route path="/" element={<Home />} />
        <Route path="/auth/:mode" element={<Login />} />

      </>
    )
)

createRoot(document.getElementById('root')).render( 
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

import React from 'react'
import coreMind_landscape from '/coreMind_landscape.png'
import { useNavigate, NavLink, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();




  const isAuthPage =
  location.pathname.startsWith("/auth/Login") ||
  location.pathname.startsWith("/auth/Register");


  return (
    <div className='flex justify-between items-center'>
      <img 
        src={coreMind_landscape} 
        alt="Coremind Logo" 
        className='w-70 cursor-pointer' 
        onClick={() => navigate("/")} 
      />
      <ul className='flex space-x-8 text-3xl items-center'>
         <li>Docs</li>
         <li>Integrations</li>
          {isAuthPage && (
          <>
           <li>Privacy</li>
          </>
         )}
         <li>Contact Us</li>




         {!isAuthPage && (
           <>

             <li>
               <NavLink 
                 to="/auth/Login" 
                 className='bg-custom-blue rounded-3xl px-7 py-1 cursor-pointer hover:scale-105 transition'
               >
                 Login
               </NavLink>
             </li>
           </>
         )}
      </ul>
    </div>
  )
}

export default Header
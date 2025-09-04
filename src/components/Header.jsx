import React from 'react'
import coreMind_landscape from '/coreMind_landscape.png'
import { useNavigate, Link, NavLink } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <Link className='flex justify-between items-center'>
      <img 
        src={coreMind_landscape} 
        alt="Coremind Logo" 
        className='w-70 cursor-pointer' 
        onClick={() => navigate("/")} 
      />
      <ul className='flex space-x-8 text-3xl items-center'>
         <li>Docs</li>
         <li>Integrations</li>
         <li>
           <NavLink to="/auth/Login">Log In</NavLink>
         </li>
         <li>
           <NavLink to="/auth/Register" className='bg-custom-blue rounded-3xl px-8 py-1 cursor-pointer hover:scale-105 transition'>
             Sign Up
           </NavLink>
         </li>
      </ul>
    </Link>
  )
}

export default Header
import React from 'react'
import coreMind_landscape from '/coreMind_landscape.png'
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

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
         <li 
           onClick={() => navigate("/login", { state: { mode: "Login" } })} 
           className="cursor-pointer hover:underline"
         >
           Log In
         </li>
         <li 
           onClick={() => navigate("/login", { state: { mode: "Register" } })} 
           className='bg-custom-blue rounded-3xl px-8 py-1 cursor-pointer hover:scale-105 transition'
         >
           Sign Up
         </li>
      </ul>
    </div>
  )
}

export default Header
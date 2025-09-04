import React from 'react'
import coreMind_landscape from '/coreMind_landscape.png'

function Header() {
  return (
    <div className='flex justify-between items-center my-8 '>
      <img src={coreMind_landscape} alt="Coremind Logo" className='w-70'/>
      <ul className='flex space-x-8 text-3xl items-center'>
         <li>Docs</li>
         <li>Integrations</li>
         <li>Log In</li>
         <li className='bg-custom-blue rounded-3xl px-8 py-1' >Sign Up</li>
      </ul>
    </div>
  )
}

export default Header
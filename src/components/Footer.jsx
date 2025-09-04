import React from 'react'

function Footer() {
  return (
    <div className='text-center p-10 border-t border-custom-blue bg-secondary-blue w-full text-custom-white mt-15'>
      <ul className='flex gap-5 text-2xl font-semibold items-center justify-center mb-5'>
        <li>About Us</li>
        <li>Privacy</li>
        <li>API Docs</li>
        <li>GitHub</li>
        <li>Contact</li>
      </ul>
      <p>&copy; {new Date().getFullYear()} CoreMind. All rights reserved.</p>
    </div>
  )
}

export default Footer
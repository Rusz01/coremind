import React from 'react'
import FooterPoweredBy from './FooterPoweredBy'

function Footer() {
  return (
    <div className="w-full bg-secondary-blue text-custom-white mt-20 py-16 px-6 relative overflow-hidden border-t border-custom-blue">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-blue-300/10 blur-3xl"></div>

      <div className="relative max-w-screen-xl mx-auto text-center">


        <ul className="flex flex-wrap justify-center items-center gap-10 text-2xl font-medium mb-10">
          {["About Us", "Privacy", "API Docs", "GitHub", "Contact"].map((item, index) => (
            <li
              key={index}
              className="cursor-pointer transition-all duration-300 hover:text-blue-300 relative group"
            >
              {item}
              <span className="absolute left-0 bottom-[-5px] w-0 h-[2px] bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        <div className="w-48 h-[1px] mx-auto bg-blue-300/40 mb-8 backdrop-blur-sm rounded-full"></div>

        <p className="text-md opacity-80 tracking-wide">
          &copy; {new Date().getFullYear()} <span className="font-semibold">CoreMind</span>. All rights reserved.
        </p>
          <FooterPoweredBy />

      </div>
    </div>
  )
}

export default Footer
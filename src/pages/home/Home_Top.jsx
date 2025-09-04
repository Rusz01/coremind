import React from 'react'
import {Border_Card, Key_Element} from '../../components'
import coreMind_landscape from '/coreMind_landscape.png'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { FaSuitcase } from "react-icons/fa";

// ...existing code...
function Home_Top() {
  return (
   <>
    <div className='grid grid-cols-2 gap-6 items-center mt-10 p-5'>
      <div className='pr-10'>
         <h1 className='text-6xl font-medium mb-5'>TURN CONVERSATIONS INTO SMART ACTIONS</h1>
         <p className='mb-5'>AI- powered document management, search and editing across local and cloud platforms.</p>
         <div>
            <button className='bg-custom-blue py-2 px-8 rounded-2xl mr-5'>Sign Up</button>
            <button className='border border-custom-white py-2 px-8 rounded-2xl'>Connect Account</button>
         </div>
      </div>
      <div className="w-140">
         <Border_Card >
            <div className="flex items-center justify-between mt-2">
               <img src={coreMind_landscape} alt="CoreMind Landscape" className='w-35' />
               <RxHamburgerMenu className='w-6 h-6' />
            </div>
            <div className="p-3 flex items-center bg-secondary-blue rounded-xl">
               <IoSearch className='inline-block mr-3 w-6 h-6 text-custom-blue' />
               <p className='text-xl text-white'>Find the date, queries ....</p>
            </div>
            <h2 className='text-lg font-medium text-white my-5'>KEY ELEMENTS</h2>
            <Key_Element icon={FaSuitcase} title="Business Plan" subtitle="Plan your business according" />
            <Key_Element icon={MdEditDocument} title="Project Proposal" subtitle="Plan your business according" />
            <Key_Element icon={HiOutlineBars3BottomLeft} title="Meeting Notes" subtitle="Plan your business according" />
         </Border_Card>
      </div>
    </div> 
   </>
  )
}

export default Home_Top
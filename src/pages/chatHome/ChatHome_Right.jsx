import React from 'react'
import { IoSearch } from "react-icons/io5";
import ChatTextArea from './ChatTextArea';

function ChatHome_Right() {
  return (
    <div>
      <IoSearch className='w-8 h-8 right-10 absolute top-10' />


      <div className="flex flex-col justify-center items-center h-[90vh]">
         <h2 className='text-4xl'>How Can I help with?</h2>
         <div className="w-3/5 mt-10">
            <ChatTextArea />

         </div>
      </div>
   </div>
  )
}

export default ChatHome_Right
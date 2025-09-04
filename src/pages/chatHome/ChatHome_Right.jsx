import React from 'react'
import { IoSearch } from "react-icons/io5";
import ChatTextArea from './ChatTextArea';
import { RxHamburgerMenu } from "react-icons/rx";

function ChatHome_Right({ sidePanel, setSidePanel }) {
return (
  <div className="">
    <div className="flex items-center justify-between pt-8">

      <div>
        {!sidePanel && (
          <RxHamburgerMenu
            className="w-8 h-8 cursor-pointer"
            onClick={() => setSidePanel(true)}
          />
        )}
      </div>


      <IoSearch className="w-8 h-8 cursor-pointer mr-10" />
    </div>

    <div className="flex flex-col justify-center items-center h-[85vh]">
      <h2 className="text-4xl">How Can I help with?</h2>
      <div className="w-3/5 mt-10">
        <ChatTextArea />
      </div>
    </div>
  </div>
);

}

export default ChatHome_Right
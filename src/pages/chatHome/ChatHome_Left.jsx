import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { BsPersonSquare } from "react-icons/bs";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaGoogleDrive } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import { GrOnedrive } from "react-icons/gr";
import { CgMonday } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";

import coreMind_landscape from '/coreMind_landscape.png'


function ChatHome_Left({ setSidePanel, setProfile }) {
    const navigate = useNavigate();
  const location = useLocation();

  // const handleProfileClick = () => {
  //   setProfile(true);

  //   const newPath = `${location.pathname.replace(/\/$/, '')}/profile`;
  //   navigate(newPath);
  // };
  return (
   <div >
      <div className="flex justify-between items-center">
        <RxHamburgerMenu className='w-8 h-8 cursor-pointer' onClick={() => setSidePanel(false)} />

      <div className='flex items-center gap-4'>
        <BsPersonSquare className="w-8 h-8 cursor-pointer" onClick={() => navigate("/chat/profile")} />

      <IoSearch className="w-8 h-8 cursor-pointer" />
      </div>

      </div>

      <div className='mt-8'>
         <h2>Integrations</h2>
         <div className="flex mt-1 gap-3 items-center">
           <IoAddCircleOutline className='w-8 h-8' />
           <div className='flex items-center gap-3'>
            <FaGoogleDrive className='w-6 h-6' />
            <GrOnedrive className='w-6 h-6' />
            <SiNotion className='w-6 h-6' />
            <CgMonday className='w-6 h-6' />
           </div>
         </div>
      </div>

      <div className='mt-8 text-white text-md'>
         <h2 className='text-lg font-semibold text-custom-white'>Chats</h2>
         <p className='py-1 px-2 bg-custom-blue/20 rounded-md'>Smart Bin- Picking Report</p>
         <p className='py-1 px-1'>Chat with the team about the latest updates.</p>
         <p className='py-1 px-1'>Discuss the new features for the upcoming release.</p>
         <p className='py-1 px-1'>Review the feedback from the last meeting.</p>
         <p className='py-1 px-1'>Plan the next steps for the project.</p>

      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <img src={coreMind_landscape} alt="" className='w-65' />
      </div>

    </div>
  )
}

export default ChatHome_Left
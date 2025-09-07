import React, {useState} from 'react'
import { Border_Card } from '../../../components'
import { RxCross2 } from "react-icons/rx";
import { FaGoogle } from "react-icons/fa";
import { FaGoogleDrive } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import { GrOnedrive } from "react-icons/gr";
import { CgMonday } from "react-icons/cg";
import AllSettings from '../allSettings/AllSettings';
import { useNavigate } from 'react-router-dom';

   function Profile() {
      const navigate = useNavigate();

   return (
      <div className='z-100'>

         
         <Border_Card>
            {/* <RxCross2 className='cursor-pointer w-8 h-8' onClick={() => setProfile(false)} /> */}
            <div className='w-150  pt-5 px-30 flex flex-col items-center gap-6 text-xl text-white'>
            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-20 rounded-full' />
            <div className="flex justify-center items-center text-2xl font-semibold">
                  <h2>Rusz Baidhya</h2>
                  <FaGoogle className='w-5 h-5 ml-3' />
               </div>
               <div className='flex flex-col gap-2'>
                  <p className='py-1 px-1'>Email: rusz.baidhya@example.com</p>
                  <p className='py-1 px-1'>Number: 0123456789</p>
               </div>
               <button className='bg-primary-blue text-custom-white underline underline-offset-3 transition mt-5 cursor-pointer' onClick={() => navigate("/chat/allSettings")}>View All Settings</button>
               <div className="flex justify-between w-full items-center">
                  <p>Delete all Chats:</p>
                  <button className='bg-red-500 px-6 py-1 rounded-2xl'>Delete</button>
               </div>
               <div className="flex justify-between w-full items-center">
                  <p>Logout on this device:</p>
                  <button className='bg-red-500 px-6 py-1 rounded-2xl'>Logout</button>
               </div>
               <div className='mt-5'>
                  <p>Integrated Apps:</p>
      
                  <div className='flex items-center gap-3 mt-2'>
                        <FaGoogleDrive className='w-6 h-6' />
                        <GrOnedrive className='w-6 h-6' />
                        <SiNotion className='w-6 h-6' />
                        <CgMonday className='w-6 h-6' />
                  </div>
               </div>
               <p className='mt-5'>&copy; {new Date().getFullYear()} CoreMind. All rights reserved.</p>
            </div>
         </Border_Card>
    

      </div>
   )
   }

   export default Profile
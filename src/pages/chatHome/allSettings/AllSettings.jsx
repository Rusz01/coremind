import React from 'react'
import { Border_Card } from '../../../components'
import { IoMdSettings, IoMdApps } from "react-icons/io";
import { MdOutlineSecurity, MdAccountCircle } from "react-icons/md";
import { FaGoogleDrive } from "react-icons/fa";
import { SiNotion } from "react-icons/si";

function AllSettings() {
  return (
        <div className='z-100'>
          <Border_Card>
            <div className="w-210 h-150 flex">
              <div className="p-5 py-10 w-full flex">
                <div className='border-r border-accent-blue w-1/3 pr-5 py-5'>
                  <h2 className='text-2xl font-semibold mb-5'>Settings</h2>
                  <ul className='space-y-4 text-lg'>
                    <li className='cursor-pointer hover:text-accent-blue transition flex gap-3 items-center px-2'><IoMdSettings /> General</li>
                    <li className='cursor-pointer hover:text-accent-blue transition flex gap-3 items-center bg-custom-blue px-2 rounded-2xl'><IoMdApps /> Connected Apps</li>
                    <li className='cursor-pointer hover:text-accent-blue transition flex gap-3 items-center px-2'><MdOutlineSecurity /> Security</li>
                    <li className='cursor-pointer hover:text-accent-blue transition flex gap-3 items-center px-2'><MdAccountCircle /> Account</li>
                  </ul>
                </div>
                <div className='pl-5 w-2/3 py-5 overflow-y-auto'>
                  <h2 className='text-2xl font-semibold'>Connected Apps</h2>
                  <p className='text-sm text-custom-white'>Check your currently connected apps or link a new app.</p>

                  <hr className='border-custom-white my-3' />

                  <div className='flex items-center mt-5'>
                    <div className='flex items-center gap-3 w-full'>
                      <FaGoogleDrive className='w-11 h-11' />

                      <div>
                        <h2 className='text-lg font-semibold'>Google Drive</h2>
                        <p className='text-sm text-custom-white'>Upload Google Docs, Sheets, Slides and other files.</p>
                      </div>
                    </div>  


                    <div className='flex justify-end items-center'>
                      <button className='bg-red-500 text-white py-1 px-5 rounded-2xl'>Unlink</button>
                    </div>

                  </div>
                  <div className='flex items-center mt-5'>
                    <div className='flex items-center gap-3 w-full'>
                      <SiNotion className='w-11 h-11' />

                      <div>
                        <h2 className='text-lg font-semibold'>Notion</h2>
                        <p className='text-sm text-custom-white'>Upload Google Docs, Sheets, Slides and other files.</p>
                      </div>
                    </div>  


                    <div className='flex justify-end items-center'>
                      <button className='bg-accent-blue text-white py-1 px-7 rounded-2xl'>Link</button>
                    </div>

                  </div>


                </div>
              </div>

            </div>



          </Border_Card>

        </div>
  )
}

export default AllSettings
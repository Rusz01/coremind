import React from 'react'

import { IoIosArrowForward } from "react-icons/io";

function Key_Element({title, subtitle, icon:Icon}) {
  return (
    <div>
      <div className='grid grid-cols-6 gap-4 items-center p-5 mb-3 bg-secondary-blue rounded-2xl text-white'>
         <div className='col-span-5 flex items-center gap-3'>
            <Icon className='w-12 h-12 bg-custom-blue p-2 rounded-lg' />
            <div>
               <h2 className='text-xl font-semibold'>{title}</h2>
               <p className='text-sm text-custom-white'>{subtitle}</p>
            </div>
         </div>
         <IoIosArrowForward className='w-10 h-10 text-custom-white' />
      </div>
    </div>
  )
}

export default Key_Element
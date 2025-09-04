import React from 'react'
import { Border_Light } from '../../components'


function Key_Features({icon:Icon, title, description}) {
  return (
   <div className="w-70">
    <Border_Light>
      <div className="h-40">
      <Icon className='w-14 h-12 bg-custom-blue p-2 rounded-lg mb-4' />
      <h1 className='text-xl font-semibold mb-2'>{title}</h1>
      <p className='text-sm text-custom-white'>{description}</p>
      </div>
   </Border_Light>
   </div>
  )
}

export default Key_Features
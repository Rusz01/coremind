import React from 'react'
import { Border_Light } from '../../components'

function HowItWorks({ icon: Icon, title}) {
  return (
    <div className='w-90'>
      <Border_Light>
         <div className='flex flex-col items-center'>
            <Icon className='w-14 h-12 bg-custom-blue p-2 rounded-lg mb-4' />
            <h1 className='text-xl font-semibold mb-2'>{title}</h1>
         </div>
      </Border_Light>
    </div>
  )
}

export default HowItWorks
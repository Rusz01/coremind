import React from 'react'
import { Border_Light } from '../../components'

function Other_Login({ img, text }) {
  return (
    <div className='mb-8 cursor-pointer hover:scale-105 transition-transform duration-200'>
      <Border_Light className='!p-0 !rounded-xl'>
        <div className="flex gap-3 pl-1">
          <img src={img} alt={`${text} logo`} className='w-6' />
          <p className='text-lg text-white font-medium'>{`Continue with ${text}`}</p>
        </div>
      </Border_Light>

    </div>
  )
}

export default Other_Login
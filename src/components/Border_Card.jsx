import React from 'react'

function Border_Card({children}) {
  return (

    <div className='relative rounded-4xl bg-primary-blue p-10
            before:absolute before:inset-0 before:rounded-4xl before:border-20 before:border-secondary-blue
            after:absolute after:inset-5 after:rounded-xl after:border after:border-custom-white 
            shadow-[10px_10px_30px_5px_rgba(59,130,246,0.5)]'>
      {children}
    </div>

  )
}

export default Border_Card
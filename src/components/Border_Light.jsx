import React from 'react'

function Border_Light({children}) {
  return (
    <div className='bg-secondary-blue border border-custom-blue p-5 rounded-3xl'>
      {children}
    </div>
  )
}

export default Border_Light
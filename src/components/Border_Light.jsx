import React from 'react'

function Border_Light({children, className = ""}) {
  return (
    <div className={`bg-secondary-blue border border-custom-blue p-5 rounded-3xl ${className}`}>
      {children}
    </div>
  )
}

export default Border_Light
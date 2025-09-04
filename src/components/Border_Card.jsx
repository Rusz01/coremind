import React from 'react'

function Border_Card({ children }) {
  return (
    <div
      className='relative rounded-4xl bg-primary-blue p-10
        before:absolute before:inset-0 before:rounded-4xl before:border-[20px] before:border-secondary-blue before:pointer-events-none before:z-0
        after:absolute after:inset-5 after:rounded-xl after:border after:border-custom-white after:pointer-events-none after:z-0
        shadow-[10px_10px_30px_5px_rgba(59,130,246,0.5)]'
    >
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default Border_Card

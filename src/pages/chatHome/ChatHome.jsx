import React from 'react'
import ChatHome_Left from './ChatHome_Left'
import ChatHome_Right from './ChatHome_Right'

function ChatHome() {
  return (
    <div className="flex h-screen">
      {/* Left panel */}
      <div className="w-1/5 bg-secondary-blue p-6 overflow-y-auto relative">
        <div className="bg-primary-blue border border-custom-white px-5 py-8 rounded-xl min-h-full">
          <ChatHome_Left />
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 p-6 overflow-y-auto">
        <ChatHome_Right />
      </div>
    </div>
  )
}

export default ChatHome

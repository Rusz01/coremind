import React from 'react'
import ChatHome_Left from './ChatHome_Left'
import ChatHome_Right from './ChatHome_Right'
import { useState } from 'react'
import Profile from './profile/Profile';
import { SiTruenas } from 'react-icons/si';

function ChatHome() {
   const [sidePanel, setSidePanel] = useState(true);
   const [profile, setProfile] = useState(false);
   return (
<div className="flex h-screen overflow-hidden">
      {/* Left panel with slide transition */}
      <div
        className={`bg-secondary-blue p-6 overflow-y-auto relative transform transition-all duration-300 
        ${sidePanel ? "translate-x-0 w-1/5" : "-translate-x-full w-0"}`}
      >
        <div className={`bg-primary-blue border border-custom-white px-5 py-8 rounded-xl min-h-full 
          ${sidePanel ? "opacity-100" : "opacity-0"}`}>
          <ChatHome_Left setSidePanel={setSidePanel}  setProfile={setProfile} />
        </div>
      </div>

      {profile && (

        <div className="absolute inset-0 z-50 flex justify-center items-center bg-secondary-blue/30 backdrop-blur-[2px]" onClick={() => setProfile(false)}>
            <div onClick={(e) => e.stopPropagation()}>
              <Profile setProfile={setProfile} />
            </div>
        </div>

      )}

      {/* Right panel */}
      <div className="flex-1 p-6 overflow-y-auto" >
        <ChatHome_Right sidePanel={sidePanel} setSidePanel={setSidePanel} />
      </div>
    </div>
  )
}

export default ChatHome

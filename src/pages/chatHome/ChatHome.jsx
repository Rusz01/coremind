import React, { useState } from "react";
import ChatHome_Left from "./ChatHome_Left";
import ChatHome_Right from "./ChatHome_Right";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

function ChatHome() {
  const [sidePanel, setSidePanel] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileClick = () => {
    if (location.key !== "default") navigate(-1);
    else navigate("/chat");
  };

  const isProfileRoute = location.pathname.startsWith("/chat/");

  return (
    <div className="relative flex h-screen overflow-hidden text-white">
      {/* Sidebar */}
      <aside
        className={`
          absolute md:static inset-y-0 left-0 z-30 w-[320px]
          transform transition-transform duration-300
          ${sidePanel ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="h-full p-4 md:p-6">
          <div className="h-full rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
            <div className="h-full p-4 md:p-6">
              <ChatHome_Left setSidePanel={setSidePanel} />
            </div>
          </div>
        </div>
      </aside>

      {/* Tap overlay for mobile when sidebar open */}
      {sidePanel && (
        <div
          className="md:hidden absolute inset-0 z-20 bg-black/40 backdrop-blur-[2px]"
          onClick={() => setSidePanel(false)}
        />
      )}

      {/* Profile modal overlay (more opaque now) */}
      {isProfileRoute && (
        <div
          className="absolute inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-md"
          onClick={handleProfileClick}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Outlet />
          </div>
        </div>
      )}

      {/* Main */}
      <main className="relative z-10 flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-4 md:px-6 py-6">
          <ChatHome_Right sidePanel={sidePanel} setSidePanel={setSidePanel} />
        </div>
      </main>
    </div>
  );
}

export default ChatHome;

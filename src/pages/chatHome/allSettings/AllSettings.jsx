import React, { useMemo } from "react";
import { Border_Card } from "../../../components";
import { IoMdSettings, IoMdApps } from "react-icons/io";
import { MdOutlineSecurity, MdAccountCircle } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function AllSettings() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract tab from URL:
  // /chat/allSettings/general → "general"
  const currentTab = location.pathname.split("/").pop();

  const tabs = useMemo(
    () => [
      { id: "general", label: "General", Icon: IoMdSettings },
      { id: "connectedApps", label: "Connected Apps", Icon: IoMdApps },
      { id: "security", label: "Security", Icon: MdOutlineSecurity },
      { id: "account", label: "Account", Icon: MdAccountCircle },
    ],
    []
  );

  const activeTab = tabs.some((t) => t.id === currentTab)
    ? currentTab
    : "general";

  const handleTabClick = (id) => {
    navigate(`/chat/allSettings/${id}`);
  };

  return (
    <div className="z-100">
      <Border_Card>
        <div className="w-[900px] max-w-full h-[900px] gap-6">
          
          {/* Sidebar */}
          <aside className="rounded-2xl border border-white/10 bg-white/10 p-4 mb-5">
            <h2 className="text-xl font-semibold mb-4 text-center">Settings</h2>

            <nav
              className="flex text-base w-full justify-around"
              role="tablist"
              aria-label="Settings sections"
            >
              {tabs.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  id={`tab-${id}`}
                  type="button"
                  role="tab"
                  aria-selected={id === activeTab}
                  onClick={() => handleTabClick(id)}
                  className={[
                    "flex items-center gap-3 rounded-xl px-5 py-2 transition border",
                    id === activeTab
                      ? "bg-accent-blue/20 text-white border-accent-blue/40"
                      : "text-white/80 hover:text-white hover:bg-white/10 border-white/10",
                  ].join(" ")}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content rendered by nested route */}
          <section
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="rounded-2xl border border-white/10 bg-white/10 p-5 overflow-y-auto h-[760px]"
          >
            <Outlet />
          </section>
        </div>
      </Border_Card>
    </div>
  );
}

export default AllSettings;
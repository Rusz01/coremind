import React, { useMemo } from "react";
import { Border_Card } from "../../../components";
import { IoMdSettings, IoMdApps } from "react-icons/io";
import { MdOutlineSecurity, MdAccountCircle } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

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
    <div className="z-100 h-full w-95 md:w-190 lg:w-210 max-w-full lg:h-full">
      <Border_Card>
        <div className=" gap-6">

          {/* Sidebar */}
          <aside className="rounded-2xl border border-white/10 bg-white/10 p-4 mb-5">
            <div className="grid grid-cols-3 items-center">
              <div></div>
              <h2 className="text-xl font-semibold mb-4 text-center justify-items-center">Settings</h2>
              <div className="justify-items-end flex flex-row-reverse">
              <button
                className="rounded-lg p-2 text-white/70 hover:text-white hover:bg-white/10 mb-10"
                onClick={() => navigate('/chat')}
              >
                <RxCross2 className="w-5 h-5" />
              </button>
              </div>
            </div>
            <nav
              className="text-base w-full justify-around hidden md:flex"
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
            {/* Dropdown Navigation */}
            <div className="mb-5 md:hidden">
              <select
                className="w-full rounded-xl bg-white/10 border border-white/20 text-white p-3
               focus:outline-none focus:border-accent-blue cursor-pointer"
                value={activeTab}
                onChange={(e) => handleTabClick(e.target.value)}
              >
                {tabs.map(({ id, label }) => (
                  <option
                    key={id}
                    value={id}
                    className="text-black"
                  >
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </aside>

          {/* Content rendered by nested route */}
          <section
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="rounded-2xl border border-white/10 bg-white/10 p-5 overflow-y-auto h-120 lg:h-[480px] 2xl:h-[760px]"
          >
            <Outlet />
          </section>
        </div>
      </Border_Card>
    </div>
  );
}

export default AllSettings;
import React, { useCallback, useMemo, useState } from "react";
import { Border_Card } from "../../../components";
import { IoMdSettings, IoMdApps } from "react-icons/io";
import { MdOutlineSecurity, MdAccountCircle } from "react-icons/md";

import ConnectedApps from "./connectedApps";
import General from "./General";
import Security from "./Security";
import Account from "./Account";

function AllSettings() {
  const [activeTab, setActiveTab] = useState("general");

  // Single source of truth for tabs
  const tabs = useMemo(
    () => [
      {
        id: "general",
        label: "General",
        Icon: IoMdSettings,
        Component: General,
      },
      {
        id: "connectedApps",
        label: "Connected Apps",
        Icon: IoMdApps,
        Component: ConnectedApps,
      },
      {
        id: "security",
        label: "Security",
        Icon: MdOutlineSecurity,
        Component: Security,
      },
      {
        id: "account",
        label: "Account",
        Icon: MdAccountCircle,
        Component: Account,
      },
    ],
    []
  );

  const activeIdx = tabs.findIndex((t) => t.id === activeTab);
  const ActiveComponent = tabs[activeIdx]?.Component ?? ConnectedApps;

  // Keyboard nav: Left/Right arrow to move focus/selection
  const onKeyDown = useCallback(
    (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (activeIdx + dir + tabs.length) % tabs.length;
      setActiveTab(tabs[next].id);
      // Optionally move focus to the newly selected tab button
      const btn = document.getElementById(`tab-${tabs[next].id}`);
      btn?.focus();
    },
    [activeIdx, tabs]
  );

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
              onKeyDown={onKeyDown}
            >
              {tabs.map(({ id, label, Icon }) => {
                const isActive = id === activeTab;
                return (
                  <button
                    key={id}
                    id={`tab-${id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveTab(id)}
                    className={[
                      "flex items-center gap-3 rounded-xl px-5 py-2 transition border",
                      isActive
                        ? "bg-accent-blue/20 text-white border-accent-blue/40"
                        : "text-white/80 hover:text-white hover:bg-white/10 border-white/10",
                    ].join(" ")}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <section
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="rounded-2xl border border-white/10 bg-white/10 p-5 overflow-y-auto h-[760px]"
          >
            <ActiveComponent />
          </section>
        </div>
      </Border_Card>
    </div>
  );
}

export default AllSettings;

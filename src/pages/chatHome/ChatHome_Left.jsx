import React from "react";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsPersonSquare } from "react-icons/bs";
import { IoAddCircleOutline, IoSearch } from "react-icons/io5";
import { FaGoogleDrive } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import { GrOnedrive } from "react-icons/gr";
import { CgMonday } from "react-icons/cg";
import coreMind_landscape from "/coreMind_landscape.png";

const chats = [
  { title: "Smart Bin-Picking Report", desc: "Draft summary & action items", active: true },
  { title: "Team updates", desc: "Sprint notes and blockers" },
  { title: "Feature backlog", desc: "Priorities & estimates" },
  { title: "Client feedback", desc: "Review last meeting notes" },
];

function Chip({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs">
      {children}
    </span>
  );
}

function ChatHome_Left({ setSidePanel }) {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col">
      {/* Top controls */}
      <div className="flex items-center justify-between">
        <RxHamburgerMenu className="w-7 h-7 cursor-pointer md:hidden" onClick={() => setSidePanel(false)} />
        <div className="flex items-center gap-3">
          <BsPersonSquare className="w-7 h-7 cursor-pointer" onClick={() => navigate("/chat/profile")} />
          <IoSearch className="w-7 h-7 cursor-pointer" />
        </div>
      </div>

      {/* Integrations */}
      <section className="mt-6">
        <h2 className="text-sm font-semibold text-white/80">Integrations</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip><IoAddCircleOutline className="w-4 h-4" /> Add</Chip>
          <Chip><FaGoogleDrive className="w-4 h-4" /> Drive</Chip>
          <Chip><GrOnedrive className="w-4 h-4" /> OneDrive</Chip>
          <Chip><SiNotion className="w-4 h-4" /> Notion</Chip>
          <Chip><CgMonday className="w-4 h-4" /> Monday</Chip>
        </div>
      </section>

      {/* Chats */}
      <section className="mt-8 flex-1 overflow-auto">
        <h2 className="text-sm font-semibold text-white/80 mb-3">Chats</h2>
        <div className="space-y-2">
          {chats.map((c, i) => (
            <button
              key={i}
              className={`w-full text-left rounded-2xl px-3 py-3 transition
                ${c.active
                  ? "bg-accent-blue/20 border border-accent-blue/40"
                  : "bg-white/5 hover:bg-white/10 border border-white/10"
                }`}
            >
              <p className="text-sm font-medium">{c.title}</p>
              <p className="text-xs text-white/70 truncate">{c.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Logo */}
      <div className="mt-6">
        <div className="rounded-2xl p-3 text-center">
          <img src={coreMind_landscape} alt="CoreMind" className="mx-auto w-48 opacity-90" />
        </div>
      </div>
    </div>
  );
}

export default ChatHome_Left;

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsPersonSquare } from "react-icons/bs";
import { IoAddCircleOutline, IoSearch, IoClose } from "react-icons/io5";
import { FaGoogleDrive } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import { GrOnedrive } from "react-icons/gr";
import { CgMonday } from "react-icons/cg";
import coreMind_landscape from "/coreMind_landscape.png";

// NOTE: In a real app, you'll likely fetch this from your store/server.
const chats = [
  { title: "Smart Bin-Picking Report", desc: "Draft summary & action items", active: true },
  { title: "Team updates", desc: "Sprint notes and blockers" },
  { title: "Feature backlog", desc: "Priorities & estimates" },
  { title: "Client feedback", desc: "Review last meeting notes" },
  { title: "Hiring sync", desc: "Open roles & pipeline" },
  { title: "Quarterly planning", desc: "OKRs and roadmap" },
];

function Chip({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs">
      {children}
    </span>
  );
}

/**
 * Small helper to highlight matches in a case-insensitive way.
 */
function Highlight({ text, query }) {
  if (!query) return <>{text}</>;
  const q = query.trim();
  if (!q) return <>{text}</>;
  const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig");
  const parts = String(text).split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="rounded-md px-0.5 -mx-0.5 bg-accent-blue/30 text-white"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function ChatHome_Left({ setSidePanel }) {
  const navigate = useNavigate();

  // Search UI state
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen) {
      const id = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(id);
    }
  }, [searchOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  // Keyboard shortcut: Cmd/Ctrl + K to toggle search
  useEffect(() => {
    const onKey = (e) => {
      const isK = e.key.toLowerCase() === "k";
      const mod = e.metaKey || e.ctrlKey;
      if (mod && isK) {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
      if (e.key === "Escape") {
        closeSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Filter logic matches title OR description
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return chats;
    return chats.filter(({ title, desc }) =>
      title.toLowerCase().includes(q) || desc.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="h-full flex flex-col">
      {/* Top controls */}
      <div className="flex items-center justify-between">
        <RxHamburgerMenu
          className="w-7 h-7 cursor-pointer md:hidden"
          onClick={() => setSidePanel(false)}
        />
        <div className="flex items-center gap-3">
          <BsPersonSquare
            className="w-7 h-7 cursor-pointer"
            onClick={() => navigate("/chat/profile")}
          />
          <button
            type="button"
            aria-label="Open search (⌘/Ctrl+K)"
            onClick={() => setSearchOpen((o) => !o)}
            className="rounded-2xl border border-white/10 bg-white/5 p-1.5 hover:bg-white/10 active:scale-[0.98]"
            title="Search (⌘/Ctrl+K)"
          >
            <IoSearch className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="mt-4">
          <div className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
            <IoSearch className="w-5 h-5 opacity-80" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chats…"
              className="bg-transparent outline-none flex-1 placeholder-white/40 pr-8"
            />
            <button
              type="button"
              onClick={closeSearch}
              className="absolute right-3 p-1 hover:opacity-80 "
              aria-label="Close search"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-white/50 mt-2">Press <kbd className="px-1 rounded bg-white/10">Esc</kbd> to close</p>
        </div>
      )}

      {/* Integrations */}
      {!searchOpen && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold text-white/80">Integrations</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip>
              <IoAddCircleOutline className="w-4 h-4" /> Add
            </Chip>
            <Chip>
              <FaGoogleDrive className="w-4 h-4" /> Drive
            </Chip>
            <Chip>
              <GrOnedrive className="w-4 h-4" /> OneDrive
            </Chip>
            <Chip>
              <SiNotion className="w-4 h-4" /> Notion
            </Chip>
            <Chip>
              <CgMonday className="w-4 h-4" /> Monday
            </Chip>
          </div>
        </section>
      )
      }


      {/* Chats */}
      <section className="mt-8 flex-1 overflow-auto">
        <h2 className="text-sm font-semibold text-white/80 mb-3">Chats</h2>
        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-sm text-white/70">
              No chats match “{query}”.
            </div>
          )}

          <button
            className="w-full text-left rounded-2xl px-3 py-3 bg-white/5 hover:bg-white/10 border border-white/10 transition"
            onClick={() => {
              // Example: navigate("/chat/new")
              // For now, just close search if it was open.
              setSearchOpen(false);
            }}
          >
            <p className="text-sm font-medium">+ New chat</p>
          </button>

          {filtered.map((c, i) => (
            <button
              key={`${c.title}-${i}`}
              className={`w-full text-left rounded-2xl px-3 py-3 transition ${c.active
                  ? "bg-accent-blue/20 border border-accent-blue/40"
                  : "bg-white/5 hover:bg-white/10 border border-white/10"
                }`}
              // TODO: hook into your chat navigation when available
              onClick={() => {
                // Example: navigate(`/chat/${slugify(c.title)}`)
                // For now, just close search if it was open.
                setSearchOpen(false);
              }}
            >

              <p className="text-sm font-medium">
                <Highlight text={c.title} query={query} />
              </p>
              <p className="text-xs text-white/70 truncate">
                <Highlight text={c.desc} query={query} />
              </p>
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

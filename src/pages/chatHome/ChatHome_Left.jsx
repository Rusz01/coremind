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
import { listChats, deleteChat, renameChat } from "../../api/chatApi";

function Chip({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs">
      {children}
    </span>
  );
}

function Highlight({ text, query }) {
  if (!query) return <>{text}</>;
  const q = query.trim();
  if (!q) return <>{text}</>;

  const safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${safe})`, "ig");
  const parts = String(text || "").split(regex);

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


function ChatHome_Left({ setSidePanel, onSelectChat, onNewChat }) {
  const navigate = useNavigate();

  const [chatList, setChatList] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Load chats from backend
  useEffect(() => {
    async function load() {
      try {
        const data = await listChats();
        setChatList(data);
      } catch (err) {
        console.error("Failed to load chats", err);
      }
    }
    load();
  }, []);

  // Autofocus search input when open
  useEffect(() => {
    if (searchOpen) {
      const id = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(id);
    }
  }, [searchOpen]);

  // Filtered chats by search query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return chatList;
    return chatList.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        (c.last_message || "").toLowerCase().includes(q)
    );
  }, [query, chatList]);

  // Delete chat
  async function handleDelete(chatId) {
    try {
      await deleteChat(chatId);
      setChatList((prev) => prev.filter((c) => c.id !== chatId));
      setMenuOpen(null);
      onSelectChat(null);
    } catch (err) {
      console.error("Failed to delete chat", err);
    }
  }

  // Rename chat
  async function handleRename(chat) {
    const newTitle = prompt("Rename chat:", chat.title);
    if (!newTitle) return;

    try {
      const res = await renameChat(chat.id, newTitle);
      setChatList((prev) =>
        prev.map((c) =>
          c.id === chat.id ? { ...c, title: res.title } : c
        )
      );
      setMenuOpen(null);
    } catch (err) {
      console.error("Failed to rename chat", err);
    }
  }

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

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
            aria-label="Open search"
            onClick={() => setSearchOpen((o) => !o)}
            className="rounded-2xl border border-white/10 bg-white/5 p-1.5 hover:bg-white/10 active:scale-[0.98]"
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
          <p className="text-xs text-white/50 mt-2">
            Press <kbd className="px-1 rounded bg-white/10">Esc</kbd> to close
          </p>
        </div>
      )}

      {/* Integrations (keep design) */}
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
      )}

      {/* Chats */}
      <section className="mt-8 flex-1 overflow-auto">
        <h2 className="text-sm font-semibold text-white/80 mb-3">Chats</h2>

        <button
          className="w-full text-left rounded-2xl px-3 py-3 bg-white/5 hover:bg-white/10 border border-white/10 transition"
          onClick={() => {
            onNewChat();
            setMenuOpen(null);
          }}
        >
          <p className="text-sm font-medium">+ New chat</p>
        </button>

        <div className="space-y-2 mt-2">
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-sm text-white/70">
              No chats match “{query}”.
            </div>
          )}

          {filtered.map((chat) => (
            <div key={chat.id} className="relative">
              <button
                className="w-full text-left rounded-2xl px-3 py-3 bg-white/5 hover:bg-white/10 border border-white/10 transition"
                onClick={() => {
                  onSelectChat(chat.id);
                  setMenuOpen(null);
                }}
              >
                <p className="text-sm font-medium">
                  <Highlight text={chat.title} query={query} />
                </p>
                <p className="text-xs text-white/70 truncate">
                  <Highlight
                    text={chat.last_message || "No messages yet"}
                    query={query}
                  />
                </p>
              </button>

              {/* 3-dot menu */}
              <button
                className="absolute right-3 top-3 text-white/70"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(menuOpen === chat.id ? null : chat.id);
                }}
              >
                •••
              </button>

              {menuOpen === chat.id && (
                <div className="absolute right-3 top-10 z-50 rounded-xl w-32 text-sm 
                bg-secondary-blue/80 backdrop-blur-lg
                border border-white/20
                shadow-[0_8px_32px_rgba(31,38,135,0.25)]
                transition-all duration-300
                hover:scale-[1.01] hover:shadow-[0_12px_45px_rgba(31,38,135,0.35)]">
                  <button
                    className="block w-full text-left px-3 py-2 hover:bg-white/20"
                    onClick={() => handleRename(chat)}
                  >
                    Rename
                  </button>
                  <button
                    className="block w-full text-left px-3 py-2 hover:bg-white/20 text-red-400"
                    onClick={() => handleDelete(chat.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Logo */}
      <div className="mt-6">
        <div className="rounded-2xl p-3 text-center">
          <img
            src={coreMind_landscape}
            alt="CoreMind"
            className="mx-auto w-48 opacity-90"
          />
        </div>
      </div>
    </div>
  );
}

export default ChatHome_Left;
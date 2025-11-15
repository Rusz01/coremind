import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import ChatTextArea from "./ChatTextArea";
import { Border_Light } from "../../components";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  sendMessageStream,
  startChat,
  getChatMessages,
  editMessage,
  deleteMessage,
} from "../../api/chatApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  FiCopy,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
} from "react-icons/fi";

function ChatHome_Right({ sidePanel, setSidePanel, selectedChatId }) {
  const [chatId, setChatId] = useState(selectedChatId);
  const [messages, setMessages] = useState([]);
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [copyingId, setCopyingId] = useState(null);

  const [autoScroll, setAutoScroll] = useState(true);

  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Sync chatId with sidebar selection
  useEffect(() => {
    setChatId(selectedChatId);
  }, [selectedChatId]);

  // Scroll to bottom only if autoScroll is true
  const scrollToBottom = useCallback(() => {
    if (!autoScroll) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [autoScroll]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText, scrollToBottom]);

  // Scroll lock: detect if user has scrolled up
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distanceFromBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight;
    const atBottom = distanceFromBottom < 40;
    setAutoScroll(atBottom);
  };

  // Load chat messages
  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      return;
    }

    async function loadHistory() {
      try {
        const data = await getChatMessages(chatId);
        setMessages(
          data.map((msg) => ({
            id: msg.id,
            text: msg.text,
            sender: msg.sender,
            timestamp: msg.created_at || msg.timestamp,
          }))
        );
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    }
    loadHistory();
  }, [chatId]);

  // Helper — Date label ("Today", "Yesterday", "Nov 14")
  const getDateLabel = (ts) => {
    const date = new Date(ts);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year:
        today.getFullYear() !== date.getFullYear() ? "numeric" : undefined,
    });
  };

  // Copy message text
  const handleCopy = async (msg) => {
    try {
      await navigator.clipboard.writeText(msg.text);
      setCopyingId(msg.id);
      setTimeout(() => setCopyingId(null), 1000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  // Start editing
  const handleEditStart = (msg) => {
    setEditingId(msg.id);
    setEditingText(msg.text);
  };

  // Cancel editing
  const handleEditCancel = () => {
    setEditingId(null);
    setEditingText("");
  };

  // Save edited message
const handleEditSave = async (msg) => {
  const trimmed = editingText.trim();
  if (!trimmed) return;

  try {
    // Backend regenerates from this point
    const updated = await editMessage(chatId, msg.id, trimmed);

    setMessages(
      updated.map((m) => ({
        id: m.id,
        text: m.text,
        sender: m.sender,
        timestamp: m.created_at || m.timestamp,
      }))
    );

    setEditingId(null);
    setEditingText("");
  } catch (err) {
    console.error("Failed to regenerate after editing", err);
  }
};

  // Delete message
  const handleDelete = async (msg) => {
    const ok = window.confirm("Delete this message?");
    if (!ok) return;
    try {
      await deleteMessage(chatId, msg.id);
      // Reload messages
      const updated = await getChatMessages(chatId);
      setMessages(
        updated.map((m) => ({
          id: m.id,
          text: m.text,
          sender: m.sender,
          timestamp: m.created_at || m.timestamp,
        }))
      );
    } catch (err) {
      console.error("Failed to delete message", err);
    }
  };

  // Send user message with streaming AI response
  const sendUserMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    let currentChat = chatId;

    // Create new chat if none exists
    if (!currentChat) {
      try {
        const newChat = await startChat("New Chat");
        currentChat = newChat.id;
        setChatId(newChat.id);
      } catch (err) {
        console.error("Failed to start chat", err);
        return;
      }
    }

    // Add user message immediately
    const userMsg = {
      id: Date.now(),
      text: trimmed,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // STREAMING AI RESPONSE
    setStreamingText("");
    setIsStreaming(true);

    let finalText = "";
    try {
      await sendMessageStream(currentChat, trimmed, (partial) => {
        finalText = partial;
        setStreamingText(partial);
      });
    } catch (err) {
      console.error("Streaming failed", err);
      finalText = "Sorry, something went wrong.";
      setStreamingText(finalText);
    }

    setIsStreaming(false);

    // Reload full history from backend (AI message already saved there)
    try {
      const updated = await getChatMessages(currentChat);
      setMessages(
        updated.map((m) => ({
          id: m.id,
          text: m.text,
          sender: m.sender,
          timestamp: m.created_at || m.timestamp,
        }))
      );
    } catch (err) {
      console.error("Failed to reload messages", err);
    }

    setStreamingText("");
  };

  // Renders markdown content
  const renderMarkdown = (text) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => (
          <p className="my-2 text-white whitespace-pre-wrap">{children}</p>
        ),
        code: ({ inline, children }) =>
          inline ? (
            <code className="bg-white/10 px-1 py-0.5 rounded text-sm">
              {children}
            </code>
          ) : (
            <pre className="bg-white/10 p-3 rounded-xl text-sm overflow-x-auto my-3">
              <code>{children}</code>
            </pre>
          ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-white/20 pl-4 italic text-white/70 my-3">
            {children}
          </blockquote>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-white/90">{children}</li>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-blue underline hover:opacity-80"
          >
            {children}
          </a>
        ),
        table: ({ children }) => (
          <table className="w-full border-collapse my-3">{children}</table>
        ),
        th: ({ children }) => (
          <th className="border border-white/20 px-3 py-2 bg-white/10">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-white/10 px-3 py-2">{children}</td>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );

  return (
    <div className="flex flex-col h-[90vh]">
      {/* Inline styles for fade-in animation */}
      <style>
        {`
          @keyframes chatFadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .chat-fade-in {
            animation: chatFadeIn 0.18s ease-out;
          }
        `}
      </style>

      {/* HEADER */}
      <div className="flex items-center border-b border-white/10 px-6 py-4">
        {!sidePanel && (
          <button
            className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-white/80 hover:text-white hover:bg-white/10"
            onClick={() => setSidePanel(true)}
            aria-label="Open sidebar"
          >
            <RxHamburgerMenu className="w-7 h-7" />
          </button>
        )}
        <h1 className="text-xl font-semibold">Chat</h1>
      </div>

      {/* MESSAGES */}
      <div
        className="flex-1 overflow-y-auto px-0 py-8"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        <div className="max-w-6xl mx-auto space-y-6">
          {messages.map((m, index) => {
            const ts = new Date(m.timestamp || new Date().toISOString());
            const timeString = ts.toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            });

            const prev =
              index > 0
                ? new Date(
                  messages[index - 1].timestamp ||
                  new Date().toISOString()
                )
                : null;
            const isNewDay = !prev || prev.toDateString() !== ts.toDateString();

            const isUser = m.sender === "user";
            const isEditing = editingId === m.id;

            return (
              <React.Fragment key={m.id}>
                {/* DATE SEPARATOR */}
                {isNewDay && (
                  <div className="flex justify-center my-4 chat-fade-in">
                    <div className="px-4 py-1 rounded-full bg-white/10 text-xs text-white/60 backdrop-blur">
                      {getDateLabel(m.timestamp || ts)}
                    </div>
                  </div>
                )}

                {/* MESSAGE BUBBLE */}
                <div
                  className={`flex chat-fade-in ${isUser ? "justify-end" : "justify-start"
                    }`}
                >
                  {isUser ? (
                    <div className="flex flex-col items-end max-w-2xl group">
                      <div className="relative">

                        <Border_Light className="!rounded-lg !px-3 border !border-accent-blue text-white">

                          {/* EDIT MODE */}
                          {isEditing ? (
                            <textarea
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              className="
              w-full 
              bg-transparent  
              text-white
              resize-none
              outline-none 
              rounded-lg 
              p-2
              leading-6
            "
                              rows={Math.max(3, editingText.split("\n").length)}
                              autoFocus
                            />
                          ) : (
                            <div className="whitespace-pre-wrap break-words">
                              {renderMarkdown(m.text)}
                            </div>
                          )}

                        </Border_Light>

                        {/* ACTION BUTTONS */}
                        <div className="absolute -top-2 -right-2 hidden group-hover:flex items-center gap-1 bg-black/70 rounded-full px-2 py-1 text-[10px]">
                          {!isEditing ? (
                            <>
                              <button
                                onClick={() => handleCopy(m)}
                                className="p-0.5 hover:text-accent-blue"
                                title={copyingId === m.id ? "Copied!" : "Copy"}
                              >
                                <FiCopy className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleEditStart(m)}
                                className="p-0.5 hover:text-green-300"
                                title="Edit"
                              >
                                <FiEdit2 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleDelete(m)}
                                className="p-0.5 hover:text-red-300"
                                title="Delete"
                              >
                                <FiTrash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditSave(m)}
                                className="p-0.5 hover:text-green-300"
                                title="Save"
                              >
                                <FiCheck className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={handleEditCancel}
                                className="p-0.5 hover:text-red-300"
                                title="Cancel"
                              >
                                <FiX className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>

                      </div>

                      <span className="text-[10px] text-white/40 mt-1">
                        {timeString}
                      </span>
                    </div>
                  ) : (
                    <div className="flex gap-3 max-w-2xl group">
                      <img
                        src="/public/logoBlack.png"
                        className="w-8 h-8 rounded-full border border-white/20"
                        alt=""
                      />
                      <div>
                        <div className="relative">
                          <div className="whitespace-pre-wrap break-words text-white">
                            {renderMarkdown(m.text)}
                          </div>

                          {/* Copy button for AI */}
                          <div className="absolute -top-2 -right-2 hidden group-hover:flex items-center gap-1 bg-black/70 rounded-full px-2 py-1 text-[10px]">
                            <button
                              onClick={() => handleCopy(m)}
                              className="p-0.5 hover:text-accent-blue"
                              title={copyingId === m.id ? "Copied!" : "Copy"}
                            >
                              <FiCopy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <span className="text-[10px] text-white/40">
                          {timeString}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}

          {/* STREAMING AI BUBBLE */}
          {isStreaming && (
            <div className="flex gap-4 text-white animate-pulse chat-fade-in">
              <img
                src="/public/logoBlack.png"
                className="w-8 h-8 rounded-full border border-white/20"
                alt=""
              />
              <div>
                <p className="whitespace-pre-wrap break-words opacity-90">
                  {streamingText || "•••"}
                </p>
                <span className="text-[10px] text-white/40">typing…</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* "Jump to latest" when scroll-locked */}
      {!autoScroll && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={() => {
              setAutoScroll(true);
              scrollContainerRef.current?.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: "smooth",
              });
            }}
            className="px-3 py-1 rounded-full bg-white/15 text-xs text-white/80 border border-white/20 hover:bg-white/25 backdrop-blur"
          >
            Jump to latest
          </button>
        </div>
      )}

      {/* INPUT */}
      <div className="">
        <div className="max-w-3xl mx-auto">
          <ChatTextArea onSend={sendUserMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatHome_Right;
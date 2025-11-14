import React, { useState, useRef, useEffect, useCallback } from "react";
import ChatTextArea from "./ChatTextArea";
import { Border_Light } from "../../components";
import { RxHamburgerMenu } from "react-icons/rx";
import { startChat, sendMessage, getChatMessages } from "../../api/chatApi";

function ChatHome_Right({ sidePanel, setSidePanel, selectedChatId }) {
  const [chatId, setChatId] = useState(selectedChatId);
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  // keep chatId in sync with sidebar selection
  useEffect(() => {
    setChatId(selectedChatId);
  }, [selectedChatId]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Load history whenever chatId changes
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
            timestamp: msg.created_at,
          }))
        );
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    }

    loadHistory();
  }, [chatId]);

  const sendUserMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      let currentChat = chatId;

      // If there's no chat yet, create one first
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

      try {
        const updated = await sendMessage(currentChat, trimmed);
        setMessages(
          updated.map((msg) => ({
            id: msg.id,
            text: msg.text,
            sender: msg.sender,
            timestamp: msg.created_at,
          }))
        );
      } catch (err) {
        console.error("Failed to send message", err);
      }
    },
    [chatId]
  );

  return (
    <div className="flex flex-col h-[90vh]">
      {/* Header */}
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-0 py-8 custom-scrollbar">
        <div className="max-w-6xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {message.sender === "user" ? (
                <Border_Light className="!max-w-2xl !rounded-lg !px-2 border !border-accent-blue text-white">
                  <p className="whitespace-pre-wrap break-words">
                    {message.text}
                  </p>
                </Border_Light>
              ) : (
                <div className="flex gap-4 mt-5 text-white">
                  <img
                    src="/public/logoBlack.png"
                    alt=""
                    className="w-8 h-8 rounded-full border border-white/20"
                  />
                  <p className="whitespace-pre-wrap break-words">
                    {message.text}
                  </p>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div>
        <div className="max-w-3xl mx-auto">
          <ChatTextArea onSend={sendUserMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatHome_Right;
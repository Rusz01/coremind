import React, { useState, useRef, useEffect, useCallback } from "react";
import ChatTextArea from "./ChatTextArea";
import { Border_Light } from "../../components";
import { RxHamburgerMenu } from "react-icons/rx";
import { startChat, sendMessage, getChatMessages } from "../../api/chatApi";

function ChatHome_Right({ sidePanel, setSidePanel }) {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Load chat if chatId is set
  useEffect(() => {
    if (!chatId) return;

    async function loadHistory() {
      const data = await getChatMessages(chatId);
      setMessages(
        data.map((msg) => ({
          id: msg.id,
          text: msg.text,
          sender: msg.sender,
          timestamp: msg.created_at,
        }))
      );
    }

    loadHistory();
  }, [chatId]);

  const sendUserMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      // Create chat if first message
      let currentChat = chatId;
      if (!currentChat) {
        const newChat = await startChat("New Chat");
        currentChat = newChat.id;
        setChatId(newChat.id);
      }

      // Send message to backend
      const updatedMessages = await sendMessage(currentChat, trimmed);

      // Format backend messages for UI
      setMessages(
        updatedMessages.map((msg) => ({
          id: msg.id,
          text: msg.text,
          sender: msg.sender,
          timestamp: msg.created_at,
        }))
      );
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
      <div className="flex-1 overflow-y-auto px-0 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "user" ? (
                <Border_Light className="!max-w-2xl !rounded-lg !px-2 border !border-accent-blue text-white">
                  <p className="whitespace-pre-wrap break-words">{message.text}</p>
                </Border_Light>
              ) : (
                <div className="flex gap-4 text-white">
                  <img
                    src="/public/logoBlack.png"
                    alt=""
                    className="w-8 rounded-full border border-white/20"
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
      <div className="">
        <div className="max-w-3xl mx-auto">
          <ChatTextArea onSend={sendUserMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatHome_Right;
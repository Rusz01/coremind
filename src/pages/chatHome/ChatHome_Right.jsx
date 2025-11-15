import React, { useState, useRef, useEffect, useCallback } from "react";
import ChatTextArea from "./ChatTextArea";
import { Border_Light } from "../../components";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  sendMessageStream,
  startChat,
  getChatMessages,
} from "../../api/chatApi";

function ChatHome_Right({ sidePanel, setSidePanel, selectedChatId }) {
  const [chatId, setChatId] = useState(selectedChatId);
  const [messages, setMessages] = useState([]);
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const messagesEndRef = useRef(null);

  // Keep chatId synced with sidebar
  useEffect(() => {
    setChatId(selectedChatId);
  }, [selectedChatId]);

  // Scroll to bottom on changes
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText, scrollToBottom]);

  // Load history when chatId changes
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
          }))
        );
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    }

    loadHistory();
  }, [chatId]);

  // Send user message with streaming AI answer
  const sendUserMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    let currentChat = chatId;

    // Create new chat if none
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

    // Add user message locally
    const userMsg = {
      id: Date.now(),
      text: trimmed,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMsg]);

    // Streaming AI
    setIsStreaming(true);
    setStreamingText("");

    try {
      await sendMessageStream(currentChat, trimmed, (partial) => {
        setStreamingText(partial);
      });
    } catch (err) {
      console.error("Streaming failed", err);
      setStreamingText("Sorry, something went wrong.");
    } finally {
      setIsStreaming(false);
    }

    // After streaming, reload full history (AI message is saved server-side)
    try {
      const updated = await getChatMessages(currentChat);
      setMessages(
        updated.map((msg) => ({
          id: msg.id,
          text: msg.text,
          sender: msg.sender,
        }))
      );
    } catch (err) {
      console.error("Failed to reload messages", err);
    }

    setStreamingText("");
  };

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
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.sender === "user" ? (
                <Border_Light className="!max-w-2xl !rounded-lg !px-2 border !border-accent-blue text-white">
                  <p className="whitespace-pre-wrap break-words">{m.text}</p>
                </Border_Light>
              ) : (
                <div className="flex gap-4 mt-10 text-white">
                  <img
                    src="/public/logoBlack.png"
                    alt=""
                    className="w-8 h-8 rounded-full border border-white/20"
                  />
                  <p className="whitespace-pre-wrap break-words">{m.text}</p>
                </div>
              )}
            </div>
          ))}

          {/* Streaming "typing" bubble */}
          {isStreaming && (
            <div className="flex gap-4 text-white animate-pulse">
              <img
                src="/public/logoBlack.png"
                alt=""
                className="w-8 h-8 rounded-full border border-white/20"
              />
              <p className="whitespace-pre-wrap break-words opacity-90">
                {streamingText || "•••"}
              </p>
            </div>
          )}

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
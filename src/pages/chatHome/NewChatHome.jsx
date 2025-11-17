import React, { useState } from "react";
import ChatTextArea from "./ChatTextArea";
import { RxHamburgerMenu } from "react-icons/rx";
import { startChat, sendMessage } from "../../api/chatApi";

function NewChatHome({ sidePanel, setSidePanel, onChatCreated }) {
  const handleSend = async (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newChat = await startChat();
    const chatId = newChat.id;

    await sendMessage(chatId, trimmed);

    // Notify parent to switch UI to ChatHome_Right
    onChatCreated(chatId);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between">
        {!sidePanel && (
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-xl p-2 text-white/80 hover:text-white hover:bg-white/10"
            onClick={() => setSidePanel(true)}
          >
            <RxHamburgerMenu className="w-7 h-7" />
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">
            How can I help?
          </h2>
          <p className="mt-2 text-white/70">
            Ask about files, decisions, or summaries.
          </p>
        </div>

        <div className="w-full max-w-3xl mt-8">
          <ChatTextArea onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}

export default NewChatHome;
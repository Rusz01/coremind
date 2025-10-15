import React, { useState, useCallback } from "react";
import { Border_Card } from "../../components";
import { FiSend } from "react-icons/fi";
import { HiPaperClip } from "react-icons/hi";
import Textarea from "./Textarea";

/**
 * Props:
 * - onSend?: (text: string) => void
 */
function ChatTextArea({ onSend }) {
  const [value, setValue] = useState("");

  const canSend = value.trim().length > 0;

  const handleSend = useCallback(() => {
    if (!canSend) return;
    const text = value.trim();
    onSend?.(text);
    setValue("");
  }, [canSend, onSend, value]);

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Border_Card>
      <div className="flex items-end gap-3">
        <button
          type="button"
          className="shrink-0 rounded-xl border border-white/10 bg-white/10 p-2 text-white/80 hover:text-white hover:bg-white/15"
          aria-label="Attach"
          onClick={() => {}}
        >
          <HiPaperClip className="w-5 h-5" />
        </button>

        <div className="flex-1">
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask anything..."
          />
        </div>

        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          className={`
            shrink-0 inline-flex items-center justify-center rounded-2xl px-4 py-2
            border border-white/15
            ${canSend
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-500/90 hover:to-indigo-500/90 text-white"
              : "bg-white/10 text-white/60 cursor-not-allowed"}
            transition shadow-[0_6px_20px_rgba(37,99,235,0.25)]
          `}
          aria-label="Send"
          title={canSend ? "Send" : "Type a message to send"}
        >
          <FiSend className="w-5 h-5" />
        </button>
      </div>
    </Border_Card>
  );
}

export default ChatTextArea;

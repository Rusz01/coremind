import React, { useState, useRef, useEffect } from "react";

function Textarea({ value, onChange, onKeyDown, placeholder = "Ask Anything..." }) {
  const textareaRef = useRef(null);
  const [rows, setRows] = useState(1);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    const next = Math.min(el.scrollHeight, 240); // cap growth ~ 12-14 lines
    el.style.height = next + "px";
    // Compute rough rows for accessibility
    const lineHeight = 24;
    setRows(Math.max(1, Math.ceil(next / lineHeight)));
  }, [value]);

  return (
    <>
      <style>
        {`
          textarea::-webkit-scrollbar { width: 8px; }
          textarea::-webkit-scrollbar-track { background: transparent; }
          textarea::-webkit-scrollbar-thumb { background: #9ca3af; border-radius: 9999px; }
          textarea::-webkit-scrollbar-thumb:hover { background: #6b7280; }
          textarea { scrollbar-width: thin; scrollbar-color: #9ca3af transparent; }
        `}
      </style>

      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        rows={rows}
        className="
          w-full resize-none overflow-y-auto
          bg-transparent outline-none border-none
          text-base md:text-lg text-white placeholder-white/60
          leading-6 md:leading-7 max-h-60
        "
      />
    </>
  );
}

export default Textarea;

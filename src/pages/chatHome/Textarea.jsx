import React, { useState, useRef, useEffect } from "react";

function Textarea() {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; 
      textarea.style.height = textarea.scrollHeight + "px"; 
    }
  }, [value]);

  return (
    <>
      <style>
        {`
          textarea::-webkit-scrollbar {
            width: 8px; 
          }
          textarea::-webkit-scrollbar-track {
            background: transparent;
          }
          textarea::-webkit-scrollbar-thumb {
            background: #9ca3af;
            border-radius: 9999px;
          }
          textarea::-webkit-scrollbar-thumb:hover {
            background: #6b7280;
          }
          textarea {
            scrollbar-width: thin; 
            scrollbar-color: #9ca3af transparent; 
          }
        `}
      </style>

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask Anything..."
        className="border-none outline-none w-full text-white placeholder-white bg-transparent resize-none overflow-y-auto max-h-160"
        rows={1}
      />
    </>
  );
}

export default Textarea;

import React, { useEffect, useRef, useState } from "react";

function Textarea({ value, onChange, onKeyDown, placeholder }) {
  const ref = useRef(null);
  const [rows, setRows] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "0px";
    const next = Math.min(el.scrollHeight, 240); // cap height
    el.style.height = next + "px";

    const lineHeight = 24;
    setRows(Math.max(1, Math.ceil(next / lineHeight)));
  }, [value]);

  return (
    <textarea
      ref={ref}
      rows={rows}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className="
        w-full resize-none overflow-y-auto
        bg-transparent outline-none border-none
        text-base md:text-lg text-white placeholder-white/60
        leading-6 md:leading-7 max-h-60
      "
    />
  );
}

export default Textarea;
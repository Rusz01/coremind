import React from "react";

function Border_Card({ children }) {
  return (
    <div
      className="
        relative rounded-3xl overflow-hidden
        bg-white/10 backdrop-blur-xl
        border border-white/20
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-[0_12px_45px_rgba(0,0,0,0.4)]
      "
    >
      {/* glowing gradient border effect */}
      <div className="absolute inset-0 rounded-3xl p-[2px]  blur-[2px]" />

      {/* inner content */}
      <div className="relative z-10 p-8">
        {children}
      </div>
    </div>
  );
}

export default Border_Card;

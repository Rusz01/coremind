import React from "react";

function Border_Light({ children, className = "" }) {
  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden
        bg-white/10 backdrop-blur-lg
        border border-white/20
        shadow-[0_8px_32px_rgba(31,38,135,0.25)]
        transition-all duration-300
        hover:scale-[1.01] hover:shadow-[0_12px_45px_rgba(31,38,135,0.35)]
        ${className}
      `}
    >
      <div className="absolute inset-0 rounded-2xl p-[1px]  blur-sm pointer-events-none" />

      <div className="relative z-10 p-5">
        {children}
      </div>
    </div>
  );
}

export default Border_Light;

import React, { useState, useMemo } from "react";
import coreMind_landscape from "/coreMind_landscape.png";
import { useNavigate, NavLink, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isAuthPage =
    location.pathname.startsWith("/auth/Login") ||
    location.pathname.startsWith("/auth/Register");

  const navItems = useMemo(() => {
    const base = [
      { label: "Docs", to: "/docs" },
      { label: "Integrations", to: "/integrations" },
    ];
    if (isAuthPage) base.push({ label: "Privacy", to: "/privacy" });
    base.push({ label: "Contact Us", to: "/contact" });
    return base;
  }, [isAuthPage]);

  const linkClass = ({ isActive }) =>
    `relative px-2 py-1 transition
     hover:text-white
     ${isActive ? "text-white" : "text-white/80"}
     after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1
     after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-400 after:to-purple-400
     hover:after:w-full after:transition-all`;

  return (
    <header className="sticky top-0 z-40">
      <div
        className="
          mx-auto max-w-7xl px-4 sm:px-6 lg:px-8
          mt-2
        "
      >
        <div
          className="
            flex items-center justify-between
            rounded-2xl border border-white/15
            bg-white/10 backdrop-blur-xl
            shadow-[0_8px_30px_rgba(0,0,0,0.25)]
            px-4 sm:px-6 py-3
          "
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={coreMind_landscape}
              alt="CoreMind"
              className="h-9 w-auto cursor-pointer select-none"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-lg">
            {navItems.map(({ label, to }) => (
              <NavLink key={to} to={to} className={linkClass}>
                {label}
              </NavLink>
            ))}

            {!isAuthPage && (
              <NavLink
                to="/auth/Login"
                className="
                  inline-flex items-center gap-2 rounded-full
                  border border-white/20
                  bg-gradient-to-r from-blue-500/80 to-indigo-500/80
                  hover:from-blue-500 hover:to-indigo-500
                  px-5 py-2 text-sm font-medium text-white
                  shadow-[0_6px_20px_rgba(37,99,235,0.35)]
                  transition-transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-blue-300
                "
              >
                Login
              </NavLink>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
          >
            <svg
              className={`h-6 w-6 transition ${open ? "rotate-90" : ""}`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              {open ? (
                <path
                  fillRule="evenodd"
                  d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.361a1 1 0 011.414 1.414L13.414 10.586l4.361 4.361a1 1 0 01-1.414 1.414L12 12l-4.361 4.361a1 1 0 01-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm.75 4.5a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Drawer */}
        {open && (
          <div
            className="
              md:hidden mt-2 overflow-hidden
              rounded-2xl border border-white/15
              bg-white/10 backdrop-blur-xl
              shadow-[0_8px_30px_rgba(0,0,0,0.25)]
            "
          >
            <nav className="flex flex-col px-4 py-3 text-base">
              {navItems.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-2 transition
                     ${isActive ? "bg-white/15 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"}`
                  }
                  onClick={() => setOpen(false)}
                >
                  {label}
                </NavLink>
              ))}

              {!isAuthPage && (
                <NavLink
                  to="/auth/Login"
                  className="
                    mt-2 inline-flex items-center justify-center rounded-xl
                    border border-white/20
                    bg-gradient-to-r from-blue-500/80 to-indigo-500/80
                    hover:from-blue-500 hover:to-indigo-500
                    px-4 py-2 text-sm font-medium text-white
                    shadow-[0_6px_20px_rgba(37,99,235,0.35)]
                  "
                  onClick={() => setOpen(false)}
                >
                  Login
                </NavLink>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

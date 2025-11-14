import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const [user, setUser] = useState(undefined); 
  const location = useLocation();

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  // Loading Screen (beautiful & matches CoreMind theme)
  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#0f0f12] to-[#1b1c21] text-white">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] text-center">
          <div className="animate-spin mx-auto mb-4 h-10 w-10 border-4 border-white/30 border-t-accent-blue rounded-full" />
          <p className="text-white/80 text-lg">Loading your workspace…</p>
        </div>
      </div>
    );
  }

  // Not logged in → redirect
  if (!user) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  // Logged in → render protected page
  return children;
}
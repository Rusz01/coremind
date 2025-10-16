import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const [user, setUser] = useState(undefined); // undefined = loading, null = not logged in
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  if (user === undefined) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/Login" replace state={{ from: location }} />;
  }

  return children;
}

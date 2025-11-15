import { useEffect } from "react";
import { completeGoogleOAuth } from "../../api/integrationsApi";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase"; 
import { useNavigate } from "react-router-dom";

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    // Wait for Firebase Auth to become available
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.error("User not logged in during OAuth callback");
        return;
      }

      try {
        await completeGoogleOAuth(code);
        navigate("/chat/allSettings/connectedApps");
      } catch (err) {
        console.error("Failed to complete Google OAuth:", err);
      }
    });

    return () => unsub();
  }, [navigate]);

  return (
    <div className="text-white p-8">
      Connecting your Google Drive...
    </div>
  );
}
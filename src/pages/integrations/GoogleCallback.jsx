import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { completeGoogleOAuth } from "../../api/integrationsApi";

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function run() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        navigate("/chat");
        return;
      }

      try {
        await completeGoogleOAuth(code);
      } catch (err) {
        console.error("Failed to complete Google OAuth:", err);
      }

      navigate("/chat/settings"); // or /chat/allSettings
    }

    run();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <p>Connecting your Google Drive…</p>
    </div>
  );
}
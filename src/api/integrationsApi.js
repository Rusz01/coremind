import { API_BASE, authHeader } from "./httpClient";

// Ask backend for Google OAuth URL
export async function getGoogleAuthUrl() {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE}/v1/integrations/google/url`, {
    method: "GET",
    headers,
  });

  if (!res.ok) throw new Error("Failed to get Google Auth URL");
  return res.json();
}

// Backend exchanges ?code=...
export async function completeGoogleOAuth(code) {
  const headers = await authHeader();
  const res = await fetch(
    `${API_BASE}/v1/integrations/google/callback?code=${encodeURIComponent(
      code
    )}`,
    {
      method: "POST",
      headers,
    }
  );

  if (!res.ok) throw new Error("Failed to complete Google OAuth");
  return res.json();
}

// Check if user already connected Drive
export async function getGoogleStatus() {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE}/v1/integrations/google/status`, {
    method: "GET",
    headers,
  });

  if (!res.ok) throw new Error("Failed to load Drive status");
  return res.json(); // {connected: boolean}
}

// Unlink Google Drive
export async function unlinkGoogleDrive() {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE}/v1/integrations/google/unlink`, {
    method: "DELETE",
    headers,
  });

  if (!res.ok) throw new Error("Failed to unlink Drive");
  return res.json(); // {success: true}
}
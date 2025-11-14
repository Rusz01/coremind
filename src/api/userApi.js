// src/api/userApi.js
import { API_BASE, authHeader } from "./httpClient";

// GET backend user profile (/user)
export async function getUser() {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE}/user`, {
    method: "GET",
    headers,
  });

  if (!res.ok) throw new Error("Failed to load user profile");
  return res.json();
}

// PATCH backend user fields (email, display_name)
export async function updateUserField(field, value) {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE}/user`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ [field]: value }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Failed to update user");
  return data;
}
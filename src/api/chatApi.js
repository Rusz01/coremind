import { getAuth } from "firebase/auth";

const API_BASE = "http://127.0.0.1:8000";

async function authHeader() {
  const user = getAuth().currentUser;
  if (!user) throw new Error("User not logged in");

  const token = await user.getIdToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function startChat(title = "New chat") {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE}/chat/start`, {
    method: "POST",
    headers,
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function sendMessage(chatId, text) {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE}/chat/${chatId}/send`, {
    method: "POST",
    headers,
    body: JSON.stringify({ text }),
  });
  return res.json();
}

export async function getChatMessages(chatId) {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE}/chat/${chatId}`, {
    method: "GET",
    headers,
  });
  return res.json();
}

export async function listChats() {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE}/chat/list`, {
    method: "GET",
    headers,
  });
  return res.json();
}
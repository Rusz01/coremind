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

export async function startChat(title = "New Chat") {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE}/chat/start`, {
    method: "POST",
    headers,
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("Failed to start chat");
  return res.json();
}

export async function listChats() {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE}/chat/list`, {
    method: "GET",
    headers,
  });
  if (!res.ok) throw new Error("Failed to load chats");
  return res.json();
}

export async function getChatMessages(chatId) {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE}/chat/${chatId}`, {
    method: "GET",
    headers,
  });
  if (!res.ok) throw new Error("Failed to load chat messages");
  return res.json();
}

export async function sendMessage(chatId, text) {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE}/chat/${chatId}/send`, {
    method: "POST",
    headers,
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json(); // list of messages
}

export async function renameChat(chatId, title) {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE}/chat/${chatId}/rename`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("Failed to rename chat");
  return res.json();
}

export async function deleteChat(chatId) {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE}/chat/${chatId}`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) throw new Error("Failed to delete chat");
  return res.json();
}
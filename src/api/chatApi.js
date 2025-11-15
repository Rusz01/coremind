import { API_BASE, authHeader } from "./httpClient";

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

// Non-streaming send (still available if you need it)
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

// STREAMING send — used by ChatHome_Right
export async function sendMessageStream(chatId, text, onChunk) {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE}/chat/${chatId}/send-stream`, {
    method: "POST",
    headers,
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Failed to stream message");

  if (!res.body) {
    throw new Error("ReadableStream not supported in this browser");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    fullText += chunk;
    onChunk(fullText);
  }

  return fullText;
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

// Optional: if you later add a "delete all chats" backend route
export async function deleteAllChats() {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE}/chat/all`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) throw new Error("Failed to delete all chats");
  return res.json();
}

// NEW: Update a single user message
export async function updateMessage(chatId, messageId, text) {
  const headers = await authHeader();
  const res = await fetch(
    `${API_BASE}/chat/${chatId}/message/${messageId}`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify({ text }),
    }
  );
  if (!res.ok) throw new Error("Failed to update message");
  return res.json();
}

// NEW: Delete a single user message
export async function deleteMessage(chatId, messageId) {
  const headers = await authHeader();
  const res = await fetch(
    `${API_BASE}/chat/${chatId}/message/${messageId}`,
    {
      method: "DELETE",
      headers,
    }
  );
  if (!res.ok) throw new Error("Failed to delete message");
  return res.json();
}


export async function editMessage(chatId, messageId, text) {
  const headers = await authHeader();
  const res = await fetch(
    `${API_BASE}/chat/${chatId}/message/${messageId}/edit`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify({ text }),
    }
  );

  if (!res.ok) throw new Error("Failed to edit message");
  return res.json(); // returns updated list of messages
}
import { getAuth } from "firebase/auth";

export const API_BASE = process.env.BACKEND_URL;

// Build auth header using Firebase ID token
export async function authHeader(extraHeaders = {}) {
  const user = getAuth().currentUser;
  if (!user) throw new Error("User not logged in");

  const token = await user.getIdToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...extraHeaders,
  };
}
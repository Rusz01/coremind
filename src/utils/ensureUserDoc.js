import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { database } from "../firebase/firebase";


export async function ensureUserDoc(user) {
  if (!user) return;

  const {
    uid,
    email = "",
    displayName = "",
    photoURL = "",
    providerData = [],
  } = user;

  const providerId = providerData[0]?.providerId || "password";

  const ref = doc(database, "users", email);
  await setDoc(
    ref,
    {
      uid,
      email,
      displayName,
      profilePicture: photoURL,
      loggedInWith: providerId,
      createdAt: serverTimestamp(),  
      updatedAt: serverTimestamp(), 
    },
    { merge: true }
  );
}

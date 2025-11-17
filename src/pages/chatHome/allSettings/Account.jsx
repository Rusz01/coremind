import React, { useState } from "react";
import { auth } from "../../../firebase/firebase";
import { updateEmail, updateProfile } from "firebase/auth";
import { updateUserField } from "../../../api/userApi";


function Account() {
  const user = auth.currentUser;

  const [email, setEmail] = useState(user?.email || "");
  const [displayName, setDisplayName] = useState(user?.displayName || "");

  const [tempEmail, setTempEmail] = useState(email);
  const [tempName, setTempName] = useState(displayName);

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  // Update backend + firebase UI
  const handleUpdate = async (field, value) => {
    if (!auth.currentUser) {
      setMessage("You must be logged in.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // Call backend (FastAPI)
      await updateUserField(field, value);

      // Update Firebase client values (UI)
      if (field === "email") {
        await updateEmail(auth.currentUser, value);
        setEmail(value);
        setTempEmail(value);
      }

      if (field === "display_name") {
        await updateProfile(auth.currentUser, { displayName: value });
        setDisplayName(value);
        setTempName(value);
      }

      setMessage("Saved successfully!");

    } catch (err) {
      setMessage("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };


  // RENDER
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">Account Settings</h2>
          <p className="text-sm text-white/70">
            Manage your account information and preferences.
          </p>
        </div>
      </div>

      {message && (
        <p className="text-sm text-yellow-300 mt-2">{message}</p>
      )}

      <hr className="border-white/10 my-4" />

      <div className="flex flex-col gap-5">

        {/* EMAIL */}
        <div className="group relative rounded-2xl border border-white/10 bg-white/10 px-4 py-4 hover:bg-white/15 transition">
          <div className="md:flex items-center justify-between w-full gap-3">
            <div>
              <h3 className="text-lg font-semibold">Email Address</h3>
              <p className="text-sm text-white/70">
                Update the email linked to your account.
              </p>
            </div>

            <input
              type="email"
              className="bg-transparent border border-white/20 rounded-2xl px-5 py-2 text-sm text-white mt-3 md:mt-0"
              value={tempEmail}
              onChange={(e) => {
                setTempEmail(e.target.value);
                setIsEditingEmail(true);
              }}
            />
          </div>

          {isEditingEmail && (
            <div className="flex gap-3 mt-3">
              <button
                disabled={loading}
                onClick={() => {
                  handleUpdate("email", tempEmail);
                  setIsEditingEmail(false);
                }}
                className="px-4 py-2 rounded-xl bg-green-500/30 text-green-200"
              >
                Save Changes
              </button>

              <button
                onClick={() => {
                  setTempEmail(email);
                  setIsEditingEmail(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-500/30 text-red-200"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* DISPLAY NAME */}
        <div className="group relative rounded-2xl border border-white/10 bg-white/10 px-4 py-4 hover:bg-white/15 transition">
          <div className="md:flex items-center justify-between w-full gap-3">
            <div>
              <h3 className="text-lg font-semibold">Display Name</h3>
              <p className="text-sm text-white/70">This name appears on your profile.</p>
            </div>

            <input
              type="text"
              className="bg-transparent border border-white/20 rounded-2xl px-5 py-2 text-sm text-white mt-3 md:mt-0"
              value={tempName}
              onChange={(e) => {
                setTempName(e.target.value);
                setIsEditingName(true);
              }}
            />
          </div>

          {isEditingName && (
            <div className="flex gap-3 mt-3">
              <button
                disabled={loading}
                onClick={() => {
                  handleUpdate("display_name", tempName);
                  setIsEditingName(false);
                }}
                className="px-4 py-2 rounded-xl bg-green-500/30 text-green-200"
              >
                Save Changes
              </button>

              <button
                onClick={() => {
                  setTempName(displayName);
                  setIsEditingName(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-500/30 text-red-200"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
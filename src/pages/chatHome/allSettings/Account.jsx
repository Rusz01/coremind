import React, { useState } from 'react'

function Account() {
  const [email, setEmail] = useState("user@example.com");
  const [displayName, setDisplayName] = useState("User Name");

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);

  const [tempEmail, setTempEmail] = useState(email);
  const [tempName, setTempName] = useState(displayName);

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

      <hr className="border-white/10 my-4" />

      <div className="flex flex-col gap-5">

        {/* EMAIL SECTION */}
        <div className="group relative rounded-2xl border border-white/10 bg-white/10 px-4 py-4 hover:bg-white/15 transition">
          <div className="flex items-center justify-between w-full gap-3">
            <div>
              <h3 className="text-lg font-semibold">Email Address</h3>
              <p className="text-sm text-white/70">Update the email linked to your account.</p>
            </div>

            <input
              type="email"
              value={tempEmail}
              onChange={(e) => {
                setTempEmail(e.target.value);
                setIsEditingEmail(true);
              }}
              className="bg-transparent border border-white/20 rounded-2xl px-5 py-2 text-sm text-white focus:outline-none"
            />
          </div>

          {/* Save / Cancel Buttons */}
          {isEditingEmail && (
            <div className="flex gap-3 mt-3">
              <button
                className="px-4 py-2 rounded-xl bg-green-500/30 text-green-200 border border-green-300/30 hover:bg-green-500/40 transition"
                onClick={() => {
                  setEmail(tempEmail);
                  setIsEditingEmail(false);
                }}
              >
                Save Changes
              </button>

              <button
                className="px-4 py-2 rounded-xl bg-red-500/30 text-red-200 border border-red-300/30 hover:bg-red-500/40 transition"
                onClick={() => {
                  setTempEmail(email);
                  setIsEditingEmail(false);
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* DISPLAY NAME SECTION */}
        <div className="group relative rounded-2xl border border-white/10 bg-white/10 px-4 py-4 hover:bg-white/15 transition">
          <div className="flex items-center justify-between w-full gap-3">
            <div>
              <h3 className="text-lg font-semibold">Display Name</h3>
              <p className="text-sm text-white/70">This name appears on your profile.</p>
            </div>

            <input
              type="text"
              value={tempName}
              onChange={(e) => {
                setTempName(e.target.value);
                setIsEditingName(true);
              }}
              className="bg-transparent border border-white/20 rounded-2xl px-5 py-2 text-sm text-white focus:outline-none"
            />
          </div>

          {/* Save / Cancel Buttons */}
          {isEditingName && (
            <div className="flex gap-3 mt-3">
              <button
                className="px-4 py-2 rounded-xl bg-green-500/30 text-green-200 border border-green-300/30 hover:bg-green-500/40 transition"
                onClick={() => {
                  setDisplayName(tempName);
                  setIsEditingName(false);
                }}
              >
                Save Changes
              </button>

              <button
                className="px-4 py-2 rounded-xl bg-red-500/30 text-red-200 border border-red-300/30 hover:bg-red-500/40 transition"
                onClick={() => {
                  setTempName(displayName);
                  setIsEditingName(false);
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Account

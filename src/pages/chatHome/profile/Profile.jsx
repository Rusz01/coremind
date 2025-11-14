import React, { useState, useEffect } from "react";
import { Border_Card } from "../../../components";
import { RxCross2 } from "react-icons/rx";
import {
  FaGoogle,
  FaGithub,
  FaMicrosoft,
  FaGoogleDrive,
} from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import { GrOnedrive } from "react-icons/gr";
import { CgMonday } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";

// UI SUBCOMPONENTS
const ConfirmModal = ({ open, title, description, confirmText, onConfirm, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            className="rounded-lg p-1 text-white/70 hover:text-white hover:bg-white/10"
            onClick={onClose}
          >
            <RxCross2 className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <div className="px-4 pb-4 text-white/80">{description}</div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-4 pb-4">
          <button
            className="rounded-xl px-4 py-2 text-sm border border-white/15 text-white/90 hover:bg-white/10"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="rounded-xl px-4 py-2 text-sm bg-red-500/90 hover:bg-red-500 text-white shadow"
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90">
    {children}
  </span>
);


// MAIN COMPONENT
function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);

  // Watch Firebase auth state
  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/auth/login");
  };

  const handleDeleteAll = () => {
    console.log("Delete Chats API Will Run Here");
  };

  if (!user) {
    return (
      <div className="text-white text-center mt-10">
        <p>Loading profile...</p>
      </div>
    );
  }

  // Extract provider details
  const providerId = user.providerData?.[0]?.providerId ?? "email";
  const providerDetails = {
    "google.com": { name: "Google", icon: <FaGoogle className="w-3.5 h-3.5" /> },
    "github.com": { name: "GitHub", icon: <FaGithub className="w-3.5 h-3.5" /> },
    "microsoft.com": { name: "Microsoft", icon: <FaMicrosoft className="w-3.5 h-3.5" /> },
    default: { name: "Email", icon: null },
  };

  const { name: providerName, icon: providerIcon } =
    providerDetails[providerId] || providerDetails.default;

  return (
    <div className="z-[100]">
      <Border_Card>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Profile</h2>
          <button
            className="rounded-lg p-2 text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => navigate(-1)}
          >
            <RxCross2 className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 flex flex-col items-center text-white">
          {/* Avatar */}
          <div className="relative">
            <div className="p-[3px] rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="User avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          </div>

          {/* Name */}
          <div className="mt-4 flex items-center gap-3">
            <p className="text-2xl font-semibold">{user.displayName || "Anonymous User"}</p>
            <Badge>
              {providerIcon}
              {providerName}
            </Badge>
          </div>

          {/* Email */}
          <div className="mt-5 w-full max-w-xl">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="text-white/70">Email</span>
              <span className="font-medium">{user.email}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 w-full max-w-xl flex flex-col gap-3">
            <button
              className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white hover:bg-white/15"
              onClick={() => navigate("/chat/allSettings")}
            >
              View All Settings
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                className="rounded-2xl border border-red-400/30 bg-red-500/20 px-4 py-3 text-sm font-semibold text-red-200 hover:bg-red-500/30"
                onClick={() => setConfirmDeleteOpen(true)}
              >
                Delete all chats
              </button>

              <button
                className="rounded-2xl border border-red-400/30 bg-red-500/20 px-4 py-3 text-sm font-semibold text-red-200 hover:bg-red-500/30"
                onClick={() => setConfirmLogoutOpen(true)}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Integrations */}
          <div className="mt-8 w-full max-w-xl">
            <p className="mb-3 text-sm font-semibold text-white/80">Integrated Apps</p>

            <div className="flex flex-wrap gap-2">
              <Badge><FaGoogleDrive className="w-4 h-4" /> Drive</Badge>
              <Badge><GrOnedrive className="w-4 h-4" /> OneDrive</Badge>
              <Badge><SiNotion className="w-4 h-4" /> Notion</Badge>
              <Badge><CgMonday className="w-4 h-4" /> Monday</Badge>
            </div>
          </div>

          <p className="mt-8 text-sm text-white/60">
            &copy; {new Date().getFullYear()} CoreMind. All rights reserved.
          </p>
        </div>
      </Border_Card>

      {/* Modals */}
      <ConfirmModal
        open={confirmDeleteOpen}
        title="Delete all chats?"
        description="This will permanently remove all chat history on this account. This action cannot be undone."
        confirmText="Delete"
        onConfirm={handleDeleteAll}
        onClose={() => setConfirmDeleteOpen(false)}
      />

      <ConfirmModal
        open={confirmLogoutOpen}
        title="Logout?"
        description="You’ll be signed out from this device. You can sign back in anytime."
        confirmText="Logout"
        onConfirm={handleLogout}
        onClose={() => setConfirmLogoutOpen(false)}
      />
    </div>
  );
}

export default Profile;
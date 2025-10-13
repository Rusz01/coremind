import React, { useState } from "react";
import { Border_Card } from "../../../components";
import { RxCross2 } from "react-icons/rx";
import { FaGoogle, FaGoogleDrive } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import { GrOnedrive } from "react-icons/gr";
import { CgMonday } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function ConfirmModal({ open, title, description, confirmText, onConfirm, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between p-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            className="rounded-lg p-1 text-white/70 hover:text-white hover:bg-white/10"
            onClick={onClose}
            aria-label="Close confirmation"
          >
            <RxCross2 className="w-5 h-5" />
          </button>
        </div>
        <div className="px-4 pb-4 text-white/80">{description}</div>
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
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90">
      {children}
    </span>
  );
}

function Profile() {
  const navigate = useNavigate();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);

  // TODO: wire these to your handlers
  const handleDeleteAll = () => {
    console.log("Deleting all chats…");
  };
  const handleLogout = () => {
    console.log("Logging out…");
  };

  return (
    <div className="z-[100]">
      <Border_Card>
        {/* Header row */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Profile</h2>
          <button
            className="rounded-lg p-2 text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => navigate(-1)}
            aria-label="Close profile"
          >
            <RxCross2 className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="mt-6 flex flex-col items-center text-white">
          {/* Avatar with gradient ring */}
          <div className="relative">
            <div className="p-[3px] rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.1.0"
                alt="User avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          </div>

          {/* Name + provider */}
          <div className="mt-4 flex items-center gap-3">
            <p className="text-2xl font-semibold">Rusz Baidhya</p>
            <Badge>
              <FaGoogle className="w-3.5 h-3.5" />
              Google
            </Badge>
          </div>

          {/* Details */}
          <dl className="mt-5 grid w-full max-w-xl grid-cols-1 gap-3 text-base">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <dt className="text-white/70">Email</dt>
              <dd className="font-medium">rusz.baidhya@example.com</dd>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <dt className="text-white/70">Phone</dt>
              <dd className="font-medium">0123456789</dd>
            </div>
          </dl>

          {/* Actions */}
          <div className="mt-6 flex w-full max-w-xl flex-col gap-3">
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
                Logout on this device
              </button>
            </div>
          </div>

          {/* Integrations */}
          <div className="mt-8 w-full max-w-xl">
            <p className="mb-3 text-sm font-semibold text-white/80">Integrated Apps</p>
            <div className="flex flex-wrap gap-2">
              <Badge>
                <FaGoogleDrive className="w-4 h-4" /> Drive
              </Badge>
              <Badge>
                <GrOnedrive className="w-4 h-4" /> OneDrive
              </Badge>
              <Badge>
                <SiNotion className="w-4 h-4" /> Notion
              </Badge>
              <Badge>
                <CgMonday className="w-4 h-4" /> Monday
              </Badge>
            </div>
          </div>

          <p className="mt-8 text-sm text-white/60">
            &copy; {new Date().getFullYear()} CoreMind. All rights reserved.
          </p>
        </div>
      </Border_Card>

      {/* Confirmations */}
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
        title="Logout on this device?"
        description="You’ll be signed out from this device. You can sign back in anytime."
        confirmText="Logout"
        onConfirm={handleLogout}
        onClose={() => setConfirmLogoutOpen(false)}
      />
    </div>
  );
}

export default Profile;

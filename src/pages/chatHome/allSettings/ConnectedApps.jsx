import React, { useState, useEffect } from "react";
import { FaGoogleDrive } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import { Border_Card } from "../../../components";

import {
  getGoogleStatus,
  getGoogleAuthUrl,
  unlinkGoogleDrive,
} from "../../../api/integrationsApi";

function Badge({ color = "default", children }) {
  const styles =
    color === "success"
      ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-100"
      : color === "danger"
      ? "border-red-400/40 bg-red-500/20 text-red-100"
      : "border-white/15 bg-white/15 text-white";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs ${styles}`}
    >
      {children}
    </span>
  );
}

function ConfirmModal({ open, title, description, confirmText, onConfirm, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/20 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between p-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            className="rounded-lg p-2 text-white/70 hover:text-white hover:bg-white/10"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="px-4 pb-4 text-white/90">{description}</div>

        <div className="flex items-center justify-end gap-3 px-4 pb-4">
          <button
            className="rounded-xl px-4 py-2 text-sm border border-white/15 text-white hover:bg-white/10"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-xl px-4 py-2 text-sm bg-red-500/90 hover:bg-red-500 text-white shadow"
            onClick={() => {
              onConfirm?.();
              onClose?.();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

function AppRow({ icon: Icon, title, description, linked, onLink, onUnlink }) {
  return (
    <div className="group relative flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-4 hover:bg-white/15 transition">
      <div className="flex items-center gap-3 w-full">
        <div className="rounded-xl border border-white/10 bg-white/10 p-2">
          <Icon className="w-8 h-8" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            {linked ? <Badge color="success">Linked</Badge> : <Badge>Not linked</Badge>}
          </div>
          <p className="text-sm text-white/70 truncate">{description}</p>
        </div>
      </div>

      {linked ? (
        <button
          className="rounded-2xl border border-red-400/40 bg-red-500/30 px-4 py-2 text-sm font-semibold text-red-100 hover:bg-red-500/40"
          onClick={onUnlink}
        >
          Unlink
        </button>
      ) : (
        <button
          className="rounded-2xl border border-white/15 bg-accent-blue px-5 py-2 text-sm font-semibold text-white hover:brightness-110"
          onClick={onLink}
        >
          Link
        </button>
      )}
    </div>
  );
}

export default function ConnectedApps() {
  const [driveLinked, setDriveLinked] = useState(false);
  const [unlinkDriveOpen, setUnlinkDriveOpen] = useState(false);

  // Load the status on mount
  useEffect(() => {
    async function loadStatus() {
      try {
        const status = await getGoogleStatus();
        setDriveLinked(status.connected);
      } catch (err) {
        console.error("Failed to load drive status:", err);
      }
    }
    loadStatus();
  }, []);

  // Start Google OAuth flow
  const handleDriveLink = async () => {
    try {
      const { auth_url } = await getGoogleAuthUrl();
      window.location.href = auth_url; // redirect to Google
    } catch (err) {
      console.error("Failed to get Google Auth URL", err);
    }
  };

  const handleDriveUnlink = async () => {
    try {
      await unlinkGoogleDrive();
      setDriveLinked(false);
    } catch (err) {
      console.error("Failed to unlink Drive", err);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">Connected Apps</h2>
          <p className="text-sm text-white/70">Manage which apps are linked to CoreMind.</p>
        </div>
      </div>

      <hr className="border-white/10 my-4" />

      <div className="space-y-4">
        <AppRow
          icon={FaGoogleDrive}
          title="Google Drive"
          description="Query your Drive files inside CoreMind."
          linked={driveLinked}
          onLink={handleDriveLink}
          onUnlink={() => setUnlinkDriveOpen(true)}
        />

        <AppRow
          icon={SiNotion}
          title="Notion"
          description="Connect Notion pages (coming soon)."
          linked={false}
          onLink={() => alert("Coming soon")}
          onUnlink={() => {}}
        />
      </div>

      {/* Confirm unlink modal */}
      <ConfirmModal
        open={unlinkDriveOpen}
        title="Unlink Google Drive?"
        description="CoreMind will lose access to your Drive files until you link again."
        confirmText="Unlink"
        onConfirm={handleDriveUnlink}
        onClose={() => setUnlinkDriveOpen(false)}
      />
    </div>
  );
}
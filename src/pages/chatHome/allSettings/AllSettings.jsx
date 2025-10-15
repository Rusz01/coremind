import React, { useState } from "react";
import { Border_Card } from "../../../components";
import { IoMdSettings, IoMdApps } from "react-icons/io";
import { MdOutlineSecurity, MdAccountCircle } from "react-icons/md";
import { FaGoogleDrive } from "react-icons/fa";
import { SiNotion } from "react-icons/si";

function Badge({ color = "default", children }) {
  const styles =
    color === "success"
      ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-100"
      : color === "danger"
      ? "border-red-400/40 bg-red-500/20 text-red-100"
      : "border-white/15 bg-white/15 text-white";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs ${styles}`}>
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

      <div className="flex items-center gap-2">
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
    </div>
  );
}

function AllSettings() {
  const [unlinkDriveOpen, setUnlinkDriveOpen] = useState(false);

  // mock state — drive linked, notion not linked
  const [driveLinked, setDriveLinked] = useState(true);
  const [notionLinked, setNotionLinked] = useState(false);

  const handleDriveUnlink = () => {
    // TODO: call your unlink API
    setDriveLinked(false);
  };
  const handleDriveLink = () => {
    // TODO: call your link/consent flow
    setDriveLinked(true);
  };
  const handleNotionLink = () => {
    setNotionLinked(true);
  };
  const handleNotionUnlink = () => {
    setNotionLinked(false);
  };

  return (
    <div className="z-100">
      <Border_Card>
        {/* Denser inner panel for readability */}
          <div className="w-[900px] max-w-full h-[900px] gap-6">
            {/* Sidebar */}
            <aside className="rounded-2xl border border-white/10 bg-white/10 p-4 mb-5">
              <h2 className="text-xl font-semibold mb-4 text-center">Settings</h2>
              <nav className="flex text-base w-full justify-around">
                <button
                  className="flex items-center gap-3 rounded-xl px-5 py-2 text-white/80 hover:text-white hover:bg-white/10 transition"
                  type="button"
                >
                  <IoMdSettings className="w-5 h-5" /> General
                </button>

                <button
                  className="flex items-center rounded-xl px-5 py-2 bg-accent-blue/20 text-white border border-accent-blue/40"
                  type="button"
                  aria-current="page"
                >
                  <span className="inline-flex items-center gap-3">
                    <IoMdApps className="w-5 h-5" /> Connected Apps
                  </span>
                </button>

                <button
                  className="flex items-center gap-3 rounded-xl px-5 py-2 text-white/80 hover:text-white hover:bg-white/10 transition"
                  type="button"
                >
                  <MdOutlineSecurity className="w-5 h-5" /> Security
                </button>

                <button
                  className="flex items-center gap-3 rounded-xl px-5 py-2 text-white/80 hover:text-white hover:bg-white/10 transition"
                  type="button"
                >
                  <MdAccountCircle className="w-5 h-5" /> Account
                </button>
              </nav>
            </aside>

            {/* Content */}
            <section className="rounded-2xl border border-white/10 bg-white/10 p-5 overflow-y-auto h-[760px]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold">Connected Apps</h2>
                  <p className="text-sm text-white/70">Check your currently connected apps or link a new app.</p>
                </div>
                <div className="hidden sm:block">
                  <input
                    type="text"
                    placeholder="Search apps…"
                    className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm placeholder-white/50 outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <hr className="border-white/10 my-4" />

              <div className="space-y-4">
                <AppRow
                  icon={FaGoogleDrive}
                  title="Google Drive"
                  description="Sync and query Docs, Sheets, Slides, and other Drive files."
                  linked={driveLinked}
                  onLink={handleDriveLink}
                  onUnlink={() => setUnlinkDriveOpen(true)}
                />

                <AppRow
                  icon={SiNotion}
                  title="Notion"
                  description="Sync pages and databases for unified search & editing."
                  linked={notionLinked}
                  onLink={handleNotionLink}
                  onUnlink={handleNotionUnlink}
                />
              </div>

              <div className="mt-6 flex items-center justify-end">
                <button
                  className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
                  type="button"
                >
                  Manage permissions
                </button>
              </div>
            </section>
          </div>
      </Border_Card>

      {/* Confirm unlink Drive */}
      <ConfirmModal
        open={unlinkDriveOpen}
        title="Unlink Google Drive?"
        description="CoreMind will lose access to your Drive files until you link again. Your local copies (if any) remain."
        confirmText="Unlink"
        onConfirm={handleDriveUnlink}
        onClose={() => setUnlinkDriveOpen(false)}
      />
    </div>
  );
}

export default AllSettings;

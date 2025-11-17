import React from 'react'


function Content({ heading, description, btnText }) {
  return (
    <div className="space-y-4">
      <div className="group relative md:flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-4 hover:bg-white/15 transition">
        <div className="flex items-center gap-3 w-full">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{heading}</h3>
            </div>
          <div className="marquee-container">
          <p className="text-sm text-white/70 marquee-text">{description}</p>
          </div>
          </div>
        </div>



        {btnText ? (
          <div className="flex items-center gap-2 mt-3 md:mt-0">
            <button
              className="rounded-2xl border border-red-400/40 bg-red-500/30 px-4 py-2 text-sm font-semibold text-red-100 hover:bg-red-500/40"
            >
              {btnText}
            </button>
          </div>
        ) : null}

      </div>
    </div>
  );
}

function Security() {
  return (
    <div>

      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">General Settings</h2>
          <p className="text-sm text-white/70">Change the theme and fonts.</p>
        </div>
      </div>

      <hr className="border-white/10 my-4" />

      {/* Theme Setting */}

      <div className="flex flex-col gap-4">


        {/* Delete Chat History */}
        <Content
          heading="Delete all chats"
          description="Delete all your chat history permanently."
          btnText="Delete" />

        {/* Delete Account */}
        <Content
          heading="Delete your account"
          description="Delete all your account data permanently."
          btnText="Delete" />

        {/* Logout from all Devices */}
        <Content
          heading="Logout from all devices"
          description="Logout from all your devices simultaneously."
          btnText="Logout" />

        {/* User ID */}
        <Content
          heading="User ID"
          description="Your unique user identifier." />

      </div>

    </div>
  )
}

export default Security
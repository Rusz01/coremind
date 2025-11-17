import React, { useState } from 'react'


function General() {
  const [theme, setTheme] = useState("dark");
  const [font, setFont] = useState("font1");

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

        <div className="space-y-4">
          <div className="group relative flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-4 hover:bg-white/15 transition">
            <div className="flex items-center gap-3 w-full">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">Theme</h3>
                </div>
                <p className="text-sm text-white/70 truncate">Change into dark or light mode.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-transparent border border-white/20 rounded-2xl px-5 py-2 text-sm text-white focus:outline-none"
              >
                <option value="dark" className="text-black">Dark</option>
                <option value="light" className="text-black">Light</option>
              </select>
            </div>

          </div>
        </div>

        {/* Font Setting */}
        <div className="space-y-4">
          <div className="group relative flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-4 hover:bg-white/15 transition">
            <div className="flex items-center gap-3 w-full">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">Font</h3>
                </div>
                <p className="text-sm text-white/70 truncate">Change chat font.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                className="bg-transparent border border-white/20 rounded-2xl px-5 py-2 text-sm text-white focus:outline-none"
              >
                <option value="font1" className="text-black">Font 1</option>
                <option value="font2" className="text-black">Font 2</option>
                <option value="font3" className="text-black">Font 3</option>
                <option value="font4" className="text-black">Font 4</option>
              </select>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default General

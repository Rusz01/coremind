import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ChatHome from "./pages/chatHome/ChatHome";
import Profile from "./pages/chatHome/profile/Profile";
import AllSettings from "./pages/chatHome/allSettings/AllSettings";
import General from "./pages/chatHome/allSettings/General";
import ConnectedApps from "./pages/chatHome/allSettings/ConnectedApps";
import Security from "./pages/chatHome/allSettings/Security";
import Account from "./pages/chatHome/allSettings/Account";

import GoogleCallback from "./pages/integrations/GoogleCallback";
import RequireAuth from "./utils/requireAuth";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auth/:mode" element={<Login />} />
        {/* Google Integration */}
        <Route
          path="/integrations/google/callback"
          element={<GoogleCallback />}
        />

        {/* Protected branch */}
        <Route
          path="/chat/*"
          element={
            <RequireAuth>
              <ChatHome />
            </RequireAuth>
          }
        >
          <Route path="profile" element={<Profile />} />

          {/* SETTINGS WITH NESTED ROUTES */}
          <Route path="allSettings" element={<AllSettings />}>
            <Route path="general" element={<General />} />
            <Route path="connectedApps" element={<ConnectedApps />} />
            <Route path="security" element={<Security />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Route>
      </>
    )
  );

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
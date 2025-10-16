// src/App.jsx
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import Home from './pages/home/Home'
import Login from './pages/login/Login';
import ChatHome from './pages/chatHome/ChatHome';
import Profile from './pages/chatHome/profile/Profile';
import AllSettings from './pages/chatHome/allSettings/AllSettings';

import RequireAuth from './utils/requireAuth'; // <-- add this

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/auth/:mode" element={<Login />} />

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
          <Route path="allSettings" element={<AllSettings />} />
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

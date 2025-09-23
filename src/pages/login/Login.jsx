import React, { useEffect, useMemo, useState } from "react";
import { Border_Card, Header } from "../../components";
import Other_Login from "./Other_Login";
import { useParams, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";

import google from "../../assets/company_logos/google.svg";
import microsoft from "../../assets/company_logos/microsoft.svg";
import Alert from "../../components/Alert";

function Login() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [user, setUser] = useState(null);
  const [showPw, setShowPw] = useState(false);

  // alert state
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertVariant, setAlertVariant] = useState("info"); // "success" | "error" | "info"

  const { mode: rawMode } = useParams(); // expects "Login" | "Register"
  const mode = rawMode === "Register" ? "Register" : "Login";
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  // validations
  const emailValid = useMemo(() => /\S+@\S+\.\S+/.test(email), [email]);
  const passwordValid = useMemo(() => password.length >= 6, [password]);
  const fullNameValid = useMemo(
    () => mode === "Login" || (mode === "Register" && fullName.trim().length >= 2),
    [mode, fullName]
  );
  const formValid = emailValid && passwordValid && fullNameValid;

  // show errors only after typing
  const emailInvalid = email.length > 0 && !emailValid;
  const passwordInvalid = password.length > 0 && !passwordValid;
  const fullNameInvalid =
    mode === "Register" && fullName.trim().length > 0 && fullName.trim().length < 2;

  const alertClass = useMemo(() => {
    if (alertVariant === "success") return "border-green-300 bg-green-50 text-green-800";
    if (alertVariant === "error") return "border-red-300 bg-red-50 text-red-800";
    return "border-blue-300 bg-blue-50 text-blue-800";
  }, [alertVariant]);

  const popAlert = (title, message, variant = "info") => {
    setAlertTitle(title);
    setAlertMsg(message);
    setAlertVariant(variant);
    setAlertOpen(true);
  };

  // SIGN UP
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!formValid) {
      popAlert("Check your form", "Please fix the highlighted fields and try again.", "error");
      return;
    }
    setBusy(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (fullName) await updateProfile(cred.user, { displayName: fullName });
      popAlert("Account created", "Welcome to CoreMind!", "success");
      setTimeout(() => navigate("/auth/Register"), 800); // adjust if you prefer /auth/Login or /chat
    } catch (error) {
      popAlert("Sign up failed", error?.message || "Something went wrong.", "error");
    } finally {
      setBusy(false);
    }
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formValid) {
      popAlert("Check your form", "Please fix the highlighted fields and try again.", "error");
      return;
    }
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      popAlert("Welcome back", "You're signed in.", "success");
      setTimeout(() => navigate("/chat"), 600);
    } catch (error) {
      popAlert("Login failed", error?.message || "Invalid credentials.", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen pt-10 lg:px-40 mx-auto bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      {/* Alert fixed at top */}
      <Alert
        title={alertTitle}
        message={alertMsg}
        open={alertOpen}
        setOpen={setAlertOpen}
        autoHideMs={6000}
        className={alertClass}
      />

      <Header />

      <div className="flex justify-center items-center mt-16 px-4">
        <div className="w-full max-w-xl">
          {/* Glass card */}
          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <div className="absolute -top-6 left-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {mode}
            </div>

            <div className="px-6 sm:px-8 py-10">
              <h2 className="text-3xl sm:text-4xl text-center font-semibold tracking-tight mb-8">
                {mode} to <span className="text-accent-blue">CoreMind</span>
              </h2>

              {/* form */}
              <form
                className="mt-2 flex flex-col gap-5 text-base"
                onSubmit={mode === "Register" ? handleSignUp : handleLogin}
              >
                {mode === "Register" && (
                  <div className="space-y-2">
                    <label className="block text-sm text-white/80">Full name</label>
                    <div
                      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 bg-white/5 ${
                        fullNameInvalid ? "border-red-400/60" : "border-white/10"
                      }`}
                    >
                      <svg className="h-5 w-5 opacity-80" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5Zm0 2c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6Z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Jane Doe"
                        className="bg-transparent outline-none flex-1 placeholder-white/40"
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    {fullNameInvalid && (
                      <p className="text-xs text-red-300">Please enter at least 2 characters.</p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-sm text-white/80">Email</label>
                  <div
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 bg-white/5 ${
                      emailInvalid ? "border-red-400/60" : "border-white/10"
                    }`}
                  >
                    <svg className="h-5 w-5 opacity-80" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v1l10 6 10-6V6c0-1.1-.9-2-2-2Zm0 6.3-8.5 5.1c-.3.2-.7.2-1 0L2 10.3V18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-7.7Z" />
                    </svg>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      className="bg-transparent outline-none flex-1 placeholder-white/40"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {emailInvalid && (
                    <p className="text-xs text-red-300">Enter a valid email address.</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-white/80">Password</label>
                  <div
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 bg-white/5 ${
                      passwordInvalid ? "border-red-400/60" : "border-white/10"
                    }`}
                  >
                    <svg className="h-5 w-5 opacity-80" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a5 5 0 00-5-5Zm-3 8V6a3 3 0 016 0v3H9Z" />
                    </svg>
                    <input
                      type={showPw ? "text" : "password"}
                      placeholder="••••••••"
                      className="bg-transparent outline-none flex-1 placeholder-white/40"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((s) => !s)}
                      className="text-xs rounded-full px-2 py-1 border border-white/10 hover:border-white/30"
                      aria-label={showPw ? "Hide password" : "Show password"}
                    >
                      {showPw ? "Hide" : "Show"}
                    </button>
                  </div>
                  {passwordInvalid && (
                    <p className="text-xs text-red-300">Use at least 6 characters.</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={busy || !formValid}
                  className={`mt-2 inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-medium transition
                    ${busy || !formValid
                      ? "bg-accent-blue/50 cursor-not-allowed"
                      : "bg-accent-blue hover:brightness-110 active:brightness-125"}`}
                >
                  {busy && (
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity=".25" />
                      <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  )}
                  <span>{busy ? "Please wait…" : mode}</span>
                </button>
              </form>

              {/* helpers / routes */}
              {mode === "Login" ? (
                <>
                  <p className="text-accent-blue text-center text-sm sm:text-base mt-6 font-semibold">
                    <a href="/forgot" className="hover:underline">
                      Forgot password?
                    </a>
                  </p>
                  <p className="text-center text-sm sm:text-base mt-3">
                    Don&apos;t have an account?{" "}
                    <button
                      onClick={() => navigate("/auth/Register")}
                      className="text-accent-blue font-semibold hover:underline"
                    >
                      Register now
                    </button>
                  </p>
                </>
              ) : (
                <p className="text-center text-sm sm:text-base mt-6">
                  Already have an account?{" "}
                  <button
                    onClick={() => navigate("/auth/Login")}
                    className="text-accent-blue font-semibold hover:underline"
                  >
                    Login now
                  </button>
                </p>
              )}

              {/* divider */}
              <div className="flex items-center justify-center mt-8 mb-6">
                <hr className="border-white/20 w-2/4" />
                <p className="mx-4 text-white/60 text-sm">OR</p>
                <hr className="border-white/20 w-2/4" />
              </div>

              {/* federated providers */}
              <Other_Login img={google} text="Google" />
              <Other_Login img={microsoft} text="Microsoft" />

              <p className="text-center mt-10 text-white/60 text-sm">
                &copy; {new Date().getFullYear()} CoreMind. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

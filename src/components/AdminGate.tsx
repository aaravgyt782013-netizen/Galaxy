"use client";

import { useEffect, useState } from "react";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<"checking" | "out" | "in">("checking");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setState(data?.authenticated ? "in" : "out"))
      .catch(() => setState("out"));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });
      if (res.ok) {
        setState("in");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.error ?? "Login failed");
      }
    } catch {
      setError("Network error — dobara try karein.");
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setState("out");
    setPassword("");
  };

  if (state === "checking") {
    return (
      <main className="page_body item-view" id="main">
        <div className="main-container">
          <p className="admin-muted">Checking session…</p>
        </div>
      </main>
    );
  }

  if (state === "out") {
    return (
      <main className="page_body item-view" id="main">
        <div className="main-container admin-login-wrap">
          <form className="post-wrapper admin-login" onSubmit={submit}>
            <h1 className="post-title">Admin Login</h1>
            <p className="admin-muted">Galaxy Setup Pro control panel</p>

            <label className="admin-field">
              <span>Username</span>
              <input
                type="text"
                value={user}
                autoComplete="username"
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </label>

            <label className="admin-field">
              <span>Password</span>
              <input
                type="password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            {error ? <p className="admin-error">{error}</p> : null}

            <button className="gsh-btn" type="submit" disabled={busy}>
              {busy ? "Logging in…" : "Log in"}
            </button>

            <p className="admin-hint">
              Demo credentials: <b>admin</b> / <b>galaxy123</b> — production mein{" "}
              <code>ADMIN_USER</code> aur <code>ADMIN_PASSWORD</code> env vars set karein.
            </p>
          </form>
        </div>
      </main>
    );
  }

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <strong>Control Panel</strong>
        <div className="admin-topbar-actions">
          <a className="gsh-filter" href="/?preview=1" target="_blank" rel="noopener noreferrer">
            Preview draft
          </a>
          <button type="button" className="gsh-filter" onClick={logout}>
            Log out
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

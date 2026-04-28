"use client";

import { useState } from "react";
import { Shield, ArrowRight, GitBranch, Scan, FileSearch } from "lucide-react";

export default function Navbar() {
  const [isLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("github_token");
    }
    return false;
  });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--ink-subtle)]"
         style={{ background: "rgba(9, 9, 11, 0.85)", backdropFilter: "blur(12px)" }}>
      <div className="max-container flex items-center justify-between h-14">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-md flex items-center justify-center"
               style={{ background: "var(--ink-gold-dim)", border: "1px solid rgba(226, 192, 68, 0.2)" }}>
            <Shield className="w-4 h-4" style={{ color: "var(--ink-gold)" }} />
          </div>
          <span className="text-sm font-semibold tracking-tight"
                style={{ color: "var(--ink-white)" }}>
            ChaosMonkey
          </span>
        </a>

        {/* Right */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <a href="/dashboard" className="btn btn-secondary" style={{ fontSize: "0.8125rem", padding: "7px 16px" }}>
              <GitBranch className="w-3.5 h-3.5" />
              Dashboard
            </a>
          ) : (
            <a href="http://localhost:8000/auth/github/login"
               className="btn btn-secondary"
               style={{ fontSize: "0.8125rem", padding: "7px 16px" }}>
              Sign in with GitHub
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

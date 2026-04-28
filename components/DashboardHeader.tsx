"use client";

import { Shield, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
  username?: string;
  avatarUrl?: string;
  loading?: boolean;
}

export default function DashboardHeader({ username, avatarUrl, loading }: DashboardHeaderProps) {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("github_token");
    router.push("/");
  };

  return (
    <header style={{
      borderBottom: "1px solid var(--ink-subtle)",
      background: "rgba(9, 9, 11, 0.85)",
      backdropFilter: "blur(12px)",
    }}>
      <div className="max-container-lg flex items-center justify-between h-14">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md flex items-center justify-center"
               style={{ background: "var(--ink-gold-dim)", border: "1px solid rgba(226, 192, 68, 0.2)" }}>
            <Shield className="w-4 h-4" style={{ color: "var(--ink-gold)" }} />
          </div>
          <span className="text-sm font-semibold tracking-tight" style={{ color: "var(--ink-white)" }}>
            ChaosMonkey
          </span>
        </a>

        {/* Right */}
        <div className="flex items-center gap-4">
          {loading ? (
            <div className="skeleton" style={{ width: "80px", height: "24px" }} />
          ) : username ? (
            <div className="flex items-center gap-3">
              {avatarUrl && (
                <img src={avatarUrl} alt={username}
                     className="w-6 h-6 rounded-full"
                     style={{ border: "1px solid var(--ink-muted)" }} />
              )}
              <span style={{ color: "var(--ink-mid)", fontSize: "0.8125rem" }}>
                {username}
              </span>
              <button onClick={handleSignOut} className="btn btn-ghost" style={{ padding: "6px 10px" }}>
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

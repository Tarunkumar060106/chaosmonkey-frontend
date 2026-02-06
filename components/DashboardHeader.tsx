"use client";

import { LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
  username?: string;
  loading?: boolean;
}

export default function DashboardHeader({
  username,
  loading = false,
}: DashboardHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("github_token");
    router.push("/");
  };

  return (
    <div className="border-b border-amber-500/10 bg-[#080808] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">
              Control Console
            </h1>
            {loading ? (
              <div className="h-4 w-32 bg-white/5 animate-pulse" />
            ) : (
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                Operator:{" "}
                <span className="text-amber-500">
                  {username || "Anonymous"}
                </span>
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button className="p-3 border border-white/10 text-gray-400 hover:text-white hover:border-amber-500/20 transition-all">
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-3 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/20 transition-all text-[10px] font-bold uppercase tracking-widest"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Disconnect</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

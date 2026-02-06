import React, { useEffect, useState } from "react";
import {
  Github,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Terminal,
  ArrowRight,
  XCircle,
} from "lucide-react";

interface AuthCallbackProps {
  onComplete: () => void;
  status?: "loading" | "success" | "error";
}

const AuthCallback: React.FC<AuthCallbackProps> = ({
  onComplete,
  status = "loading",
}) => {
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const protocolLogs = [
    "POST /auth/github/callback HTTP/1.1",
    "Handshaking with api.github.com...",
    "Retrieving OAuth v2 scope authorization...",
    "Identity verified: @chaos_dev_01",
    "Mapping repository webhooks...",
    "Initializing ChaosMonkey Runtime Agent...",
    "Injecting safety kill-switches (Level 1)...",
    "Session established. Token expires in 24h.",
  ];

  const errorLogs = [
    "POST /auth/github/callback HTTP/1.1",
    "Handshaking with api.github.com...",
    "ERROR: Authorization failed",
    "Redirecting to home...",
  ];

  useEffect(() => {
    if (status === "error") {
      setLogs(errorLogs);
      setStep(errorLogs.length);
      return;
    }

    if (step < protocolLogs.length) {
      const timer = setTimeout(
        () => {
          setLogs((prev) => [...prev, protocolLogs[step]]);
          setStep((prev) => prev + 1);
        },
        400 + Math.random() * 800,
      );
      return () => clearTimeout(timer);
    }
  }, [step, status]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#080808]">
      <div className="max-w-2xl w-full industrial-border bg-[#0c0c0c] p-8 md:p-12 relative overflow-hidden">
        {/* Decorative corner elements */}
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Github className="w-32 h-32 text-amber-500" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-none">
              {status === "error" ? (
                <XCircle className="w-6 h-6 text-red-500" />
              ) : step < protocolLogs.length ? (
                <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
              ) : (
                <CheckCircle2 className="w-6 h-6 text-cyan-400" />
              )}
            </div>
            <div>
              <h2 className="text-white font-black uppercase italic tracking-tighter text-2xl">
                {status === "error"
                  ? "Authorization Failed"
                  : step < protocolLogs.length
                    ? "Authorizing Identity"
                    : "Identity Verified"}
              </h2>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                OAuth_Flow // GitHub_Service_Mesh
              </p>
            </div>
          </div>

          {/* Terminal Log Output */}
          <div className="bg-black/60 border border-white/5 p-6 font-mono text-[12px] mb-8 h-64 overflow-y-auto space-y-2">
            <div className="flex items-center gap-2 text-amber-500/40 mb-4 font-bold uppercase tracking-widest text-[9px]">
              <Terminal className="w-3 h-3" /> Auth_System_Journal
            </div>
            {logs.map((log, i) => (
              <div
                key={i}
                className={`flex gap-3 ${
                  log.includes("ERROR")
                    ? "text-red-400 font-bold"
                    : log.includes("success") || log.includes("Verified")
                      ? "text-cyan-400"
                      : "text-gray-400"
                }`}
              >
                <span className="text-amber-500/30">
                  [{new Date().toLocaleTimeString()}]
                </span>
                <span>{log}</span>
              </div>
            ))}
            {step < protocolLogs.length && status !== "error" && (
              <div className="w-2 h-4 bg-amber-500 animate-pulse inline-block align-middle ml-1" />
            )}
          </div>

          {step === protocolLogs.length && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-4 p-4 bg-cyan-500/5 border border-cyan-500/20">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <div className="text-[11px] text-gray-300 font-bold uppercase tracking-widest leading-none">
                  Liveness checks mapped for 14 clusters. <br />
                  <span className="text-cyan-400/60 font-normal">
                    Environment: Production (Read-Only)
                  </span>
                </div>
              </div>

              <button
                onClick={onComplete}
                className="w-full bg-amber-500 text-black px-8 py-4 font-black uppercase text-xs tracking-[0.2em] hover:bg-white transition-all amber-glow flex items-center justify-center gap-3"
              >
                Enter Control Console
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;

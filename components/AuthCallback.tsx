"use client";

import React, { useEffect, useState } from "react";
import { Github, CheckCircle2, Terminal, ArrowRight, XCircle } from "lucide-react";

interface AuthCallbackProps {
  onComplete: () => void;
  status?: "loading" | "success" | "error";
}

const AuthCallback: React.FC<AuthCallbackProps> = ({ onComplete, status = "loading" }) => {
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const protocolLogs = [
    "POST /auth/github/callback HTTP/1.1",
    "Handshaking with api.github.com...",
    "Retrieving OAuth v2 scope authorization...",
    "Identity verified",
    "Mapping repository access...",
    "Session established.",
  ];

  const errorLogs = [
    "POST /auth/github/callback HTTP/1.1",
    "ERROR: Authorization failed",
    "Redirecting...",
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
        350 + Math.random() * 500,
      );
      return () => clearTimeout(timer);
    }
  }, [step, status]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6"
         style={{ background: "var(--ink-black)" }}>
      <div className="max-w-lg w-full surface-card p-8 md:p-10 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 p-4" style={{ opacity: 0.05 }}>
          <Github className="w-24 h-24" style={{ color: "var(--ink-gold)" }} />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-md flex items-center justify-center"
                 style={{
                   background: status === "error" ? "var(--ink-rose-dim)" : "var(--ink-gold-dim)",
                   border: `1px solid ${status === "error" ? "rgba(244, 63, 94, 0.2)" : "rgba(226, 192, 68, 0.2)"}`,
                 }}>
              {status === "error" ? (
                <XCircle className="w-5 h-5" style={{ color: "var(--ink-rose)" }} />
              ) : step < protocolLogs.length ? (
                <div className="w-2.5 h-2.5 rounded-full loading-dot"
                     style={{ background: "var(--ink-gold)" }} />
              ) : (
                <CheckCircle2 className="w-5 h-5" style={{ color: "var(--ink-emerald)" }} />
              )}
            </div>
            <div>
              <h2 className="text-headline" style={{ fontSize: "1.125rem" }}>
                {status === "error"
                  ? "Authorization Failed"
                  : step < protocolLogs.length
                    ? "Authorizing..."
                    : "Authorized"}
              </h2>
              <p className="text-code" style={{ fontSize: "0.6875rem", color: "var(--ink-dim)" }}>
                GitHub OAuth 2.0
              </p>
            </div>
          </div>

          {/* Terminal */}
          <div className="surface-inset p-5 font-mono text-xs mb-6 overflow-y-auto"
               style={{ height: "180px" }}>
            <div className="flex items-center gap-2 mb-3"
                 style={{ color: "var(--ink-dim)", fontSize: "0.625rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <Terminal className="w-3 h-3" />
              auth_log
            </div>
            <div className="space-y-1.5">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-2"
                     style={{
                       color: log.includes("ERROR")
                         ? "var(--ink-rose)"
                         : log.includes("verified") || log.includes("established")
                           ? "var(--ink-emerald)"
                           : "var(--ink-mid)",
                     }}>
                  <span style={{ color: "var(--ink-dim)" }}>
                    [{new Date().toLocaleTimeString()}]
                  </span>
                  <span>{log}</span>
                </div>
              ))}
              {step < protocolLogs.length && status !== "error" && (
                <div className="w-1.5 h-3.5 inline-block ml-1"
                     style={{ background: "var(--ink-gold)", animation: "pulse-dot 1s infinite" }} />
              )}
            </div>
          </div>

          {/* Complete state */}
          {step >= protocolLogs.length && status !== "error" && (
            <div className="animate-in">
              <button onClick={onComplete}
                      className="btn btn-primary w-full"
                      style={{ padding: "12px 24px" }}>
                Continue to Dashboard
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

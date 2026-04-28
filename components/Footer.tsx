import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--ink-subtle)" }}>
      <div className="max-container py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" style={{ color: "var(--ink-dim)" }} />
            <span className="text-sm" style={{ color: "var(--ink-dim)" }}>
              ChaosMonkey
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="https://github.com/LakshyaBetala/cerebro"
               target="_blank"
               rel="noreferrer"
               className="text-xs transition-colors"
               style={{ color: "var(--ink-dim)" }}
               onMouseEnter={(e) => e.currentTarget.style.color = "var(--ink-mid)"}
               onMouseLeave={(e) => e.currentTarget.style.color = "var(--ink-dim)"}>
              GitHub
            </a>
            <span className="text-xs" style={{ color: "var(--ink-muted)" }}>
              Built for vibe coders
            </span>
          </div>

          {/* Copyright */}
          <p className="text-xs" style={{ color: "var(--ink-dim)" }}>
            &copy; {new Date().getFullYear()} ChaosMonkey
          </p>
        </div>
      </div>
    </footer>
  );
}

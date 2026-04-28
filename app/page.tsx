"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, GitBranch, Shield, Scan, FileSearch, Zap, ChevronRight } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [repoUrl, setRepoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim()) return;

    setIsSubmitting(true);
    // Navigate to explore page with the URL
    router.push(`/explore?url=${encodeURIComponent(repoUrl.trim())}`);
  };

  const exampleRepos = [
    { name: "vercel/next.js", url: "https://github.com/vercel/next.js" },
    { name: "facebook/react", url: "https://github.com/facebook/react" },
    { name: "fastapi/fastapi", url: "https://github.com/fastapi/fastapi" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--ink-black)" }}>
      <Navbar />

      <main className="flex-1">
        {/* ═══ HERO ═══ */}
        <section className="pt-32 pb-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Tagline */}
            <div className="animate-in stagger-1 mb-8">
              <span className="badge badge-gold" style={{ fontSize: "0.75rem", padding: "5px 14px" }}>
                <Zap className="w-3 h-3" />
                Built for vibe coders
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display animate-in stagger-2 mb-6"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  color: "var(--ink-white)",
                  lineHeight: "1.05",
                  letterSpacing: "-0.03em",
                }}>
              Understand what{" "}
              <span style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, var(--ink-gold) 0%, #f5e6a3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                you built.
              </span>
            </h1>

            {/* Subtext */}
            <p className="animate-in stagger-3 mb-12"
               style={{
                 fontSize: "1.125rem",
                 color: "var(--ink-mid)",
                 lineHeight: "1.6",
                 maxWidth: "520px",
                 margin: "0 auto 48px",
               }}>
              Paste any GitHub repo. Get a full architecture breakdown,
              security audit, and improvement roadmap in 30 seconds.
            </p>

            {/* ── Input Bar ── */}
            <form onSubmit={handleAnalyze} className="animate-in stagger-4">
              <div className="relative max-w-2xl mx-auto">
                <div className="flex gap-2"
                     style={{
                       padding: "6px",
                       background: "var(--ink-deep)",
                       border: "1px solid var(--ink-subtle)",
                       borderRadius: "var(--radius-lg)",
                     }}>
                  <div className="flex items-center pl-3" style={{ color: "var(--ink-dim)" }}>
                    <GitBranch className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/user/repo"
                    className="flex-1 bg-transparent border-none outline-none text-base"
                    style={{
                      color: "var(--ink-white)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9375rem",
                      padding: "10px 8px",
                    }}
                    id="repo-url-input"
                  />
                  <button
                    type="submit"
                    disabled={!repoUrl.trim() || isSubmitting}
                    className="btn btn-primary"
                    style={{ borderRadius: "var(--radius-md)", padding: "10px 24px" }}
                    id="analyze-button"
                  >
                    {isSubmitting ? (
                      <span className="loading-dot">Analyzing</span>
                    ) : (
                      <>
                        Analyze
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Hint text */}
            <p className="animate-in stagger-5 mt-4"
               style={{ fontSize: "0.8125rem", color: "var(--ink-dim)" }}>
              No signup required for public repos
            </p>

            {/* Example repos */}
            <div className="animate-in stagger-6 mt-6 flex flex-wrap items-center justify-center gap-2">
              <span style={{ fontSize: "0.75rem", color: "var(--ink-dim)" }}>Try:</span>
              {exampleRepos.map((repo) => (
                <button
                  key={repo.name}
                  onClick={() => {
                    setRepoUrl(repo.url);
                  }}
                  className="transition-colors"
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--ink-mid)",
                    background: "var(--ink-subtle)",
                    border: "1px solid var(--ink-muted)",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--ink-gold)";
                    e.currentTarget.style.borderColor = "rgba(226, 192, 68, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--ink-mid)";
                    e.currentTarget.style.borderColor = "var(--ink-muted)";
                  }}
                >
                  {repo.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FEATURES ═══ */}
        <section className="py-24 px-6"
                 style={{ borderTop: "1px solid var(--ink-subtle)" }}>
          <div className="max-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Scan,
                  title: "Architecture Mapping",
                  description: "Instant Mermaid diagrams showing how your frontend, backend, and database connect. See the big picture in seconds.",
                },
                {
                  icon: Shield,
                  title: "Security Audit",
                  description: "Find hardcoded secrets, injection risks, and auth flaws. Each vulnerability includes severity, location, and a fix suggestion.",
                },
                {
                  icon: FileSearch,
                  title: "Plain English Explanations",
                  description: "Toggle between simple and advanced mode. Understand your codebase whether you're a founder pitching or a developer debugging.",
                },
              ].map((feature, i) => (
                <div
                  key={feature.title}
                  className={`surface-card p-8 animate-in stagger-${i + 1}`}
                  style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                       style={{
                         background: "var(--ink-gold-dim)",
                         border: "1px solid rgba(226, 192, 68, 0.15)",
                       }}>
                    <feature.icon className="w-5 h-5" style={{ color: "var(--ink-gold)" }} />
                  </div>
                  <h3 className="text-headline" style={{ fontSize: "1.125rem" }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: "var(--ink-mid)", fontSize: "0.9375rem", lineHeight: "1.65" }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-24 px-6"
                 style={{ borderTop: "1px solid var(--ink-subtle)" }}>
          <div className="max-container-sm text-center">
            <h2 className="font-display mb-4"
                style={{ fontSize: "2rem", color: "var(--ink-white)" }}>
              Private repos? Full power.
            </h2>
            <p className="mb-8" style={{ color: "var(--ink-mid)", fontSize: "1rem" }}>
              Sign in with GitHub to analyze private repositories, access Auto-Fix PRs, and unlock unlimited analyses.
            </p>
            <a href="http://localhost:8000/auth/github/login"
               className="btn btn-primary"
               style={{ padding: "12px 32px", fontSize: "0.9375rem" }}
               id="cta-github-login">
              Sign in with GitHub
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

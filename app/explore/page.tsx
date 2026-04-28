"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { analyzeUrl, pollJobStatus } from "@/services/api";
import { AnalysisReport, AnalysisTab, ExplainMode } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MermaidDiagram from "@/components/MermaidDiagram";
import {
  Shield, GitBranch, ArrowRight, RotateCcw, AlertTriangle,
  Network, Layers, Cable, Workflow, BookOpen, Bug, LinkIcon, Lightbulb,
  ChevronRight, ExternalLink, Lock,
} from "lucide-react";

function ExploreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const githubUrl = searchParams.get("url") || "";

  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AnalysisTab>("architecture");
  const [explainMode, setExplainMode] = useState<ExplainMode>("simple");
  const [progress, setProgress] = useState("Cloning repository...");

  // Progress messages
  const progressSteps = [
    "Cloning repository...",
    "Scanning code files...",
    "Chunking source code...",
    "Generating embeddings...",
    "Querying AI model...",
    "Building report...",
  ];

  useEffect(() => {
    if (!githubUrl) {
      router.push("/");
      return;
    }

    let pollInterval: NodeJS.Timeout;
    let progressIndex = 0;

    // Simulate progress messages
    const progressTimer = setInterval(() => {
      progressIndex = Math.min(progressIndex + 1, progressSteps.length - 1);
      setProgress(progressSteps[progressIndex]);
    }, 4000);

    const startAnalysis = async () => {
      try {
        const { job_id } = await analyzeUrl(githubUrl);

        pollInterval = setInterval(async () => {
          try {
            const statusRes = await pollJobStatus(job_id);
            if (statusRes.status === "complete") {
              clearInterval(pollInterval);
              clearInterval(progressTimer);
              setReport(statusRes.result);
              setStatus("done");
            } else if (statusRes.status === "error") {
              clearInterval(pollInterval);
              clearInterval(progressTimer);
              setError(statusRes.error || "Analysis failed.");
              setStatus("error");
            }
          } catch {
            clearInterval(pollInterval);
            clearInterval(progressTimer);
            setError("Lost connection to analysis server.");
            setStatus("error");
          }
        }, 2000);
      } catch (err) {
        clearInterval(progressTimer);
        setError("Failed to start analysis. Is the backend running?");
        setStatus("error");
      }
    };

    startAnalysis();

    return () => {
      if (pollInterval) clearInterval(pollInterval);
      clearInterval(progressTimer);
    };
  }, [githubUrl, router]);

  const repoName = githubUrl.replace("https://github.com/", "").replace(".git", "");

  const tabs: { id: AnalysisTab; label: string; icon: any }[] = [
    { id: "architecture", label: "Architecture", icon: Network },
    { id: "tech-stack", label: "Tech Stack", icon: Layers },
    { id: "connections", label: "Connections", icon: Cable },
    { id: "data-flow", label: "Data Flow", icon: Workflow },
    { id: "explained", label: "Explained", icon: BookOpen },
    { id: "vulnerabilities", label: "Vulnerabilities", icon: Bug },
    { id: "broken-links", label: "Broken Links", icon: LinkIcon },
    { id: "improvements", label: "Improvements", icon: Lightbulb },
  ];

  const getSeverityBadge = (severity: string) => {
    const map: Record<string, string> = {
      critical: "badge-critical",
      high: "badge-high",
      medium: "badge-medium",
      low: "badge-low",
    };
    return map[severity] || "badge-info";
  };

  // ── LOADING STATE ──
  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "var(--ink-black)" }}>
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center animate-in">
            <div className="mb-8">
              <div className="w-3 h-3 rounded-full mx-auto mb-6 loading-dot"
                   style={{ background: "var(--ink-gold)" }} />
              <h2 className="font-display mb-3"
                  style={{ fontSize: "1.75rem", color: "var(--ink-white)" }}>
                Analyzing Repository
              </h2>
              <p className="text-code mb-2" style={{ color: "var(--ink-dim)" }}>{repoName}</p>
              <p style={{ color: "var(--ink-mid)", fontSize: "0.875rem" }}>{progress}</p>
            </div>
            <div className="max-w-xs mx-auto">
              <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--ink-subtle)" }}>
                <div className="h-full rounded-full"
                     style={{
                       background: "var(--ink-gold)",
                       width: "60%",
                       animation: "shimmer 2s infinite",
                       backgroundSize: "200% 100%",
                       backgroundImage: `linear-gradient(90deg, var(--ink-gold) 25%, #f5e6a3 50%, var(--ink-gold) 75%)`,
                     }} />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── ERROR STATE ──
  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "var(--ink-black)" }}>
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center animate-in">
            <AlertTriangle className="w-12 h-12 mx-auto mb-6" style={{ color: "var(--ink-rose)" }} />
            <h2 className="font-display mb-3"
                style={{ fontSize: "1.5rem", color: "var(--ink-white)" }}>
              Analysis Failed
            </h2>
            <p className="mb-8 max-w-md mx-auto" style={{ color: "var(--ink-mid)", fontSize: "0.875rem" }}>
              {error}
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => window.location.reload()} className="btn btn-secondary">
                <RotateCcw className="w-4 h-4" />
                Retry
              </button>
              <button onClick={() => router.push("/")} className="btn btn-ghost">
                Back to Home
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── RESULTS ──
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--ink-black)" }}>
      <Navbar />

      <main className="flex-1 pt-14">
        {/* ── Summary Strip ── */}
        <div className="animate-in stagger-1" style={{ borderBottom: "1px solid var(--ink-subtle)" }}>
          <div className="max-container-lg py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Left: Score + Repo */}
              <div className="flex items-center gap-6">
                {/* Health Score */}
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="font-display" style={{
                      fontSize: "2.5rem",
                      color: (report?.health_score ?? 0) >= 70 ? "var(--ink-emerald)" :
                             (report?.health_score ?? 0) >= 40 ? "var(--ink-gold)" : "var(--ink-rose)",
                      lineHeight: "1",
                    }}>
                      {report?.health_score ?? 0}
                    </div>
                    <div style={{ fontSize: "0.6875rem", color: "var(--ink-dim)", marginTop: "2px" }}>
                      / 100
                    </div>
                  </div>
                </div>

                <div style={{ width: "1px", height: "40px", background: "var(--ink-subtle)" }} />

                {/* Repo info */}
                <div>
                  <h1 className="text-code" style={{ fontSize: "0.9375rem", color: "var(--ink-white)", fontWeight: 600 }}>
                    {repoName}
                  </h1>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {report?.tech_stack?.slice(0, 5).map((tech) => (
                      <span key={tech.name} className="badge badge-info" style={{ fontSize: "0.625rem" }}>
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Mode Toggle */}
              <div className="flex items-center gap-4">
                <div className="toggle" onClick={() => setExplainMode(explainMode === "simple" ? "advanced" : "simple")}>
                  <span className="toggle-label" style={{
                    color: explainMode === "simple" ? "var(--ink-gold)" : "var(--ink-dim)"
                  }}>
                    Simple
                  </span>
                  <div className={`toggle-track ${explainMode === "advanced" ? "active" : ""}`}>
                    <div className="toggle-thumb" />
                  </div>
                  <span className="toggle-label" style={{
                    color: explainMode === "advanced" ? "var(--ink-gold)" : "var(--ink-dim)"
                  }}>
                    Advanced
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div className="animate-in stagger-2" style={{ borderBottom: "1px solid var(--ink-subtle)" }}>
          <div className="max-container-lg">
            <div className="tab-bar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-item ${activeTab === tab.id ? "active" : ""}`}
                  id={`tab-${tab.id}`}
                >
                  <span className="flex items-center gap-1.5">
                    <tab.icon className="w-3.5 h-3.5" />
                    {tab.label}
                    {tab.id === "vulnerabilities" && report?.vulnerabilities?.length ? (
                      <span className="badge badge-critical" style={{ fontSize: "0.5625rem", padding: "1px 6px", marginLeft: "4px" }}>
                        {report.vulnerabilities.length}
                      </span>
                    ) : null}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tab Content ── */}
        <div className="max-container-lg py-8 animate-fade">
          {/* Architecture Tab */}
          {activeTab === "architecture" && (
            <div className="animate-fade">
              <h2 className="text-headline mb-2" style={{ fontSize: "1.25rem" }}>
                {explainMode === "simple" ? "How your app is structured" : "Architecture Diagram"}
              </h2>
              <p className="mb-6" style={{ color: "var(--ink-mid)", fontSize: "0.875rem" }}>
                {explainMode === "simple"
                  ? "This diagram shows the main parts of your app and how they talk to each other."
                  : "Component-level architecture showing service boundaries and communication patterns."}
              </p>
              <div className="surface-card p-8" style={{ minHeight: "300px" }}>
                <MermaidDiagram
                  nodes={report?.architecture?.nodes || []}
                  edges={report?.architecture?.edges || []}
                />
              </div>
            </div>
          )}

          {/* Tech Stack Tab */}
          {activeTab === "tech-stack" && (
            <div className="animate-fade">
              <h2 className="text-headline mb-2" style={{ fontSize: "1.25rem" }}>
                {explainMode === "simple" ? "What tools your app uses" : "Technology Stack Analysis"}
              </h2>
              <p className="mb-6" style={{ color: "var(--ink-mid)", fontSize: "0.875rem" }}>
                {explainMode === "simple"
                  ? "Here are all the frameworks and libraries we found in your code."
                  : "Detailed breakdown of dependencies, their usage patterns, and purposes."}
              </p>
              <div className="flex flex-col gap-3">
                {report?.tech_stack?.map((tech, i) => (
                  <div key={i} className="surface-card p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span style={{ color: "var(--ink-white)", fontWeight: 600, fontSize: "0.9375rem" }}>
                          {tech.name}
                        </span>
                        <span className="badge badge-info">{tech.category}</span>
                      </div>
                      <p style={{ color: "var(--ink-mid)", fontSize: "0.875rem" }}>{tech.purpose}</p>
                    </div>
                    {explainMode === "advanced" && tech.files_using?.length > 0 && (
                      <div style={{ flexShrink: 0 }}>
                        <div style={{ fontSize: "0.6875rem", color: "var(--ink-dim)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Used in
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {tech.files_using.map((f, j) => (
                            <span key={j} className="text-code" style={{
                              fontSize: "0.75rem",
                              background: "var(--ink-subtle)",
                              padding: "2px 8px",
                              borderRadius: "4px",
                            }}>
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Connections Tab */}
          {activeTab === "connections" && (
            <div className="animate-fade">
              <h2 className="text-headline mb-2" style={{ fontSize: "1.25rem" }}>
                {explainMode === "simple" ? "How the pieces talk to each other" : "Component Connections"}
              </h2>
              <p className="mb-6" style={{ color: "var(--ink-mid)", fontSize: "0.875rem" }}>
                {explainMode === "simple"
                  ? "Your app has different parts — here's how they communicate."
                  : "Inter-service communication patterns and protocols."}
              </p>
              <div className="flex flex-col gap-3">
                {report?.connections?.map((conn, i) => (
                  <div key={i} className="surface-card p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-code" style={{ color: "var(--ink-gold)", fontWeight: 600, fontSize: "0.875rem" }}>
                        {conn.from}
                      </span>
                      <ArrowRight className="w-4 h-4" style={{ color: "var(--ink-dim)" }} />
                      <span className="text-code" style={{ color: "var(--ink-gold)", fontWeight: 600, fontSize: "0.875rem" }}>
                        {conn.to}
                      </span>
                      {explainMode === "advanced" && (
                        <span className="badge badge-info">{conn.method}</span>
                      )}
                    </div>
                    <p style={{ color: "var(--ink-mid)", fontSize: "0.875rem" }}>{conn.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Data Flow Tab */}
          {activeTab === "data-flow" && (
            <div className="animate-fade">
              <h2 className="text-headline mb-2" style={{ fontSize: "1.25rem" }}>
                {explainMode === "simple" ? "What happens when someone uses your app" : "Request/Response Data Flow"}
              </h2>
              <p className="mb-6" style={{ color: "var(--ink-mid)", fontSize: "0.875rem" }}>
                {explainMode === "simple"
                  ? "Step by step — from when a user clicks something to what happens behind the scenes."
                  : "End-to-end data flow showing how requests propagate through the system."}
              </p>
              {report?.data_flow?.map((flow, fi) => (
                <div key={fi} className="mb-8">
                  <h3 className="text-headline mb-4" style={{ fontSize: "1rem" }}>{flow.title}</h3>
                  <div className="flex flex-col gap-0">
                    {flow.steps?.map((step, si) => (
                      <div key={si} className="flex gap-4"
                           style={{ paddingBottom: si < flow.steps.length - 1 ? "0" : "0" }}>
                        {/* Timeline */}
                        <div className="flex flex-col items-center" style={{ width: "32px", flexShrink: 0 }}>
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                               style={{
                                 background: "var(--ink-gold-dim)",
                                 color: "var(--ink-gold)",
                                 border: "1px solid rgba(226, 192, 68, 0.2)",
                               }}>
                            {step.step}
                          </div>
                          {si < flow.steps.length - 1 && (
                            <div style={{ width: "1px", height: "100%", minHeight: "24px", background: "var(--ink-subtle)" }} />
                          )}
                        </div>
                        {/* Content */}
                        <div className="surface-card p-4 flex-1 mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span style={{ color: "var(--ink-white)", fontWeight: 600, fontSize: "0.875rem" }}>
                              {step.action}
                            </span>
                            {explainMode === "advanced" && (
                              <span className="badge badge-info">{step.component}</span>
                            )}
                          </div>
                          <p style={{ color: "var(--ink-mid)", fontSize: "0.8125rem" }}>{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Explained Tab */}
          {activeTab === "explained" && (
            <div className="animate-fade">
              <h2 className="text-headline mb-2" style={{ fontSize: "1.25rem" }}>
                {explainMode === "simple" ? "What you built, in plain English" : "Technical Architecture Overview"}
              </h2>
              <div className="surface-card p-8 mt-6">
                <p style={{
                  color: "var(--ink-light)",
                  fontSize: explainMode === "simple" ? "1.0625rem" : "0.9375rem",
                  lineHeight: "1.8",
                  whiteSpace: "pre-wrap",
                  fontFamily: explainMode === "advanced" ? "var(--font-mono)" : "inherit",
                }}>
                  {explainMode === "simple" ? report?.simple_explanation : report?.advanced_explanation}
                </p>
              </div>
            </div>
          )}

          {/* Vulnerabilities Tab */}
          {activeTab === "vulnerabilities" && (
            <div className="animate-fade">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-headline mb-2" style={{ fontSize: "1.25rem" }}>
                    {explainMode === "simple" ? "Security problems we found" : "Security Vulnerabilities"}
                  </h2>
                  <p style={{ color: "var(--ink-mid)", fontSize: "0.875rem" }}>
                    {explainMode === "simple"
                      ? "These are issues that could let attackers break into your app."
                      : `${report?.vulnerabilities?.length || 0} vulnerabilities detected across the codebase.`}
                  </p>
                </div>
                {/* Auto-Fix CTA (Paid) */}
                <div className="hidden sm:flex items-center gap-2 surface-card px-4 py-2.5"
                     style={{ borderColor: "rgba(226, 192, 68, 0.15)" }}>
                  <Lock className="w-3.5 h-3.5" style={{ color: "var(--ink-gold)" }} />
                  <span style={{ color: "var(--ink-mid)", fontSize: "0.8125rem" }}>
                    Auto-Fix PRs
                  </span>
                  <span className="badge badge-gold">Pro</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {report?.vulnerabilities?.map((vuln, i) => (
                  <div key={i} className="surface-card p-5 group" style={{ cursor: "default" }}>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`severity-dot ${vuln.severity}`} />
                        <span style={{ color: "var(--ink-white)", fontWeight: 600, fontSize: "0.9375rem" }}>
                          {vuln.title}
                        </span>
                      </div>
                      <span className={`badge ${getSeverityBadge(vuln.severity)}`}>
                        {vuln.severity}
                      </span>
                    </div>
                    <p className="mb-3" style={{ color: "var(--ink-mid)", fontSize: "0.875rem" }}>
                      {vuln.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-code" style={{
                        fontSize: "0.75rem",
                        background: "var(--ink-subtle)",
                        padding: "3px 10px",
                        borderRadius: "4px",
                      }}>
                        {vuln.file}{vuln.line ? `:${vuln.line}` : ""}
                      </span>
                      {explainMode === "advanced" && vuln.fix_suggestion && (
                        <span style={{ color: "var(--ink-emerald)", fontSize: "0.8125rem" }}>
                          Fix: {vuln.fix_suggestion}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {(!report?.vulnerabilities || report.vulnerabilities.length === 0) && (
                  <div className="surface-card p-12 text-center">
                    <Shield className="w-10 h-10 mx-auto mb-4" style={{ color: "var(--ink-emerald)" }} />
                    <p style={{ color: "var(--ink-mid)" }}>No vulnerabilities detected. Your code looks clean!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Broken Links Tab */}
          {activeTab === "broken-links" && (
            <div className="animate-fade">
              <h2 className="text-headline mb-2" style={{ fontSize: "1.25rem" }}>
                {explainMode === "simple" ? "Broken connections in your code" : "Dead Imports & Missing Files"}
              </h2>
              <p className="mb-6" style={{ color: "var(--ink-mid)", fontSize: "0.875rem" }}>
                {explainMode === "simple"
                  ? "These are parts of your code that point to files or modules that don't exist."
                  : "Unresolvable imports, missing modules, and dead references."}
              </p>
              <div className="flex flex-col gap-3">
                {report?.broken_links?.map((link, i) => (
                  <div key={i} className="surface-card p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <LinkIcon className="w-4 h-4" style={{ color: "var(--ink-amber)" }} />
                      <span className="text-code" style={{ color: "var(--ink-white)", fontSize: "0.875rem", fontWeight: 600 }}>
                        {link.file}
                      </span>
                    </div>
                    <p className="mb-2" style={{ color: "var(--ink-mid)", fontSize: "0.875rem" }}>
                      Import: <code style={{ color: "var(--ink-rose)" }}>{link.import_path}</code> — {link.issue}
                    </p>
                    <p style={{ color: "var(--ink-emerald)", fontSize: "0.8125rem" }}>
                      💡 {link.suggestion}
                    </p>
                  </div>
                ))}
                {(!report?.broken_links || report.broken_links.length === 0) && (
                  <div className="surface-card p-12 text-center">
                    <LinkIcon className="w-10 h-10 mx-auto mb-4" style={{ color: "var(--ink-emerald)" }} />
                    <p style={{ color: "var(--ink-mid)" }}>No broken links detected. All imports resolve correctly!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Improvements Tab */}
          {activeTab === "improvements" && (
            <div className="animate-fade">
              <h2 className="text-headline mb-2" style={{ fontSize: "1.25rem" }}>
                {explainMode === "simple" ? "How to make your app better" : "Improvement Recommendations"}
              </h2>
              <p className="mb-6" style={{ color: "var(--ink-mid)", fontSize: "0.875rem" }}>
                {explainMode === "simple"
                  ? "Things you could add or change to make your app stronger, faster, and easier to maintain."
                  : "Prioritized technical debt and feature improvement recommendations."}
              </p>
              <div className="flex flex-col gap-3">
                {report?.improvements?.map((imp, i) => (
                  <div key={i} className="surface-card p-5">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" style={{ color: "var(--ink-gold)" }} />
                        <span style={{ color: "var(--ink-white)", fontWeight: 600, fontSize: "0.9375rem" }}>
                          {imp.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`badge ${imp.priority === "high" ? "badge-high" : imp.priority === "medium" ? "badge-medium" : "badge-low"}`}>
                          {imp.priority}
                        </span>
                        {explainMode === "advanced" && (
                          <span className="badge badge-info">{imp.category}</span>
                        )}
                      </div>
                    </div>
                    <p className="mb-2" style={{ color: "var(--ink-mid)", fontSize: "0.875rem" }}>
                      {imp.description}
                    </p>
                    {explainMode === "advanced" && (
                      <p style={{ color: "var(--ink-dim)", fontSize: "0.8125rem" }}>
                        Estimated effort: {imp.effort}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--ink-black)" }}>
        <div className="w-3 h-3 rounded-full loading-dot" style={{ background: "var(--ink-gold)" }} />
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}

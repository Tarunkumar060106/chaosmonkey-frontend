/* ═══════════════════════════════════════════════
   ChaosMonkey v2 — API Client
   ═══════════════════════════════════════════════ */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ── Core: One-step analyze (paste-and-go) ─────

export async function analyzeUrl(githubUrl: string) {
  const res = await fetch(`${BASE_URL}/api/repos/analyze-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ github_url: githubUrl }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Analysis failed" }));
    throw new Error(err.detail || "Failed to start analysis");
  }

  return res.json();
}

// ── Job Polling ───────────────────────────────

export async function pollJobStatus(jobId: string) {
  const res = await fetch(`${BASE_URL}/api/repos/jobs/${jobId}`);

  if (!res.ok) {
    throw new Error("Failed to poll job status");
  }

  return res.json();
}

// ── GitHub Auth'd Endpoints ───────────────────

export async function fetchRepos() {
  const token = localStorage.getItem("github_token");

  if (!token) {
    throw new Error("No authentication token found");
  }

  const res = await fetch(`${BASE_URL}/api/repos/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch repositories");
  }

  return res.json();
}

export async function fetchGitHubUser() {
  const token = localStorage.getItem("github_token");

  if (!token) {
    throw new Error("No authentication token found");
  }

  const res = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user info");
  }

  return res.json();
}

// ── Legacy endpoints (kept for compatibility) ─

export async function cloneRepo(repoUrl: string) {
  const res = await fetch(`${BASE_URL}/api/repos/clone`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ repo_url: repoUrl }),
  });

  if (!res.ok) {
    throw new Error("Failed to clone repository");
  }

  return res.json();
}

export async function analyzeRepo(repoUrl: string) {
  const res = await fetch(`${BASE_URL}/api/repos/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ repo_url: repoUrl }),
  });

  if (!res.ok) {
    throw new Error("Failed to start analysis");
  }

  return res.json();
}

export async function generateAutoFixPR(
  repoName: string,
  vulnerabilities: any[],
) {
  const res = await fetch(`${BASE_URL}/api/repos/autofix`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ repo_name: repoName, vulnerabilities }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate Auto-Fix PR");
  }

  return res.json();
}

export async function chatWithSidekick(question: string, report: any) {
  const res = await fetch(`${BASE_URL}/api/repos/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, report }),
  });

  if (!res.ok) {
    throw new Error("Failed to chat with AI Sidekick");
  }

  return res.json();
}

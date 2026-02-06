const BASE_URL = "http://localhost:8000";

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

export async function cloneRepo(repoUrl: string) {
  const res = await fetch(`${BASE_URL}/api/repos/clone`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ repo_url: repoUrl }),
  });

  if (!res.ok) {
    throw new Error("Failed to clone repository");
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

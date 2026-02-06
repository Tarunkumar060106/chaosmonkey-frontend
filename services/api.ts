const BASE_URL = "http://localhost:8000";

export async function fetchRepos() {
  const token = localStorage.getItem("github_token");

  const res = await fetch(`${BASE_URL}/api/repos/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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

  return res.json();
}

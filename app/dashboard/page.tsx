"use client";

import { useEffect, useState } from "react";
import { fetchRepos } from "@/services/api";
import RepoCard from "@/components/RepoCard";

export default function Dashboard() {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRepos().then((data) => {
      setRepos(data);
      setLoading(false);
    });
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <h1>🐒 ChaosSim</h1>
      <p>Select a repository to import</p>

      {loading && <p>Loading repositories…</p>}

      {!loading &&
        repos.map((repo) => <RepoCard key={repo.full_name} repo={repo} />)}
    </main>
  );
}

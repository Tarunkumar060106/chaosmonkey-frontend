"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchRepos, fetchGitHubUser } from "@/services/api";
import { Repository, GitHubUser, ViewMode } from "@/types";
import RepoCard from "@/components/RepoCard";
import DashboardHeader from "@/components/DashboardHeader";
import EmptyState from "@/components/EmptyState";
import {
  Search, Grid3x3, List, GitBranch, RefreshCw, ArrowRight, Github,
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [repos, setRepos] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPrivate, setFilterPrivate] = useState<"all" | "public" | "private">("all");
  const [analyzeUrl, setAnalyzeUrl] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("github_token");
    if (!token) {
      router.push("/");
      return;
    }
    loadDashboardData();
  }, [router]);

  const loadDashboardData = async () => {
    try {
      const [reposData, userData] = await Promise.all([
        fetchRepos(),
        fetchGitHubUser().catch(() => null),
      ]);
      setRepos(reposData);
      setFilteredRepos(reposData);
      setUser(userData);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
      if (error instanceof Error && error.message.includes("authentication")) {
        localStorage.removeItem("github_token");
        router.push("/");
      }
    } finally {
      setLoading(false);
      setUserLoading(false);
    }
  };

  // Filter and search
  useEffect(() => {
    let filtered = repos;
    if (searchQuery) {
      filtered = filtered.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterPrivate !== "all") {
      filtered = filtered.filter((repo) =>
        filterPrivate === "private" ? repo.private : !repo.private
      );
    }
    setFilteredRepos(filtered);
  }, [searchQuery, filterPrivate, repos]);

  const handleRefresh = () => {
    setLoading(true);
    loadDashboardData();
  };

  const handleAnalyzeUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!analyzeUrl.trim()) return;
    router.push(`/explore?url=${encodeURIComponent(analyzeUrl.trim())}`);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--ink-black)" }}>
      <DashboardHeader
        username={user?.login}
        avatarUrl={user?.avatar_url}
        loading={userLoading}
      />

      <main className="max-container-lg py-8">
        {/* ── Analyze Any Repo ── */}
        <div className="animate-in stagger-1 mb-10">
          <h2 className="font-display mb-4" style={{ fontSize: "1.5rem", color: "var(--ink-white)" }}>
            Analyze any repository
          </h2>
          <form onSubmit={handleAnalyzeUrl}>
            <div className="flex gap-2"
                 style={{
                   padding: "5px",
                   background: "var(--ink-deep)",
                   border: "1px solid var(--ink-subtle)",
                   borderRadius: "var(--radius-lg)",
                 }}>
              <div className="flex items-center pl-3" style={{ color: "var(--ink-dim)" }}>
                <GitBranch className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={analyzeUrl}
                onChange={(e) => setAnalyzeUrl(e.target.value)}
                placeholder="https://github.com/user/repo"
                className="flex-1 bg-transparent border-none outline-none"
                style={{
                  color: "var(--ink-white)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.9375rem",
                  padding: "10px 8px",
                }}
                id="dashboard-url-input"
              />
              <button
                type="submit"
                disabled={!analyzeUrl.trim()}
                className="btn btn-primary"
                style={{ borderRadius: "var(--radius-md)", padding: "10px 24px" }}
              >
                Analyze
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* ── Divider ── */}
        <div className="divider mb-8" />

        {/* ── Your Repositories ── */}
        <div className="animate-in stagger-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="font-display" style={{ fontSize: "1.25rem", color: "var(--ink-white)" }}>
              Your repositories
            </h2>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                        style={{ color: "var(--ink-dim)" }} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input"
                  style={{
                    paddingLeft: "36px",
                    width: "200px",
                    fontSize: "0.8125rem",
                    padding: "8px 12px 8px 36px",
                  }}
                  id="search-repos-input"
                />
              </div>

              {/* Filter */}
              <select
                value={filterPrivate}
                onChange={(e) => setFilterPrivate(e.target.value as any)}
                className="input"
                style={{
                  width: "auto",
                  fontSize: "0.8125rem",
                  padding: "8px 12px",
                  cursor: "pointer",
                  color: "var(--ink-mid)",
                }}
              >
                <option value="all">All</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>

              {/* View Toggle */}
              <div className="flex" style={{ border: "1px solid var(--ink-subtle)", borderRadius: "var(--radius-sm)" }}>
                <button
                  onClick={() => setViewMode("grid")}
                  className="p-2 transition-colors"
                  style={{
                    background: viewMode === "grid" ? "var(--ink-gold)" : "transparent",
                    color: viewMode === "grid" ? "var(--ink-black)" : "var(--ink-dim)",
                    borderRadius: "var(--radius-sm) 0 0 var(--radius-sm)",
                  }}
                >
                  <Grid3x3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className="p-2 transition-colors"
                  style={{
                    background: viewMode === "list" ? "var(--ink-gold)" : "transparent",
                    color: viewMode === "list" ? "var(--ink-black)" : "var(--ink-dim)",
                    borderLeft: "1px solid var(--ink-subtle)",
                    borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                  }}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Refresh */}
              <button onClick={handleRefresh} disabled={loading} className="btn btn-ghost" style={{ padding: "8px" }}>
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          {/* Count */}
          {!loading && filteredRepos.length > 0 && (
            <p className="mb-4" style={{ fontSize: "0.75rem", color: "var(--ink-dim)" }}>
              {filteredRepos.length} of {repos.length} repositories
            </p>
          )}

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-3 h-3 rounded-full mx-auto mb-4 loading-dot"
                     style={{ background: "var(--ink-gold)" }} />
                <p style={{ color: "var(--ink-dim)", fontSize: "0.8125rem" }}>
                  Loading repositories...
                </p>
              </div>
            </div>
          ) : filteredRepos.length === 0 ? (
            <EmptyState
              icon={searchQuery ? Search : Github}
              title={searchQuery ? "No results" : "No repositories"}
              description={
                searchQuery
                  ? "Try adjusting your search or filters."
                  : "Connect your GitHub account or check your repository access."
              }
              actionLabel={searchQuery ? "Clear search" : "Refresh"}
              onAction={() => (searchQuery ? setSearchQuery("") : handleRefresh())}
            />
          ) : (
            <div className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "flex flex-col gap-3"
            }>
              {filteredRepos.map((repo) => (
                <RepoCard key={repo.full_name} repo={repo} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchRepos, fetchGitHubUser } from "@/services/api";
import { Repository, GitHubUser, ViewMode } from "@/types";
import RepoCard from "@/components/RepoCard";
import StatCard from "@/components/StatCard";
import DashboardHeader from "@/components/DashboardHeader";
import EmptyState from "@/components/EmptyState";
import {
  Loader2,
  Search,
  Grid3x3,
  List,
  Filter,
  GitFork,
  Activity,
  Clock,
  Github,
  RefreshCw,
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
  const [filterPrivate, setFilterPrivate] = useState<
    "all" | "public" | "private"
  >("all");

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
      // Load user and repos in parallel
      const [reposData, userData] = await Promise.all([
        fetchRepos(),
        fetchGitHubUser().catch(() => null),
      ]);

      setRepos(reposData);
      setFilteredRepos(reposData);
      setUser(userData);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
      // If auth fails, redirect to home
      if (error instanceof Error && error.message.includes("authentication")) {
        localStorage.removeItem("github_token");
        router.push("/");
      }
    } finally {
      setLoading(false);
      setUserLoading(false);
    }
  };

  // Filter and search logic
  useEffect(() => {
    let filtered = repos;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply privacy filter
    if (filterPrivate !== "all") {
      filtered = filtered.filter((repo) =>
        filterPrivate === "private" ? repo.private : !repo.private,
      );
    }

    setFilteredRepos(filtered);
  }, [searchQuery, filterPrivate, repos]);

  const handleRefresh = () => {
    setLoading(true);
    loadDashboardData();
  };

  const stats = {
    totalRepos: repos.length,
    privateRepos: repos.filter((r) => r.private).length,
    publicRepos: repos.filter((r) => !r.private).length,
  };

  return (
    <div className="min-h-screen bg-[#080808]">
      <DashboardHeader username={user?.login} loading={userLoading} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Repositories"
            value={stats.totalRepos}
            icon={GitFork}
            loading={loading}
          />
          <StatCard
            title="Private Repos"
            value={stats.privateRepos}
            icon={Github}
            loading={loading}
          />
          <StatCard
            title="Public Repos"
            value={stats.publicRepos}
            icon={Activity}
            loading={loading}
          />
          <StatCard
            title="Active Tests"
            value={0}
            icon={Clock}
            loading={loading}
          />
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0c0c0c] border border-white/10 text-white pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-gray-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Privacy Filter */}
            <select
              value={filterPrivate}
              onChange={(e) => setFilterPrivate(e.target.value as any)}
              className="bg-[#0c0c0c] border border-white/10 text-gray-400 px-4 py-3 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-amber-500/50 transition-colors cursor-pointer"
            >
              <option value="all">All Repos</option>
              <option value="public">Public Only</option>
              <option value="private">Private Only</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex border border-white/10">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 transition-colors ${
                  viewMode === "grid"
                    ? "bg-amber-500 text-black"
                    : "bg-[#0c0c0c] text-gray-400 hover:text-white"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 transition-colors border-l border-white/10 ${
                  viewMode === "list"
                    ? "bg-amber-500 text-black"
                    : "bg-[#0c0c0c] text-gray-400 hover:text-white"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="p-3 border border-white/10 bg-[#0c0c0c] text-gray-400 hover:text-amber-500 hover:border-amber-500/20 transition-all disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Repositories Section */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-500 text-sm font-mono uppercase tracking-widest">
                Loading Repositories...
              </p>
            </div>
          </div>
        ) : filteredRepos.length === 0 ? (
          <EmptyState
            icon={searchQuery ? Search : Github}
            title={searchQuery ? "No Results Found" : "No Repositories"}
            description={
              searchQuery
                ? "Try adjusting your search or filters to find what you're looking for."
                : "Connect your GitHub account or check your repository access permissions."
            }
            actionLabel={searchQuery ? "Clear Search" : "Refresh"}
            onAction={() =>
              searchQuery ? setSearchQuery("") : handleRefresh()
            }
          />
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                Showing {filteredRepos.length} of {repos.length} repositories
              </p>
            </div>

            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {filteredRepos.map((repo) => (
                <RepoCard
                  key={repo.full_name}
                  repo={repo}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

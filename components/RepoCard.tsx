"use client";

import { useState } from "react";
import { cloneRepo } from "../services/api";
import { Repository, CloneStatus } from "@/types";
import {
  Lock,
  Globe,
  GitBranch,
  Download,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Play,
  FileCode,
} from "lucide-react";

interface RepoCardProps {
  repo: Repository;
  viewMode?: "grid" | "list";
}

export default function RepoCard({ repo, viewMode = "grid" }: RepoCardProps) {
  const [cloneStatus, setCloneStatus] = useState<CloneStatus>({
    status: "idle",
  });

  const handleClone = async () => {
    setCloneStatus({ status: "cloning" });
    try {
      const result = await cloneRepo(repo.clone_url);
      setCloneStatus({ status: "done", message: result.path });
    } catch (error) {
      setCloneStatus({
        status: "error",
        message: "Failed to clone repository",
      });
    }
  };

  const getStatusIcon = () => {
    switch (cloneStatus.status) {
      case "cloning":
        return <Loader2 className="w-4 h-4 animate-spin text-amber-500" />;
      case "done":
        return <CheckCircle2 className="w-4 h-4 text-cyan-400" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Download className="w-4 h-4" />;
    }
  };

  const getStatusText = () => {
    switch (cloneStatus.status) {
      case "cloning":
        return "Importing...";
      case "done":
        return "Imported";
      case "error":
        return "Retry";
      default:
        return "Import";
    }
  };

  if (viewMode === "list") {
    return (
      <div className="industrial-border bg-[#0c0c0c] p-4 hover:bg-[#111] transition-all group">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-none">
              <FileCode className="w-5 h-5 text-amber-500" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-bold text-sm truncate">
                  {repo.full_name}
                </h3>
                {repo.private ? (
                  <Lock className="w-3 h-3 text-gray-500" />
                ) : (
                  <Globe className="w-3 h-3 text-gray-500" />
                )}
              </div>
              {repo.description && (
                <p className="text-gray-500 text-xs truncate">
                  {repo.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {repo.language && (
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                {repo.language}
              </span>
            )}

            <button
              onClick={handleClone}
              disabled={cloneStatus.status === "cloning"}
              className={`flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                cloneStatus.status === "done"
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : cloneStatus.status === "error"
                    ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                    : "bg-amber-500 text-black hover:bg-white border border-amber-500"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {getStatusIcon()}
              {getStatusText()}
            </button>

            {cloneStatus.status === "done" && (
              <button className="p-2 border border-white/10 text-gray-400 hover:text-amber-500 hover:border-amber-500/20 transition-all">
                <Play className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="industrial-border bg-[#0c0c0c] p-6 hover:bg-[#111] transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-none">
          <FileCode className="w-6 h-6 text-amber-500" />
        </div>
        <div className="flex items-center gap-2">
          {repo.private ? (
            <Lock className="w-4 h-4 text-gray-500" />
          ) : (
            <Globe className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </div>

      <h3 className="text-white font-bold text-lg mb-2 truncate group-hover:text-amber-500 transition-colors">
        {repo.name}
      </h3>

      {repo.description && (
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">
          {repo.description}
        </p>
      )}

      <div className="flex items-center gap-4 mb-4 text-[10px] font-mono text-gray-600">
        {repo.language && (
          <span className="uppercase tracking-wider">{repo.language}</span>
        )}
        <div className="flex items-center gap-1">
          <GitBranch className="w-3 h-3" />
          <span>{repo.default_branch || "main"}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleClone}
          disabled={cloneStatus.status === "cloning"}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all ${
            cloneStatus.status === "done"
              ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
              : cloneStatus.status === "error"
                ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                : "bg-amber-500 text-black hover:bg-white border border-amber-500"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {getStatusIcon()}
          {getStatusText()}
        </button>

        {cloneStatus.status === "done" && (
          <button className="p-2.5 border border-white/10 text-gray-400 hover:text-amber-500 hover:border-amber-500/20 transition-all">
            <Play className="w-4 h-4" />
          </button>
        )}
      </div>

      {cloneStatus.message && cloneStatus.status === "error" && (
        <p className="text-red-400 text-xs mt-2">{cloneStatus.message}</p>
      )}
    </div>
  );
}

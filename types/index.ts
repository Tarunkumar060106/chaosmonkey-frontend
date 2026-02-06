import React from "react";

export interface ChaosScenario {
  title: string;
  description: string;
  intensity: "Low" | "Medium" | "High" | "Extreme";
  potentialImpact: string;
  recommendation: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export enum TestStatus {
  IDLE = "IDLE",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface Repository {
  name: string;
  full_name: string;
  private: boolean;
  clone_url: string;
  default_branch: string;
  language?: string;
  description?: string;
  updated_at?: string;
}

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  email?: string;
}

export type ViewMode = "grid" | "list";

export interface CloneStatus {
  status: "idle" | "cloning" | "done" | "error";
  message?: string;
}

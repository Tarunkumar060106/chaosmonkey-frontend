/* ═══════════════════════════════════════════════
   ChaosMonkey v2 — TypeScript Interfaces
   ═══════════════════════════════════════════════ */

// ── GitHub Types ──────────────────────────────

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

// ── Analysis Report Types ─────────────────────

export interface TechStackItem {
  name: string;
  category: string;
  files_using: string[];
  purpose: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
}

export interface ArchitectureEdge {
  source: string;
  target: string;
  label?: string;
}

export interface Architecture {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  mermaid_code?: string;
}

export interface ConnectionItem {
  from: string;
  to: string;
  method: string;
  description: string;
}

export interface DataFlowStep {
  step: number;
  action: string;
  component: string;
  description: string;
}

export interface DataFlow {
  title: string;
  steps: DataFlowStep[];
}

export interface Vulnerability {
  title: string;
  file: string;
  line?: number;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  fix_suggestion?: string;
}

export interface BrokenLink {
  file: string;
  import_path: string;
  issue: string;
  suggestion: string;
}

export interface Improvement {
  title: string;
  category: string;
  priority: "high" | "medium" | "low";
  description: string;
  effort: string;
}

export interface AnalysisReport {
  health_score: number;
  tech_stack: TechStackItem[];
  architecture: Architecture;
  connections: ConnectionItem[];
  data_flow: DataFlow[];
  simple_explanation: string;
  advanced_explanation: string;
  vulnerabilities: Vulnerability[];
  broken_links: BrokenLink[];
  improvements: Improvement[];
}

// ── UI State Types ────────────────────────────

export type ViewMode = "grid" | "list";
export type ExplainMode = "simple" | "advanced";

export type AnalysisTab =
  | "architecture"
  | "tech-stack"
  | "connections"
  | "data-flow"
  | "explained"
  | "vulnerabilities"
  | "broken-links"
  | "improvements";

export interface CloneStatus {
  status: "idle" | "cloning" | "done" | "error";
  message?: string;
}

export interface JobStatus {
  status: "processing" | "complete" | "error";
  result?: AnalysisReport;
  error?: string;
}

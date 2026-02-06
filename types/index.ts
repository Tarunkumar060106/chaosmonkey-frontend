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

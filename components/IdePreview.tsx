"use client";
import React, { useState } from "react";
import {
  Terminal,
  Shield,
  Activity,
  Radio,
  Target,
  Zap,
  Files,
  Search,
  GitBranch,
  Play,
  Bug,
  Package,
  ChevronRight,
  ChevronDown,
  FileCode,
  Folder,
  Settings,
  UserCircle,
  Bell,
  RefreshCw,
  Check,
} from "lucide-react";

const IdePreview: React.FC = () => {
  const [activeFile, setActiveFile] = useState("production.yaml");

  return (
    <div className="w-full h-full flex flex-col bg-[#0d0d0d] text-gray-400 font-mono text-[11px] overflow-hidden border border-white/5 shadow-2xl">
      <div className="flex flex-1 overflow-hidden">
        {/* VS Code Activity Bar (Far Left) */}
        <div className="w-12 border-r border-white/5 flex flex-col items-center py-4 gap-6 bg-[#0a0a0a]">
          <div className="p-2 text-white border-l-2 border-amber-500 bg-white/5">
            <Files className="w-5 h-5" />
          </div>
          <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
          <GitBranch className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
          <Play className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
          <Bug className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
          <Package className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />

          <div className="mt-auto flex flex-col gap-4 mb-2">
            <UserCircle className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
            <Settings className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
          </div>
        </div>

        {/* File Explorer Sidebar */}
        <div className="w-56 bg-[#0a0a0a] border-r border-white/5 flex flex-col hidden md:flex">
          <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 flex justify-between items-center">
            Explorer
            <span className="opacity-40">...</span>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-1 px-2 py-1 text-white hover:bg-white/5 cursor-pointer">
              <ChevronDown className="w-3 h-3" />
              <span className="font-bold">CHAOS-PROJECT</span>
            </div>
            <div className="ml-2">
              <div className="flex items-center gap-1 px-2 py-1 text-gray-500 hover:bg-white/5 cursor-pointer">
                <ChevronDown className="w-3 h-3" />
                <Folder className="w-3 h-3 text-amber-500/50" />
                <span>infra</span>
              </div>
              <div className="ml-4">
                <div className="flex items-center gap-1 px-2 py-1 text-gray-500 hover:bg-white/5 cursor-pointer">
                  <ChevronDown className="w-3 h-3" />
                  <Folder className="w-3 h-3 text-amber-500/50" />
                  <span>clusters</span>
                </div>
                <div className="ml-4 space-y-0.5">
                  <div
                    className={`flex items-center gap-2 px-2 py-1 rounded-sm cursor-pointer ${activeFile === "production.yaml" ? "bg-amber-500/10 text-white" : "hover:bg-white/5"}`}
                  >
                    <FileCode className="w-3 h-3 text-amber-500" />
                    <span>production.yaml</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 hover:bg-white/5 cursor-pointer">
                    <FileCode className="w-3 h-3 text-cyan-500" />
                    <span>staging.yaml</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 text-gray-500 hover:bg-white/5 cursor-pointer">
                <ChevronRight className="w-3 h-3" />
                <Folder className="w-3 h-3 text-gray-600" />
                <span>src</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-1 text-gray-500 hover:bg-white/5 cursor-pointer">
                <FileCode className="w-3 h-3 text-gray-600" />
                <span>chaos.config.js</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col bg-[#0d0d0d]">
          {/* Tabs */}
          <div className="flex bg-[#0a0a0a] border-b border-white/5 h-9 items-center overflow-x-hidden no-scrollbar">
            <div className="flex items-center gap-2 px-4 h-full bg-[#0d0d0d] border-t-2 border-amber-500 text-white cursor-pointer relative min-w-[140px]">
              <FileCode className="w-3 h-3 text-amber-500" />
              <span>production.yaml</span>
              <span className="ml-2 text-[8px] opacity-40">×</span>
            </div>
            <div className="flex items-center gap-2 px-4 h-full hover:bg-white/5 text-gray-500 cursor-pointer min-w-[140px] border-r border-white/5">
              <FileCode className="w-3 h-3 text-cyan-500" />
              <span>staging.yaml</span>
            </div>
          </div>

          {/* Breadcrumbs */}
          <div className="px-4 py-1.5 border-b border-white/5 text-[10px] text-gray-500 flex items-center gap-1 bg-[#0d0d0d]">
            <span>infra</span> <ChevronRight className="w-2 h-2" />
            <span>clusters</span> <ChevronRight className="w-2 h-2" />
            <span className="text-gray-300">production.yaml</span>
          </div>

          {/* Main Code View */}
          <div className="flex-1 flex overflow-hidden">
            {/* Line Numbers */}
            <div className="w-10 flex flex-col items-center py-4 text-gray-700 bg-[#0d0d0d] border-r border-white/5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                <div key={num} className="h-5 leading-5">
                  {num}
                </div>
              ))}
            </div>

            {/* Code Content */}
            <div className="flex-1 p-4 relative overflow-hidden bg-[#0d0d0d] selection:bg-amber-500/30">
              <div className="space-y-0.5 whitespace-pre">
                <div className="h-5 flex gap-4">
                  <span className="text-cyan-500">kind:</span>{" "}
                  <span className="text-amber-200">ChaosExperiment</span>
                </div>
                <div className="h-5 flex gap-4">
                  <span className="text-cyan-500">metadata:</span>
                </div>
                <div className="h-5 flex gap-4">
                  <span className="opacity-40"> </span>
                  <span className="text-cyan-500">name:</span>{" "}
                  <span className="text-amber-200">
                    "network-partition-test"
                  </span>
                </div>
                <div className="h-5 flex gap-4">
                  <span className="text-cyan-500">spec:</span>
                </div>
                <div className="h-5 flex gap-4 bg-amber-500/5 border-l-2 border-amber-500/50 -ml-4 pl-4">
                  <span className="opacity-40"> </span>
                  <span className="text-cyan-500">target:</span>{" "}
                  <span className="text-amber-200">"payment-gateway"</span>{" "}
                  <span className="ml-4 text-[9px] bg-amber-500 text-black px-1 font-black">
                    ACTIVE
                  </span>
                </div>
                <div className="h-5 flex gap-4">
                  <span className="opacity-40"> </span>
                  <span className="text-cyan-500">vector:</span>{" "}
                  <span className="text-amber-200">"latent_jitter"</span>
                </div>
                <div className="h-5 flex gap-4">
                  <span className="opacity-40"> </span>
                  <span className="text-cyan-500">intensity:</span>{" "}
                  <span className="text-rose-400">0.85</span>
                </div>
                <div className="h-5 flex gap-4">
                  <span className="opacity-40"> </span>
                  <span className="text-cyan-500">blast_radius:</span>{" "}
                  <span className="text-rose-400">0.20</span>
                </div>
                <div className="h-5 flex gap-4">
                  <span className="opacity-40"> </span>
                  <span className="text-cyan-500">fail_safe:</span>{" "}
                  <span className="text-emerald-400">true</span>
                </div>
                <div className="h-5 flex gap-4">
                  <span className="text-gray-600 italic">
                    # Triggering circuit breaker thresholds...
                  </span>
                </div>
                <div className="h-5 flex gap-4">
                  <span className="text-cyan-500">status:</span>{" "}
                  <span className="text-amber-400 animate-pulse">Running</span>
                </div>
              </div>

              {/* Stress Visualizer */}
              <div className="absolute top-10 right-10 flex gap-1 items-end p-4 border border-white/5 bg-black/40 backdrop-blur-md industrial-border">
                <div className="text-[8px] absolute -top-4 left-0 uppercase font-black text-amber-500">
                  Jitter_Profile
                </div>
                {[4, 15, 8, 25, 12, 35, 20, 10, 40, 25].map((v, i) => (
                  <div
                    key={i}
                    className="w-1 bg-amber-500/40"
                    style={{ height: v }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* VS Code Terminal */}
          <div className="h-44 bg-[#0a0a0a] border-t border-white/10 flex flex-col">
            <div className="flex items-center gap-6 px-4 h-9 border-b border-white/5 text-[10px] font-bold uppercase">
              <span className="text-white border-b border-white h-full flex items-center">
                Terminal
              </span>
              <span className="text-gray-600 hover:text-white cursor-pointer">
                Output
              </span>
              <span className="text-gray-600 hover:text-white cursor-pointer">
                Debug Console
              </span>
              <span className="text-gray-600 hover:text-white cursor-pointer">
                Problems
              </span>

              <div className="ml-auto flex gap-4 text-gray-600">
                <RefreshCw className="w-3 h-3 hover:text-white cursor-pointer" />
                <ChevronDown className="w-3 h-3 hover:text-white cursor-pointer" />
              </div>
            </div>
            <div className="flex-1 p-3 font-mono text-[11px] space-y-1 overflow-hidden">
              <div className="flex gap-2">
                <span className="text-emerald-500">➜</span>
                <span className="text-cyan-400">chaos-project</span>
                <span className="text-gray-500">git:(</span>
                <span className="text-rose-400">main*</span>
                <span className="text-gray-500">)</span>
                <span className="text-white">chaos-monkey init --force</span>
              </div>
              <div className="text-gray-500">
                [SYSTEM] Authenticating with cluster 'prod-us-east-1'...
              </div>
              <div className="text-gray-500">
                [SYSTEM] Identity verified via GitHub OAuth (@chaos_dev_01).
              </div>
              <div className="text-amber-500 animate-pulse">
                [FAULT] Latency injection started on 'payment-gateway' pods
                (3/3).
              </div>
              <div className="text-gray-500">
                [METRIC] p99 latency rose from 12ms to 240ms.
              </div>
              <div className="flex gap-2">
                <span className="text-emerald-500">➜</span>
                <span className="text-cyan-400">chaos-project</span>
                <span className="w-2 h-4 bg-white/40 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VS Code Status Bar */}
      <div className="h-6 bg-[#007acc] text-white flex items-center px-3 justify-between font-sans">
        <div className="flex items-center gap-4 text-[10px]">
          <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 h-full cursor-pointer">
            <GitBranch className="w-3 h-3" />
            <span>main*</span>
          </div>
          <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 h-full cursor-pointer">
            <RefreshCw className="w-3 h-3" />
          </div>
          <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 h-full cursor-pointer">
            <Zap className="w-3 h-3" />
            <span>3 Alerts</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 h-full cursor-pointer">
            <span>Ln 5, Col 24</span>
          </div>
          <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 h-full cursor-pointer">
            <span>Spaces: 2</span>
          </div>
          <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 h-full cursor-pointer">
            <span>UTF-8</span>
          </div>
          <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 h-full cursor-pointer">
            <Check className="w-3 h-3" />
            <span>Prettier</span>
          </div>
          <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 h-full cursor-pointer">
            <Bell className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdePreview;

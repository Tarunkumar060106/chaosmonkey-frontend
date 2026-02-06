import React from "react";
import { Terminal, Shield, Activity, Radio, Target, Zap } from "lucide-react";

const IdePreview: React.FC = () => {
  return (
    <div className="w-full h-full flex bg-[#0a0a0a] text-gray-400 font-mono text-[13px] overflow-hidden">
      {/* Control Strip */}
      <div className="w-14 border-r border-amber-500/10 flex flex-col items-center py-6 gap-8 bg-black/40">
        <div className="p-2 bg-amber-500/10 rounded text-amber-500">
          <Target className="w-5 h-5" />
        </div>
        <Activity className="w-5 h-5 opacity-40 hover:opacity-100 transition-opacity" />
        <Radio className="w-5 h-5 opacity-40 hover:opacity-100 transition-opacity" />
        <div className="mt-auto mb-4">
          <Zap className="w-5 h-5 text-amber-500/50" />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Tab Header */}
        <div className="flex bg-black/60 border-b border-amber-500/10 px-4 items-center h-10 gap-4">
          <div className="text-[10px] font-bold text-amber-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            LIVE_EXPERIMENT_091
          </div>
          <div className="h-full border-x border-amber-500/10 px-4 flex items-center text-white text-xs bg-amber-500/5">
            cluster_health.yaml
          </div>
        </div>

        {/* Code/Data Area */}
        <div className="flex-1 p-6 relative overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.02)_0%,_transparent_70%)]">
          <div className="flex gap-6 mb-2 opacity-50">
            <span className="text-amber-500/40">01</span>
            <span>
              <span className="text-amber-400">target:</span> "api-gateway-v2"
            </span>
          </div>
          <div className="flex gap-6 mb-2 opacity-50">
            <span className="text-amber-500/40">02</span>
            <span>
              <span className="text-amber-400">blast_radius:</span> 0.15
            </span>
          </div>
          <div className="flex gap-6 mb-2 bg-amber-500/10 border-y border-amber-500/20 py-1">
            <span className="text-amber-500/60">03</span>
            <span>
              <span className="text-amber-400">experiment:</span>{" "}
              "latent_jitter_injected"
            </span>
            <div className="absolute right-8 flex items-center gap-2 bg-amber-500 text-black px-2 py-0.5 rounded text-[10px] font-black uppercase">
              Active Fault
            </div>
          </div>
          <div className="flex gap-6 mb-2">
            <span className="text-amber-500/40">04</span>
            <span className="pl-4 text-cyan-400">
              # Validating circuit breaker trip thresholds...
            </span>
          </div>
          <div className="flex gap-6 mb-2">
            <span className="text-amber-500/40">05</span>
            <span className="pl-4">
              fallback_state: <span className="text-amber-400">healthy</span>
            </span>
          </div>

          {/* Visualizing "Stress" */}
          <div className="absolute bottom-10 right-10 flex gap-1 items-end">
            {[4, 15, 8, 25, 12, 35, 20, 10].map((v, i) => (
              <div
                key={i}
                className="w-1 bg-amber-500/40"
                style={{ height: v * 2 }}
              />
            ))}
          </div>
        </div>

        {/* Tactical Terminal */}
        <div className="h-40 bg-black border-t border-amber-500/20 p-4 font-mono">
          <div className="flex items-center gap-2 text-[10px] text-amber-500/60 font-bold mb-2 tracking-widest uppercase">
            <Terminal className="w-3 h-3" /> System Journal
          </div>
          <div className="text-[12px] space-y-1">
            <div className="flex gap-2 text-white">
              <span className="text-amber-500/50">[14:22:01]</span> CMD:
              chaos-monkey --stress-cpu --all-pods
            </div>
            <div className="flex gap-2 text-cyan-400">
              <span className="text-amber-500/50">[14:22:03]</span> LOG: Load
              balancer detected 200ms increase.
            </div>
            <div className="flex gap-2 text-amber-500 animate-pulse">
              <span className="text-amber-500/50">[14:22:04]</span> ALERT:
              ReplicaSet-04 failed liveness check.
            </div>
            <div className="flex gap-2 text-white opacity-40">
              <span className="text-amber-500/50">[14:22:05]</span> RES:
              Executing auto-remediation...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdePreview;

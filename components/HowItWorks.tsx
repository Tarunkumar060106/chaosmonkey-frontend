import React from "react";
import { Play, Target, Activity, CheckCircle } from "lucide-react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Select Your Target",
      description:
        "Choose the service, workflow, or API surface you want to test",
      icon: <Target className="w-6 h-6" />,
    },
    {
      number: "02",
      title: "Configure Chaos",
      description:
        "Define failure modes, traffic profiles, and safety thresholds",
      icon: <Activity className="w-6 h-6" />,
    },
    {
      number: "03",
      title: "Execute & Monitor",
      description:
        "Launch controlled experiments and observe runtime behavior and recovery",
      icon: <Play className="w-6 h-6" />,
    },
    {
      number: "04",
      title: "Analyze Results",
      description: "Review reports and harden code paths based on insights",
      icon: <CheckCircle className="w-6 h-6" />,
    },
  ];

  return (
    <section className="py-32 px-6 bg-linear-to-b from-[#030712] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic leading-none mb-6">
            How It <span className="text-amber-500">Works</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Run software resilience tests in four simple steps. From target
            selection to actionable insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual Side */}
          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-linear-to-br from-amber-500/10 to-transparent rounded-3xl" />
            <div className="relative h-full glass p-8 rounded-3xl border-amber-500/20 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-black/40 rounded-2xl border border-amber-500/20 p-6 flex flex-col items-center justify-center hover:bg-amber-500/10 hover:border-amber-500/50 transition-all duration-300 group"
                  >
                    <div className="text-amber-500 mb-4 group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>
                    <div className="text-amber-500/50 font-black text-4xl mb-2">
                      {step.number}
                    </div>
                    <div className="text-white text-xs text-center font-bold">
                      {step.title.split(" ").map((word, idx) => (
                        <span key={idx}>
                          {word}
                          <br />
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Steps Side */}
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 group cursor-pointer">
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-black text-2xl group-hover:bg-amber-500 group-hover:text-black transition-all">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-white mb-3 uppercase italic tracking-tight group-hover:text-amber-500 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorator */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-4 text-amber-500 text-sm font-black uppercase tracking-widest">
            <div className="w-16 h-px bg-amber-500/30" />
            <span>Simple. Powerful. Controlled.</span>
            <div className="w-16 h-px bg-amber-500/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

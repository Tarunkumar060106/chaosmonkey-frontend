import React from "react";
import {
  Network,
  Cpu,
  BarChart3,
  Database,
  ShieldAlert,
  LayoutGrid,
} from "lucide-react";

const features = [
  {
    title: "Isolation Protocols",
    description:
      "Execute deep network partitioning to observe cluster consensus under duress.",
    icon: <Network className="w-6 h-6" />,
    color: "text-amber-500",
  },
  {
    title: "Thermal Stress",
    description:
      "Force recursive CPU loops to test vertical pod autoscaling responsiveness.",
    icon: <Cpu className="w-6 h-6" />,
    color: "text-orange-500",
  },
  {
    title: "Latent Corruption",
    description:
      "Introduce silent bit-rot into cold storage to validate CRC check pipelines.",
    icon: <Database className="w-6 h-6" />,
    color: "text-rose-500",
  },
  {
    title: "Blast Safeguards",
    description:
      "Autonomous kill-switches halt experiments if global error rates exceed 0.5%.",
    icon: <ShieldAlert className="w-6 h-6" />,
    color: "text-cyan-500",
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          <div className="lg:col-span-7">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic leading-none mb-6">
              Built for <br />{" "}
              <span className="text-amber-500">Unstoppable</span> Systems.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-gray-500 font-medium leading-relaxed">
              Infrastructure isn't reliable until it's been tested to its limit.
              ChaosMonkey provides the tactical tools to find the breaking point
              before your users do.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-8 bg-[#0c0c0c] industrial-border hover:bg-amber-500 transition-all duration-300"
            >
              <div
                className={`${f.color} mb-12 group-hover:text-black transition-colors`}
              >
                {f.icon}
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-black mb-4 uppercase italic tracking-tighter">
                {f.title}
              </h3>
              <p className="text-gray-500 group-hover:text-black/70 text-sm leading-relaxed mb-8">
                {f.description}
              </p>
              <div className="text-[10px] font-black uppercase tracking-widest text-amber-500 group-hover:text-black flex items-center gap-2">
                Init_Doc{" "}
                <span className="group-hover:translate-x-2 transition-transform">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

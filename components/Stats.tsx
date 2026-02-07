import React from "react";

const Stats: React.FC = () => {
  const stats = [
    { label: "Experiments Logged", value: "0" },
    { label: "Target Resilience", value: "0" },
    { label: "Threats Nullified", value: "0" },
    { label: "Recovery Rate", value: "0" },
  ];

  return (
    <div className="py-24 bg-amber-500 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center md:text-left border-l-4 border-black pl-6"
            >
              <div className="text-5xl md:text-7xl font-black text-black mb-2 tracking-tighter uppercase italic">
                {s.value}
              </div>
              <div className="text-black/60 text-[10px] font-black uppercase tracking-[0.3em]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;

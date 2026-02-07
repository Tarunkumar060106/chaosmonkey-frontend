import React from "react";

const useCases = [
  {
    title: "Understand system failure modes",
    description:
      "See what breaks when a service, database, or dependency fails.",
  },
  {
    title: "Validate resilience before production",
    description: "Prove that retries, fallbacks, and timeouts actually work.",
  },
  {
    title: "Find hidden service coupling",
    description:
      "Detect synchronous dependencies and tight coupling across services.",
  },
  {
    title: "Prevent cascading failures",
    description: "Identify where one failure can trigger a chain reaction.",
  },
  {
    title: "Generate root-cause explanations automatically",
    description: "Get plain-English explanations of why failures happen.",
  },
  {
    title: "Train engineers for real outages",
    description: "Safely simulate incidents without impacting users.",
  },
  {
    title: "Improve system design early",
    description:
      "Catch architectural weaknesses during development, not after launch.",
  },
  {
    title: "Reduce on-call stress",
    description: "Fewer unknowns mean fewer 3 a.m. incidents.",
  },
  {
    title: "Support SRE and reliability workflows",
    description: "Run repeatable chaos experiments with measurable outcomes.",
  },
  {
    title: "Enable chaos engineering for regular developers",
    description: "No deep infra or SRE knowledge required.",
  },
  {
    title: "Run pre-release resilience checks",
    description:
      "Block deployments if resilience drops below a safe threshold.",
  },
  {
    title: "Create postmortems faster",
    description: "Use experiment data to explain outages clearly.",
  },
  {
    title: "Track reliability over time",
    description:
      "Measure whether the system is becoming more or less resilient.",
  },
  {
    title: "Teach system design through practice",
    description:
      "Learn how distributed systems fail by observing real behavior.",
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic leading-none mb-6">
            What People Use <span className="text-amber-500">ChaosMonkey</span>{" "}
            For
          </h2>
          <p className="text-gray-500 font-medium leading-relaxed max-w-3xl mx-auto">
            Practical, software-first resilience testing that exposes weak links
            before users feel them.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {useCases.map((item, i) => (
            <details
              key={i}
              className="group bg-[#0c0c0c] industrial-border p-6"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-6">
                <span className="text-lg font-black text-white uppercase italic tracking-tight">
                  {item.title}
                </span>
                <span className="text-amber-500 text-xl font-black transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-gray-500 text-sm leading-relaxed mt-4">
                {item.description}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-black/60 border border-amber-500/20 p-8 text-center industrial-border">
            <div className="text-amber-500 text-xs font-black uppercase tracking-[0.4em] mb-4">
              Critical Question
            </div>
            <div className="text-2xl md:text-3xl font-black text-white italic">
              "What breaks if this fails?"
            </div>
            <div className="text-gray-500 mt-3">
              Answer with evidence, not guesses.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

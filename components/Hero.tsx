import React from "react";
import { ArrowRight, Terminal, Crosshair, Github } from "lucide-react";
import IdePreview from "@/components/IdePreview";
import ChaosBackground from "./ChaosBackground";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section className="pt-40 pb-20 px-6 relative min-h-screen flex flex-col items-center overflow-hidden">
      <ChaosBackground />

      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-150 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-3 bg-amber-500/5 border border-amber-500/20 px-4 py-2 rounded-none text-[10px] font-bold text-amber-500 uppercase tracking-[0.3em] mb-12 animate-pulse industrial-border">
          <Crosshair className="w-3 h-3" />
          Protocol 4.0 // Software Resilience Testing
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9] uppercase italic">
          Test for <br />
          <span className="gradient-text">Failure.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-gray-500 mb-12 font-medium tracking-tight">
          Connect your GitHub repositories and run controlled software chaos. We
          simulate real-world failure modes in your services so you can ship
          with confidence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="http://localhost:8000/auth/github/login"
            className="w-full sm:w-auto bg-amber-500 text-black px-10 py-5 font-black text-sm uppercase tracking-widest hover:bg-white transition-all amber-glow hover:scale-105 flex items-center justify-center gap-3"
          >
            <Github className="w-5 h-5" />
            Connect GitHub to Start
          </a>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto border border-white/10 text-white px-10 py-5 font-bold text-sm uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-3"
          >
            <Terminal className="w-5 h-5 text-amber-500" />
            View Dashboard
          </Link>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-24 max-w-5xl mx-auto relative">
          <div className="absolute -inset-2 bg-amber-500/20 blur-2xl opacity-20" />
          <div className="industrial-border bg-black p-2 shadow-2xl">
            <div className="aspect-video border border-white/5 rounded-none overflow-hidden">
              <IdePreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

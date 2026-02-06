import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
// import ChaosSimulator from "@/components/ChaosSimulator";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

const App: React.FC = () => {
  return (
    <div className="min-h-screen relative selection:bg-purple-500 selection:text-white bg-[#030712]">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Features />
        <Stats />
        {/* <ChaosSimulator /> */}

        {/* Simple CTA Section */}
        <section className="py-24 px-6 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto glass p-16 rounded-[3rem] border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
              <img
                src="https://picsum.photos/seed/monkeyicon/200/200"
                alt="bg icon"
                className="w-64 grayscale"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to break things?
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              Start your first chaos experiment in less than 5 minutes. No
              credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all shadow-xl shadow-white/5">
                Get Started Free
              </button>
              <button className="bg-transparent border-2 border-white/20 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/5 transition-all">
                Book a Demo
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;

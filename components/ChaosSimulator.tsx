// import React, { useState } from "react";
// import { Sparkles, Loader2, ShieldCheck, ZapOff, Activity } from "lucide-react";
// // import { generateChaosPlan } from "../services/geminiService";
// import { ChaosScenario } from "@/types/index";

// const ChaosSimulator: React.FC = () => {
//   const [stack, setStack] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [scenarios, setScenarios] = useState<ChaosScenario[]>([]);

//   //   const handleGenerate = async () => {
//   //     if (!stack.trim()) return;
//   //     setLoading(true);
//   //     try {
//   //       const result = await generateChaosPlan(stack);
//   //       setScenarios(result);
//   //     } catch (err) {
//   //       console.error(err);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   const getIntensityColor = (intensity: string) => {
//     switch (intensity) {
//       case "Low":
//         return "text-cyan-400 border-cyan-400/30";
//       case "Medium":
//         return "text-amber-400 border-amber-400/30";
//       case "High":
//         return "text-orange-500 border-orange-500/30";
//       case "Extreme":
//         return "text-rose-500 border-rose-500/30";
//       default:
//         return "text-gray-400 border-gray-400/30";
//     }
//   };

//   return (
//     <section id="simulator" className="py-32 px-6 relative bg-black/40">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
//           <div className="max-w-xl">
//             <div className="text-amber-500 text-xs font-bold tracking-[0.4em] uppercase mb-4 flex items-center gap-2">
//               <Activity className="w-4 h-4" /> Lab_Environment
//             </div>
//             <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic leading-none">
//               Architecting <br />{" "}
//               <span className="text-amber-500">Volatilty.</span>
//             </h2>
//           </div>
//           <p className="text-gray-500 text-sm max-w-sm font-medium">
//             Input your architectural blueprint. Our neural engine will identify
//             lethal injection points to harden your services.
//           </p>
//         </div>

//         <div className="bg-[#0c0c0c] industrial-border p-10 mb-12">
//           <div className="flex flex-col md:flex-row gap-6 mb-12">
//             <div className="flex-1 relative">
//               <input
//                 type="text"
//                 placeholder="STACK_DESC: Kubernetes, Redis, PostgreSQL..."
//                 className="w-full bg-black border-b-2 border-white/5 px-6 py-5 text-amber-500 font-mono focus:outline-none focus:border-amber-500 transition-colors placeholder:text-gray-700"
//                 value={stack}
//                 onChange={(e) => setStack(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
//               />
//             </div>
//             <button
//               onClick={handleGenerate}
//               disabled={loading || !stack}
//               className="bg-amber-500 text-black px-12 py-5 font-black uppercase text-xs tracking-[0.2em] hover:bg-white disabled:opacity-50 transition-all amber-glow"
//             >
//               {loading ? (
//                 <Loader2 className="w-5 h-5 animate-spin" />
//               ) : (
//                 <Sparkles className="w-5 h-5" />
//               )}
//               ANALYZE_NODES
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {scenarios.length === 0 && !loading && (
//               <div className="col-span-3 py-32 text-center border border-dashed border-white/5 text-gray-700 font-mono text-xs uppercase tracking-[0.5em]">
//                 Waiting for Target Input...
//               </div>
//             )}

//             {loading && (
//               <div className="col-span-3 py-32 text-center">
//                 <div className="w-12 h-12 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
//                 <p className="text-amber-500 font-mono text-[10px] uppercase tracking-[0.3em]">
//                   Neural mapping in progress...
//                 </p>
//               </div>
//             )}

//             {!loading &&
//               scenarios.map((s, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-black/80 border border-white/5 p-8 group hover:border-amber-500/40 transition-all"
//                 >
//                   <div
//                     className={`inline-block px-2 py-1 mb-6 text-[10px] font-black border uppercase tracking-widest ${getIntensityColor(s.intensity)}`}
//                   >
//                     {s.intensity}_THREAT
//                   </div>
//                   <h3 className="text-xl font-bold text-white mb-4 uppercase">
//                     {s.title}
//                   </h3>
//                   <p className="text-xs text-gray-500 leading-relaxed mb-8">
//                     {s.description}
//                   </p>

//                   <div className="space-y-6">
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2 text-rose-500 text-[9px] font-black uppercase tracking-tighter">
//                         <ZapOff className="w-3 h-3" /> Impact_Vector
//                       </div>
//                       <div className="text-[11px] text-gray-400 italic">
//                         "{s.potentialImpact}"
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2 text-cyan-400 text-[9px] font-black uppercase tracking-tighter">
//                         <ShieldCheck className="w-3 h-3" /> Remediation
//                       </div>
//                       <div className="text-[11px] text-gray-400 font-mono">
//                         "{s.recommendation}"
//                       </div>
//                     </div>
//                   </div>

//                   <button className="w-full mt-10 py-3 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all">
//                     SIMULATE_FAULT
//                   </button>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ChaosSimulator;

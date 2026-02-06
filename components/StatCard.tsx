import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  loading?: boolean;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  loading = false,
}: StatCardProps) {
  return (
    <div className="industrial-border bg-[#0c0c0c] p-6 hover:bg-[#111] transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-none group-hover:bg-amber-500/20 transition-all">
          <Icon className="w-5 h-5 text-amber-500" />
        </div>
        {trend && (
          <span
            className={`text-xs font-mono ${trend.positive ? "text-cyan-400" : "text-red-400"}`}
          >
            {trend.positive ? "↗" : "↘"} {trend.value}
          </span>
        )}
      </div>

      <div>
        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">
          {title}
        </p>
        {loading ? (
          <div className="h-8 w-20 bg-white/5 animate-pulse" />
        ) : (
          <p className="text-3xl font-black text-white tracking-tighter">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

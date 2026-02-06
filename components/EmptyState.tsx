import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-none mb-6">
        <Icon className="w-12 h-12 text-amber-500" />
      </div>

      <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-3">
        {title}
      </h3>

      <p className="text-gray-500 text-sm max-w-md mb-8">{description}</p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-amber-500 text-black px-8 py-3 font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

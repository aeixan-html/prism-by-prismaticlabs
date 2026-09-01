import { Sparkles, Coins } from 'lucide-react';

interface PointsDisplayProps {
  saved: number;
  points: number;
}

export default function PointsDisplay({ saved, points }: PointsDisplayProps) {
  return (
    <div className="overflow-hidden border border-border bg-surface p-4">
      <div className="grid grid-cols-2 gap-px border border-border bg-border">
        <div className="bg-surface-2 p-3">
          <div className="flex items-center gap-1.5 font-mono text-xs text-mtext">
            <Coins className="h-3.5 w-3.5 text-accent5" aria-hidden="true" />
            Money Saved
          </div>
          <div className="mt-1 font-mono text-xl font-bold text-ptext">₹{saved.toLocaleString()}</div>
        </div>
        <div className="bg-surface-2 p-3">
          <div className="flex items-center gap-1.5 font-mono text-xs text-mtext">
            <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            PRISM Points
          </div>
          <div className="mt-1 font-mono text-xl font-bold text-primary">{points.toLocaleString()}</div>
        </div>
      </div>
      <div className="mt-3 font-mono text-xs text-mtext">Demo rule: ₹1 saved = 1 PRISM Point</div>
    </div>
  );
}

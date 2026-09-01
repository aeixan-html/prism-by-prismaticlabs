import { Sparkles, TrendingUp } from 'lucide-react';
import { demoMembership, membershipTiers } from '@/data/membership';

export default function MembershipCard() {
  const tier = membershipTiers.find((t) => t.name === demoMembership.tier)!;
  const nextTier = membershipTiers.find((t) => t.name === demoMembership.nextTier)!;
  const progress = (demoMembership.points / demoMembership.pointsToNextTier) * 100;

  return (
    <div className="relative overflow-hidden border border-border bg-surface p-5">
      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-mtext-2">PRISM Membership</span>
          <span
            className="border px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider"
            style={{
              color: tier.textColor,
              borderColor: `${tier.color}40`,
              backgroundColor: `${tier.color}15`,
            }}
          >
            {tier.name}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-px border border-border bg-border">
          <div className="bg-surface-2 p-3">
            <div className="flex items-center gap-1.5 text-xs text-mtext">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              PRISM Points
            </div>
            <div className="mt-1 font-mono text-lg font-bold text-ptext">{demoMembership.points.toLocaleString()}</div>
          </div>
          <div className="bg-surface-2 p-3">
            <div className="text-xs text-mtext">Saved</div>
            <div className="mt-1 font-mono text-lg font-bold text-ptext">₹{demoMembership.saved.toLocaleString()}</div>
          </div>
        </div>

        <div className="mt-3 border border-border bg-surface-2 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-mtext">Member Discount</span>
            <span className="text-sm font-semibold text-primary">{demoMembership.discount}%</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-mtext">Special Offer</span>
            <span className="text-sm font-semibold text-accent3">{demoMembership.specialOffer}</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-mtext-2">Progress to {nextTier.name}</span>
            <span className="font-mono text-mtext">{demoMembership.pointsNeeded} pts to go</span>
          </div>
          <div className="h-1.5 overflow-hidden bg-border">
            <div
              className="h-full transition-all duration-700"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${tier.color}, ${nextTier.color})`,
              }}
            />
          </div>
          <div className="mt-1.5 flex items-center gap-1 font-mono text-xs text-mtext-2">
            <TrendingUp className="h-3 w-3" aria-hidden="true" />
            {tier.name} → {nextTier.name}
          </div>
        </div>
      </div>
    </div>
  );
}

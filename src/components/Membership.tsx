import { useState } from 'react';
import { Section } from './Section';
import { Nfc } from 'lucide-react';
import MembershipCard from './MembershipCard';
import { membershipTiers, demoMembership, PRISM_POINTS_RULE } from '@/data/membership';

export default function Membership() {
  const [selectedTier, setSelectedTier] = useState(0);

  return (
    <Section id="membership">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="reveal mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-border-2" />
            <span className="font-mono text-eyebrow uppercase text-mtext-2">NRLS — MEMBERSHIP SYSTEM</span>
          </div>
          <h2 className="text-section-title text-balance text-ptext">Personalization through NFC.</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-mtext-2 md:text-base">
            PRISM integrates NFC-based membership to connect physical customer identification with the digital retail experience.
          </p>
        </div>

        {/* Tier navigation bar */}
        <div className="reveal reveal-delay-2 mb-10">
          <div className="mb-3 flex items-center gap-2">
            <Nfc className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-mtext-2">Tier Hierarchy</span>
          </div>
          <div className="flex gap-px border border-border bg-border overflow-x-auto hide-scrollbar">
            {membershipTiers.map((tier, i) => (
              <button
                key={tier.name}
                onClick={() => setSelectedTier(i)}
                className={`flex-1 min-w-[80px] px-3 py-3 text-center transition-all ${
                  selectedTier === i ? 'bg-surface' : 'bg-bg hover:bg-surface/50'
                }`}
              >
                <div
                  className="mx-auto mb-1.5 h-2 w-8"
                  style={{ backgroundColor: tier.color }}
                />
                <span
                  className={`font-mono text-[10px] font-bold tracking-wider ${
                    selectedTier === i ? 'text-ptext' : 'text-mtext'
                  }`}
                >
                  {tier.name}
                </span>
              </button>
            ))}
          </div>
          {/* Selected tier detail */}
          <div className="border border-t-0 border-border bg-surface p-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <span className="font-mono text-xs text-mtext">Tier</span>
                <p className="mt-0.5 text-base font-semibold" style={{ color: membershipTiers[selectedTier].textColor }}>
                  {membershipTiers[selectedTier].name}
                </p>
              </div>
              <div>
                <span className="font-mono text-xs text-mtext">Position</span>
                <p className="mt-0.5 text-base font-semibold text-ptext">
                  {selectedTier + 1} / {membershipTiers.length}
                </p>
              </div>
              <div>
                <span className="font-mono text-xs text-mtext">Status</span>
                <p className="mt-0.5 text-base font-semibold text-ptext">
                  {membershipTiers[selectedTier].name === 'WHITE' ? 'Free / Non-member' : `Tier ${selectedTier}`}
                </p>
              </div>
            </div>
            {membershipTiers[selectedTier].name === demoMembership.tier && (
              <div className="mt-3 border border-primary/30 bg-primary/10 px-3 py-2">
                <span className="font-mono text-xs text-primary">This is your current tier in the demo.</span>
              </div>
            )}
          </div>
        </div>

        {/* Demo profile + membership card */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="reveal reveal-delay-3">
            <div className="mb-3 font-mono text-xs font-medium uppercase tracking-wider text-mtext-2">Demo Profile</div>
            <div className="border border-border">
              <div className="space-y-px">
                {[
                  ['Current Tier', demoMembership.tier, 'text-primary'],
                  ['PRISM Points', demoMembership.points.toLocaleString(), 'text-ptext'],
                  ['Money Saved', `₹${demoMembership.saved.toLocaleString()}`, 'text-ptext'],
                  ['Member Discount', `${demoMembership.discount}%`, 'text-primary'],
                  ['Special Offer', demoMembership.specialOffer, 'text-accent3'],
                  [`Next Tier: ${demoMembership.nextTier}`, `${demoMembership.pointsNeeded} pts needed`, 'text-accent5'],
                ].map(([label, value, color]) => (
                  <div key={label} className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 last:border-b-0">
                    <span className="text-sm text-mtext-2">{label}</span>
                    <span className={`text-sm font-semibold ${color}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 border border-primary/20 bg-primary/5 px-4 py-3">
              <span className="text-xs text-mtext-2">
                <span className="font-semibold text-primary">Demo Rule:</span> {PRISM_POINTS_RULE}
              </span>
            </div>
          </div>

          <div className="reveal reveal-delay-4">
            <div className="mb-3 font-mono text-xs font-medium uppercase tracking-wider text-mtext-2">Digital Membership Card</div>
            <MembershipCard />
          </div>
        </div>
      </div>
    </Section>
  );
}

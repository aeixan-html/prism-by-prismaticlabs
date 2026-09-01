import { Tag, Award, User } from 'lucide-react';
import type { Offer } from '@/data/types';
import { offers } from '@/data/membership';

const iconMap = {
  discount: Tag,
  member: Award,
  personalized: User,
};

export default function OfferCard({ offer }: { offer: Offer }) {
  const Icon = iconMap[offer.type];
  return (
    <div className="border border-border bg-surface p-4 transition-all duration-200 hover:border-primary/40">
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-4 w-4" aria-hidden="true" style={{ color: offer.accent }} />
        <span
          className="border px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider"
          style={{ color: offer.accent, borderColor: `${offer.accent}40` }}
        >
          {offer.label}
        </span>
      </div>
      <p className="text-sm text-stext leading-relaxed">{offer.description}</p>
      <div className="mt-2 font-mono text-xs font-medium uppercase tracking-wider text-mtext">Demo Offer</div>
    </div>
  );
}

export function OfferGrid() {
  return (
    <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}

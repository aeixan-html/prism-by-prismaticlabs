import { Section } from './Section';
import { Radar, Hand, Brain, ShoppingBag } from 'lucide-react';

const layers = [
  { icon: Radar, label: 'SENSING', items: ['Presence', 'Distance', 'Visual information'] },
  { icon: Hand, label: 'INTERACTION', items: ['Touch', 'Voice', 'Display'] },
  { icon: Brain, label: 'INTELLIGENCE', items: ['AI', 'Processing', 'Decision making'] },
  { icon: ShoppingBag, label: 'RETAIL', items: ['Personalization', 'Assistance', 'Insights'] },
];

export default function SystemArchitecture() {
  return (
    <Section id="architecture">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="reveal mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-border-2" />
            <span className="font-mono text-eyebrow uppercase text-mtext-2">SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="text-section-title text-balance text-ptext">Four layers, one system.</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-mtext-2 md:text-base">
            From physical sensing to retail intelligence — each layer builds on the previous.
          </p>
        </div>

        <div className="reveal reveal-delay-2 mx-auto max-w-3xl">
          <div className="divide-y divide-border border border-border">
            {layers.map((layer, i) => (
              <div key={layer.label} className="flex items-center gap-5 p-5 md:gap-8 md:p-6">
                <div className="flex items-center gap-3 md:w-44 md:flex-shrink-0">
                  <span className="font-mono text-sm font-semibold text-mtext">{String(i + 1).padStart(2, '0')}</span>
                  <layer.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span className="font-mono text-xs font-bold tracking-wider text-ptext">{layer.label}</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {layer.items.map((item) => (
                    <span key={item} className="text-sm text-mtext-2">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

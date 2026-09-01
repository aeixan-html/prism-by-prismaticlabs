import { Section } from './Section';

const fourWs = [
  { label: 'WHO?', title: 'Retailers and their customers', description: 'PRISM is designed to improve interaction between businesses and the people they serve.' },
  { label: 'WHAT?', title: 'An AI-powered retail business companion', description: 'A system combining intelligent software with physical interaction.' },
  { label: 'WHERE?', title: 'Physical retail environments', description: 'Designed for stores, shops, and customer-facing business spaces.' },
  { label: 'WHY?', title: 'To make retail more intelligent and personalized', description: 'Connecting AI, customer interaction, and retail information.' },
];

export default function FourWs() {
  return (
    <Section id="four-ws">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {fourWs.map((w) => (
            <div key={w.label} className="bg-bg p-6">
              <span className="font-mono text-xs font-bold tracking-[0.15em] text-primary">{w.label}</span>
              <h3 className="mt-3 text-base font-semibold text-ptext">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mtext-2">{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

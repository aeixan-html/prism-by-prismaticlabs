import { Section } from './Section';

const customerBenefits = [
  'Easier access to assistance',
  'More interactive shopping',
  'More personalized experiences',
];

const businessBenefits = [
  'Better customer interaction',
  'Personalized retail experiences',
  'Opportunities for useful business insights',
  'A more intelligent store environment',
];

export default function Impact() {
  return (
    <Section id="impact">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="reveal mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-border-2" />
            <span className="font-mono text-eyebrow uppercase text-mtext-2">IMPACT</span>
          </div>
          <h2 className="text-section-title text-balance text-ptext">Designed to improve the retail experience.</h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="reveal reveal-delay-1">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">For Customers</h3>
            <ul className="space-y-3">
              {customerBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3 border-b border-border pb-3 text-sm text-stext md:text-base">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 bg-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal reveal-delay-3">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary">For Businesses</h3>
            <ul className="space-y-3">
              {businessBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3 border-b border-border pb-3 text-sm text-stext md:text-base">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 bg-secondary" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="reveal reveal-delay-4 mt-10 text-base font-medium text-stext md:text-lg">
          The goal is simple: make advanced AI useful in everyday retail.
        </p>
      </div>
    </Section>
  );
}

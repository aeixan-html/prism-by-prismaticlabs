import { Section } from './Section';

const problems = [
  { num: '01', title: 'Customer Assistance', description: 'Customers need help finding products, understanding information, and making decisions while shopping.' },
  { num: '02', title: 'Personalization', description: 'Traditional retail systems provide the same experience to every customer, regardless of history or preference.' },
  { num: '03', title: 'Disconnected Interaction', description: 'Customer interaction, membership, and retail information exist as separate, disconnected systems.' },
  { num: '04', title: 'Technology Gap', description: 'Advanced intelligent retail technology remains difficult for smaller businesses to implement.' },
];

export default function Problem() {
  return (
    <Section id="problem">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-border-2" />
              <span className="font-mono text-eyebrow uppercase text-mtext-2">THE PROBLEM</span>
            </div>
            <h2 className="text-section-title text-balance text-ptext">Retail can be smarter.</h2>
            <p className="mt-4 text-sm leading-relaxed text-mtext-2 md:text-base">
              Four challenges that shape the everyday shopping experience — for customers and businesses alike.
            </p>
          </div>

          <div className="reveal reveal-delay-2 lg:col-span-8">
            <div className="divide-y divide-border border-t border-b border-border">
              {problems.map((p) => (
                <div key={p.num} className="flex gap-5 py-5 md:gap-8 md:py-6">
                  <span className="font-mono text-sm font-semibold text-mtext">{p.num}</span>
                  <div>
                    <h3 className="mb-1.5 text-base font-semibold text-ptext md:text-lg">{p.title}</h3>
                    <p className="text-sm leading-relaxed text-mtext-2 md:text-base">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-base font-medium text-stext md:text-lg">
              What if a store had its own <span className="text-primary">intelligent business companion</span>?
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

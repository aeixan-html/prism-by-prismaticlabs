import { Section } from './Section';
import { Brain, Mic, Eye, Touchpad, Nfc, BarChart3 } from 'lucide-react';

const capabilities = [
  { icon: Brain, label: 'AI', description: 'Understand requests and provide intelligent responses.' },
  { icon: Mic, label: 'Voice', description: 'Support natural spoken interaction.' },
  { icon: Eye, label: 'Vision', description: 'Process visual information from the environment.' },
  { icon: Touchpad, label: 'Touch', description: 'Allow direct interaction through the display.' },
  { icon: Nfc, label: 'NFC', description: 'Connect physical membership with digital interaction.' },
  { icon: BarChart3, label: 'Business Intelligence', description: 'Create opportunities for better retail decisions and personalization.' },
];

export default function MeetPrism() {
  return (
    <Section id="meet-prism">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="reveal mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-border-2" />
            <span className="font-mono text-eyebrow uppercase text-mtext-2">MEET PRISM</span>
          </div>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
            <h2 className="text-section-title text-balance text-ptext lg:col-span-7">
              One system, six capabilities.
            </h2>
            <p className="text-sm leading-relaxed text-mtext-2 lg:col-span-5 md:text-base">
              PRISM combines AI with physical retail interaction to assist customers and support businesses. These are capabilities of a single system — not separate products.
            </p>
          </div>
        </div>

        <div className="reveal reveal-delay-2 border-t border-border">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <div
                key={c.label}
                className={`flex items-start gap-4 border-b border-border p-5 md:p-6 ${
                  i % 3 !== 2 ? 'lg:border-r' : ''
                } ${i % 2 === 0 ? 'sm:border-r lg:border-r' : ''}`}
              >
                <c.icon className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-ptext">{c.label}</h3>
                  <p className="text-sm leading-relaxed text-mtext-2">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal reveal-delay-4 mt-10">
          <div className="flex flex-col gap-4 border border-border bg-surface p-5 md:flex-row md:items-center md:justify-between md:p-6">
            <div>
              <h3 className="text-base font-semibold text-ptext">Try the live demo</h3>
              <p className="mt-1 text-sm text-mtext-2">Talk to PRISM directly — ask about products, prices, membership, or offers.</p>
            </div>
            <button
              onClick={() => document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90"
            >
              Open Demo →
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

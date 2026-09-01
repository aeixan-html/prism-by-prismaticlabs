import { Section } from './Section';
import { Check, X } from 'lucide-react';

const traditionalFeatures = [
  'Primarily software-based',
  'Text-focused',
  'Limited environmental awareness',
  'Generic interaction',
  'Little physical integration',
];

const prismFeatures = [
  'Physical retail system',
  'Voice + touch',
  'Multiple sensing methods',
  'Personalized interaction',
  'NFC integration',
  'Customer + business assistance',
];

export default function WhyPrism() {
  return (
    <Section id="why-prism">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="reveal mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-border-2" />
            <span className="font-mono text-eyebrow uppercase text-mtext-2">WHY PRISM?</span>
          </div>
          <h2 className="text-section-title text-balance text-ptext">PRISM vs. traditional chatbots.</h2>
        </div>

        <div className="grid gap-px border border-border bg-border lg:grid-cols-2">
          <div className="bg-bg p-6">
            <h3 className="mb-5 text-sm font-semibold text-mtext-2">Traditional Chatbot</h3>
            <ul className="space-y-3">
              {traditionalFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-mtext-2">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-mtext" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface p-6">
            <h3 className="mb-5 text-sm font-semibold text-primary">PRISM</h3>
            <ul className="space-y-3">
              {prismFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-ptext">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent4" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="reveal reveal-delay-3 mt-8 text-base font-medium text-stext md:text-lg">
          PRISM connects AI with the <span className="text-primary">physical environment</span> of a store.
        </p>
      </div>
    </Section>
  );
}

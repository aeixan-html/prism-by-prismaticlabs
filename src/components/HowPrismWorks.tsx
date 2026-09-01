import { Section } from './Section';
import { Radar, Brain, Cpu, Monitor, Sparkles } from 'lucide-react';

const steps = [
  { icon: Radar, label: 'DETECT', description: 'Sensors detect customer presence and environmental information.' },
  { icon: Brain, label: 'UNDERSTAND', description: 'Camera, microphone, touch, NFC, and sensors provide context.' },
  { icon: Cpu, label: 'THINK', description: 'PRISM software and AI process the incoming information.' },
  { icon: Monitor, label: 'RESPOND', description: 'PRISM responds through its display or voice interaction.' },
  { icon: Sparkles, label: 'PERSONALIZE', description: 'Customer and membership context influence the experience.' },
];

export default function HowPrismWorks() {
  return (
    <Section id="how-it-works">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="reveal mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-border-2" />
            <span className="font-mono text-eyebrow uppercase text-mtext-2">HOW PRISM WORKS</span>
          </div>
          <h2 className="text-section-title text-balance text-ptext">From sensing to personalization.</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-mtext-2 md:text-base">
            A five-step flow that connects physical sensing to retail intelligence.
          </p>
        </div>

        {/* Desktop: horizontal flow diagram */}
        <div className="reveal reveal-delay-2 hidden lg:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-6 h-px bg-border" />
            <div className="relative grid grid-cols-5">
              {steps.map((step, i) => (
                <div key={step.label} className="flex flex-col items-center px-2">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center border border-border-2 bg-surface">
                    <step.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <span className="mt-3 font-mono text-xs font-semibold tracking-wider text-ptext">{step.label}</span>
                  <p className="mt-2 max-w-[180px] text-center text-xs leading-relaxed text-mtext-2">{step.description}</p>
                  {i < steps.length - 1 && (
                    <span className="absolute top-4 -right-2 text-mtext">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical flow */}
        <div className="reveal reveal-delay-2 lg:hidden">
          <div className="relative">
            <div className="absolute bottom-0 left-6 top-6 w-px bg-border" />
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={step.label} className="relative flex gap-4">
                  <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center border border-border-2 bg-surface">
                    <step.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="pt-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold tracking-wider text-mtext">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-mono text-xs font-semibold tracking-wider text-ptext">{step.label}</span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-mtext-2">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

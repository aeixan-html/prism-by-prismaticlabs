import { Section } from './Section';
import { Lightbulb, PencilRuler, Code, Cpu, FlaskConical } from 'lucide-react';

const timeline = [
  { icon: Lightbulb, label: 'CONCEPT', status: 'done' },
  { icon: PencilRuler, label: 'DESIGN', status: 'done' },
  { icon: Code, label: 'SOFTWARE', status: 'active' },
  { icon: Cpu, label: 'HARDWARE', status: 'pending' },
  { icon: FlaskConical, label: 'TESTING', status: 'pending' },
];

const roadmap = [
  { title: 'Physical Integration', description: 'Complete the physical chassis and integrate the system.' },
  { title: 'AI Interaction', description: 'Improve natural and useful retail conversations.' },
  { title: 'Computer Vision', description: 'Expand visual understanding.' },
  { title: 'Business Intelligence', description: 'Develop useful retail insights.' },
  { title: 'Real-World Testing', description: 'Evaluate PRISM in realistic retail environments.' },
];

export default function Development() {
  return (
    <Section id="development">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="reveal mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-border-2" />
            <span className="font-mono text-eyebrow uppercase text-mtext-2">DEVELOPMENT</span>
          </div>
          <h2 className="text-section-title text-balance text-ptext">Development status.</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-mtext-2 md:text-base">
            The software experience and system architecture are being developed alongside the physical prototype.
          </p>
        </div>

        {/* Status bar */}
        <div className="reveal reveal-delay-2 mb-12">
          <div className="border border-border">
            <div className="grid grid-cols-5">
              {timeline.map((step, i) => (
                <div
                  key={step.label}
                  className={`flex flex-col items-center border-r border-border px-2 py-4 last:border-r-0 ${
                    step.status === 'done' ? 'bg-surface' : step.status === 'active' ? 'bg-surface' : 'bg-bg'
                  }`}
                >
                  <step.icon
                    className={`h-5 w-5 ${
                      step.status === 'done'
                        ? 'text-accent4'
                        : step.status === 'active'
                          ? 'text-primary'
                          : 'text-mtext'
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`mt-2 font-mono text-[10px] font-bold tracking-wider ${
                      step.status === 'done'
                        ? 'text-accent4'
                        : step.status === 'active'
                          ? 'text-primary'
                          : 'text-mtext'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="mt-1 font-mono text-[9px] text-mtext">
                    {step.status === 'done' ? '✓ DONE' : step.status === 'active' ? '● ACTIVE' : '○ PENDING'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-dot" />
            <span className="font-mono text-xs text-primary">Prototype in development</span>
          </div>
        </div>

        {/* Roadmap */}
        <div className="reveal reveal-delay-3">
          <h3 className="mb-6 font-mono text-xs font-semibold uppercase tracking-wider text-mtext-2">Future Roadmap</h3>
          <div className="divide-y divide-border border-t border-b border-border">
            {roadmap.map((item, i) => (
              <div key={item.title} className="flex gap-5 py-4 md:gap-8 md:py-5">
                <span className="font-mono text-sm font-semibold text-mtext">{String(i + 1).padStart(2, '0')}</span>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-ptext">{item.title}</h4>
                  <p className="mt-0.5 text-sm text-mtext-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

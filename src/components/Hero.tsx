import { ArrowRight, Mic, Eye, Touchpad, Nfc, Cpu, Wifi, Activity } from 'lucide-react';

export default function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="reveal mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-border-2" />
          <span className="font-mono text-eyebrow uppercase text-mtext-2">PRISMATIC LABS / PRISM</span>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="reveal reveal-delay-1 lg:col-span-5">
            <h1 className="text-hero text-balance text-ptext">P.R.I.S.M.</h1>
            <p className="mt-4 text-base font-medium text-stext md:text-lg">
              Personalized Retail Intelligence and Sales Manager
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-mtext-2 md:text-base">
              An intelligent retail companion that connects AI with the physical shopping environment — voice, vision, touch, and NFC in one system.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo('#demo')}
                className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90"
              >
                Explore PRISM
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollTo('#how-it-works')}
                className="inline-flex items-center gap-2 border border-border-2 px-5 py-2.5 text-sm font-medium text-stext transition-all hover:border-mtext-2 hover:text-ptext"
              >
                How It Works
              </button>
            </div>
          </div>

          <div className="reveal reveal-delay-3 lg:col-span-7">
            <article aria-label="PRISM system interface preview" className="relative mx-auto max-w-lg">
              <div className="relative border border-border bg-surface p-px shadow-2xl">
                <div className="relative overflow-hidden bg-bg p-5 md:p-6">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-accent4 animate-pulse-dot" />
                      <span className="font-mono text-xs font-semibold tracking-wider text-ptext">PRISM</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-mtext">
                      <Wifi className="h-3 w-3 text-accent4" />
                      ONLINE
                    </div>
                  </div>

                  <div className="space-y-3 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-mtext">Welcome back</div>
                        <div className="text-sm font-semibold text-ptext">PURPLE Member</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-mtext">PRISM Points</div>
                        <div className="font-mono text-sm font-bold text-ptext">2,450</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2" role="list" aria-label="PRISM active sensors">
                      {[
                        { icon: Eye, label: 'Vision', color: 'text-secondary' },
                        { icon: Mic, label: 'Voice', color: 'text-primary' },
                        { icon: Touchpad, label: 'Touch', color: 'text-accent3' },
                        { icon: Nfc, label: 'NFC', color: 'text-accent4' },
                      ].map((s) => (
                        <div key={s.label} role="listitem" className="flex flex-col items-center gap-1 border border-border bg-surface-2 p-2.5">
                          <s.icon className={`h-4 w-4 ${s.color}`} aria-hidden="true" />
                          <span className="font-mono text-[10px] text-mtext">{s.label}</span>
                          <div className="h-1 w-1 rounded-full bg-accent4 animate-pulse-dot" aria-hidden="true" />
                        </div>
                      ))}
                    </div>

                    <div className="border border-primary/20 bg-primary/5 p-3" aria-label="Membership status: PURPLE tier, 2450 PRISM Points, 550 points to RED tier">
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-xs text-mtext">Membership</span>
                        <span className="border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-bold text-primary">PURPLE</span>
                      </div>
                      <div className="h-1 overflow-hidden bg-border" role="progressbar" aria-valuenow={82} aria-valuemin={0} aria-valuemax={100} aria-label="Membership progress: 82 percent to RED tier">
                        <div className="h-full w-[82%] bg-primary" />
                      </div>
                      <div className="mt-1.5 flex items-center justify-between font-mono text-[10px] text-mtext">
                        <span>2,450 pts</span>
                        <span>550 to RED</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 border border-border bg-surface-2 p-2.5" aria-label="Voice input active, listening">
                      <Mic className="h-4 w-4 text-primary" aria-hidden="true" />
                      <div className="flex items-center gap-0.5" aria-hidden="true">
                        {[3, 7, 5, 10, 6, 4, 8, 5].map((h, i) => (
                          <div
                            key={i}
                            className="w-0.5 rounded-full bg-primary animate-pulse-dot"
                            style={{ height: `${h * 2}px`, animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                      <span className="ml-auto font-mono text-[10px] text-mtext">Listening...</span>
                    </div>

                    <div className="flex items-center gap-2 border border-border bg-surface-2 p-2.5" aria-label="AI processing status: ready">
                      <Cpu className="h-4 w-4 text-secondary" aria-hidden="true" />
                      <span className="text-xs text-stext">AI processing ready</span>
                      <Activity className="ml-auto h-3.5 w-3.5 text-accent4" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-2.5">
                    <span className="font-mono text-[10px] text-mtext">PRISMATIC LABS</span>
                    <span className="font-mono text-[10px] text-mtext">Prototype v0.1</span>
                  </div>
                </div>
              </article>

              <div className="absolute -right-3 top-1/4 hidden border border-border bg-surface/95 px-2.5 py-1.5 text-xs text-stext md:block">
                <div className="flex items-center gap-1.5">
                  <Eye className="h-3 w-3 text-secondary" aria-hidden="true" />
                  Vision Active
                </div>
              </div>
              <div className="absolute -left-3 bottom-1/4 hidden border border-border bg-surface/95 px-2.5 py-1.5 text-xs text-stext md:block">
                <div className="flex items-center gap-1.5">
                  <Nfc className="h-3 w-3 text-accent4" aria-hidden="true" />
                  NFC Ready
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

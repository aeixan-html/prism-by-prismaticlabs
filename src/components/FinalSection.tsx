import { ArrowRight } from 'lucide-react';

export default function FinalSection() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="final" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <div className="mb-6 flex items-center justify-center gap-3">
          <img
            src="/prismtic.jpeg"
            alt="PRISMATIC LABS official logo"
            className="h-10 w-10 object-contain"
          />
          <span className="font-mono text-eyebrow uppercase text-mtext-2">PRISMATIC LABS</span>
          <div className="h-px w-8 bg-border-2" />
        </div>
        <h2 className="text-hero text-balance text-ptext">P.R.I.S.M.</h2>
        <p className="mt-3 text-base text-stext md:text-lg">Personalized Retail Intelligence and Sales Manager</p>
        <p className="mt-6 text-sm leading-relaxed text-mtext-2 md:text-base">
          Building smarter interactions between businesses and their customers.
        </p>
        <div className="mt-8">
          <button
            onClick={() => scrollTo('#demo')}
            className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90"
          >
            Explore PRISM
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

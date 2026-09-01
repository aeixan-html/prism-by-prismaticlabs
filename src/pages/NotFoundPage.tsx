import Seo from '@/components/Seo';
import { ArrowRight, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page Not Found | PRISM by PRISMATIC LABS"
        description="The page you requested does not exist on the PRISM by PRISMATIC LABS website."
        canonicalPath="/404"
      />
      <section className="flex min-h-screen items-center justify-center px-4 pt-20">
        <div className="mx-auto max-w-lg text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <img src="/prismtic.jpeg" alt="PRISMATIC LABS official logo" className="h-10 w-10 object-contain" />
            <span className="font-mono text-sm font-bold tracking-tight text-ptext">PRISMATIC LABS</span>
          </div>

          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-border-2" />
            <span className="font-mono text-eyebrow uppercase text-mtext-2">404 — NOT FOUND</span>
            <div className="h-px w-8 bg-border-2" />
          </div>

          <h1 className="text-hero text-balance text-ptext">Page not found</h1>
          <p className="mt-5 text-sm leading-relaxed text-mtext-2 md:text-base">
            The page you requested doesn't exist or may have been moved. The PRISM website is a single-page
            experience — everything lives on the homepage.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Back to Homepage
            </a>
            <a
              href="/#demo"
              className="inline-flex items-center gap-2 border border-border-2 px-5 py-2.5 text-sm font-medium text-stext transition-all hover:border-mtext-2 hover:text-ptext"
            >
              Explore PRISM
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

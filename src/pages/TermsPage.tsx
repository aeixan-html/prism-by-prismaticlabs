import Seo from '@/components/Seo';

const sections = [
  {
    heading: 'Overview',
    body: 'These Terms describe the conditions for using the PRISM by PRISMATIC LABS demonstration website. By accessing this website, you agree to these terms.',
  },
  {
    heading: 'Demonstration Project',
    body: 'PRISM (Personalized Retail Intelligence and Sales Manager) is a student technology project and concept prototype by PRISMATIC LABS. This website is a demonstration and does not constitute a commercial product, service, or offering.',
  },
  {
    heading: 'Demo Content',
    body: 'All products, prices, membership tiers, PRISM Points, offers, and chat responses are fictional demo data created for demonstration purposes only. They do not represent real products, real prices, or real transactions. No purchases can be made on this website.',
  },
  {
    heading: 'No Warranty',
    body: 'The website is provided "as is" without warranties of any kind. PRISMATIC LABS does not guarantee that the website will be error-free, uninterrupted, or continuously available.',
  },
  {
    heading: 'Intellectual Property',
    body: 'The PRISM name, PRISMATIC LABS name, logo, design, and website content are the intellectual property of PRISMATIC LABS. You may not copy, reproduce, or distribute the website content without permission.',
  },
  {
    heading: 'Limitation of Liability',
    body: 'PRISMATIC LABS is not liable for any damages arising from the use of this demonstration website. The website is provided for informational and demonstration purposes only.',
  },
  {
    heading: 'External Links',
    body: 'This website does not currently link to external sites. If external links are added in the future, PRISMATIC LABS is not responsible for the content or practices of those external sites.',
  },
  {
    heading: 'Changes',
    body: 'PRISMATIC LABS may update these Terms at any time. Continued use of the website after changes constitutes acceptance of the updated Terms.',
  },
];

export default function TermsPage() {
  return (
    <>
      <Seo
        title="Terms of Use | PRISM by PRISMATIC LABS"
        description="Terms of Use for the PRISM by PRISMATIC LABS demonstration website. A student technology project and concept prototype."
        canonicalPath="/terms"
      />
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-border-2" />
            <span className="font-mono text-eyebrow uppercase text-mtext-2">LEGAL</span>
          </div>
          <h1 className="text-hero text-balance text-ptext">Terms of Use</h1>
          <p className="mt-4 text-sm text-mtext-2">Last updated: September 2026</p>

          <div className="mt-10 space-y-8">
            {sections.map((s) => (
              <article key={s.heading}>
                <h2 className="mb-2 text-base font-semibold text-ptext">{s.heading}</h2>
                <p className="text-sm leading-relaxed text-mtext-2 md:text-base">{s.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 border-t border-border pt-6">
            <a href="/" className="text-sm font-medium text-primary transition-colors hover:text-vlink">
              ← Back to Homepage
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

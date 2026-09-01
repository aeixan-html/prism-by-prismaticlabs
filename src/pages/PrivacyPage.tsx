import Seo from '@/components/Seo';

const sections = [
  {
    heading: 'Overview',
    body: 'This website is a demonstration project for PRISM (Personalized Retail Intelligence and Sales Manager), a concept by PRISMATIC LABS. This Privacy Policy explains what the website does and does not do.',
  },
  {
    heading: 'No Real User Data',
    body: 'This website does not create accounts, require login, or collect personal information from visitors. There is no registration form, no contact form, and no user database.',
  },
  {
    heading: 'Demo Data Is Local and Predefined',
    body: 'All products, prices, membership tiers, PRISM Points, offers, and chat responses shown on this website are predefined demo data embedded in the application code. No data is sent to a server, stored in a database, or shared with third parties. The PRISM conversation demo uses local logic — no external AI service is called.',
  },
  {
    heading: 'Cookies',
    body: 'This website does not set cookies and does not use tracking technologies. No analytics, advertising, or session-tracking cookies are present.',
  },
  {
    heading: 'Analytics',
    body: 'This website does not use analytics services. No visitor behavior is tracked, recorded, or analyzed.',
  },
  {
    heading: 'Third-Party Services',
    body: 'This website does not integrate with or send data to any third-party service. All content is self-contained within the application.',
  },
  {
    heading: 'Hosting',
    body: 'The website is hosted on a static hosting platform. The hosting provider may process standard HTTP request logs (such as IP address and request path) as part of normal infrastructure operation, but PRISMATIC LABS does not collect or control that data.',
  },
  {
    heading: 'Changes',
    body: 'If this website is ever updated to collect data, use cookies, or integrate third-party services, this Privacy Policy will be updated to reflect those changes accurately.',
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy | PRISM by PRISMATIC LABS"
        description="Privacy Policy for the PRISM by PRISMATIC LABS demonstration website. No real user data is collected, stored, or shared."
        canonicalPath="/privacy"
      />
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-border-2" />
            <span className="font-mono text-eyebrow uppercase text-mtext-2">LEGAL</span>
          </div>
          <h1 className="text-hero text-balance text-ptext">Privacy Policy</h1>
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

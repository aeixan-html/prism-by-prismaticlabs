export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <img
              src="/prismtic.jpeg"
              alt="PRISMATIC LABS official logo"
              className="h-9 w-9 object-contain"
            />
            <span className="text-sm font-bold tracking-tight text-ptext">PRISMATIC LABS</span>
          </div>
          <p className="text-xs text-mtext-2">
            PRISM — Personalized Retail Intelligence and Sales Manager. Student technology project MVP.
          </p>
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-4">
              <li>
                <a href="/" className="text-xs text-mtext-2 transition-colors hover:text-ptext">Home</a>
              </li>
              <li>
                <a href="/privacy" className="text-xs text-mtext-2 transition-colors hover:text-ptext">Privacy</a>
              </li>
              <li>
                <a href="/terms" className="text-xs text-mtext-2 transition-colors hover:text-ptext">Terms</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
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
        </div>
      </div>
    </footer>
  );
}

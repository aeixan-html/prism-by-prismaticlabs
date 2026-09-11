import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <img
              src="/Low-Poly_Triangular_Prism_Icon_20260826_145832_0000.png"
              alt="NOSDIA logo"
              className="h-9 w-9 object-contain"
            />
            <span className="text-sm font-bold tracking-tight text-ptext">NOSDIA</span>
          </div>
          <p className="text-xs text-mtext-2">
            PRISM by NOSDIA. Personalized Retail Intelligence and Service Module.
          </p>
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-4">
              <li>
                <Link to="/" className="text-xs text-mtext-2 transition-colors hover:text-ptext">Home</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-xs text-mtext-2 transition-colors hover:text-ptext">Privacy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-xs text-mtext-2 transition-colors hover:text-ptext">Terms</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Problem', href: '#problem' },
  { label: 'PRISM', href: '#meet-prism' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Membership', href: '#membership' },
  { label: 'Demo', href: '#demo' },
  { label: 'Impact', href: '#impact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header>
      <nav
        aria-label="Primary navigation"
        className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? 'border-b border-border bg-bg/95 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 md:px-6">
          <button onClick={() => handleNavClick('#hero')} className="flex items-center gap-2.5" aria-label="Go to PRISM home">
            <img
              src="/prismtic.jpeg"
              alt="PRISMATIC LABS official logo"
              className="h-9 w-9 object-contain"
            />
            <span className="text-sm font-bold tracking-tight text-ptext">PRISMATIC LABS</span>
          </button>

        <div className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="px-3 py-1.5 text-sm text-mtext-2 transition-colors hover:text-ptext"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden lg:block">
          <button
            onClick={() => handleNavClick('#demo')}
            className="text-sm font-medium text-primary transition-colors hover:text-vlink"
          >
            Explore PRISM →
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 text-stext lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

        {mobileOpen && (
          <div className="border-t border-border bg-bg lg:hidden">
          <div className="flex flex-col gap-0.5 px-4 py-3">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2.5 text-left text-sm text-mtext-2 transition-colors hover:bg-surface hover:text-ptext"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#demo')}
              className="mt-2 border border-border-2 px-3 py-2.5 text-left text-sm font-medium text-primary"
            >
              Explore PRISM →
            </button>
          </div>
        </div>
        )}
      </nav>
    </header>
  );
}

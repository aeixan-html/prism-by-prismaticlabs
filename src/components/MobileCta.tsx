import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 400;
      const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 200;
      setVisible(scrolled && !nearBottom);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary/90 lg:hidden"
      aria-label="Scroll to PRISM demo"
    >
      Explore PRISM
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

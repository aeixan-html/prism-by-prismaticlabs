import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`relative py-16 md:py-24 ${className}`}>
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export function SectionHeader({ label, title, description, center = true }: SectionHeaderProps) {
  return (
    <div className={`${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} mb-10`}>
      {label && (
        <div className="mb-3 flex items-center gap-3" style={{ justifyContent: center ? 'center' : 'flex-start' }}>
          <div className="h-px w-8 bg-border-2" />
          <span className="font-mono text-eyebrow uppercase text-mtext-2">{label}</span>
          {center && <div className="h-px w-8 bg-border-2" />}
        </div>
      )}
      <h2 className="text-section-title text-balance text-ptext">{title}</h2>
      {description && (
        <p className="mt-4 text-sm leading-relaxed text-mtext-2 md:text-base">{description}</p>
      )}
    </div>
  );
}

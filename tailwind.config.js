/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0E1A',
        surface: '#0F1424',
        'surface-2': '#141B2E',
        'surface-3': '#1A2338',
        primary: '#8B5CF6',
        secondary: '#3B82F6',
        accent3: '#06B6D4',
        accent4: '#14B8A6',
        accent5: '#F59E0B',
        accent6: '#EC4899',
        ptext: '#F1F5F9',
        stext: '#CBD5E1',
        mtext: '#64748B',
        'mtext-2': '#94A3B8',
        border: '#1E293B',
        'border-2': '#334155',
        link: '#60A5FA',
        vlink: '#A78BFA',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        hero: ['clamp(2.5rem, 6vw, 4.25rem)', { lineHeight: '1.02', fontWeight: '700' }],
        'section-title': ['clamp(1.75rem, 3.5vw, 2.5rem)', { lineHeight: '1.1', fontWeight: '700' }],
        eyebrow: ['0.75rem', { lineHeight: '1', fontWeight: '600', letterSpacing: '0.15em' }],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'typing-bounce': {
          '0%, 80%, 100%': { transform: 'scaleY(0.4)' },
          '40%': { transform: 'scaleY(1)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'pulse-dot': 'pulse-dot 1.5s ease-in-out infinite',
        'typing-bounce': 'typing-bounce 1.2s ease-in-out infinite',
        'scan-line': 'scan-line 3s linear infinite',
      },
    },
  },
  plugins: [],
};

import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: 'var(--bg-base)',
          elevated: 'var(--bg-elevated)',
          muted: 'var(--bg-muted)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          DEFAULT: 'var(--border-default)',
          strong: 'var(--border-strong)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          muted: 'var(--text-muted)',
          inverse: 'var(--text-inverse)',
        },
        brand: {
          red: 'var(--brand-red)',
          'red-hover': 'var(--brand-red-hover)',
          'red-soft': 'var(--brand-red-soft)',
          gold: 'var(--brand-gold)',
          'gold-soft': 'var(--brand-gold-soft)',
          green: 'var(--brand-green)',
          'green-soft': 'var(--brand-green-soft)',
          blue: 'var(--brand-blue)',
          'blue-soft': 'var(--brand-blue-soft)',
        },
        live: { DEFAULT: 'var(--live-red)' },
        success: { DEFAULT: 'var(--success)', soft: 'var(--success-soft)' },
        danger: { DEFAULT: 'var(--danger)', soft: 'var(--danger-soft)' },
        warning: { DEFAULT: 'var(--warning)', soft: 'var(--warning-soft)' },
        info: { DEFAULT: 'var(--info)', soft: 'var(--info-soft)' },
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '18px',
        '2xl': '22px',
      },
      fontFamily: {
        sans: ['"Noto Sans Lao"', '"Phetsarath OT"', '"Noto Sans Thai"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'monospace'],
      },
      fontSize: {
        'result-xl': ['72px', { lineHeight: '80px', fontWeight: '800', letterSpacing: '0.05em' }],
        'result-lg': ['56px', { lineHeight: '64px', fontWeight: '800', letterSpacing: '0.05em' }],
        'result-md': ['40px', { lineHeight: '48px', fontWeight: '700', letterSpacing: '0.04em' }],
        'result-sm': ['28px', { lineHeight: '36px', fontWeight: '700', letterSpacing: '0.03em' }],
        h1: ['28px', { lineHeight: '36px', fontWeight: '700' }],
        h2: ['22px', { lineHeight: '30px', fontWeight: '700' }],
        h3: ['18px', { lineHeight: '26px', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '26px', fontWeight: '400' }],
        'body-md': ['14px', { lineHeight: '22px', fontWeight: '400' }],
        caption: ['12px', { lineHeight: '18px', fontWeight: '500' }],
        overline: ['11px', { lineHeight: '14px', fontWeight: '700', letterSpacing: '0.10em' }],
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        card: 'var(--shadow-card)',
        hover: 'var(--shadow-hover)',
        result: 'var(--shadow-result)',
        live: 'var(--live-glow)',
      },
      animation: {
        'pulse-live': 'pulse-live 1.6s ease-in-out infinite',
        'flip-in': 'flip-in 0.6s ease-out',
        'fade-in-up': 'fade-in-up 0.4s ease-out',
      },
      keyframes: {
        'pulse-live': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 23, 68, 0.45)' },
          '50%': { boxShadow: '0 0 0 8px rgba(255, 23, 68, 0)' },
        },
        'flip-in': {
          '0%': { transform: 'rotateX(-90deg)', opacity: '0' },
          '100%': { transform: 'rotateX(0deg)', opacity: '1' },
        },
        'fade-in-up': {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

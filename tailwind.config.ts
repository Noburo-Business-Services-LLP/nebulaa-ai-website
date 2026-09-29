import type { Config } from 'tailwindcss'

/**
 * Theme colours are CSS variables (so `.dark` bands can flip them), and a bare
 * var() can't take a Tailwind opacity suffix like bg-ink/60. This wraps each
 * one so /NN works, mixing the variable with transparent.
 */
const token = (name: string) =>
  (({ opacityValue }: { opacityValue?: string }) =>
    // Tailwind passes a var(--tw-*-opacity) string when no /NN is used; only mix for a real number.
    opacityValue === undefined || opacityValue === '1' || !/^[\d.]+$/.test(opacityValue)
      ? `var(${name})`
      : `color-mix(in srgb, var(${name}) ${Math.round(Number(opacityValue) * 100)}%, transparent)`) as unknown as string

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic theme tokens — defined in globals.css, flipped by `.dark`.
        // Use these for anything that must respond to the theme.
        ground:     token('--ground'),
        surface:    token('--surface'),
        'surface-2':'var(--surface-2)',
        ink:        token('--ink'),
        'ink-2':    token('--ink-2'),
        muted:      token('--muted'),
        faint:      token('--faint'),
        rule:       token('--rule'),
        'rule-2':   token('--rule-2'),
        gold:       token('--gold'),
        sun:        token('--sun'),
        coral:      token('--coral'),
        'coral-text':'var(--coral-text)',
        wa:         token('--wa'),
        'wa-dark':  token('--wa-dark'),
        peach:      token('--peach'),
        mint:       token('--mint'),
        sky:        token('--sky'),
        lav:        token('--lav'),
        'gold-text':'var(--gold-text)',
        'gold-display':'var(--gold-display)',
        'gold-wash':'var(--gold-wash)',
        brand: {
          gold:        '#F5A623',
          'gold-soft': 'rgba(245,166,35,0.15)',
          'gold-light':'#FFF3B0',
          'gold-dim':  '#C49200',
          'gold-pale': '#FFFBEB',
          black:       '#0A0A0A',
          white:       '#FFFFFF',
          'off-white': '#FAFAF8',
          'warm-gray': '#F2F0EB',
          border:      '#E8E4DC',
          text:        '#1A1815',
          muted:       '#6B6560',
          'muted-2':   '#9E9890',
          // Gravity product dark-mode tokens (parity with the app, not the light palette)
          'dark-bg':      '#0A0A0A',
          'dark-surface': '#151515',
          'dark-surface2':'#1A1A1A',
          'dark-text':    '#F5F4F1',
        },
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'Segoe UI', 'system-ui', 'sans-serif'],
        body:    ['Plus Jakarta Sans', 'Segoe UI', 'system-ui', 'sans-serif'],
        sans:    ['Plus Jakarta Sans', 'Segoe UI', 'system-ui', 'sans-serif'],
        // Small labels and figures: same family as body, no code-style face
        mono:    ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        // Prices and big numbers: the heavy condensed headline face
        digital: ['Archivo', 'Arial Narrow', 'Arial', 'sans-serif'],
        script:  ['Kaushan Script', 'Brush Script MT', 'cursive'],
      },
      fontSize: {
        'display-xl': ['80px', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['64px', { lineHeight: '1.0',  letterSpacing: '-0.025em' }],
        'display-md': ['48px', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-sm': ['36px', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      boxShadow: {
        'gold-sm':    '0 2px 16px rgba(245,166,35,0.15)',
        'gold-md':    '0 4px 32px rgba(245,166,35,0.2)',
        'gold-lg':    '0 8px 64px rgba(245,166,35,0.25)',
        card:         '0 1px 3px rgba(26,24,21,0.06), 0 4px 16px rgba(26,24,21,0.04)',
        'card-hover': '0 4px 24px rgba(26,24,21,0.1), 0 12px 48px rgba(26,24,21,0.06)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'float-slow':   'float 5s ease-in-out infinite',
        'float-medium': 'float 3.5s ease-in-out infinite',
        'spin-slow':    'spin 12s linear infinite',
        'pulse-gold':   'pulseGold 2.5s ease-in-out infinite',
        marquee:        'marquee 28s linear infinite',
        shimmer:        'shimmer 2s linear infinite',
        'fade-up':      'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        'scale-in':     'scaleIn 0.5s cubic-bezier(0.22,1,0.36,1) forwards',
      },
      keyframes: {
        float:     { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseGold: { '0%,100%': { boxShadow: '0 0 0 0 rgba(245,166,35,0.3)' }, '50%': { boxShadow: '0 0 0 16px rgba(245,166,35,0)' } },
        marquee:   { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        shimmer:   { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        fadeUp:    { '0%': { opacity: '0', transform: 'translateY(28px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn:   { '0%': { opacity: '0', transform: 'scale(0.94)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
}

export default config

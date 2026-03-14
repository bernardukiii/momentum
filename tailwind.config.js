/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // === CORE BRAND ===
        'momentum-primary-purple-light': '#C4B5FD',   // soft violet
        'momentum-primary-purple': '#A78BFA',         // main button color
        'momentum-midnight-indigo': '#1E1B4B',        // labels
        'momentum-primary-indigo-hover': '#6366F1',   // hover state
        'momentum-primary-indigo-active': '#4F46E5',  // active state

        // === ACCENT ===
        'momentum-accent-lavender': '#DDD6FE',        // subtle highlights
        'momentum-accent-soft': '#EDE9FE',            // background tint

        // === BACKGROUNDS ===
        'momentum-bg-main': '#F8F7FF',                // very light purple tint
        'momentum-bg-soft': '#F5F3FF',                // gradient middle
        'momentum-bg-card': '#FFFFFF',                // cards

        // === TEXT ===
        'momentum-text-primary': '#1F2937',           // main text (dark slate)
        'momentum-text-secondary': '#4B5563',
        'momentum-text-muted': '#6B7280',
        'momentum-text-white': '#FFFFFF',

        // === STATES ===
        'momentum-state-success': '#22C55E',
        'momentum-state-warning': '#F59E0B',
        'momentum-state-error': '#EF4444',

        // === BORDERS ===
        'momentum-border-soft': '#E9E7FF',
        'momentum-border-default': '#DDD6FE',
      }
    },
  },
  plugins: [],
}

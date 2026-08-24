import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        foreground: '#ffffff',
        golden: '#ebd197', 
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)', 'monospace', 'ui-monospace'],
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from 'tailwindcss'
// import image from '../issue-tracker/app/assets/background.png'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-background': "url('/background.png')",
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        md: '8px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'theme': {
          'black': '#020202',
          'darkgrey': '#545C52',
          'lightgrey': '#C17C74',
          'yellow': '#FEDC97',
          'blue': '#001D4A'
        }
      }
    },
  },
  plugins: [],
}
export default config

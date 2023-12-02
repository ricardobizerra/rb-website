import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      blue: {
        50: '#00bfff',
        100: '#0018ff',
        200: '#000ca6',
        300: '#000920',
      },
    },
    screens: {
      'phone': {'max': '400px'},
      'md': {'max': '768px'},
      'lg': {'max': '1024px'},
    }
  },
  plugins: [],
}
export default config

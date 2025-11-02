import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx,mdx}'],
  theme: { extend: { borderRadius: { '2xl': '1rem' } } },
  plugins: [],
}
export default config

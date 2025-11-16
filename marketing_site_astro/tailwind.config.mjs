/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#4f46ef',
        'primary-dark': '#4338ca',
        accent: '#f97316',
        background: '#f8fafc',
        surface: '#ffffff',
        text: '#0f172a',
        muted: '#64748b',
        border: '#e2e8f0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 45px rgba(79, 70, 229, 0.18)',
        card: '0 35px 70px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
}

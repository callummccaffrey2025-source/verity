/** Optional; Tailwind v4 works without, but explicit content paths help in monorepos */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: {} },
  plugins: [],
};

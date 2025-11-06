/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4283E5',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg,#1E88FD,#4FB3FF)',
      },
    },
  },
  plugins: [
    // 需要可追加插件
  ],
}

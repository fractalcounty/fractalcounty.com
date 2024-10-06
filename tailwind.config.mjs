import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [typography, daisyui],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['AlteHaasGrotesk', ...defaultTheme.fontFamily.sans],
        serif: ['AlteHaasGrotesk', ...defaultTheme.fontFamily.serif],
        mono: ['CommitMono', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  daisyui: {
    themes: [
      {
        // light theme
        casper: {
          primary: '#34548a',
          secondary: '#343B58',
          accent: '#565a6e',
          neutral: '#9699A3',
          'base-100': '#CDCED1',
          'base-content': '#343B58',
          info: '#166775',
          success: '#485E30',
          warning: '#965027',
          error: '#8C4351',
        },
      },
      {
        // dark theme
        laramie: {
          primary: '#7aa2f7',
          'primary-content': '#c0caf5',
          secondary: '#7dcfff',
          'secondary-content': '#c0caf5',
          accent: '#bb9af7',
          'accent-content': '#c0caf5',
          neutral: '#24283b',
          'neutral-content': '#c0caf5',
          'base-100': '#1A1B26',
          'base-content': '#a9b1d6',
          info: '#2AC3DE',
          success: '#9ECE6A',
          warning: '#FF9E64',
          error: '#F7768E',
        },
      },
    ],
  },
  darkMode: ['class', '[data-theme="laramie"]'],
};

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
          secondary: '#5a3e8e',
          info: '#006c86',
          'info-content': '#343b58',
          success: '#485E30',
          warning: '#965027',
          error: '#8C4351',

          'base-100': '#e6e7ed',
          neutral: '#e6e7ed',
          'neutral-content': '#343B58',
          accent: '#6c6e75',
          'accent-content': '#343b58',
          'base-content': '#343b58',
        },
      },
      {
        // dark theme
        laramie: {
          primary: '#7aa2f7',
          secondary: '#bb9af7',
          info: '#2AC3DE',
          'info-content': '#c0caf5',
          success: '#9ECE6A',
          warning: '#FF9E64',
          error: '#F7768E',

          'base-100': '#1A1B26',
          neutral: '#24283b',
          'neutral-content': '#414868',
          accent: '#565f89',
          'accent-content': '#9aa5ce',
          'base-content': '#a9b1d6',
        },
      },
    ],
  },
  darkMode: ['class', '[data-theme="laramie"]'],
};

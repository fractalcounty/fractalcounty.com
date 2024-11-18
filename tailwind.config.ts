import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'
import defaultTheme from 'tailwindcss/defaultTheme'
import { createThemes } from 'tw-colors'

export default {
  plugins: [
    typography,
    daisyui,
    createThemes(
      {
        laramie: {
          // dark theme
          'theme-primary': '#7aa2f7',
          'theme-darkest': '#151621', // 950
          'theme-base': '#1A1B29', // 900
          'theme-panel': '#24283b', // 800, tweet bg
          'theme-neutral': '#2D3149', // 700
          'theme-border': '#373C58', // 600
          'theme-accent': '#414868', // 500
          // #555F87 400
          'theme-secondary': '#6C79A3', // 300, sub-subtitles
          'theme-content-weak': '#8B96B7', // 200, subtitles
          'theme-content': '#a9b1d6', // 100
          'theme-content-strong': '#c0caf5', // 50
        },
        casper: {
          // light theme
          'theme-primary': '#34548a',
          'theme-darkest': '#d5d6db',
          'theme-base': '#d5d6db',
          'theme-panel': '#e5e6eb',
          'theme-neutral': '#9699a3',
          'theme-border': '#565a6e',
          'theme-accent': '#565a6e',
          'theme-secondary': '#4A4D63',
          'theme-content-weak': '#4A4D63',
          'theme-content': '#343b58',
          'theme-content-strong': '#0f0f14',
        },
      },
      {
        defaultTheme: 'laramie',
      },
    ),
  ],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Inter', ...defaultTheme.fontFamily.serif],
        mono: ['CommitMono', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  daisyui: {
    themes: [
      {
        // dark theme
        laramie: {
          primary: '#7aa2f7',
          secondary: '#bb9af7',
          info: '#2AC3DE',
          success: '#9ECE6A',
          warning: '#FF9E64',
          error: '#F7768E',
          'base-100': '#1A1B26',
          'base-content': '#a9b1d6',
          neutral: '#24283b',
          'neutral-content': '#9aa5ce',
          accent: '#565f89',
          'accent-content': '#c0caf5',
        },
      },
    ],
  },
  // darkMode: ['class', '[data-theme="laramie"]'],
} satisfies Config

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
          'theme-primary': '#7aa2f7',
          'theme-darkest': '#1b1e2e',
          'theme-base': '#1b1e2e',
          'theme-panel': '#24283b',
          'theme-neutral': '#292e42',
          'theme-border': '#292e42',
          'theme-accent': '#1b1e2e',
          'theme-secondary': '#414868',
          'theme-content-weak': '#a9b1d6',
          'theme-content': '#a9b1d6',
          'theme-content-strong': '#a9b1d6',
        },
        woofwoof: {
          'theme-accent': '#7aa2f7', // Primary blue accent for interactive elements
          'theme-accent-dim': '#6881C0', // Primary blue accent for interactive elements
          'theme-100': '#c0caf5',    // Brightest foreground text
          'theme-200': '#a9b1d6',    // Primary text
          'theme-300': '#8089b3',    // Secondary text
          'theme-400': '#545c7e',    // Tertiary text, comments
          'theme-500': '#41496b',    // Subtle UI elements
          'theme-600': '#2f344d',    // Borders, separators
          'theme-700': '#24283b',    // Primary background
          'theme-800': '#1f2335',    // Deep background, sidebar
          'theme-900': '#1b1e2e',    // Darkest background
        },
      },
      {
        defaultTheme: 'woofwoof',
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
        woofwoof: {
          primary: '#7aa2f7',
          secondary: '#7aa2f7',
          info: '#7aa2f7',
          success: '#7aa2f7',
          warning: '#7aa2f7',
          error: '#7aa2f7',
          'base-100': '#1b1e2e',
          'base-content': '#a9b1d6',
          neutral: '#24283b',
          'neutral-content': '#8089b3',
          accent: '#3d59a1',
          'accent-content': '#a9b1d6',
        },
      },
    ],
  },
} satisfies Config

import type { AstroUserConfig } from 'astro/config'
import fs from 'node:fs'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import opengraphImages from 'astro-opengraph-images'
import { customOgMediaLayout } from './src/ogRenderer'

export default defineConfig({
  site: 'https://fractalcounty.com',
  markdown: {},
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        formatOptions: {
          webp: {
            quality: 75,
            effort: 6,
          },
          avif: {
            quality: 72,
            effort: 6,
          },
        },
      },
    },
  },
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    icon(),
    opengraphImages({
      render: customOgMediaLayout,
      options: {
        fonts: [
          {
            name: 'AlteHaasGroteskRegular',
            weight: 400,
            style: 'normal',
            data: fs.readFileSync('public/fonts/AlteHaasGroteskRegular.woff'),
          },
          {
            name: 'AlteHaasGroteskBold',
            weight: 700,
            style: 'normal',
            data: fs.readFileSync('public/fonts/AlteHaasGroteskBold.woff'),
          },
        ],
      },
    }),
  ],
  experimental: {
    contentIntellisense: true,
  },
}) satisfies AstroUserConfig

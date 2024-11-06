import type { AstroUserConfig } from 'astro/config'
import type { Buffer } from 'node:buffer'
import fs from 'node:fs'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import compressor from 'astro-compressor'
import icon from 'astro-icon'
import opengraphImages from 'astro-opengraph-images'

import sharp from 'sharp'

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
            quality: 80,
            effort: 6,
          },
          avif: {
            quality: 75,
            effort: 6,
          }
        },
        transform: (input: Buffer, options: { src: { format: string } }) => {
          if (options.src.format === 'webp') {
            const isAnimated = input[12] === 0x41 && input[13] === 0x4E && input[14] === 0x49 && input[15] === 0x4D
            if (isAnimated) {
              return {
                data: input,
                format: 'webp',
              }
            }
          }
          return sharp(input).rotate()
        }
      },
    },
  },
  integrations: [
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
        },
      },
      customPages: ['https://links.fractalcounty.com'],
      serialize(item) {
        if (item.url.includes('/blog/')) {
          return {
            url: item.url,
            priority: 0.9,
            img: [
              {
                url: `${item.url.replace('/blog/', '/images/blog/')}`,
                title: 'Blog post content images'
              }
            ],
            lastmod: new Date().toISOString()
          }
        }

        if (item.url.includes('/art/')) {
          return {
            url: item.url,
            priority: 0.9,
            img: [
              {
                url: `${item.url.replace('/art/', '/images/art/')}`,
                title: 'Artwork'
              }
            ],
            lastmod: new Date().toISOString()
          }
        }

        return item
      }
    }),
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
    (await import('@playform/inline')).default({
      Path: './dist',
    }),
    compressor(),
  ],
  experimental: {
    contentIntellisense: true,
    contentLayer: true,
  },
}) satisfies AstroUserConfig

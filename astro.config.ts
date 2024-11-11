import fs from 'node:fs'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig, envField } from 'astro/config'
import compressor from 'astro-compressor'
import icon from 'astro-icon'
import opengraphImages from 'astro-opengraph-images'
import AutoImport from 'unplugin-auto-import/astro'

import config from './src/config'
import { customOgMediaLayout } from './src/ogRenderer'

export default defineConfig({
  site: config.site.url,
  env: {
    schema: {
      LASTFM_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
      }),
      SPOTIFY_CLIENT_ID: envField.string({
        context: 'server',
        access: 'secret',
      }),
      SPOTIFY_CLIENT_SECRET: envField.string({
        context: 'server',
        access: 'secret',
      }),
    },
  },
  markdown: {},
  image: {
    domains: ['i.scdn.co', 'lastfm.freetls.fastly.net'],
    remotePatterns: [
      { protocol: 'https', hostname: '*.scdn.co' },
      { protocol: 'https', hostname: '*.lastfm.freetls.fastly.net' },
    ],
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
          },
        },
      },
    },
  },
  vite: {
    resolve: {
      alias: {
        '@config': '/src/config.ts',
        '@': '/src',
      },
    },
  },
  integrations: [
    AutoImport({
      imports: [
        {
          '@/config': [
            'config', // default import
            'site', // named import
          ],
        },
      ],
      include: [/\.astro$/],
      dts: './src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: './.astro/.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
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
      customPages: [`${config.site.url}`],
      serialize(item) {
        if (item.url.includes('/blog/')) {
          return {
            url: item.url,
            priority: 0.9,
            img: [
              {
                url: `${item.url.replace('/blog/', '/images/blog/')}`,
                title: 'Blog post content images',
              },
            ],
            lastmod: new Date().toISOString(),
          }
        }

        if (item.url.includes('/art/')) {
          return {
            url: item.url,
            priority: 0.9,
            img: [
              {
                url: `${item.url.replace('/art/', '/images/art/')}`,
                title: 'Artwork',
              },
            ],
            lastmod: new Date().toISOString(),
          }
        }

        return item
      },
    }),
    tailwind(),
    icon({
      iconDir: 'public/icons',
    }),
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
})

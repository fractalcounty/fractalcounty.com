import fs from 'node:fs'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import compressor from 'astro-compressor'
import astroBreakpoints from 'astro-devtool-breakpoints'
import icon from 'astro-icon'
import opengraphImages from 'astro-opengraph-images'
import purgeCSS from 'astro-purgecss'
import { defineConfig, envField } from 'astro/config'
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
  vite: {
    resolve: {
      alias: {
        '@config': '/src/config.ts',
        '@': '/src',
      },
    },
    build: {
      assetsInlineLimit: 0,
    },
  },
  markdown: {
    syntaxHighlight: false,
  },
  image: {
    domains: ['i.scdn.co', 'lastfm.freetls.fastly.net'],
    remotePatterns: [
      { protocol: 'https', hostname: '*.scdn.co' },
      { protocol: 'https', hostname: '*.lastfm.freetls.fastly.net' },
    ],
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: true,
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
    astroBreakpoints(),
    mdx({
      syntaxHighlight: false,
      remarkPlugins: [],
      rehypePlugins: [],
    }),
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
    purgeCSS(),
    compressor(),
  ],
})

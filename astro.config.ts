import fs from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig, envField } from 'astro/config'
import compressor from 'astro-compressor'
import astroBreakpoints from 'astro-devtool-breakpoints'
import icon from 'astro-icon'
import opengraphImages from 'astro-opengraph-images'
import AutoImport from 'unplugin-auto-import/astro'
import config from './src/config'
import { customOgMediaLayout } from './src/ogRenderer'

// helper to get content path
const __dirname = dirname(fileURLToPath(import.meta.url))
const publicPath = join(__dirname, 'public/images')

// helper to get images for a slug
const getImagesForSlug = (collection: string, slug: string): string[] => {
  try {
    const path = join(publicPath, collection, slug)
    return fs
      .readdirSync(path)
      .filter((file) => /\.jpe?g|png|gif|webp|avif$/i.test(file))
  } catch {
    return []
  }
}

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
    astroBreakpoints(),
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
      serialize(item) {
        if (item.url.includes('/blog/')) {
          const slug = item.url.split('/blog/')[1].replace(/\/$/, '')
          const images = getImagesForSlug('blog', slug)

          if (!images.length) return item

          return {
            url: item.url,
            priority: 0.9,
            img: images.map((image) => ({
              url: `${config.site.url}/images/blog/${slug}/${image}`,
              title: `Blog post image: ${slug}`,
              caption: `Image from blog post: ${slug}`,
            })),
            lastmod: new Date().toISOString(),
          }
        }

        if (item.url.includes('/art/')) {
          const slug = item.url.split('/art/')[1].replace(/\/$/, '')
          const images = getImagesForSlug('art', slug)

          if (!images.length) return item

          return {
            url: item.url,
            priority: 0.9,
            img: images.map((image, index) => ({
              url: `${config.site.url}/images/art/${slug}/${image}`,
              title: `Artwork${images.length > 1 ? ` (${index + 1}/${images.length})` : ''}: ${slug}`,
              caption: `Artwork from gallery: ${slug}`,
            })),
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

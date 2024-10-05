import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import opengraphImages from 'astro-opengraph-images';
import { customOgMediaLayout } from './src/ogRenderer';
import icon from 'astro-icon';
import fs from 'fs';

export default defineConfig({
  site: 'https://fractalcounty.com',
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
            weight: '400',
            style: 'normal',
            data: fs.readFileSync('public/fonts/AlteHaasGroteskRegular.woff'),
          },
          {
            name: 'AlteHaasGroteskBold',
            weight: '700',
            style: 'normal',
            data: fs.readFileSync('public/fonts/AlteHaasGroteskBold.woff'),
          },
        ],
      },
    }),
  ],
});

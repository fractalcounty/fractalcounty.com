import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  // update loader to use proper base path and include images
  loader: glob({
    pattern: '**/*.{md,mdx,jpeg,jpg,png,gif,webp}',
    base: 'blog',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(), // title of the post, displayed in header of post page, SEO/metadata, et cetera
      description: z.string(), // description of the post, displayed in header of post page, SEO/metadata, et cetera
      date: z.coerce.date(), // date of the post, displayed in header of post page, used for SEO/metadata
      draft: z.boolean().optional(), // effectively controls if post even exists or not
      tags: z.array(z.string()).optional(), // array of tags used for SEO/metadata
      links: z
        .array(
          // array of links to external resources, displayed in header of post page as buttons
          z.object({
            label: z.string(),
            url: z.string(),
          })
        )
        .optional(),
      icon: z.string().optional(), // local svg relative to /src/icons or iconify id, displayed in card component that links to post
      images: z.array(image()).optional(), // array of images that represent the post used for metadata/SEO (i.e first in array is used for open graph image)
    }),
})

const artwork = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: 'artwork',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      draft: z.boolean().optional(),
      type: z.enum(['art', 'webcomic', 'video']),
      links: z
        .array(
          z.object({
            label: z.string(),
            url: z.string(),
          })
        )
        .optional(),
      thumbnail: z.union([image(), z.string()]).optional(),
      images: z.union([image(), z.array(image())]),
    }),
})

export const collections = {
  blog,
  artwork,
} as const

export const artworkTypes = ['art', 'webcomic', 'video'] as const
export type ArtworkType = (typeof artworkTypes)[number]

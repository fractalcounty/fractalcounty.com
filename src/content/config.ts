import type { SchemaContext } from 'astro:content'
import { file, glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const basePostSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
        })
      )
      .optional(),
    thumbnail: image().optional(),
    thumbnailStyle: z.boolean().optional(),
    thumbnailCaption: z.string().optional(),
    thumbnailCaptionType: z.enum(['hidden', 'original', 'alt']).optional(),
  })

const blog = defineCollection({
  loader: glob({
    pattern: '**/index.mdx',
    base: 'src/content/blog',
  }),
  schema: ({ image }) =>
    basePostSchema({ image }).extend({
      icon: z.string().optional(),
    }),
})

const art = defineCollection({
  loader: glob({
    pattern: '**/index.mdx',
    base: 'src/content/art',
  }),
  schema: ({ image }) =>
    basePostSchema({ image }).extend({
      type: z
        .enum(['illustration', 'webcomic', 'animation'])
        .default('illustration'),
      images: z.union([image(), z.array(image())]),
    }),
})

const music = defineCollection({
  loader: file('src/content/music/music.yaml'),
  // schema expects each entry to be an object, not an array
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      title: z.string(),
      url: z.string().url(),
      releaseDate: z.coerce.date(),
      coverArt: image(),
      description: z.string().optional(),
    }),
})

export const collections = { blog, art, music } as const
export const artTypes = ['illustration', 'webcomic', 'animation'] as const
export type ArtType = (typeof artTypes)[number]

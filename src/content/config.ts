import type { SchemaContext } from 'astro:content'
import { file , glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const baseSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(), // title, displayed in header, seo/metadata
    description: z.string(), // description, displayed in header, seo/metadata
    publishDate: z.coerce.date(), // publish date, displayed in header, seo/metadata
    updatedDate: z.coerce.date().optional(), // update date, displayed in header, seo/metadata
    draft: z.boolean().optional(), // controls visibility/existence
    tags: z.array(z.string()).optional(), // array of tags used for SEO/metadata
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
        })
      )
      .optional(), // external resource links
    thumbnail: image().optional(), // thumbnail image
    thumbnailStyle: z.boolean().optional(), // thumbnail style
    thumbnailCaption: z.string().optional(), // thumbnail caption
    thumbnailCaptionType: z.enum(['hidden', 'original', 'alt']).optional(), // thumbnail caption type
  })

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: 'blog',
  }),
  schema: ({ image }) =>
    baseSchema({ image }).extend({
      icon: z.string().optional(),
    }),
})

const art = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: 'art',
  }),
  schema: ({ image }) =>
    baseSchema({ image }).extend({
      type: z
        .enum(['illustration', 'webcomic', 'animation'])
        .default('illustration'),
      images: z.union([image(), z.array(image())]),
    }),
})

const bandcamp = defineCollection({
  loader: file('src/data/bandcamp.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    url: z.string().url(),
    releaseDate: z.coerce.date(),
    coverArt: z.string(), // path to cover art in public/
    description: z.string().optional(),
  }),
})

export const collections = { blog, art, bandcamp } as const
export const artTypes = ['illustration', 'webcomic', 'animation'] as const
export type ArtType = (typeof artTypes)[number]

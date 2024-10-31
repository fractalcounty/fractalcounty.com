import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    type: z.literal('blog'),
    tags: z.array(z.string()).optional(),
    thumbnail: z.string().optional(),
  }),
})

const projects = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      draft: z.boolean().optional(),
      demoURL: z.string().optional(),
      repoURL: z.string().optional(),
      projectURLs: z
        .array(
          z.object({
            label: z.string(),
            url: z.string(),
          }),
        )
        .optional(),
      showInBlog: z.boolean().optional(),
      blogTitle: z.string().optional(),
      type: z.literal('project'),
      tags: z.array(z.string()).optional(),
      thumbnail: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.showInBlog === true) {
          return typeof data.blogTitle === 'string' && data.blogTitle.length > 0
        }
        return true
      },
      {
        message: 'blogTitle is required when showInBlog is true',
        path: ['blogTitle'],
      },
    ),
})

export const artworkTypes = ['art', 'webcomic', 'video'] as const
export type ArtworkType = typeof artworkTypes[number]

const artwork = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    type: z.enum(artworkTypes),
    images: z.union([
      image(),
      z.array(image()),
    ]),
    order: z.number().optional(), // For ordering webcomic pages if needed
  }),
})

export const collections = { blog, projects, artwork }

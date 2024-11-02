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
      links: z
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

const artwork = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
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
        }),
      )
      .optional(),
    images: z.union([
      image(),
      z.array(image()),
    ]),
  }),
})

export const collections = {
  blog,
  projects,
  artwork,
}

export const artworkTypes = ['art', 'webcomic', 'video'] as const

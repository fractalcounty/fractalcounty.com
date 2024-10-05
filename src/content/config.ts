import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    type: z.literal('blog'),
  }),
});

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
          })
        )
        .optional(),
      showInBlog: z.boolean().optional(),
      blogTitle: z.string().optional(),
      type: z.literal('project'),
    })
    .refine(
      (data) => {
        if (data.showInBlog) {
          return !!data.blogTitle;
        }
        return true;
      },
      {
        message: 'blogTitle is required when showInBlog is true',
        path: ['blogTitle'],
      }
    ),
});

export const collections = { blog, projects };

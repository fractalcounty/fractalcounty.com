import { readFileSync } from 'node:fs'
import { parse } from 'yaml'
import { z } from 'zod'

// schema for social media links
const socialSchema = z.object({
  name: z.string(),
  url: z.string().url(),
})

// schema for page metadata
const pageSchema = z.object({
  path: z.string(),
  title: z.string(),
  description: z.string(),
  showInNav: z.boolean().default(false),
  external: z.boolean().default(false),
})

const configSchema = z.object({
  site: z.object({
    name: z.string(),
    url: z.string().url(),
    author: z.object({
      name: z.string(),
      username: z.string(),
      email: z.string().email(),
      bio: z.string().optional(),
      socials: z.array(socialSchema).optional(), // array of social links
    }),
    defaultTags: z.array(z.string()),
    pages: z.record(z.string(), pageSchema),
  }),
})

// infer type from schema
type Config = z.infer<typeof configSchema>

// read and parse yaml config with type safety
const configFile = readFileSync('./config.yaml', 'utf8')
const configData = parse(configFile) as unknown
const config = configSchema.parse(configData)

// export everything
export const { site } = config
export default config
export type { Config }

// helper to get nav items from pages
export const getNavItems = () => {
  return Object.entries(site.pages)
    .filter(([_, page]) => page.showInNav)
    .map(([_, page]) => ({
      href: page.path,
      name: page.title,
      external: page.external ?? false,
    }))
}

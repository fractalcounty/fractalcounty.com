import { readFileSync } from 'node:fs'
import { parse } from 'yaml'
import { z } from 'zod'

// basic social media profile schema
const socialSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  showInContact: z.boolean().default(true),
})

// platform integration schemas
const integrationsSchema = z.object({
  fediverse: z
    .object({
      instance: z.string().url(),
      username: z.string().regex(/^@\w+$/, 'Username must start with @'),
    })
    .optional(),
  discord: z
    .object({
      verificationHash: z.string(),
    })
    .optional(),
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
      socials: z.array(socialSchema).optional(),
    }),
    integrations: integrationsSchema.optional(),
    defaultTags: z.array(z.string()),
    pages: z.record(z.string(), pageSchema),
    titleTemplate: z.string().default('%s | %site%'),
  }),
})

// infer type from schema
type Config = z.infer<typeof configSchema>

// read and parse yaml config
const configFile = readFileSync('./config.yaml', 'utf8')
const configData = parse(configFile) as unknown
const config = configSchema.parse(configData)

// export everything
export const { site } = config
export default config
export type { Config }

// helper to get nav items
export const getNavItems = () => {
  return Object.entries(site.pages)
    .filter(([_, page]) => page.showInNav)
    .map(([_, page]) => ({
      href: page.path,
      name: page.title,
      external: page.external ?? false,
    }))
}

// add helper function to normalize fediverse username
export const getFediverseUsername = (username: string) => {
  return username.startsWith('@') ? username : `@${username}`
}

// add helper to get full fediverse url
export const getFediverseUrl = (instance: string, username: string) => {
  const normalizedUsername = getFediverseUsername(username)
  return `${instance}/${normalizedUsername.slice(1)}`
}

export const getFediverseHandle = (instance: string, username: string) => {
  const normalizedUsername = getFediverseUsername(username)
  return `${normalizedUsername}@${new URL(instance).host}`
}


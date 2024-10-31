export interface Site {
  NAME: string
  AUTHOR: string
  EMAIL: string
  NUM_POSTS_ON_HOMEPAGE: number
  NUM_WORKS_ON_HOMEPAGE: number
  NUM_PROJECTS_ON_HOMEPAGE: number
  NUM_ARTWORK_ON_HOMEPAGE: number
}

export interface Metadata {
  TITLE: string
  DESCRIPTION: string
}

export type Socials = {
  LABEL: string
  ICON: string
  HREF: string
}[]

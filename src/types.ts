export interface Site {
  NAME: string
  AUTHOR: string
  EMAIL: string
  NUM_POSTS_ON_HOMEPAGE: number
  NUM_ART_ON_HOMEPAGE: number
  TITLE_TEMPLATE: string
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

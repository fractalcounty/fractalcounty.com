import type { Metadata, Site, Socials } from '@types'

export const ARTWORK: Metadata = {
  TITLE: 'Artwork',
  DESCRIPTION: 'A collection of my artwork, including illustrations and webcomics.',
}

export const SITE: Site = {
  NAME: 'FRACTAL COUNTY',
  AUTHOR: 'chip fractalcounty',
  EMAIL: 'chip@fractalcounty.com',
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
  NUM_ARTWORK_ON_HOMEPAGE: 6,
}

export const HOME: Metadata = {
  TITLE: 'Home',
  DESCRIPTION:
    'Chip fractalcounty\'s personal blog and portfolio website dedicated to various things and stuff.',
}

export const BLOG: Metadata = {
  TITLE: 'Blog',
  DESCRIPTION: 'Various thoughts and writings on topics I think are neat.',
}

export const PROJECTS: Metadata = {
  TITLE: 'Projects',
  DESCRIPTION:
    'A collection of my projects and other works I\'ve made over the years.',
}

export const LINKS: Metadata = {
  TITLE: 'Links',
  DESCRIPTION:
    'A collection of links to my social media profiles on other websites.',
}

export const LINKS_FOOTER: Socials = [
  {
    LABEL: 'Twitter',
    ICON: 'twitter',
    HREF: 'https://twitter.com/fractalcounty',
  },
  {
    LABEL: 'GitHub',
    ICON: 'github',
    HREF: 'https://github.com/fractalcounty',
  },
  {
    LABEL: 'instagram',
    ICON: 'instagram',
    HREF: 'https://www.instagram.com/fractalcounty/',
  },
]

export const LICENSE: Metadata = {
  TITLE: 'License',
  DESCRIPTION: 'This is free and unencumbered software released into the public domain.',
}

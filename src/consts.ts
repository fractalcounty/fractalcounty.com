import type { Site, Metadata, Socials } from '@types';

export const SITE: Site = {
  NAME: 'FRACTAL COUNTY',
  EMAIL: 'chip@fractalcounty.com',
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: 'Home',
  DESCRIPTION:
    "Chip fractalcounty's personal blog and portfolio website dedicated to various things and stuff.",
};

export const BLOG: Metadata = {
  TITLE: 'Blog',
  DESCRIPTION: 'Various thoughts and writings on topics I think are neat.',
};

export const PROJECTS: Metadata = {
  TITLE: 'Projects',
  DESCRIPTION:
    "A collection of my projects and other works I've made over the years.",
};

export const LINKS: Metadata = {
  TITLE: 'Links',
  DESCRIPTION:
    'A collection of links to my social media profiles on other websites.',
};

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
];

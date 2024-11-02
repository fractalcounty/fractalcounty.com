import type { CollectionEntry } from 'astro:content'
import { SITE } from '@consts'

// Base person schema for the author
export const personSchema = {
  '@type': 'Person',
  '@id': 'https://fractalcounty.com/#person',
  'name': SITE.AUTHOR,
  'url': 'https://fractalcounty.com',
  'email': SITE.EMAIL,
  'sameAs': [
    'https://twitter.com/fractalcounty',
    'https://github.com/fractalcounty',
  ],
}

// Base organization schema that represents FRACTAL COUNTY
export const organizationSchema = {
  '@type': 'Organization',
  '@id': 'https://fractalcounty.com/#organization',
  'name': SITE.NAME,
  'url': 'https://fractalcounty.com',
  'logo': {
    '@type': 'ImageObject',
    'url': 'https://fractalcounty.com/logo.svg',
    'width': 1200,
    'height': 630,
  },
  'sameAs': [
    'https://twitter.com/fractalcounty',
    'https://github.com/fractalcounty',
    'https://www.instagram.com/fractalcounty/',
  ],
  'founder': {
    '@id': 'https://fractalcounty.com/#person',
  },
}

// Base website schema
export const websiteSchema = {
  '@type': 'WebSite',
  '@id': 'https://fractalcounty.com/#website',
  'url': 'https://fractalcounty.com',
  'name': SITE.NAME,
  'description': 'Personal blog and portfolio website for chip fractalcounty',
  'publisher': {
    '@id': 'https://fractalcounty.com/#organization',
  },
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(items: Array<{ name: string, item: string }>) {
  return {
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.item,
    })),
  }
}

// Generate schema for blog/project posts
export function generateArticleSchema(
  entry: CollectionEntry<'blog' | 'projects'>,
  url: URL,
) {
  const { title, description, date, tags, type } = entry.data

  return {
    '@type': type === 'project' ? 'Article' : 'BlogPosting',
    '@id': url.toString(),
    'headline': title,
    'description': description,
    'datePublished': date.toISOString(),
    'dateModified': date.toISOString(),
    'author': {
      '@id': 'https://fractalcounty.com/#person',
    },
    'publisher': {
      '@id': 'https://fractalcounty.com/#organization',
    },
    'keywords': tags?.join(', '),
    'url': url.toString(),
    'isPartOf': {
      '@id': 'https://fractalcounty.com/#website',
    },
  }
}

// Generate schema for artwork
export function generateArtworkSchema(
  entry: CollectionEntry<'artwork'>,
  url: URL,
  imageUrl: string,
) {
  const { title, description, date, type } = entry.data

  const baseSchema = {
    '@type': 'VisualArtwork',
    '@id': url.toString(),
    'name': title,
    'description': description,
    'dateCreated': date.toISOString(),
    'creator': {
      '@id': 'https://fractalcounty.com/#person',
    },
    'url': url.toString(),
    'image': imageUrl,
    'artform': type === 'webcomic' ? 'Digital Comic' : 'Digital Art',
    'artMedium': 'Digital',
    'isPartOf': {
      '@id': 'https://fractalcounty.com/#website',
    },
  }

  // Add additional properties for webcomics
  if (type === 'webcomic') {
    return {
      ...baseSchema,
      '@type': 'ComicStory',
      'genre': 'Webcomic',
    }
  }

  return baseSchema
}

// Generate collection page schema
export function generateCollectionSchema(
  type: 'blog' | 'projects' | 'artwork',
  url: URL,
  title: string,
  description: string,
) {
  return {
    '@type': 'CollectionPage',
    '@id': url.toString(),
    'name': title,
    'description': description,
    'url': url.toString(),
    'isPartOf': {
      '@id': 'https://fractalcounty.com/#website',
    },
  }
}

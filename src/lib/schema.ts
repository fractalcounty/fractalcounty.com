import type { CollectionEntry } from 'astro:content'
import { SITE } from '@consts'

// Base person schema with expanded details
export const personSchema = {
  '@type': 'Person',
  '@id': 'https://fractalcounty.com/#person',
  'name': 'Chip',
  'alternateName': 'fractalcounty',
  'url': 'https://fractalcounty.com',
  'email': SITE.EMAIL,
  'image': {
    '@type': 'ImageObject',
    'url': 'https://fractalcounty.com/avatar.jpeg',
    'width': 400,
    'height': 400,
    'encodingFormat': 'image/jpeg',
  },
  'sameAs': [
    'https://twitter.com/fractalcounty',
    'https://x.com/fractalcounty',
    'https://github.com/fractalcounty',
    'https://www.instagram.com/fractalcounty/',
    'https://www.youtube.com/@fractalcounty',
    'https://fractalcounty.bandcamp.com',
    'https://fractalcounty.newgrounds.com/',
    'https://bsky.app/profile/fractalcounty.com',
  ],
  'jobTitle': 'Digital Artist & Developer',
  'worksFor': {
    '@id': 'https://fractalcounty.com/#organization',
  },
}

// Enhanced organization schema
export const organizationSchema = {
  '@type': 'Organization',
  '@id': 'https://fractalcounty.com/#organization',
  'name': 'FRACTAL COUNTY',
  'url': 'https://fractalcounty.com',
  'logo': {
    '@type': 'ImageObject',
    '@id': 'https://fractalcounty.com/#logo',
    'url': 'https://fractalcounty.com/logo.svg',
    'width': 1200,
    'height': 442,
    'caption': 'FRACTAL COUNTY',
  },
  'image': {
    '@id': 'https://fractalcounty.com/#logo',
  },
  'sameAs': [
    'https://twitter.com/fractalcounty',
    'https://github.com/fractalcounty',
    'https://www.instagram.com/fractalcounty/',
    'https://www.youtube.com/@fractalcounty',
    'https://fractalcounty.bandcamp.com',
    'https://fractalcounty.newgrounds.com/',
    'https://bsky.app/profile/fractalcounty.com',
    'https://x.com/fractalcounty',
  ],
  'founder': {
    '@id': 'https://fractalcounty.com/#person',
  },
  'member': [
    {
      '@id': 'https://fractalcounty.com/#person',
    },
  ],
}

// Enhanced website schema
export const websiteSchema = {
  '@type': 'WebSite',
  '@id': 'https://fractalcounty.com/#website',
  'url': 'https://fractalcounty.com',
  'name': 'FRACTAL COUNTY',
  'description': 'Personal blog and portfolio website for chip fractalcounty',
  'publisher': {
    '@id': 'https://fractalcounty.com/#organization',
  },
  'author': {
    '@id': 'https://fractalcounty.com/#person',
  },
  'potentialAction': [
    {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://fractalcounty.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  ],
  'inLanguage': 'en-US',
  'copyrightYear': new Date().getFullYear(),
  'license': 'https://fractalcounty.com/UNLICENSE',
}

// Enhanced artwork schema generation
export function generateArtworkSchema(
  entry: CollectionEntry<'artwork'>,
  url: URL,
  imageUrl: string,
) {
  const { title, description, date, type, images } = entry.data
  const baseSchema = {
    author: {
      '@id': 'https://fractalcounty.com/#person',
    },
    creator: {
      '@id': 'https://fractalcounty.com/#person',
    },
    publisher: {
      '@id': 'https://fractalcounty.com/#organization',
    },
    dateCreated: date.toISOString(),
    datePublished: date.toISOString(),
    dateModified: date.toISOString(),
    name: title,
    headline: title,
    description,
    url: url.toString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.toString(),
    },
    isPartOf: {
      '@id': 'https://fractalcounty.com/#website',
    },
  }

  if (type === 'webcomic') {
    return {
      '@type': 'ComicStory',
      '@id': url.toString(),
      ...baseSchema,
      'image': Array.isArray(images)
        ? images.map(img => ({
          '@type': 'ImageObject',
          'url': img.src,
          'width': img.width,
          'height': img.height,
          'caption': title,
        }))
        : imageUrl,
      'numberOfPages': Array.isArray(images) ? images.length : 1,
      'genre': 'webcomic',
      'inLanguage': 'en-US',
      'copyrightHolder': {
        '@id': 'https://fractalcounty.com/#person',
      },
      'license': 'https://fractalcounty.com/UNLICENSE',
    }
  }

  return {
    '@type': 'VisualArtwork',
    '@id': url.toString(),
    ...baseSchema,
    'image': Array.isArray(images)
      ? images.map(img => ({
        '@type': 'ImageObject',
        'url': img.src,
        'width': img.width,
        'height': img.height,
        'caption': title,
      }))
      : imageUrl,
    'artform': type === 'video' ? 'Digital Video' : 'Digital Art',
    'artMedium': 'Digital',
    'artworkSurface': 'Digital Canvas',
    'genre': type === 'video' ? 'Animation' : 'Digital Art',
    'copyrightHolder': {
      '@id': 'https://fractalcounty.com/#person',
    },
    'license': 'https://fractalcounty.com/UNLICENSE',
    'conditionsOfAccess': 'Free to view online',
    'usageInfo': 'https://fractalcounty.com/UNLICENSE',
    'thumbnailUrl': imageUrl,
  }
}

// Enhanced article schema for blog/projects
export function generateArticleSchema(
  entry: CollectionEntry<'blog' | 'projects'>,
  url: URL,
  imageUrl?: string,
) {
  const { title, description, date, tags, type } = entry.data

  // handle image schema with explicit nullish check
  const imageSchema = (() => {
    if (imageUrl === undefined || imageUrl === null) {
      return null
    }
    if (imageUrl.trim().length === 0) {
      return null
    }
    return {
      '@type': 'ImageObject',
      'url': imageUrl,
      'width': 1200,
      'height': 630,
      'caption': title,
    }
  })()

  const baseSchema = {
    '@type': 'Article',
    '@id': url.toString(),
    'headline': title,
    'description': description,
    'datePublished': date.toISOString(),
    'dateModified': date.toISOString(),
    'dateCreated': date.toISOString(),
    'author': {
      '@id': 'https://fractalcounty.com/#person',
    },
    'creator': {
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
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url.toString(),
    },
    'articleSection': type === 'project' ? 'Projects' : 'Blog',
    'inLanguage': 'en-US',
    'copyrightHolder': {
      '@id': 'https://fractalcounty.com/#person',
    },
    'license': 'https://fractalcounty.com/UNLICENSE',
  }

  return imageSchema === null
    ? baseSchema
    : { ...baseSchema, image: imageSchema }
}

// Enhanced collection page schema
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
    'about': {
      '@type': 'Thing',
      'name': type === 'blog' ? 'Blog Posts' : type === 'projects' ? 'Projects' : 'Artwork',
    },
    'author': {
      '@id': 'https://fractalcounty.com/#person',
    },
    'publisher': {
      '@id': 'https://fractalcounty.com/#organization',
    },
    'inLanguage': 'en-US',
    'datePublished': '2023-01-01T00:00:00Z', // Add actual date when site launched
    'dateModified': new Date().toISOString(),
    'breadcrumb': {
      '@id': `${url.toString()}#breadcrumb`,
    },
  }
}

// Breadcrumb schema remains the same but with enhanced typing
interface BreadcrumbItem {
  name: string
  item: string
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${items[items.length - 1].item}#breadcrumb`,
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.item,
    })),
  }
}

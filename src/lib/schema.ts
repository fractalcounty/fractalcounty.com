import type { CollectionEntry } from 'astro:content'
import { SITE } from '@consts'

// Base person schema for the author
export const personSchema = {
  '@type': 'Person',
  '@id': 'https://fractalcounty.com/#person',
  'name': SITE.AUTHOR,
  'url': 'https://fractalcounty.com',
  'email': SITE.EMAIL,
  'image': 'https://fractalcounty.com/avatar.jpg',
  'sameAs': [
    'https://twitter.com/fractalcounty',
    'https://github.com/fractalcounty',
  ],
}

// Base organization schema
export const organizationSchema = {
  '@type': 'Organization',
  '@id': 'https://fractalcounty.com/#organization',
  'name': SITE.NAME,
  'url': 'https://fractalcounty.com',
  'logo': {
    '@type': 'ImageObject',
    '@id': 'https://fractalcounty.com/#logo',
    'url': 'https://fractalcounty.com/logo.svg',
    'width': 1200,
    'height': 630,
    'caption': SITE.NAME,
  },
  'image': {
    '@id': 'https://fractalcounty.com/#logo',
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
  'author': {
    '@id': 'https://fractalcounty.com/#person',
  },
  'potentialAction': {
    '@type': 'SearchAction',
    'target': {
      '@type': 'EntryPoint',
      'urlTemplate': 'https://fractalcounty.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

// Generate article schema
export function generateArticleSchema(
  entry: CollectionEntry<'blog' | 'projects'>,
  url: URL,
) {
  const { title, description, date, tags } = entry.data

  return {
    '@type': 'Article',
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
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url.toString(),
    },
  }
}

// Generate artwork schema
export function generateArtworkSchema(
  entry: CollectionEntry<'artwork'>,
  url: URL,
  imageUrl: string,
) {
  const { title, description, date, type } = entry.data

  if (type === 'webcomic') {
    return {
      '@type': 'ComicStory',
      '@id': url.toString(),
      'name': title,
      'description': description,
      'datePublished': date.toISOString(),
      'author': {
        '@id': 'https://fractalcounty.com/#person',
      },
      'publisher': {
        '@id': 'https://fractalcounty.com/#organization',
      },
      'url': url.toString(),
      'image': imageUrl,
      'isPartOf': {
        '@id': 'https://fractalcounty.com/#website',
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': url.toString(),
      },
    }
  }

  return {
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
    'artform': 'Digital Art',
    'artMedium': 'Digital',
    'isPartOf': {
      '@id': 'https://fractalcounty.com/#website',
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url.toString(),
    },
  }
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
    'about': {
      '@type': 'Thing',
      'name': type === 'blog'
        ? 'Blog Posts'
        : type === 'projects' ? 'Projects' : 'Artwork',
    },
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': [], // Can be populated with actual items if needed
    },
  }
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(items: Array<{ name: string, item: string }>) {
  return {
    '@type': 'BreadcrumbList',
    '@id': 'https://fractalcounty.com/#breadcrumb',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'WebPage',
        '@id': item.item,
        'url': item.item,
        'name': item.name,
      },
    })),
  }
}

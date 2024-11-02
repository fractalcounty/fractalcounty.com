import type { CollectionEntry } from 'astro:content'
import { SITE } from '@consts'

// Add type definitions for all schemas
export interface BaseSchema {
  '@context': 'https://schema.org'
  '@graph': Array<SchemaType>
}

// Union type for all possible schema types
type SchemaType =
  | WebPageSchema
  | ArticleSchema
  | BreadcrumbListSchema
  | WebSiteSchema
  | OrganizationSchema
  | PersonSchema
  | ImageObjectSchema
  | ArtworkSchema
  | CollectionPageSchema

// Schema type definitions
interface WebPageSchema {
  '@type': 'WebPage'
  '@id': string
  'url': string
  'name': string
  'description'?: string
  'isPartOf': {
    '@id': string
  }
  'primaryImageOfPage'?: {
    '@id': string
  }
  'breadcrumb'?: {
    '@id': string
  }
  'inLanguage'?: string
}

interface ArticleSchema {
  '@type': 'Article'
  '@id': string
  'headline': string
  'description': string
  'datePublished': string
  'dateModified': string
  'dateCreated': string
  'author': {
    '@id': string
  }
  'creator': {
    '@id': string
  }
  'publisher': {
    '@id': string
  }
  'keywords'?: string
  'url': string
  'isPartOf': {
    '@id': string
  }
  'mainEntityOfPage': {
    '@type': 'WebPage'
    '@id': string
  }
  'articleSection': string
  'inLanguage': string
  'copyrightHolder': {
    '@id': string
  }
  'license': string
  'image'?: ImageObjectSchema
}

interface BreadcrumbListSchema {
  '@type': 'BreadcrumbList'
  '@id': string
  'itemListElement': Array<{
    '@type': 'ListItem'
    'position': number
    'item': {
      '@type': 'WebPage'
      '@id': string
      'name': string
      'url': string
    }
  }>
}

interface WebSiteSchema {
  '@type': 'WebSite'
  '@id': string
  'url': string
  'name': string
  'description': string
  'publisher': {
    '@id': string
  }
  'author': {
    '@id': string
  }
  'potentialAction': Array<{
    '@type': 'SearchAction'
    'target': {
      '@type': 'EntryPoint'
      'urlTemplate': string
    }
    'query-input': string
  }>
  'inLanguage': string
  'copyrightYear': number
  'license': string
}

interface OrganizationSchema {
  '@type': 'Organization'
  '@id': string
  'name': string
  'url': string
  'logo': ImageObjectSchema
  'image': {
    '@id': string
  }
  'sameAs': string[]
  'founder': {
    '@id': string
  }
  'member': Array<{
    '@id': string
  }>
}

interface PersonSchema {
  '@type': 'Person'
  '@id': string
  'name': string
  'alternateName': string
  'url': string
  'email': string
  'image': ImageObjectSchema
  'sameAs': string[]
  'jobTitle': string
  'worksFor': {
    '@id': string
  }
}

interface ImageObjectSchema {
  '@type': 'ImageObject'
  '@id': string
  'url': string
  'width': number
  'height': number
  'caption'?: string
  'encodingFormat'?: string
  'contentUrl'?: string
}

interface ArtworkSchema {
  '@type': string | string[]
  '@id': string
  'name': string
  'headline': string
  'description': string
  'dateCreated': string
  'datePublished': string
  'dateModified': string
  'url': string
  'author': {
    '@id': string
  }
  'creator': {
    '@id': string
  }
  'publisher': {
    '@id': string
  }
  'isPartOf': {
    '@id': string
  }
  'mainEntityOfPage': {
    '@type': 'WebPage'
    '@id': string
  }
  'image': ImageObjectSchema
  'encodingFormat': string
  'thumbnailUrl': string
  'accessMode': string[]
  'accessibilityFeature': string[]
  'accessibilityHazard': string[]
  'copyrightHolder': {
    '@id': string
  }
  'license': string
  'conditionsOfAccess': string
  'usageInfo': string
  'numberOfPages'?: number
  'genre'?: string
  'artform'?: string
  'artMedium'?: string
  'artworkSurface'?: string
}

interface CollectionPageSchema {
  '@type': 'CollectionPage'
  '@id': string
  'name': string
  'description': string
  'url': string
  'isPartOf': {
    '@id': string
  }
  'about': {
    '@type': 'Thing'
    'name': string
  }
  'author': {
    '@id': string
  }
  'publisher': {
    '@id': string
  }
  'inLanguage': string
  'datePublished': string
  'dateModified': string
  'breadcrumb': {
    '@id': string
  }
}

export interface SchemaIds {
  PERSON: string
  ORGANIZATION: string
  WEBSITE: string
}

export const SCHEMA_IDS: SchemaIds = {
  PERSON: 'https://fractalcounty.com/#person',
  ORGANIZATION: 'https://fractalcounty.com/#organization',
  WEBSITE: 'https://fractalcounty.com/#website',
}

// Base person schema with expanded details
export const personSchema = {
  '@type': 'Person',
  '@id': SCHEMA_IDS.PERSON,
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
    '@id': SCHEMA_IDS.ORGANIZATION,
  },
}

// Enhanced organization schema
export const organizationSchema = {
  '@type': 'Organization',
  '@id': SCHEMA_IDS.ORGANIZATION,
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
    '@id': SCHEMA_IDS.PERSON,
  },
  'member': [
    {
      '@id': SCHEMA_IDS.PERSON,
    },
  ],
}

// Enhanced website schema
export const websiteSchema = {
  '@type': 'WebSite',
  '@id': SCHEMA_IDS.WEBSITE,
  'url': 'https://fractalcounty.com',
  'name': 'FRACTAL COUNTY',
  'description': 'Personal blog and portfolio website for chip fractalcounty',
  'publisher': {
    '@id': SCHEMA_IDS.ORGANIZATION,
  },
  'author': {
    '@id': SCHEMA_IDS.PERSON,
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
  imageWidth: number,
  imageHeight: number,
) {
  if (!imageUrl || !imageWidth || !imageHeight) {
    throw new Error('Image properties are required for artwork schema')
  }

  const { title, description, date, type, images } = entry.data

  // base artwork properties
  const baseSchema = {
    '@type': type === 'webcomic' ? 'ComicStory' : 'VisualArtwork',
    '@id': url.toString(),
    'name': title,
    'headline': title,
    'description': description,
    'dateCreated': date.toISOString(),
    'datePublished': date.toISOString(),
    'dateModified': date.toISOString(),
    'url': url.toString(),
    'author': {
      '@id': SCHEMA_IDS.PERSON,
    },
    'creator': {
      '@id': SCHEMA_IDS.PERSON,
    },
    'publisher': {
      '@id': SCHEMA_IDS.ORGANIZATION,
    },
    'isPartOf': {
      '@id': SCHEMA_IDS.WEBSITE,
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url.toString(),
    },
    'image': {
      '@type': 'ImageObject',
      '@id': `${url.toString()}#primaryimage`,
      'url': imageUrl,
      'width': imageWidth,
      'height': imageHeight,
      'caption': title,
    },
  }

  // modify image handling to use associatedMedia for multiple images
  const imageSchema = Array.isArray(images)
    ? {
        '@type': 'ImageObject',
        '@id': `${url.toString()}#primaryimage`,
        'url': imageUrl,
        'width': imageWidth,
        'height': imageHeight,
        'caption': title,
      }
    : {
        '@type': 'ImageObject',
        '@id': `${url.toString()}#primaryimage`,
        'url': imageUrl,
        'width': imageWidth,
        'height': imageHeight,
        'caption': title,
      }

  // base schema with modifications
  const schema = {
    ...baseSchema,
    '@type': type === 'webcomic' ? ['ComicStory', 'CreativeWork'] : ['VisualArtwork', 'CreativeWork'],
    'encodingFormat': type === 'video' ? 'video/mp4' : 'image/webp',
    'thumbnailUrl': typeof entry.data.thumbnail === 'string' ? entry.data.thumbnail : imageUrl,
    'accessMode': ['visual'],
    'accessibilityFeature': ['alternativeText'],
    'accessibilityHazard': ['noFlashingHazard'],
    'image': imageSchema,
    // add associated media for additional images
    ...(Array.isArray(images) && images.length > 1
      ? {
          associatedMedia: images.slice(1).map((img, index) => ({
            '@type': 'ImageObject',
            '@id': `${url.toString()}#image-${index + 1}`,
            'url': img.src,
            'width': img.width,
            'height': img.height,
            'caption': `${title} - Image ${index + 2}`,
          })),
        }
      : {}),
    ...(type === 'webcomic'
      ? {
          numberOfPages: Array.isArray(images) ? images.length : 1,
          genre: 'webcomic',
        }
      : {
          artform: type === 'video' ? 'Digital Video' : 'Digital Art',
          artMedium: 'Digital',
          artworkSurface: 'Digital Canvas',
          genre: type === 'video' ? 'Animation' : 'Digital Art',
        }),
    'copyrightHolder': {
      '@id': SCHEMA_IDS.PERSON,
    },
    'license': 'https://fractalcounty.com/UNLICENSE',
    'conditionsOfAccess': 'Free to view online',
    'usageInfo': 'https://fractalcounty.com/UNLICENSE',
  }

  return schema
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
      '@id': SCHEMA_IDS.PERSON,
    },
    'creator': {
      '@id': SCHEMA_IDS.PERSON,
    },
    'publisher': {
      '@id': SCHEMA_IDS.ORGANIZATION,
    },
    'keywords': tags?.join(', '),
    'url': url.toString(),
    'isPartOf': {
      '@id': SCHEMA_IDS.WEBSITE,
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url.toString(),
    },
    'articleSection': type === 'project' ? 'Projects' : 'Blog',
    'inLanguage': 'en-US',
    'copyrightHolder': {
      '@id': SCHEMA_IDS.PERSON,
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
      '@id': SCHEMA_IDS.WEBSITE,
    },
    'about': {
      '@type': 'Thing',
      'name': type === 'blog' ? 'Blog Posts' : type === 'projects' ? 'Projects' : 'Artwork',
    },
    'author': {
      '@id': SCHEMA_IDS.PERSON,
    },
    'publisher': {
      '@id': SCHEMA_IDS.ORGANIZATION,
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
      'item': {
        '@type': 'WebPage',
        '@id': item.item,
        'name': item.name,
        'url': item.item,
      },
      // Only include name for last item per Google guidelines
      ...(index === items.length - 1 ? { name: item.name } : {}),
    })),
  }
}

import type { CollectionEntry } from 'astro:content'
import { site } from '@config'

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
  | ArtSchema
  | CollectionPageSchema
  | MusicPlaylistSchema
  | MusicRecordingSchema
  | MusicAlbumSchema

// Schema type definitions
interface WebPageSchema {
  '@type': 'WebPage'
  '@id': string
  url: string
  name: string
  description?: string
  isPartOf: {
    '@id': string
  }
  primaryImageOfPage?: {
    '@id': string
  }
  breadcrumb?: {
    '@id': string
  }
  inLanguage?: string
}

interface ArticleSchema {
  '@type': 'Article'
  '@id': string
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  author: {
    '@id': string
  }
  creator: {
    '@id': string
  }
  publisher: {
    '@id': string
  }
  keywords?: string
  url: string
  isPartOf: {
    '@id': string
  }
  mainEntityOfPage: {
    '@type': 'WebPage'
    '@id': string
  }
  articleSection: string
  inLanguage: string
  copyrightHolder: {
    '@id': string
  }
  license: string
  image?: ImageObjectSchema
}

interface BreadcrumbListSchema {
  '@type': 'BreadcrumbList'
  '@id': string
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    item: {
      '@type': 'WebPage'
      '@id': string
      name: string
      url: string
    }
  }>
}

interface WebSiteSchema {
  '@type': 'WebSite'
  '@id': string
  url: string
  name: string
  description: string
  publisher: {
    '@id': string
  }
  author: {
    '@id': string
  }
  potentialAction: Array<{
    '@type': 'SearchAction'
    target: {
      '@type': 'EntryPoint'
      urlTemplate: string
    }
    'query-input': string
  }>
  inLanguage: string
  copyrightYear: number
  license: string
}

interface OrganizationSchema {
  '@type': 'Organization'
  '@id': string
  name: string
  url: string
  logo: ImageObjectSchema
  image: {
    '@id': string
  }
  sameAs: string[]
  founder: {
    '@id': string
  }
  member: Array<{
    '@id': string
  }>
}

interface PersonSchema {
  '@type': 'Person'
  '@id': string
  name: string
  alternateName: string
  url: string
  email: string
  image: ImageObjectSchema
  sameAs: string[]
  jobTitle: string
  worksFor: {
    '@id': string
  }
}

interface ImageObjectSchema {
  '@type': 'ImageObject'
  '@id': string
  url: string
  width: number
  height: number
  caption?: string
  encodingFormat?: string
  contentUrl?: string
}

interface ArtSchema {
  '@type': string | string[]
  '@id': string
  name: string
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  url: string
  author: {
    '@id': string
  }
  creator: {
    '@id': string
  }
  publisher: {
    '@id': string
  }
  isPartOf: {
    '@id': string
  }
  mainEntityOfPage: {
    '@type': 'WebPage'
    '@id': string
  }
  image: ImageObjectSchema
  encodingFormat: string
  thumbnailUrl: string
  accessMode: string[]
  accessibilityFeature: string[]
  accessibilityHazard: string[]
  copyrightHolder: {
    '@id': string
  }
  license: string
  conditionsOfAccess: string
  usageInfo: string
  numberOfPages?: number
  genre?: string
  artform?: string
  artMedium?: string
  artworkSurface?: string
}

interface CollectionPageSchema {
  '@type': 'CollectionPage'
  '@id': string
  name: string
  description: string
  url: string
  isPartOf: {
    '@id': string
  }
  about: {
    '@type': 'Thing'
    name: string
  }
  author: {
    '@id': string
  }
  publisher: {
    '@id': string
  }
  inLanguage: string
  datePublished: string
  dateModified: string
  breadcrumb: {
    '@id': string
  }
}

interface MusicPlaylistSchema {
  '@type': 'MusicPlaylist'
  '@id': string
  name: string
  numTracks: number
  track: MusicRecordingSchema[]
}

interface MusicRecordingSchema {
  '@type': 'MusicRecording'
  '@id': string
  name: string
  byArtist: MusicGroupSchema | PersonSchema
  duration?: string
  url: string
  image?: ImageObjectSchema
}

interface MusicGroupSchema {
  '@type': 'MusicGroup'
  name: string
  url?: string
}

interface MusicAlbumSchema {
  '@type': 'MusicAlbum'
  '@id': string
  name: string
  byArtist: { '@id': string }
  datePublished: string
  url: string
  image: ImageObjectSchema
  description?: string
}

export interface SchemaIds {
  PERSON: string
  ORGANIZATION: string
  WEBSITE: string
}

export const SCHEMA_IDS: SchemaIds = {
  PERSON: `${site.url}/#person`,
  ORGANIZATION: `${site.url}/#organization`,
  WEBSITE: `${site.url}/#website`,
}

// Base person schema with expanded details
export const personSchema = {
  '@type': 'Person',
  '@id': SCHEMA_IDS.PERSON,
  name: site.author.name,
  alternateName: site.author.username,
  url: site.url,
  email: site.author.email,
  image: {
    '@type': 'ImageObject',
    url: `${site.url}/images/avatar.jpg`,
    width: 400,
    height: 400,
    encodingFormat: 'image/jpeg',
  },
  sameAs: site.author.socials?.map((social) => social.url) ?? [],
  jobTitle: site.author.bio,
  worksFor: {
    '@id': SCHEMA_IDS.ORGANIZATION,
  },
}

// Enhanced organization schema
export const organizationSchema = {
  '@type': 'Organization',
  '@id': SCHEMA_IDS.ORGANIZATION,
  name: site.name,
  url: site.url,
  logo: {
    '@type': 'ImageObject',
    '@id': `${site.url}/#logo`,
    url: `${site.url}/icons/logo.svg`,
    width: 1200,
    height: 442,
    caption: site.name,
  },
  image: {
    '@id': `${site.url}/#logo`,
  },
  sameAs: site.author.socials?.map((social) => social.url) ?? [],
  founder: {
    '@id': SCHEMA_IDS.PERSON,
  },
  member: [
    {
      '@id': SCHEMA_IDS.PERSON,
    },
  ],
}

// Enhanced website schema
export const websiteSchema = {
  '@type': 'WebSite',
  '@id': SCHEMA_IDS.WEBSITE,
  url: site.url,
  name: site.name,
  description: site.pages.home.description,
  publisher: {
    '@id': SCHEMA_IDS.ORGANIZATION,
  },
  author: {
    '@id': SCHEMA_IDS.PERSON,
  },
  potentialAction: [
    {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  ],
  inLanguage: 'en-US',
  copyrightYear: new Date().getFullYear(),
  license: `${site.url}/unlicense`,
}

// Simplify the path transformation
function getPublicImagePath(
  imageSrc: string,
  collection?: string,
  id?: string,
): string {
  if (imageSrc.startsWith('/_astro/')) {
    const filename = imageSrc
      .split('/')
      .pop()!
      .split('.')[0]
      .replace(/_[a-z0-9]+$/i, '') // remove hash

    // explicitly handle nullish/empty cases for collection and id
    const relativePath =
      (collection ?? '') && (id ?? '') ?
        `/images/${collection}/${id}/${filename}.webp`
      : `/images/${filename}.webp`

    // make url absolute
    return new URL(relativePath, site.url).toString()
  }
  return imageSrc.startsWith('http') ? imageSrc : (
      new URL(imageSrc, site.url).toString()
    )
}

// Enhanced art schema generation with automatic image metadata handling
export function generateArtSchema(entry: CollectionEntry<'art'>, url: URL) {
  const { title, description, publishDate, updatedDate, type } = entry.data

  // get the primary image from the entry
  const primaryImage =
    Array.isArray(entry.data.images) ?
      entry.data.images[0]
    : entry.data.thumbnail

  if (!primaryImage) {
    throw new Error('Art must have either images or thumbnail defined')
  }

  const publicPath = getPublicImagePath(primaryImage.src, 'art', entry.id)

  // base art properties
  const baseSchema = {
    '@type': type === 'webcomic' ? 'ComicStory' : 'VisualArtwork',
    '@id': url.toString(),
    name: title,
    headline: title,
    description,
    datePublished: publishDate.toISOString(),
    dateModified: (updatedDate || publishDate).toISOString(),
    url: url.toString(),
    author: {
      '@id': SCHEMA_IDS.PERSON,
    },
    creator: {
      '@id': SCHEMA_IDS.PERSON,
    },
    publisher: {
      '@id': SCHEMA_IDS.ORGANIZATION,
    },
    isPartOf: {
      '@id': SCHEMA_IDS.WEBSITE,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.toString(),
    },
    image: {
      '@type': 'ImageObject',
      '@id': `${url.toString()}#primaryimage`,
      url: publicPath,
      contentUrl: publicPath,
      thumbnailUrl: publicPath,
      width: primaryImage.width,
      height: primaryImage.height,
      caption: title,
    },
  }

  // base schema with modifications
  const schema = {
    ...baseSchema,
    '@type':
      type === 'webcomic' ?
        ['ComicStory', 'CreativeWork']
      : ['VisualArtwork', 'CreativeWork'],
    encodingFormat: 'image/webp',
    thumbnailUrl: publicPath,
    accessMode: ['visual'],
    accessibilityFeature: ['alternativeText'],
    accessibilityHazard: ['noFlashingHazard'],
    // add associated media for additional images
    ...(Array.isArray(entry.data.images) && entry.data.images.length > 1 ?
      {
        associatedMedia: entry.data.images
          .slice(1)
          .map((img: ImageMetadata, index: number) => ({
            '@type': 'ImageObject',
            '@id': `${url.toString()}#image-${index + 1}`,
            url: img.src,
            width: img.width,
            height: img.height,
            caption: `${title} - Image ${index + 2}`,
          })),
      }
    : {}),
    ...(type === 'webcomic' ?
      {
        numberOfPages:
          Array.isArray(entry.data.images) ? entry.data.images.length : 1,
        genre: 'webcomic',
      }
    : {
        artform: type === 'animation' ? 'Animation' : 'Drawing',
        artMedium: 'Digital',
        artworkSurface: 'Digital Canvas',
        genre: type === 'animation' ? 'Animation' : 'Digital Art',
      }),
    copyrightHolder: {
      '@id': SCHEMA_IDS.PERSON,
    },
    license: `${site.url}/unlicense`,
    conditionsOfAccess: 'Free to view online',
    usageInfo: `${site.url}/unlicense`,
  }

  return schema
}

// Enhanced article schema for blog
export function generateArticleSchema(
  entry: CollectionEntry<'blog'>,
  url: URL,
  imageUrl?: string,
) {
  const { title, description, publishDate, updatedDate, tags } = entry.data

  // create image schema if we have a valid image url
  const imageSchema =
    typeof imageUrl === 'string' && imageUrl.length > 0 ?
      {
        '@type': 'ImageObject',
        '@id': `${url.toString()}#primaryimage`,
        url: imageUrl,
        width: 1200, // opengraph images are always this size
        height: 630,
        caption: title,
      }
    : null

  return {
    '@type': 'Article',
    '@id': url.toString(),
    headline: title,
    description,
    datePublished: publishDate.toISOString(),
    dateModified: (updatedDate || publishDate).toISOString(),
    author: {
      '@id': SCHEMA_IDS.PERSON,
    },
    creator: {
      '@id': SCHEMA_IDS.PERSON,
    },
    publisher: {
      '@id': SCHEMA_IDS.ORGANIZATION,
    },
    keywords: tags?.join(', '),
    url: url.toString(),
    isPartOf: {
      '@id': SCHEMA_IDS.WEBSITE,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.toString(),
    },
    articleSection: 'Blog',
    inLanguage: 'en-US',
    copyrightHolder: {
      '@id': SCHEMA_IDS.PERSON,
    },
    license: `${site.url}/unlicense`,
    ...(imageSchema && { image: imageSchema }),
  }
}

// Enhanced collection page schema
export function generateCollectionSchema(
  type: 'blog' | 'art',
  url: URL,
  title: string,
  description: string,
) {
  return {
    '@type': 'CollectionPage',
    '@id': url.toString(),
    name: title,
    description,
    url: url.toString(),
    isPartOf: {
      '@id': SCHEMA_IDS.WEBSITE,
    },
    about: {
      '@type': 'Thing',
      name: type === 'blog' ? 'Blog Posts' : 'Artwork',
    },
    author: {
      '@id': SCHEMA_IDS.PERSON,
    },
    publisher: {
      '@id': SCHEMA_IDS.ORGANIZATION,
    },
    inLanguage: 'en-US',
    datePublished: new Date('2024-10-01').toISOString(),
    dateModified: new Date().toISOString(),
    breadcrumb: {
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
  // Ensure last item doesn't have an item property per Google's guidelines
  const itemListElements = items.map((item, index) => {
    const isLastItem = index === items.length - 1
    return {
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(isLastItem ?
        {}
      : {
          item: {
            '@type': 'WebPage',
            '@id': item.item,
            name: item.name,
            url: item.item,
          },
        }),
    }
  })

  return {
    '@type': 'BreadcrumbList',
    '@id': `${items[items.length - 1].item}#breadcrumb`,
    itemListElement: itemListElements,
  }
}

// Add to your existing schema.ts
export function generateImageSchema({
  image,
  title,
  description,
  caption,
  url,
  isRepresentative = false,
  contentLocation,
  keywords,
  datePublished,
  dateModified,
  type,
}: {
  image: ImageMetadata
  title: string
  description?: string
  caption?: string
  url: string
  isRepresentative?: boolean
  contentLocation?: string
  keywords?: string[]
  datePublished?: string
  dateModified?: string
  type?: 'photograph' | 'illustration' | 'animation' | 'webcomic'
}) {
  return {
    '@type': ['ImageObject', type ?? 'ImageObject'],
    '@id': `${url}#image`,
    name: title,
    description,
    contentUrl: url,
    url: image.src,
    width: image.width,
    height: image.height,
    caption,
    encodingFormat: `image/${image.format}`,
    representativeOfPage: isRepresentative,
    license: `${site.url}/unlicense`,
    acquireLicensePage: `${site.url}/unlicense`,
    copyrightNotice: `Unlicensed. ${new Date().getFullYear()} ${site.author.name}`,
    creator: {
      '@type': 'Person',
      '@id': SCHEMA_IDS.PERSON,
    },
    author: {
      '@id': SCHEMA_IDS.PERSON,
    },
    creditText: site.author.name,
    copyrightHolder: {
      '@id': SCHEMA_IDS.PERSON,
    },
    contentLocation:
      contentLocation != null && contentLocation.length > 0 ?
        {
          '@type': 'Place',
          name: contentLocation,
        }
      : undefined,
    keywords: keywords?.join(', '),
    datePublished,
    dateModified,
    accessibilityHazard: ['noFlashingHazard'],
    accessibilityFeature: ['alternativeText', 'highContrast'],
    thumbnailUrl: url,
  }
}

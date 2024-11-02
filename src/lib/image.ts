import type { ImageMetadata, ImageOutputFormat } from 'astro'

// common thumbnail dimensions
export const THUMBNAIL_SIZES = {
  GALLERY: {
    width: 400,
    height: 400,
  },
  CAROUSEL: {
    width: 600,
    height: 600,
  },
} as const

export interface ThumbnailOptions {
  image: ImageMetadata | string
  width?: number
  height?: number
}

export interface ThumbnailResult {
  src: string
  width: number
  height: number
  format: ImageOutputFormat
}

// improve type guard with more specific checks
export function isImageMetadata(image: unknown): image is ImageMetadata {
  return typeof image === 'object' && image !== null
    && 'src' in image
    && typeof image.src === 'string'
    && 'width' in image
    && typeof image.width === 'number'
    && 'height' in image
    && typeof image.height === 'number'
    && 'format' in image
    && typeof image.format === 'string'
}

// add helper for dimension validation
function getValidDimension(value?: number, fallback = 0): number {
  return typeof value === 'number' && value > 0 ? value : fallback
}

// improve thumbnail generation with better error handling
export async function generateThumbnail({
  image,
  width,
  height,
}: ThumbnailOptions): Promise<ThumbnailResult> {
  try {
    // handle string paths (custom thumbnails) - return metadata for Astro's Picture component
    if (typeof image === 'string') {
      return {
        src: image,
        width: getValidDimension(width),
        height: getValidDimension(height),
        format: 'webp',
      }
    }

    // handle ImageMetadata - let Astro handle the optimization
    if (isImageMetadata(image)) {
      return {
        src: image.src,
        width: getValidDimension(width, image.width),
        height: getValidDimension(height, image.height),
        format: image.format,
      }
    }

    throw new Error('Invalid image input')
  }
  catch (error) {
    console.warn('thumbnail generation failed:', error)
    if (isImageMetadata(image)) {
      return {
        src: image.src,
        width: getValidDimension(width, image.width),
        height: getValidDimension(height, image.height),
        format: image.format,
      }
    }
    return {
      src: typeof image === 'string' ? image : '',
      width: getValidDimension(width),
      height: getValidDimension(height),
      format: 'webp',
    }
  }
}

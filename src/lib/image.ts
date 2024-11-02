import type { ImageMetadata, ImageOutputFormat } from 'astro'
import { getImage } from 'astro:assets'

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
  format?: ImageOutputFormat
  quality?: number
}

export interface ThumbnailResult {
  src: string
  width: number
  height: number
  format: ImageOutputFormat
}

// improve type guard
export function isImageMetadata(image: unknown): image is ImageMetadata {
  return typeof image === 'object' && image !== null
    && 'src' in image && 'width' in image && 'height' in image
}

// add helper for dimension validation
function getValidDimension(value?: number, fallback = 0): number {
  return typeof value === 'number' && value > 0 ? value : fallback
}

// modify thumbnail generation with proper type handling
export async function generateThumbnail({
  image,
  width,
  height,
  format = 'webp',
  quality = 80,
}: ThumbnailOptions): Promise<ThumbnailResult> {
  try {
    // handle string paths directly
    if (typeof image === 'string') {
      return {
        src: image,
        width: getValidDimension(width),
        height: getValidDimension(height),
        format,
      }
    }

    // handle ImageMetadata
    if (isImageMetadata(image)) {
      const processed = await getImage({
        src: image,
        width: getValidDimension(width),
        height: getValidDimension(height),
        format,
        quality,
      })

      return {
        src: processed.src,
        width: processed.attributes.width as number,
        height: processed.attributes.height as number,
        format: format ?? 'webp',
      }
    }

    throw new Error('Invalid image input')
  }
  catch (error) {
    console.warn('thumbnail generation failed:', error)
    // fallback with safe type checking
    if (isImageMetadata(image)) {
      return {
        src: image.src,
        width: getValidDimension(width, image.width),
        height: getValidDimension(height, image.height),
        format: format ?? 'webp',
      }
    }
    // final fallback for string paths
    return {
      src: typeof image === 'string' ? image : '',
      width: getValidDimension(width),
      height: getValidDimension(height),
      format,
    }
  }
}

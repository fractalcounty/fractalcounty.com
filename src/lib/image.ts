import type { ImageMetadata } from 'astro'
import { getImage } from 'astro:assets'

export async function optimizeImage(
  image: ImageMetadata,
  options: {
    width?: number
    height?: number
    format?: 'webp' | 'avif' | 'png' | 'jpg'
  } = {},
) {
  try {
    return await getImage({
      src: image,
      width: options.width,
      height: options.height,
      format: options.format || 'webp',
    })
  }
  catch (error) {
    // Fallback to original image if optimization fails
    console.warn(`Image optimization failed:`, error)
    return {
      src: image.src,
      width: image.width,
      height: image.height,
      format: image.format,
    }
  }
}

export interface VideoMetadata {
  src: string
  width?: number
  height?: number
  format: 'webm' | 'mp4' | 'youtube'
  duration?: number
  posterImage?: string
}

export type VideoSize = 'sm' | 'md' | 'lg' | 'auto'
import { watch } from 'node:fs'
import process from 'node:process'
import { processMedia } from './process-media'

const WATCH_DIRS = ['src/content/blog', 'src/content/art']
let debounceTimer: ReturnType<typeof setTimeout>

const MEDIA_FILE_REGEX = /\.(?:png|jpg|jpeg|gif|avif|webp|webm)$/i

function debouncedProcess() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    void processMedia(true, true)
  }, 500)
}

export function watchMedia() {
  void processMedia(true, true)

  console.log('watching content directories for media changes...')

  WATCH_DIRS.forEach((dir) => {
    watch(dir, { recursive: true }, (_, filename) => {
      if (filename === null || filename === undefined || filename === '') return

      if (MEDIA_FILE_REGEX.test(filename)) debouncedProcess()
    })
  })
}

if (import.meta.url === `file://${process.argv[1]}`) void watchMedia()

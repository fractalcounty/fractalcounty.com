import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

// cache directory path relative to project root
const CACHE_DIR = '.dev/cache'
const CACHE_DURATION = 1000 * 60 * 60 * 24 // 24 hours

interface CacheOptions {
  duration?: number
  force?: boolean
}

// add type for cached data to ensure type safety
interface CachedData<T> {
  data: T
  timestamp: number
}

export class DevCache {
  private static ensureCacheDir() {
    if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true })
  }

  static async get<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    const isProd = process.env.NODE_ENV === 'production'
    const hasApiKeys = [
      import.meta.env.LASTFM_API_KEY,
      import.meta.env.SPOTIFY_CLIENT_ID,
      import.meta.env.SPOTIFY_CLIENT_SECRET,
    ].every((key) => typeof key === 'string' && key.length > 0)

    if (isProd || hasApiKeys) {
      try {
        return await fetcher()
      } catch (error) {
        console.warn(`fetch failed for ${key}, attempting cache fallback:`, error)
        // continue to cache logic below as fallback
      }
    }

    this.ensureCacheDir()
    const cachePath = path.join(CACHE_DIR, `${key}.json`)

    try {
      // check if cache exists and is valid
      if (fs.existsSync(cachePath) && !options.force) {
        const stats = fs.statSync(cachePath)
        const age = Date.now() - stats.mtimeMs

        if (age < (options.duration ?? CACHE_DURATION)) {
          const cached = JSON.parse(
            fs.readFileSync(cachePath, 'utf-8')
          ) as CachedData<T>
          return cached.data
        }
      }
    } catch (error) {
      console.warn(`cache read error for ${key}:`, error)
    }

    // fetch and cache with type safety
    try {
      const data = await fetcher()
      const cacheData: CachedData<T> = {
        data,
        timestamp: Date.now(),
      }
      fs.writeFileSync(cachePath, JSON.stringify(cacheData))
      return data
    } catch (error) {
      // if fetch fails, return existing cache as fallback if it exists
      if (fs.existsSync(cachePath)) {
        console.warn(`using stale cache for ${key} due to fetch error:`, error)
        const cached = JSON.parse(
          fs.readFileSync(cachePath, 'utf-8')
        ) as CachedData<T>
        return cached.data
      }
      throw error
    }
  }
}

import {
  getSpotifyAlbumInfo,
  getSpotifyArtistImage,
  getSpotifyTrackInfo,
} from './spotify'

interface LastFmImage {
  size: string
  '#text': string
}

interface LastFmArtist {
  name: string
  playcount: string
  image: LastFmImage[]
  // add other fields you need
}

interface LastFmAlbum {
  name: string
  artist: { name: string }
  playcount: string
  image: LastFmImage[]
}

interface LastFmTrack {
  name: string
  artist: { name: string }
  playcount: string
  image: LastFmImage[]
  albumArt?: string | null
  previewUrl?: string | null
}

interface LastFmResponse {
  topartists: { artist: LastFmArtist[] }
  topalbums: { album: LastFmAlbum[] }
  toptracks: { track: LastFmTrack[] }
  user: LastFmUserInfo
  error?: number
  message?: string
}

export interface LastFmData {
  artists: LastFmArtist[]
  albums: LastFmAlbum[]
  userInfo: Record<string, unknown>
  topTracks: LastFmTrack[]
}

// add interface for track info response
interface LastFmTrackInfoResponse {
  track?: {
    album?: {
      image?: LastFmImage[]
    }
  }
  error?: number
  message?: string
}

// add this interface
interface LastFmTopTracksResponse {
  toptracks?: {
    track?: LastFmTrack[] | null
  } | null
  error?: number
  message?: string
}

// add this interface
interface LastFmUserInfo {
  playcount: string
  registered: {
    unixtime: number
  }
  // ... other fields
}

// Map of LastFM error codes to messages
const LASTFM_ERRORS = {
  2: 'Invalid service - This service does not exist',
  3: 'Invalid Method - No method with that name in this package',
  4: 'Authentication Failed - You do not have permissions to access the service',
  5: 'Invalid format - This service doesn\'t exist in that format',
  6: 'Invalid parameters - Your request is missing a required parameter',
  7: 'Invalid resource specified',
  8: 'Operation failed - Something else went wrong',
  9: 'Invalid session key - Please re-authenticate',
  10: 'Invalid API key - You must be granted a valid key by last.fm',
  11: 'Service Offline - This service is temporarily offline. Try again later.',
  13: 'Invalid method signature supplied',
  16: 'There was a temporary error processing your request. Please try again',
  26: 'Suspended API key - Access for your account has been suspended',
  29: 'Rate limit exceeded - Your IP has made too many requests in a short period',
}

// Helper to check and handle LastFM API errors
async function handleLastFmResponse<T>(response: Response, endpoint: string): Promise<T> {
  if (!response.ok) {
    const statusError = `LastFM API HTTP error: ${response.status} ${response.statusText} for ${endpoint}`
    console.error(statusError)
    throw new Error(statusError)
  }
  
  const data = await response.json() as (T & { error?: number; message?: string })
  
  if (data.error !== undefined) {
    const errorCode = data.error
    const errorMessage = data.message !== undefined && data.message !== '' 
      ? data.message 
      : (errorCode in LASTFM_ERRORS ? LASTFM_ERRORS[errorCode as keyof typeof LASTFM_ERRORS] : 'Unknown LastFM error')
    const formattedError = `LastFM API error ${errorCode}: ${errorMessage} for ${endpoint}`
    
    console.error(formattedError)
    throw new Error(formattedError)
  }
  
  return data as T
}

// fetch last.fm data with spotify enhancements
export async function fetchLastFmData(
  username: string,
  apiKey: string,
  spotifyToken: string,
  period: string = '12month',
): Promise<{
  userInfo: LastFmUserInfo
  artists: LastFmArtist[]
  albums: LastFmAlbum[]
  topTracks: LastFmTrack[]
}> {
  try {
    // Create API endpoint URLs
    const topArtistsUrl = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${apiKey}&period=${period}&limit=6&format=json&extended=1`
    const topAlbumsUrl = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&api_key=${apiKey}&period=${period}&limit=20&format=json`
    const userInfoUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${username}&api_key=${apiKey}&format=json`
    const topTracksUrl = `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=${apiKey}&period=${period}&limit=12&extended=1&format=json`
    
    const [topArtists, topAlbums, userInfo, topTracks] = await Promise.all([
      // get top artists
      (async () => fetch(topArtistsUrl).then(async res => handleLastFmResponse<LastFmResponse>(res, 'user.gettopartists')))(),
      // get top albums
      (async () => fetch(topAlbumsUrl).then(async res => handleLastFmResponse<LastFmResponse>(res, 'user.gettopalbums')))(),
      // get user info
      (async () => fetch(userInfoUrl).then(async res => handleLastFmResponse<LastFmResponse>(res, 'user.getinfo')))(),
      // get top tracks
      (async () => fetch(topTracksUrl).then(async res => handleLastFmResponse<LastFmResponse>(res, 'user.gettoptracks')))(),
    ])

    // fetch additional track info to get album art
    const tracksWithAlbumArt = await Promise.all(
      topTracks.toptracks.track.map(async (track: LastFmTrack) => {
        try {
          const trackInfoUrl = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&user=${username}&api_key=${apiKey}&artist=${encodeURIComponent(track.artist.name)}&track=${encodeURIComponent(track.name)}&format=json`
          const trackInfo = await fetch(trackInfoUrl)
            .then(async res => handleLastFmResponse<LastFmTrackInfoResponse>(res, 'track.getInfo'))

          return {
            ...track,
            albumArt: trackInfo?.track?.album?.image?.[3]?.['#text'] ?? null,
          }
        } catch (error) {
          console.warn(`Error fetching track info for ${track.name} by ${track.artist.name}:`, error)
          return {
            ...track,
            albumArt: null,
          }
        }
      }),
    )

    // filter and enhance tracks with spotify data
    const uniqueArtistTracks = await Promise.all(
      tracksWithAlbumArt
        .reduce((acc: LastFmTrack[], track: LastFmTrack) => {
          if (acc.length >= 6) return acc
          const artistExists = acc.some(
            (t) => t.artist.name === track.artist.name,
          )
          if (!artistExists) {
            acc.push(track)
          }
          return acc
        }, [])
        .map(async (track: LastFmTrack) => {
          try {
            const spotifyInfo = await getSpotifyTrackInfo(
              track.name,
              track.artist.name,
              spotifyToken,
            )
            return {
              ...track,
              albumArt: (() => {
                if (
                  typeof spotifyInfo?.albumArt === 'string' &&
                  spotifyInfo.albumArt.length > 0
                ) {
                  return spotifyInfo.albumArt
                }
                if (
                  typeof track?.albumArt === 'string' &&
                  track.albumArt.length > 0
                ) {
                  return track.albumArt
                }
                return 'images/album.webp'
              })(),
              previewUrl: spotifyInfo?.previewUrl ?? null,
            }
          } catch (error) {
            console.warn(`Error enhancing track with Spotify data for ${track.name}:`, error)
            return {
              ...track,
              albumArt: typeof track?.albumArt === 'string' && track.albumArt.length > 0 
                ? track.albumArt 
                : 'images/album.webp',
              previewUrl: null,
            }
          }
        }),
    )

    // enhance artists with spotify images
    const enhancedArtists = await Promise.all(
      topArtists.topartists.artist.map(async (artist: LastFmArtist) => {
        try {
          const spotifyImage = await getSpotifyArtistImage(
            artist.name,
            spotifyToken,
          )
          return {
            ...artist,
            image: artist.image.map((img: LastFmImage, i: number) => ({
              ...img,
              '#text':
                i === 3 ?
                  spotifyImage !== null ?
                    spotifyImage
                  : img['#text']
                : img['#text'],
            })),
          }
        } catch (error) {
          console.warn(`Error fetching Spotify artist image for ${artist.name}:`, error)
          return artist
        }
      }),
    )

    // enhance albums with spotify images
    const enhancedAlbums = await Promise.all(
      topAlbums.topalbums.album.map(async (album: LastFmAlbum) => {
        try {
          const spotifyAlbumArt = await getSpotifyAlbumInfo(
            album.name,
            album.artist.name,
            spotifyToken,
          )
          return {
            ...album,
            image: album.image.map((img: LastFmImage, i: number) => ({
              ...img,
              '#text':
                i === 3 ?
                  spotifyAlbumArt !== null ?
                    spotifyAlbumArt
                  : img['#text']
                : img['#text'],
            })),
          }
        } catch (error) {
          console.warn(`Error fetching Spotify album art for ${album.name}:`, error)
          return album
        }
      }),
    )

    return {
      artists: enhancedArtists,
      albums: enhancedAlbums,
      userInfo: userInfo.user,
      topTracks: uniqueArtistTracks,
    }
  } catch (error) {
    console.error('Error fetching LastFM data:', error)
    return {
      artists: [],
      albums: [],
      userInfo: {
        playcount: '0',
        registered: { unixtime: 0 },
      },
      topTracks: [],
    }
  }
}

// fetch top tracks for homepage
export async function fetchTopTracks(
  username: string,
  apiKey: string,
  spotifyToken: string,
  uniqueArtists: boolean = false,
): Promise<LastFmTrack[]> {
  try {
    // increase limit to ensure we have enough tracks after filtering
    const topTracksUrl = `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=${apiKey}&period=1month&limit=20&format=json&extended=1`
    const response = await fetch(topTracksUrl)
    
    // Check for HTTP errors
    if (!response.ok) {
      throw new Error(`LastFM API HTTP error: ${response.status} ${response.statusText}`)
    }

    // handle potential json parse error
    let data: LastFmTopTracksResponse
    try {
      data = await response.json() as LastFmTopTracksResponse
    } catch (e) {
      console.error('Failed to parse LastFM response:', e)
      return []
    }

    // Check for LastFM API errors
    if (data.error !== undefined) {
      const errorCode = data.error
      const errorMessage = data.message !== undefined && data.message !== '' 
        ? data.message 
        : (errorCode in LASTFM_ERRORS ? LASTFM_ERRORS[errorCode as keyof typeof LASTFM_ERRORS] : 'Unknown LastFM error')
      throw new Error(`LastFM API error ${errorCode}: ${errorMessage}`)
    }

    // validate response shape
    if (!data?.toptracks?.track) {
      console.error('Invalid LastFM response shape')
      return []
    }

    const allTracks = data.toptracks.track

    // filter for unique artists if requested
    let processedTracks = allTracks
    if (uniqueArtists) {
      const seen = new Set<string>()
      processedTracks = allTracks.reduce((acc: LastFmTrack[], track) => {
        if (acc.length >= 4) return acc
        if (!seen.has(track.artist.name)) {
          seen.add(track.artist.name)
          acc.push(track)
        }
        return acc
      }, [])
    } else {
      processedTracks = allTracks.slice(0, 3)
    }

    const enhancedTracks = await Promise.all(
      processedTracks.map(async (track: LastFmTrack) => {
        try {
          const spotifyInfo = await getSpotifyTrackInfo(
            track.name,
            track.artist.name,
            spotifyToken,
          )
          return {
            ...track,
            image: track.image.map((img: LastFmImage, i: number) => ({
              ...img,
              '#text':
                i === 2 ?
                  (spotifyInfo?.albumArt ?? img['#text'])
                : img['#text'],
            })),
          }
        } catch (error) {
          console.warn(`Error fetching Spotify data for ${track.name}:`, error)
          return track
        }
      }),
    )

    return enhancedTracks
  } catch (error) {
    console.error('Error fetching top tracks:', error)
    return []
  }
}

// fetch data for multiple periods at build time for static site
export async function fetchMultiPeriodLastFmData(
  username: string,
  apiKey: string,
  spotifyToken: string,
  periods: string[] = ['1month', '12month', 'overall'],
): Promise<Record<string, {
  userInfo: LastFmUserInfo
  artists: LastFmArtist[]
  albums: LastFmAlbum[]
  topTracks: LastFmTrack[]
}>> {
  try {
    // Create an object to store data for each period
    const multiPeriodData: Record<string, {
      userInfo: LastFmUserInfo
      artists: LastFmArtist[]
      albums: LastFmAlbum[]
      topTracks: LastFmTrack[]
    }> = {}

    // Fetch data for each period in parallel
    await Promise.all(
      periods.map(async (period) => {
        try {
          const periodData = await fetchLastFmData(
            username,
            apiKey,
            spotifyToken,
            period,
          )
          multiPeriodData[period] = periodData
        } catch (error) {
          console.error(`Error fetching LastFM data for period ${period}:`, error)
          // Add empty data for this period so the site doesn't crash
          multiPeriodData[period] = {
            artists: [],
            albums: [],
            userInfo: {
              playcount: '0',
              registered: { unixtime: 0 },
            },
            topTracks: [],
          }
        }
      }),
    )

    return multiPeriodData
  } catch (error) {
    console.error('Error fetching multi-period data:', error)
    return {}
  }
}

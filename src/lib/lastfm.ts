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
}

// add this interface
interface LastFmTopTracksResponse {
  toptracks?: {
    track?: LastFmTrack[] | null
  } | null
}

// add this interface
interface LastFmUserInfo {
  playcount: string
  registered: {
    unixtime: number
  }
  // ... other fields
}

// fetch last.fm data with spotify enhancements
export async function fetchLastFmData(
  username: string,
  apiKey: string,
  spotifyToken: string,
): Promise<{
  userInfo: LastFmUserInfo
  artists: LastFmArtist[]
  albums: LastFmAlbum[]
  topTracks: LastFmTrack[]
}> {
  try {
    const [topArtists, topAlbums, userInfo, topTracks] = await Promise.all([
      // get top artists
      fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${apiKey}&period=overall&limit=5&format=json&extended=1`,
      ).then(async (res) => res.json() as Promise<LastFmResponse>),
      // get top albums
      fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&api_key=${apiKey}&period=overall&limit=5&format=json`,
      ).then(async (res) => res.json() as Promise<LastFmResponse>),
      // get user info
      fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${username}&api_key=${apiKey}&format=json`,
      ).then(async (res) => res.json() as Promise<LastFmResponse>),
      // get top tracks
      fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=${apiKey}&limit=12&extended=1&format=json`,
      ).then(async (res) => res.json() as Promise<LastFmResponse>),
    ])

    // fetch additional track info to get album art
    const tracksWithAlbumArt = await Promise.all(
      topTracks.toptracks.track.map(async (track: LastFmTrack) => {
        const trackInfo = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&user=${username}&api_key=${apiKey}&artist=${encodeURIComponent(track.artist.name)}&track=${encodeURIComponent(track.name)}&format=json`,
        ).then(async (res) => res.json() as Promise<LastFmTrackInfoResponse>)

        return {
          ...track,
          albumArt: trackInfo?.track?.album?.image?.[3]?.['#text'] ?? null,
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
        }),
    )

    // enhance artists with spotify images
    const enhancedArtists = await Promise.all(
      topArtists.topartists.artist.map(async (artist: LastFmArtist) => {
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
      }),
    )

    // enhance albums with spotify images
    const enhancedAlbums = await Promise.all(
      topAlbums.topalbums.album.map(async (album: LastFmAlbum) => {
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
      }),
    )

    return {
      artists: enhancedArtists,
      albums: enhancedAlbums,
      userInfo: userInfo.user,
      topTracks: uniqueArtistTracks,
    }
  } catch (error) {
    console.error('Error fetching data:', error)
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
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=${apiKey}&period=1month&limit=20&format=json&extended=1`,
    )

    // handle potential json parse error
    let data: LastFmTopTracksResponse
    try {
      data = (await response.json()) as LastFmTopTracksResponse
    } catch (e) {
      console.error('Failed to parse LastFM response:', e)
      return []
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
          console.error(`Error fetching Spotify data for ${track.name}:`, error)
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

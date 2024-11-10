import { Buffer } from 'node:buffer'

export interface SpotifyTrackInfo {
  albumArt: string | null
  previewUrl: string | null
}

export interface SpotifyPlaylistTrack {
  name: string
  artist: string
  album: string
  duration: number
  preview_url: string | null
  image: string | null
  external_url: string
}

export interface SpotifyPlaylist {
  name: string
  description: string
  image: string
  tracks: SpotifyPlaylistTrack[]
}

// add these interfaces at the top
interface SpotifyAuthResponse {
  access_token: string
}

interface SpotifyArtistResponse {
  artists: {
    items: Array<{
      images: Array<{ url: string }>
    }>
  }
}

interface SpotifyTrackResponse {
  tracks: {
    items: Array<{
      album: {
        images: Array<{ url: string }>
      }
      preview_url: string | null
    }>
  }
}

interface SpotifyAlbumResponse {
  albums: {
    items: Array<{
      images: Array<{ url: string }>
    }>
  }
}

interface SpotifyPlaylistResponse {
  name: string
  description: string
  images: Array<{ url: string }>
  tracks: {
    items: Array<{
      track: {
        name: string
        artists: Array<{ name: string }>
        album: {
          name: string
          images: Array<{ url: string }>
        }
        duration_ms: number
        preview_url: string | null
        external_urls: {
          spotify: string
        }
      }
    }>
  }
}

// get spotify auth token
export async function getSpotifyToken(clientId: string, clientSecret: string): Promise<string> {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  const data = await response.json() as SpotifyAuthResponse
  return data.access_token
}

// get artist image from spotify
export async function getSpotifyArtistImage(artistName: string, token: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = await response.json() as SpotifyArtistResponse
    return data.artists?.items[0]?.images[0]?.url ?? null
  } catch (error) {
    console.error(`Error fetching Spotify image for ${artistName}:`, error)
    return null
  }
}

// get track info from spotify
export async function getSpotifyTrackInfo(
  trackName: string,
  artistName: string,
  token: string
): Promise<SpotifyTrackInfo> {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(`track:${trackName} artist:${artistName}`)}&type=track&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = await response.json() as SpotifyTrackResponse
    return {
      albumArt: data.tracks?.items[0]?.album?.images[0]?.url ?? null,
      previewUrl: data.tracks?.items[0]?.preview_url ?? null,
    }
  } catch (error) {
    console.error(`error fetching spotify info for ${trackName}:`, error)
    return { albumArt: null, previewUrl: null }
  }
}

// get album info from spotify
export async function getSpotifyAlbumInfo(
  albumName: string,
  artistName: string,
  token: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(`album:${albumName} artist:${artistName}`)}&type=album&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = await response.json() as SpotifyAlbumResponse
    return data.albums?.items[0]?.images[0]?.url ?? null
  } catch (error) {
    console.error(`error fetching spotify album art for ${albumName}:`, error)
    return null
  }
}

// get playlist details from spotify
export async function getPlaylistDetails(
  playlistId: string,
  token: string
): Promise<SpotifyPlaylist | null> {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = await response.json() as SpotifyPlaylistResponse
    return {
      name: data.name,
      description: data.description,
      image: data.images[0]?.url,
      tracks: data.tracks.items.map(item => ({
        name: item.track.name,
        artist: item.track.artists[0].name,
        album: item.track.album.name,
        duration: item.track.duration_ms,
        preview_url: item.track.preview_url,
        image: item.track.album.images[0]?.url,
        external_url: item.track.external_urls.spotify,
      })),
    }
  } catch (error) {
    console.error('error fetching playlist:', error)
    return null
  }
} 
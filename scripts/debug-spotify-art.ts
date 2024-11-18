// debug-spotify-art.ts
import { getSpotifyToken } from '@/lib/spotify'

const PLAYLIST_ID = '6mcNUOZBJVOl38rvUS5suh' // your playlist id

async function getPlaylistArtwork() {
  const token = await getSpotifyToken()

  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  const data = await response.json()

  // sort images by size and get the largest one
  const sortedImages = data.images.sort((a: any, b: any) => b.width - a.width)

  console.log('all available sizes:')
  sortedImages.forEach((img: any) => {
    console.log(`${img.width}x${img.height}: ${img.url}`)
  })

  console.log('\nlargest image url:')
  console.log(sortedImages[0].url)
}

getPlaylistArtwork().catch(console.error)

Title: spotify-url-info

URL Source: https://www.npmjs.com/package/spotify-url-info

Markdown Content:
[![Image 1: microlink logo](https://github.com/microlinkhq/cdn/raw/master/dist/logo/banner.png#gh-light-mode-only)](https://github.com/microlinkhq/cdn/raw/master/dist/logo/banner.png#gh-light-mode-only) [![Image 2: microlink logo](https://github.com/microlinkhq/cdn/raw/master/dist/logo/banner-dark.png#gh-dark-mode-only)](https://github.com/microlinkhq/cdn/raw/master/dist/logo/banner-dark.png#gh-dark-mode-only)

[![Image 3: Last version](https://camo.githubusercontent.com/ad68403e0e624162f8bbaad70c05fe8a4b54054d8a7b9bbb4be2b06e3c48d7d7/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f7461672f6d6963726f6c696e6b68712f73706f746966792d75726c2d696e666f2e7376673f7374796c653d666c61742d737175617265)](https://camo.githubusercontent.com/ad68403e0e624162f8bbaad70c05fe8a4b54054d8a7b9bbb4be2b06e3c48d7d7/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f7461672f6d6963726f6c696e6b68712f73706f746966792d75726c2d696e666f2e7376673f7374796c653d666c61742d737175617265) [![Image 4: Coverage Status](https://camo.githubusercontent.com/69aca4b6e70fef5455a8f04b61905459022203b6f9a38e3fff1a38d53c97c048/68747470733a2f2f696d672e736869656c64732e696f2f636f766572616c6c732f6d6963726f6c696e6b68712f73706f746966792d75726c2d696e666f2e7376673f7374796c653d666c61742d737175617265)](https://coveralls.io/github/microlinkhq/spotify.url-info) [![Image 5: NPM Status](https://camo.githubusercontent.com/627e10fd16a295ff5db5e91311ebf4c792a4ca69bb7882c5a5a192abd25ba288/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f646d2f73706f746966792d75726c2d696e666f2e7376673f7374796c653d666c61742d737175617265)](https://www.npmjs.org/package/spotify-url-info)

> Get metadata from Spotify URLs.

Install
-------

npm install spotify-url-info

Usage
-----

In order to use the library, you have to provide the fetch agent to use:

const fetch \= require('isomorphic-unfetch')
const { getData, getPreview, getTracks, getDetails } \=
  require('spotify-url-info')(fetch)

There are four functions:

*   **getData**  
    Provides the full available data, in a shape that is very similar to [what the spotify API returns](https://developer.spotify.com/documentation/web-api/reference/object-model/).
    
*   **getPreview**  
    Always returns the same fields for different types of resources (album, artist, playlist, track). The preview track is the first in the Album, Playlist, etc.
    
*   **getTracks**  
    Returns array with tracks. This data is passed on straight from spotify, so the shape could change.Only the first 100 tracks will be returned.
    
*   **getDetails**  
    Returns both the preview and tracks. Should be used if you require information from both of them so that only one request is made.
    

All the methods receive a Spotify URL (play. or open.) as first argument:

getPreview('https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas').then(data \=\>
  console.log(data)
)

Additionally, you can provide fetch agent options as second argument:

getPreview('https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas', {
  headers: {
    'user-agent': 'googlebot'
  }
}).then(data \=\> console.log(data))

It returns back the information related to the Spotify URL:

{
  "title": "Immaterial",
  "type": "track",
  "track": "Immaterial",
  "artist": "SOPHIE",
  "image": "https://i.scdn.co/image/d6f496a6708d22a2f867e5acb84afb0eb0b07bc1",
  "audio": "https://p.scdn.co/mp3-preview/6be8eb12ff18ae09b7a6d38ff1e5327fd128a74e?cid=162b7dc01f3a4a2ca32ed3cec83d1e02",
  "link": "https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas",
  "embed": "https://embed.spotify.com/?uri=spotify:track:5nTtCOCds6I0PHMNtqelas",
  "date": "2018-06-15T00:00:00.000Z",
  "description": "description of a podcast episode"
}

When a field can't be retrieved, the value will be `undefined`.

There are no guarantees about the shape of this data, because it varies with different media and scraping methods. Handle it carefully.

License
-------

**spotify-url-info** © [microlink.io](https://microlink.io/), released under the [MIT](https://github.com/microlinkhq/spotify-url-info/blob/master/LICENSE.md) License.  
Authored by [Karl Sander](https://github.com/karlsander) and maintained by [Kiko Beats](https://kikobeats.com/) with help from [contributors](https://github.com/microlinkhq/spotify-url-info/contributors).

> [microlink.io](https://microlink.io/) · GitHub [microlink.io](https://github.com/microlinkhq) · X [@microlinkhq](https://x.com/microlinkhq)
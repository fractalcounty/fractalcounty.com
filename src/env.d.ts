/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly LASTFM_API_KEY: string
  readonly SPOTIFY_CLIENT_ID: string
  readonly SPOTIFY_CLIENT_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

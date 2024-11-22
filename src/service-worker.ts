/// <reference lib="webworker" />
/// <reference types="@types/serviceworker" />

const CACHE_VERSION = Date.now().toString()

// clear all caches on activation
globalThis.addEventListener('activate', (event) => {
  (event as ExtendableEvent).waitUntil(
    Promise.all([
      // clear all caches
      caches.keys().then(async keys => Promise.all(
        keys.map(async key => caches.delete(key))
      )),
      // claim clients immediately
      ((globalThis as unknown) as ServiceWorkerGlobalScope).clients.claim()
    ])
  )
})

// prevent caching on all fetch requests
globalThis.addEventListener('fetch', (event) => {
  (event).respondWith(
    fetch((event).request, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Cache-Version': CACHE_VERSION
      }
    })
  )
})

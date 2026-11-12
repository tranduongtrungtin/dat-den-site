self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  event.respondWith(
    caches.open('dat-den-web-v1').then(async (cache) => {
      try {
        const response = await fetch(event.request)
        if (new URL(event.request.url).origin === self.location.origin) await cache.put(event.request, response.clone())
        return response
      } catch {
        return cache.match(event.request)
      }
    }),
  )
})

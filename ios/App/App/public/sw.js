const CACHE_NAME = 'dat-den-web-v2'
const OFFLINE_HTML = `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Đất Đen — Ngoại tuyến</title><style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#F4F1E9;color:#174D38;font-family:system-ui,-apple-system,sans-serif;text-align:center;padding:24px}main{max-width:340px}h1{font-size:22px;margin:0 0 8px}p{font-size:15px;line-height:1.6;margin:0 0 20px;color:#4a4a44}button{background:#174D38;color:#F4F1E9;border:0;border-radius:999px;padding:12px 28px;font-size:15px;font-weight:600;cursor:pointer}</style></head><body><main><h1>Bạn đang ngoại tuyến</h1><p>Đất Đen cần mạng để tải trang mới. Hãy kiểm tra kết nối rồi thử lại.</p><button type="button" onclick="location.reload()">Thử tải lại</button></main></body></html>`

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) =>
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  ),
)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        const response = await fetch(event.request)
        if (new URL(event.request.url).origin === self.location.origin) await cache.put(event.request, response.clone())
        return response
      } catch {
        const cached = await cache.match(event.request)
        if (cached) return cached
        if (event.request.mode === 'navigate') {
          return new Response(OFFLINE_HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
        }
        throw new Error('offline')
      }
    }),
  )
})

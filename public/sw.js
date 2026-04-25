/**
 * Schengen Checklist - Service Worker
 * Strategy:
 *  - App shell (JS/CSS/HTML) → Cache First, fallback network
 *  - Google Fonts / Remix Icon CDN → Cache First (stale-while-revalidate)
 *  - readdy.ai images → Cache First with 7-day expiry
 *  - API / Supabase calls → Network First, fallback cache
 *  - Navigation requests → Network First, fallback cached index.html (SPA offline support)
 */

const CACHE_VERSION = 'v1';
const SHELL_CACHE = `shell-${CACHE_VERSION}`;
const FONT_CACHE = `fonts-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;
const API_CACHE = `api-${CACHE_VERSION}`;

const MAX_IMAGE_CACHE = 60;   // max cached images
const MAX_API_CACHE = 30;     // max cached api responses
const IMAGE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// App shell assets to pre-cache on install
const SHELL_ASSETS = [
  '/',
  '/index.html',
];

// ─── Install ──────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS))
  );
  self.skipWaiting();
});

// ─── Activate ─────────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  const validCaches = [SHELL_CACHE, FONT_CACHE, IMAGE_CACHE, API_CACHE];
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => !validCaches.includes(key))
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ─── Fetch ────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other non-http(s) schemes
  if (!url.protocol.startsWith('http')) return;

  // 1. Google Fonts & Remix Icon CDN → Cache First (stale-while-revalidate)
  if (
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com' ||
    url.hostname === 'cdn.jsdelivr.net'
  ) {
    event.respondWith(cacheFirst(request, FONT_CACHE));
    return;
  }

  // 2. readdy.ai images → Cache First with TTL
  if (url.hostname === 'readdy.ai' && url.pathname.startsWith('/api/search-image')) {
    event.respondWith(imageCache(request));
    return;
  }

  // 3. Supabase / API calls → Network First
  if (
    url.hostname.includes('supabase.co') ||
    url.pathname.startsWith('/api/')
  ) {
    event.respondWith(networkFirst(request, API_CACHE));
    return;
  }

  // 4. Same-origin JS/CSS/font assets (hashed filenames) → Cache First
  if (
    url.origin === self.location.origin &&
    (url.pathname.startsWith('/assets/') || url.pathname.match(/\.(js|css|woff2?|ttf|otf)$/))
  ) {
    event.respondWith(cacheFirst(request, SHELL_CACHE));
    return;
  }

  // 5. SPA navigation → Network First, fallback to cached index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match('/index.html').then((cached) => cached || fetch('/'))
      )
    );
    return;
  }

  // 6. Everything else → Network First
  event.respondWith(networkFirst(request, API_CACHE));
});

// ─── Strategies ───────────────────────────────────────────────────────────────

/** Cache First: serve from cache, update cache in background */
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) {
    // Revalidate in background (stale-while-revalidate)
    fetch(request)
      .then((res) => { if (res.ok) cache.put(request, res); })
      .catch(() => {});
    return cached;
  }
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

/** Network First: try network, fallback to cache */
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
      await trimCache(cache, MAX_API_CACHE);
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    return cached || new Response(JSON.stringify({ error: 'Offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

/** Image cache with TTL and size limit */
async function imageCache(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cached = await cache.match(request);

  if (cached) {
    const dateHeader = cached.headers.get('sw-cached-at');
    if (dateHeader) {
      const age = Date.now() - parseInt(dateHeader, 10);
      if (age < IMAGE_TTL_MS) return cached;
    } else {
      return cached;
    }
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      // Clone and inject cache timestamp header
      const headers = new Headers(response.headers);
      headers.set('sw-cached-at', Date.now().toString());
      const timestampedResponse = new Response(await response.clone().blob(), {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
      cache.put(request, timestampedResponse);
      await trimCache(cache, MAX_IMAGE_CACHE);
    }
    return response;
  } catch {
    return cached || new Response('Image unavailable', { status: 503 });
  }
}

/** Trim cache to max entries (FIFO) */
async function trimCache(cache, maxEntries) {
  const keys = await cache.keys();
  if (keys.length > maxEntries) {
    const toDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(toDelete.map((key) => cache.delete(key)));
  }
}

// ─── Message handler (skip waiting on demand) ─────────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

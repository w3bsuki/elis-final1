// Service Worker for ELIS Author Portfolio
const CACHE_NAME = 'elis-author-portfolio-v1';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
  '/images/placeholder.jpg',
  '/images/author/elis-avatar.jpg',
  // Add other critical assets here
];

// Install event - precache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
    }).then((cachesToDelete) => {
      return Promise.all(cachesToDelete.map((cacheToDelete) => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Helper function to determine if a request is for an image
const isImageRequest = (request) => {
  const url = new URL(request.url);
  return url.pathname.match(/\.(jpe?g|png|gif|svg|webp|avif)$/i) ||
         url.pathname.startsWith('/api/optimize-image');
};

// Helper function to determine if a request is for a font
const isFontRequest = (request) => {
  const url = new URL(request.url);
  return url.pathname.match(/\.(woff2?|ttf|otf|eot)$/i);
};

// Helper function to determine if a request is for a style or script
const isAssetRequest = (request) => {
  const url = new URL(request.url);
  return url.pathname.match(/\.(css|js)$/i);
};

// Fetch event - network first with cache fallback for most requests,
// cache first with network fallback for assets
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and cross-origin requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // For API requests, always go to network
  if (event.request.url.includes('/api/') && !event.request.url.includes('/api/optimize-image')) {
    return;
  }

  // For navigation requests, use network first with cache fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache the latest version
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // If there's no cached version, serve the offline page
            return caches.match('/');
          });
        })
    );
    return;
  }

  // For image, font and static asset requests, use cache first with network fallback
  if (isImageRequest(event.request) || isFontRequest(event.request) || isAssetRequest(event.request)) {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          // Return cached response if available
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Otherwise fetch from network
          return fetch(event.request)
            .then((response) => {
              // Cache the new response
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
              return response;
            })
            .catch((error) => {
              console.error('Fetch failed:', error);
              // For image requests, return a placeholder
              if (isImageRequest(event.request)) {
                return caches.match('/images/placeholder.jpg');
              }
              throw error;
            });
        })
    );
    return;
  }

  // For all other requests, try network first, then cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache the latest version
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // If network fails, try to serve from cache
        return caches.match(event.request);
      })
  );
}); 
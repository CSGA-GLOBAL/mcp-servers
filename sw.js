// CSGA Global Service Worker - Advanced Caching Strategy

const CACHE_NAME = 'csga-global-v1.0.0';
const STATIC_CACHE = 'csga-static-v1.0.0';
const DYNAMIC_CACHE = 'csga-dynamic-v1.0.0';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/css/csga-branding.css',
  '/css/mobile-advanced.css',
  '/js/advanced-enhancements.js',
  '/js/constitutional-ai-enhancements.js',
  '/assets/csga-logo-white.svg'
];

// Cache strategies for different types of resources
const CACHE_STRATEGIES = {
  static: [
    '/css/',
    '/js/',
    '/assets/',
    '/fonts/'
  ],
  dynamic: [
    '/api/',
    '/data/'
  ],
  networkFirst: [
    '/',
    '/about',
    '/casa',
    '/mcp',
    '/partners',
    '/contact'
  ]
};

// Install event - cache critical resources
self.addEventListener('install', event => {
  console.log('🔧 Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('📦 Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  console.log('✅ Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }
  
  // Determine cache strategy
  const strategy = getCacheStrategy(url.pathname);
  
  switch (strategy) {
    case 'static':
      event.respondWith(cacheFirst(event.request));
      break;
    case 'dynamic':
      event.respondWith(networkFirst(event.request));
      break;
    case 'networkFirst':
      event.respondWith(networkFirst(event.request));
      break;
    default:
      event.respondWith(staleWhileRevalidate(event.request));
  }
});

// Cache strategies implementation
function getCacheStrategy(pathname) {
  for (const [strategy, patterns] of Object.entries(CACHE_STRATEGIES)) {
    if (patterns.some(pattern => pathname.startsWith(pattern))) {
      return strategy;
    }
  }
  return 'staleWhileRevalidate';
}

function cacheFirst(request) {
  return caches.match(request)
    .then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      
      return fetch(request)
        .then(networkResponse => {
          const responseClone = networkResponse.clone();
          caches.open(STATIC_CACHE)
            .then(cache => {
              cache.put(request, responseClone);
            });
          return networkResponse;
        })
        .catch(() => {
          // Return offline fallback if available
          return caches.match('/offline.html');
        });
    });
}

function networkFirst(request) {
  return fetch(request)
    .then(networkResponse => {
      const responseClone = networkResponse.clone();
      caches.open(DYNAMIC_CACHE)
        .then(cache => {
          cache.put(request, responseClone);
        });
      return networkResponse;
    })
    .catch(() => {
      return caches.match(request)
        .then(cachedResponse => {
          return cachedResponse || caches.match('/offline.html');
        });
    });
}

function staleWhileRevalidate(request) {
  return caches.match(request)
    .then(cachedResponse => {
      const fetchPromise = fetch(request)
        .then(networkResponse => {
          const responseClone = networkResponse.clone();
          caches.open(DYNAMIC_CACHE)
            .then(cache => {
              cache.put(request, responseClone);
            });
          return networkResponse;
        });
      
      return cachedResponse || fetchPromise;
    });
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Background sync triggered');
    event.waitUntil(handleBackgroundSync());
  }
});

function handleBackgroundSync() {
  // Handle any queued offline actions
  return Promise.resolve();
}

// Push notifications support
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/assets/icon-192.png',
    badge: '/assets/badge-72.png',
    vibrate: [100, 50, 100],
    data: data.data || {},
    actions: data.actions || []
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  const url = event.notification.data.url || '/';
  
  event.waitUntil(
    clients.openWindow(url)
  );
});

console.log('🚀 CSGA Service Worker loaded successfully');

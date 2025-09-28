// Service Worker for Marketing Tools Platform
// Enables offline capabilities and caching strategies

const CACHE_NAME = 'marketing-tools-v1';
const API_CACHE_NAME = 'marketing-tools-api-v1';
const STATIC_CACHE_NAME = 'marketing-tools-static-v1';

// Static assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/tools',
  '/manifest.json',
  '/favicon.ico',
  '/logo.svg'
];

// API routes that should be cached
const CACHEABLE_API_ROUTES = [
  '/api/health',
  '/api/settings'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE_NAME && 
              cacheName !== API_CACHE_NAME && 
              cacheName !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - handle requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    // Skip caching for non-cacheable API routes
    if (!CACHEABLE_API_ROUTES.some(route => url.pathname.startsWith(route))) {
      return;
    }
    
    event.respondWith(
      caches.open(API_CACHE_NAME)
        .then((cache) => {
          return fetch(event.request)
            .then((response) => {
              // Clone the response
              const responseToCache = response.clone();
              
              // Cache successful responses
              if (response.status === 200) {
                cache.put(event.request, responseToCache);
              }
              
              return response;
            })
            .catch(() => {
              // Return cached response if network fails
              return cache.match(event.request);
            });
        })
    );
    return;
  }
  
  // Handle static assets
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
    event.respondWith(
      caches.open(STATIC_CACHE_NAME)
        .then((cache) => {
          return cache.match(event.request)
            .then((response) => {
              // Return cached asset or fetch from network
              return response || fetch(event.request)
                .then((networkResponse) => {
                  // Cache the new asset
                  cache.put(event.request, networkResponse.clone());
                  return networkResponse;
                });
            });
        })
    );
    return;
  }
  
  // Handle page requests
  event.respondWith(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.match(event.request)
          .then((response) => {
            // Return cached page or fetch from network
            return response || fetch(event.request)
              .then((networkResponse) => {
                // Cache the new page
                if (networkResponse.status === 200) {
                  cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
              })
              .catch(() => {
                // Return offline page for HTML requests
                if (event.request.headers.get('accept')?.includes('text/html')) {
                  return caches.match('/offline');
                }
                throw new Error('Network request failed');
              });
          });
      })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'sync-forms') {
    event.waitUntil(
      // Handle form synchronization when back online
      syncOfflineForms()
    );
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New notification',
    icon: '/logo.svg',
    badge: '/favicon.ico',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('Marketing Tools', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification click received');
  
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Helper function to sync offline forms
async function syncOfflineForms() {
  // Get offline forms from IndexedDB
  const offlineForms = await getOfflineForms();
  
  // Sync each form
  for (const form of offlineForms) {
    try {
      await fetch(form.url, {
        method: form.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form.data)
      });
      
      // Remove synced form from IndexedDB
      await removeOfflineForm(form.id);
    } catch (error) {
      console.error('Failed to sync form:', error);
    }
  }
}

// Helper functions for IndexedDB operations
function getOfflineForms() {
  return new Promise((resolve) => {
    const request = indexedDB.open('MarketingToolsDB', 1);
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['offlineForms'], 'readonly');
      const store = transaction.objectStore('offlineForms');
      const getAll = store.getAll();
      
      getAll.onsuccess = () => resolve(getAll.result);
    };
  });
}

function removeOfflineForm(id) {
  return new Promise((resolve) => {
    const request = indexedDB.open('MarketingToolsDB', 1);
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['offlineForms'], 'readwrite');
      const store = transaction.objectStore('offlineForms');
      const deleteRequest = store.delete(id);
      
      deleteRequest.onsuccess = () => resolve();
    };
  });
}

console.log('Service Worker: Loaded successfully');
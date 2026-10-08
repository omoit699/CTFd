const CACHE_NAME = 'penguin-protocol-v1.0.6';

self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (e) => {
    // Network-first proxy line to ensure scores and leaderboards stay real-time
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});

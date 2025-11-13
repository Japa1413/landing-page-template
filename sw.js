/**
 * Service Worker - Landing Page Advocacia
 * Cache básico para melhorar performance offline
 * 
 * @version 1.0.0
 */

const CACHE_NAME = 'advocacia-v1';
const RUNTIME_CACHE = 'advocacia-runtime-v1';

// Arquivos para cache estático
const STATIC_CACHE_URLS = [
    '/',
    '/index.html',
    '/assets/css/style.css',
    '/assets/js/main.js',
    '/manifest.json',
    '/assets/images/favicon.ico'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching static assets');
                return cache.addAll(STATIC_CACHE_URLS);
            })
            .then(() => {
                console.log('[Service Worker] Installed successfully');
                return self.skipWaiting(); // Ativa imediatamente
            })
            .catch((error) => {
                console.error('[Service Worker] Installation failed:', error);
            })
    );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        // Remove caches antigos
                        if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                            console.log('[Service Worker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[Service Worker] Activated');
                return self.clients.claim(); // Assume controle imediato
            })
    );
});

// Estratégia: Cache First para assets estáticos, Network First para páginas
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Ignora requisições de outros domínios (CDNs, APIs externas)
    if (url.origin !== location.origin) {
        return;
    }

    // Cache First para assets estáticos
    if (request.destination === 'style' || 
        request.destination === 'script' || 
        request.destination === 'image' ||
        request.url.includes('/assets/')) {
        
        event.respondWith(
            caches.match(request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    
                    return fetch(request)
                        .then((response) => {
                            // Verifica se a resposta é válida
                            if (!response || response.status !== 200 || response.type !== 'basic') {
                                return response;
                            }
                            
                            // Clona a resposta para cache
                            const responseToCache = response.clone();
                            
                            caches.open(RUNTIME_CACHE)
                                .then((cache) => {
                                    cache.put(request, responseToCache);
                                });
                            
                            return response;
                        })
                        .catch(() => {
                            // Fallback offline
                            if (request.destination === 'image') {
                                return new Response('', { status: 404 });
                            }
                        });
                })
        );
    } else {
        // Network First para páginas HTML
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Clona a resposta para cache
                    const responseToCache = response.clone();
                    
                    caches.open(RUNTIME_CACHE)
                        .then((cache) => {
                            cache.put(request, responseToCache);
                        });
                    
                    return response;
                })
                .catch(() => {
                    // Fallback para cache se offline
                    return caches.match(request)
                        .then((cachedResponse) => {
                            if (cachedResponse) {
                                return cachedResponse;
                            }
                            
                            // Fallback para index.html se não encontrar cache
                            if (request.mode === 'navigate') {
                                return caches.match('/index.html');
                            }
                        });
                })
        );
    }
});

// Mensagens do cliente
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.delete(CACHE_NAME);
        caches.delete(RUNTIME_CACHE);
    }
});


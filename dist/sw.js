const CACHE_NAME = "mi-app-v1";
const OFFLINE_URL = "/offline.html";

// Archivos esenciales (app shell)
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/manifest.json",
  OFFLINE_URL
];

// INSTALACIÓN
self.addEventListener("install", event => {
  self.skipWaiting(); // se activa rápido
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
  );
});

// ACTIVACIÓN (limpia versiones antiguas)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim(); // controla la app inmediatamente
});

// FETCH (estrategia inteligente)
self.addEventListener("fetch", event => {
  const request = event.request;

  event.respondWith(
    fetch(request)
      .then(response => {
        // Guarda automáticamente en caché (si es válido)
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, copy);
        });
        return response;
      })
      .catch(() => {
        // Si falla internet → intenta caché
        return caches.match(request)
          .then(response => {
            return response || caches.match(OFFLINE_URL);
          });
      })
  );
});
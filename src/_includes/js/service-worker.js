const CACHE_KEYS = {
  PRE_CACHE: `precache-${VERSION}`,
  RUNTIME: `runtime-${VERSION}`,
};

const EXCLUDED_URLS = [];

// Pre-cache des ressources
const PRE_CACHE_URLS = [
  "/",
  "/assets/fonts/Jost-Regular.woff2",
  "/assets/fonts/Jost-SemiBold.woff2",
  "/assets/styles/main.css",
  "/assets/scripts/index.js",
  "/assets/images/icons/mynaui.symbol.svg",
];

const IGNORED_HOSTS = ["localhost"];

/**
 * Ajout des ressources au cache
 * @param {*} cacheName
 * @param {*} items
 */
const addItemsToCache = (cacheName, items = []) => {
  caches.open(cacheName).then((cache) => cache.addAll(items));
};

// Installation du sw et mise en pre-cache des ressources définies
self.addEventListener("install", () => {
  self.skipWaiting();

  addItemsToCache(CACHE_KEYS.PRE_CACHE, PRE_CACHE_URLS);
});

// Néttoyage de l'ancienne version si changement
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        cacheNames.filter((item) => !Object.values(CACHE_KEYS).includes(item))
      )
      .then((itemsToDelete) =>
        Promise.all(itemsToDelete.map((item) => caches.delete(item)))
      )
      .then(() => self.clients.claim())
  );
});

// Interception des ressources pour leur mise en cache
self.addEventListener("fetch", (event) => {
  const { hostname } = new URL(event.request.url);

  if (IGNORED_HOSTS.indexOf(hostname) >= 0) {
    return;
  }

  if (EXCLUDED_URLS.some((page) => event.request.url.indexOf(page) > -1)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return caches
        .open(CACHE_KEYS.RUNTIME)
        .then((cache) =>
          fetch(event.request).then((response) =>
            cache.put(event.request, response.clone()).then(() => response)
          )
        );
    })
  );
});

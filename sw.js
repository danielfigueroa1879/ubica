/* Service worker: permite instalar la app y abrirla sin conexión (último contenido guardado). */
var VERSION = 'cuadrantes-v1';
var SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/js/cuadrantes-catalogo.js?v=3',
  './assets/js/cuadrantes-geodata.js?v=1',
  './assets/js/calles-db.js?v=1',
  './assets/js/direcciones-osm.js?v=202610222220',
  './assets/icons/icon-192.png',
  './assets/icons/logo.png',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(VERSION).then(function(c){
    // Si algún archivo falla no se bloquea la instalación
    return Promise.all(SHELL.map(function(u){ return c.add(u).catch(function(){}); }));
  }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== VERSION; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  var mismoSitio = url.origin === self.location.origin;
  var leaflet = url.hostname === 'cdnjs.cloudflare.com';
  if (!mismoSitio && !leaflet) return; // mapas, geocodificación, etc. van directo a la red

  // Primero la red (para recibir actualizaciones); si no hay conexión, lo guardado.
  e.respondWith(fetch(req).then(function(res){
    if (res && res.ok) { var copia = res.clone(); caches.open(VERSION).then(function(c){ c.put(req, copia); }); }
    return res;
  }).catch(function(){
    return caches.match(req).then(function(r){
      return r || (req.mode === 'navigate' ? caches.match('./index.html') : undefined);
    });
  }));
});

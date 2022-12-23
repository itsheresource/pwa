// const CACHE_NAME = "version-1";
// const urlsToCache = [
//     'index.html',
//     'offline.html',
//     '/signin',
//     '/static/js/main.chunk.js',
//     '/static/js/0.chunk.js',
//     '/static/js/1.chunk.js',
//     '/static/js/bundle.js',
//     '/static/js/vendors~main.chunk.js',
//     '/manifest.json',
//     '/static/media/itshere-final-horizontal-white.cd5f2464.svg',
//     '/static/media/Gilroy-Regular.86bc2a5a.otf',
//     '/logo192.png',
//     '/favicon.ico',
// ];

// const self = this;

// self.addEventListener('install', (event) => {
//     console.log('trying to install');
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then((cache) => {
//                 console.log('Opened cache: ', cache);
//                 return cache.addAll(urlsToCache);
//             })
//     );
// });

// // Listen for requests
// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request)
//             .then(function (response) {
//                 return response || fetch(event.request);
//             })
//             .catch(err => {
//                 caches.match('offline.html');
//             })
//     );
// });

// // Activate the SW
// self.addEventListener('activate', (event) => {
//     console.log('inside activate event listener');
//     event.waitUntil(
//         caches.keys().then(keys => {
//             return Promise.all(keys
//                 .filter(key => key !== CACHE_NAME)
//                 .map(key => caches.delete(key))
//             );
//         })
//     );
// });

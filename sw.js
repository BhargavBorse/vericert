const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';
const assets = [
    '/',
    'index.html',
    // 'js_files/app.js',
    '/css/login.css',
    '/css/owl-carousel.css',
    '/css/light-box.css',
    '/css/fontAwesome.css',
    '/css/bootstrap-theme.min.css',
    '/css/bootstrap.min.css',
    // 'https://cdn.firebase.com/libs/firebaseui/3.1.1/firebaseui.js',
    // 'https://cdn.firebase.com/libs/firebaseui/3.1.1/firebaseui.css',
    // 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800',
    '/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js',
    '/img/hero-img (1).png',
    '/js/main.js',
    '/js/plugins.js',
    '/js/vendor/bootstrap.min.js',
    '/img/aidan-mcgloin-S3QwbhdA_yc-unsplash.jpg',
    '/img/lewis-keegan-XQaqV5qYcXg-unsplash.jpg',
    '/img/charles-deloye-2RouMSg9Rnw-unsplash.jpg',
    // 'https://www.gstatic.com/firebasejs/7.15.5/firebase.js',
    // 'https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js',
    // 'https://www.gstatic.com/firebasejs/7.15.5/firebase-auth.js',
    // 'https://www.gstatic.com/firebasejs/7.15.5/firebase-firestore.js',
    // 'https://www.gstatic.com/firebasejs/7.15.5/firebase-database.js',
    '/js_files/app.js'
];
// install event
self.addEventListener('install', evt => {
    //console.log('service worker installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
        );
    });
    self.skipWaiting();
    // activate event
    self.addEventListener('activate', evt => {
        //console.log('service worker activated');
        evt.waitUntil(
            caches.keys().then(keys => {
                // console.log(keys);
                return Promise.all(keys
                    .filter(key => key !== staticCacheName)
                    .map(key => caches.delete(key))
                    )
                })
                )
            });
            
            // fetch event
            self.addEventListener('fetch',  evt => {
                console.log('Fetching: ', evt.request.url);
                console.log('fetch event', evt);
                evt.respondWith(
                    caches.match(evt.request).then(cacheRes => {
                        return cacheRes || fetch(evt.request).then(fetchRes => {
                            return caches.open(dynamicCacheName).then(cache => {
                                cache.put(evt.request.url, fetchRes.clone());
                                return fetchRes;
                            });
                        });
                    })
                    );
                });
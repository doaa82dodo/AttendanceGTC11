const CACHE_NAME = 'attendance-app-v1';
const urlsToCache = [
  './',
  './index.html'
];

// تثبيت التطبيق وحفظ الملفات في ذاكرة التخزين المؤقت
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// تشغيل التطبيق من الذاكرة المحلية عند غياب الإنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجد الملف مخزناً محلياً يرجعه، وإلا يجلبه من الشبكة
        return response || fetch(event.request);
      })
  );
});
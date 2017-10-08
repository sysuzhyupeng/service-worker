const CACHE_NAME = "sw-cache";
this.addEventListener("install", function(event) {
    this.skipWaiting();
    console.log("install service worker");
    // 创建和打开一个缓存库
    caches.open(CACHE_NAME);
    // 首页
    event.waitUntil(
        // 请求资源并添加到缓存里面去
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                'resources/img/1.jpg',
                'resources/img/2.jpg',
                'resources/img/3.jpg',
                'resources/less/index.css'
              ]);
        })
    );
});


let util = {
    fetchPut: function (request, callback) {
        return fetch(request).then(response => {
            // 跨域的资源直接return
            if (!response || response.status !== 200 || response.type !== "basic") {
                return response;
            }
            this.putCache(request, response.clone());
            typeof callback === "function" && callback();
            return response;
        });
    },
    putCache: function (request, resource) {
        // 后台不要缓存，preview链接也不要缓存
        if (request.method === "GET" && request.url.indexOf("wp-admin") < 0 
              && request.url.indexOf("preview_id") < 0) {
            caches.open(CACHE_NAME).then(cache => {
                cache.put(request, resource);
            });
        }
    }
};

this.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(response => {
            //缓存命中
            // cache hit
            if (response) {
                return response;
            }
            return util.fetchPut(event.request.clone());
        })
    );
});


service-worker
-

Service Worker是谷歌发起的实现PWA（Progressive Web App）的一个关键角色，PWA是为了解决传统Web APP的缺点：

（1）没有桌面入口

（2）无法离线使用

（3）没有Push推送

Service Worker是在后台启动的一条服务Worker线程，这个Worker的工作是把一些资源缓存起来，然后拦截页面的请求，
先看下缓存库里有没有，如果有的话就从缓存里取，响应200，反之没有的话就走正常的请求。

浏览器支持情况
-
Service Worker目前只有Chrome/Firfox/Opera支持，Safari和Edge也在准备支持Service Worker

使用Service Worker
-
Service Worker的使用套路是先注册一个Worker，然后后台就会启动一条线程，可以在这条线程启动的时候去加载一些资源缓存起来，
然后监听`fetch`事件，在这个事件里拦截页面的请求，先看下缓存里有没有，
如果有直接返回，否则正常加载。或者是一开始不缓存，每个资源请求后再拷贝一份缓存起来，然后下一次请求的时候缓存里就有了。
```javascript
  window.addEventListener("load", function() {
      console.log("Will the service worker register?");
      navigator.serviceWorker.register('/sw-3.js')
      .then(function(reg){
          console.log("Yes, it did.");
      }).catch(function(err) {
          console.log("No it didn't. This happened: ", err)
      }); 
  });
```



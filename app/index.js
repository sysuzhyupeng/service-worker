/*
    虽然又调了一次注册，但并不会重新注册，它发现"sw.js"这个已经注册了，
    就不会再注册了，进而不会触发install和active事件，因为当前Service Worker已经是active状态了。
    当需要更新Service Worker时，如变成"sw-1.js"，或者改变sw.js的文本内容，就会重新注册，
    新的Service Worker会先install然后进入waiting状态，等到重启浏览器时，老的Service Worker就会被替换掉，
    新的Service Worker进入active状态
*/
/*
    其中Cache Storage是指Service Worker和Manifest占用的空间大小和，
    总的空间大小是20GB，几乎是unlimited，所以基本上不用担心缓存会不够用。
*/
window.addEventListener("load", function() {
    console.log("Will the service worker register?");
    navigator.serviceWorker.register('/sw.js')
    .then(function(reg){
        console.log("Yes, it did.");
    }).catch(function(err) {
        console.log("No it didn't. This happened: ", err)
    }); 
});
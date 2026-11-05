'use strict';
const CACHE="english-mobile-20261105", OWN=["english-mobile-"], SHELL=["./", "./index.html", "./manifest.webmanifest"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE&&OWN.some(prefix=>k.startsWith(prefix))).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const req=event.request,u=new URL(req.url);
 if(req.method!=='GET'||u.origin!==self.location.origin||req.headers.has('range')||/\.(?:mp3|mp4|m4a|ogg|wav|aac)$/i.test(u.pathname))return;
 const base=new URL(self.registration.scope),key=req.mode==='navigate'?u.origin+u.pathname:req;
 // Child applications keep their own caches; do not intercept another app's scope.
 
 event.respondWith(fetch(req,{cache:'no-cache'}).then(res=>{
   if(res.ok&&res.type!=='opaque'){
     const copy=res.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(key,copy)));
   }
   return res;
 }).catch(()=>caches.open(CACHE).then(cache=>cache.match(key).then(hit=>hit||(req.mode==='navigate'?cache.match(new URL('./index.html',base).href):null))).then(hit=>hit||new Response('当前离线，首次访问此内容需联网。',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}}))));
});

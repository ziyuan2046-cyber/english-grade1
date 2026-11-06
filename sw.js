'use strict';
const VERSION="20261106-waiyan5",CACHE="study-english-20261106-waiyan5",OWN=["english-mobile-", "study-english-"],SHELL=["./", "./index.html", "./manifest.webmanifest"];
function canonical(url){const u=new URL(url);if(u.pathname.endsWith('/'))u.pathname+='index.html';u.search='';u.hash='';return u.href;}
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 await Promise.all(SHELL.map(async file=>{try{const u=new URL(file,self.registration.scope);u.searchParams.set('release',VERSION);const r=await fetch(u.href,{cache:'no-store'});if(r.ok)await cache.put(canonical(u.href),r);}catch(e){}}));
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE&&OWN.some(p=>k.startsWith(p))).map(k=>caches.delete(k)));await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
 const req=event.request,u=new URL(req.url),scope=new URL(self.registration.scope);
 if(req.method!=='GET'||u.origin!==self.location.origin||!u.pathname.startsWith(scope.pathname)||req.headers.has('range')||/\.(?:mp3|mp4|m4a|ogg|wav|aac)$/i.test(u.pathname))return;
 
 const nav=req.mode==='navigate',fresh=nav||/\.(?:html|webmanifest|json)$/.test(u.pathname),key=fresh?canonical(u.href):req;
 const work=(async()=>{
  const cache=await caches.open(CACHE),hit=await cache.match(key);
  async function network(){const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),hit?6500:45000);try{const res=await fetch(req,{cache:fresh?'no-store':'no-cache',signal:ctl.signal});if(!res.ok)throw new Error('HTTP '+res.status);if(res.type!=='opaque'){try{await cache.put(key,res.clone());}catch(e){}}return res;}finally{clearTimeout(timer);}}
  if(!fresh&&hit){event.waitUntil(network().catch(()=>{}));return hit;}
  try{return await network();}catch(e){
   if(hit)return hit;
   if(nav)return new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>课程暂未加载</title><main style="max-width:500px;margin:60px auto;padding:24px;font:18px/1.9 sans-serif"><h1>课程暂未加载</h1><p>此课程还没有可用的离线缓存，请联网重试。收藏与学习记录未清除。</p><a href="/learning-hub/update.html">打开更新修复</a><p><button onclick="location.reload()" style="padding:12px 22px;font:inherit">重新加载本课程</button></p></main>',{status:503,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
   return new Response('课程资源未缓存，请联网加载。',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
  }
 })();
 event.respondWith(work);event.waitUntil(work.then(()=>{},()=>{}));
});

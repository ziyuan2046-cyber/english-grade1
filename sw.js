'use strict';
const VERSION="20261120-waiyan10",CACHE="study-english-20261120-waiyan10",OWN=["english-mobile-", "study-english-"],SHELL=["./", "./index.html", "./manifest.webmanifest"];
const PRONUNCIATIONS='study-english-pronunciations-v1', MAX_PRONUNCIATIONS=120, pendingAudio=new Map();
async function loadPronunciation(url) {
 const cache=await caches.open(PRONUNCIATIONS).catch(()=>null);
 const cached=await cache?.match(url).catch(()=>null);
 if(cached)return cached;
 if(!pendingAudio.has(url)){
  const request=(async()=>{
   const controller=new AbortController(), timer=setTimeout(()=>controller.abort(),12000);
   try{
    const response=await fetch(url,{signal:controller.signal});
    if(!cache||response.status!==200||!/^audio\//i.test(response.headers.get('content-type')||''))return response;
    try{
     await cache.put(url,response.clone());
     const keys=await cache.keys();
     await Promise.all(keys.slice(0,Math.max(0,keys.length-MAX_PRONUNCIATIONS)).map(key=>cache.delete(key)));
    }catch{/* a storage failure must not block playback */}
    return response;
   }finally{clearTimeout(timer);}
  })().finally(()=>pendingAudio.delete(url));
  pendingAudio.set(url,request);
 }
 return (await pendingAudio.get(url)).clone();
}
async function pronunciation(request){
 const response=await loadPronunciation(request.url), range=request.headers.get('range');
 if(!range||response.status!==200)return response;
 const match=/^bytes=(\d*)-(\d*)$/i.exec(range);
 if(!match||(!match[1]&&!match[2]))return response;
 const body=await response.arrayBuffer(), size=body.byteLength;
 const start=match[1]?Number(match[1]):Math.max(0,size-Number(match[2]));
 const end=match[1]&&match[2]?Math.min(size-1,Number(match[2])):size-1;
 if(start>=size||end<start)return new Response(null,{status:416,headers:{'Content-Range':`bytes */${size}`}});
 return new Response(body.slice(start,end+1),{status:206,headers:{'Content-Type':response.headers.get('content-type')||'audio/mpeg','Content-Length':String(end-start+1),'Content-Range':`bytes ${start}-${end}/${size}`,'Accept-Ranges':'bytes'}});
}
function canonical(url){const u=new URL(url);if(u.pathname.endsWith('/'))u.pathname+='index.html';u.search='';u.hash='';return u.href;}
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 await Promise.all(SHELL.map(async file=>{try{const u=new URL(file,self.registration.scope);u.searchParams.set('release',VERSION);const r=await fetch(u.href,{cache:'no-store'});if(r.ok)await cache.put(canonical(u.href),r);}catch(e){}}));
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE&&k!==PRONUNCIATIONS&&OWN.some(p=>k.startsWith(p))).map(k=>caches.delete(k)));await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
 const req=event.request,u=new URL(req.url),scope=new URL(self.registration.scope);
 if(req.method!=='GET'||u.origin!==self.location.origin||!u.pathname.startsWith(scope.pathname))return;
 if(u.pathname.startsWith(`${scope.pathname}audio/tts/`)&&u.pathname.endsWith('.mp3')){
  event.respondWith(pronunciation(req).catch(()=>new Response(null,{status:503})));return;
 }
 if(req.headers.has('range')||/\.(?:mp3|mp4|m4a|ogg|wav|aac)$/i.test(u.pathname))return;
 
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

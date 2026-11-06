import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
export type PlayerTrack = { src:string; title:string; subtitle?:string; queue?:{src:string;title:string}[]; accent?:string }
type Ctx = {track:PlayerTrack|null;playing:boolean;repeat:boolean;progress:number;duration:number;error:string;index:number;queueLen:number;play:(t:PlayerTrack)=>void;toggle:()=>void;stop:()=>void;seek:(ratio:number)=>void;next:()=>void;prev:()=>void;toggleRepeat:()=>void}
const PlayerCtx=createContext<Ctx|null>(null)
export function PlayerProvider({children}:{children:ReactNode}){
 const audioRef=useRef<HTMLAudioElement|null>(null)
 const trackRef=useRef<PlayerTrack|null>(null),indexRef=useRef(0),repeatRef=useRef(false)
 const [track,setTrack]=useState<PlayerTrack|null>(null),[playing,setPlaying]=useState(false),[repeat,setRepeat]=useState(false),[progress,setProgress]=useState(0),[duration,setDuration]=useState(0),[index,setIndex]=useState(0),[error,setError]=useState('')
 const start=useCallback(()=>{
  const a=audioRef.current;if(!a)return
  window.dispatchEvent(new CustomEvent('study-media-start',{detail:'player'}));setError('')
  a.play().catch((e:DOMException)=>{if(e.name==='AbortError')return;setPlaying(false);setError(e.name==='NotAllowedError'?'浏览器暂停了自动播放，请轻点播放继续。':'音频暂时无法播放，请检查网络后重试。')})
 },[])
 const load=useCallback((t:PlayerTrack,position:number)=>{
  const a=audioRef.current;if(!a)return
  trackRef.current=t;indexRef.current=position;setTrack(t);setIndex(position);setProgress(0);setDuration(0);setError('');a.src=t.src;a.currentTime=0;start()
 },[start])
 useEffect(()=>{
  const a=new Audio();audioRef.current=a;a.preload='metadata'
  const onTime=()=>setProgress(a.currentTime),onMeta=()=>setDuration(Number.isFinite(a.duration)?a.duration:0),onPlay=()=>setPlaying(true),onPause=()=>setPlaying(false)
  const onError=()=>{setPlaying(false);setError('音频加载失败，请联网后轻点播放重试。')}
  const onEnd=()=>{
   if(repeatRef.current){a.currentTime=0;start();return}
   const cur=trackRef.current;const next=indexRef.current+1
   if(cur?.queue&&next<cur.queue.length){load({...cur,src:cur.queue[next].src,title:cur.queue[next].title},next)}else setPlaying(false)
  }
  const onOther=(e:Event)=>{if((e as CustomEvent).detail!=='player')a.pause()}
  a.addEventListener('timeupdate',onTime);a.addEventListener('loadedmetadata',onMeta);a.addEventListener('ended',onEnd);a.addEventListener('play',onPlay);a.addEventListener('pause',onPause);a.addEventListener('error',onError);window.addEventListener('study-media-start',onOther)
  return()=>{a.pause();a.removeEventListener('timeupdate',onTime);a.removeEventListener('loadedmetadata',onMeta);a.removeEventListener('ended',onEnd);a.removeEventListener('play',onPlay);a.removeEventListener('pause',onPause);a.removeEventListener('error',onError);window.removeEventListener('study-media-start',onOther);a.removeAttribute('src');a.load();if(audioRef.current===a)audioRef.current=null}
 },[load,start])
 const play=useCallback((t:PlayerTrack)=>{
  const a=audioRef.current;if(!a)return
  const cur=trackRef.current
  const sameQueue=JSON.stringify(cur?.queue||[])===JSON.stringify(t.queue||[])
  if(cur?.src===t.src&&(sameQueue||!t.queue)){if(a.paused||a.ended){if(a.error){a.load()}if(a.ended)a.currentTime=0;start()}else a.pause();return}
  const position=t.queue?.findIndex(item=>item.src===t.src)??0;load(t,Math.max(0,position))
 },[load,start])
 const toggle=useCallback(()=>{const a=audioRef.current;if(!a||!trackRef.current)return;if(a.paused||a.ended){if(a.error)a.load();if(a.ended)a.currentTime=0;start()}else a.pause()},[start])
 const stop=useCallback(()=>{const a=audioRef.current;if(a){a.pause();a.removeAttribute('src');a.load()}trackRef.current=null;indexRef.current=0;setTrack(null);setPlaying(false);setProgress(0);setDuration(0);setIndex(0);setError('')},[])
 const seek=useCallback((ratio:number)=>{const a=audioRef.current;if(a&&Number.isFinite(a.duration)&&a.duration>0)a.currentTime=Math.max(0,Math.min(1,ratio))*a.duration},[])
 const jump=useCallback((dir:number)=>{const cur=trackRef.current;if(!cur?.queue)return;const next=indexRef.current+dir;if(next<0||next>=cur.queue.length)return;load({...cur,src:cur.queue[next].src,title:cur.queue[next].title},next)},[load])
 const toggleRepeat=useCallback(()=>{repeatRef.current=!repeatRef.current;setRepeat(repeatRef.current)},[])
 const value=useMemo(()=>({track,playing,repeat,progress,duration,error,index,queueLen:track?.queue?.length??0,play,toggle,stop,seek,next:()=>jump(1),prev:()=>jump(-1),toggleRepeat}),[track,playing,repeat,progress,duration,error,index,play,toggle,stop,seek,jump,toggleRepeat])
 return <PlayerCtx.Provider value={value}>{children}</PlayerCtx.Provider>
}
export function usePlayer(){const c=useContext(PlayerCtx);if(!c)throw new Error('usePlayer must be used inside PlayerProvider');return c}

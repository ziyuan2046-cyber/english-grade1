import { BookA, BookText, Home, Headphones } from 'lucide-react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useBook } from '../lib/books'
import { usePlayer } from '../lib/player'
import MiniPlayer from './MiniPlayer'
const NAV=[{to:'/',label:'首页',icon:Home,end:true},{to:'/texts',label:'课文',icon:BookText,end:false},{to:'/wordbook',label:'单词本',icon:BookA,end:false},{to:'/extras',label:'跟读',icon:Headphones,end:false}]
export default function Layout(){
 const {book}=useBook();const {track}=usePlayer();const {pathname}=useLocation()
 useEffect(()=>{window.scrollTo({top:0});document.title=`外研英语 · ${book.label} | 单词 · 课文 · 视频`},[pathname,book.id])
 return <div className={`mx-auto min-h-[100dvh] w-full max-w-md ${track?'pb-[22rem]':'pb-28'}`}>
 {pathname!=='/'&&<div className="flex items-center justify-between gap-2 px-4 pt-4"><Link to={`/?book=${book.id}`} className="inline-flex rounded-full bg-white px-3 py-3 text-xs font-extrabold text-brand-600">← 外研英语</Link><span className="text-xs font-bold text-ink/50">{book.label}</span></div>}
 <Outlet/><MiniPlayer/><nav aria-label="主导航" className="fixed inset-x-0 bottom-0 z-50 border-t border-white/60 bg-white/95 backdrop-blur-xl"><div className="mx-auto flex max-w-md items-stretch">{NAV.map(({to,label,icon:Icon,end})=><NavLink key={to} to={`${to}?book=${book.id}`} end={end} className={({isActive})=>`flex min-h-[68px] flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-extrabold ${isActive?'text-brand-600':'text-ink/50'}`}>{({isActive})=><><span className={`grid h-8 w-12 place-items-center rounded-full ${isActive?'bg-brand-50':''}`}><Icon size={21}/></span>{label}</>}</NavLink>)}</div><div style={{height:'env(safe-area-inset-bottom,0px)'}}/></nav></div>
}

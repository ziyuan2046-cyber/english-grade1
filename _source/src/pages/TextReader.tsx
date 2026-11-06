import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUnit } from '../data/curriculum'
import { usePlayer } from '../lib/player'
import SentenceSections from '../components/SentenceSections'
export default function TextReader() {
 const {unitId,sectionId}=useParams();const unit=getUnit(Number(unitId));const section=unit?.texts.find(t=>t.id===sectionId)
 const [showZh,setShowZh]=useState(true);const {play,repeat,toggleRepeat}=usePlayer()
 if(!unit||!section) return <div className="px-5 py-16 text-center"><h1 className="text-xl font-extrabold">没有找到这篇课文</h1><Link className="mt-4 inline-block rounded-xl bg-brand-500 px-5 py-3 text-white" to="/">回到目录</Link></div>
 const queue=section.tracks.map(t=>({src:t.src,title:`${section.title} · ${t.label}`}))
 return <div className="pb-6"><header className="rounded-b-[32px] px-5 py-6 text-white" style={{background:unit.color}}><Link className="mb-4 inline-flex rounded-full bg-white/20 px-4 py-3 text-sm font-bold" to={`/unit/${unit.id}?tab=texts`}>← 返回 {unit.code}</Link><p className="text-sm font-bold">外研英语 · 一年级上册 · {unit.code}</p><h1 className="mt-2 font-display text-3xl font-extrabold">{section.title}</h1><p className="mt-1 text-sm">{section.subtitle}</p></header><main className="px-4 pt-5"><div className="card mb-4 p-4"><div className="flex flex-wrap gap-2"><button aria-pressed={showZh} className="rounded-xl bg-brand-50 px-3 py-3 text-sm font-bold text-brand-600" onClick={()=>setShowZh(v=>!v)}>{showZh?'隐藏中文':'显示中文'}</button><button aria-pressed={repeat} onClick={toggleRepeat} className="rounded-xl bg-brand-50 px-3 py-3 text-sm font-bold text-brand-600">单曲重复：{repeat?'开':'关'}</button></div><button className="btn-3d mt-3 w-full py-3 text-white" style={{background:unit.color}} onClick={()=>play({src:queue[0].src,title:queue[0].title,subtitle:unit.code,queue})}>顺序播放本课全部音频（{queue.length} 段）</button></div><SentenceSections unit={unit} section={section} showZh={showZh}/><p className="mt-5 text-xs font-semibold leading-6 text-ink/45">保留原有中英课文与分段对应关系。整段播放使用教材音频，句子喇叭优先播放已收录的单句发音。</p></main></div>
}

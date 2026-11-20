import { useBook } from '../lib/books'
import { useCurriculum } from '../lib/useCurriculum'
import Link from '../components/BookLink'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePlayer } from '../lib/player'
import SentenceSections from '../components/SentenceSections'
export default function TextReader() {
 const { book } = useBook()
 const { units } = useCurriculum()
 const getUnit = (id: number) => units.find(unit => unit.id === id)

 const {unitId,sectionId}=useParams();const unit=getUnit(Number(unitId));const section=unit?.texts.find(t=>t.id===sectionId)
 const [showZh,setShowZh]=useState(true);const {play,repeat,toggleRepeat}=usePlayer()
 if(!unit||!section) return <div className="px-5 py-16 text-center"><h1 className="text-xl font-extrabold">没有找到这篇课文</h1><Link className="mt-4 inline-block rounded-xl bg-brand-500 px-5 py-3 text-white" to="/">回到目录</Link></div>
 const queue=section.tracks.map(t=>({src:t.src,title:`${section.title} · ${t.label}`}))
 return <div className="pb-6"><header className="study-unit-heading" style={{background:unit.tint}}><span className="home-extra-icon" aria-hidden="true">{unit.emoji}</span><div className="min-w-0 break-words"><p className="text-sm font-bold text-ink/65">{book.label} · {unit.code}</p><h1 className="font-display text-2xl font-extrabold text-ink">{section.title}</h1><p className="mt-1 text-sm font-semibold text-ink/65">{section.subtitle}</p></div></header><main className="px-4 pt-3"><div className="card mb-4 p-4"><div className="flex flex-wrap gap-2"><button aria-pressed={showZh} className="rounded-xl bg-brand-50 px-3 py-3 text-sm font-bold text-brand-700" onClick={()=>setShowZh(v=>!v)}>{showZh?'隐藏中文':'显示中文'}</button><button aria-pressed={repeat} onClick={toggleRepeat} className="rounded-xl bg-brand-50 px-3 py-3 text-sm font-bold text-brand-700">单曲重复：{repeat?'开':'关'}</button></div><button className="btn-3d mt-3 w-full py-3 text-white" style={{background:'#6256BE'}} onClick={()=>play({src:queue[0].src,title:queue[0].title,subtitle:unit.code,queue})}>顺序播放本课全部音频（{queue.length} 段）</button></div><SentenceSections unit={unit} section={section} showZh={showZh}/></main></div>
}

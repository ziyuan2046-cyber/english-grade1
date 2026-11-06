import PendingLesson from '../components/PendingLesson'
import { useBook, BookPlaceholder } from '../lib/books'
import { useCurriculum } from '../lib/useCurriculum'
import { useState } from 'react'
import { usePlayer } from '../lib/player'
import SentenceSections from '../components/SentenceSections'
export default function Texts(){
 const { book } = useBook()
 const { units: UNITS } = useCurriculum()

 const [unitId,setUnitId]=useState(1);const [showZh,setShowZh]=useState(true);const {play}=usePlayer();const unit=UNITS.find(u=>u.id===unitId) || UNITS[0]
 return <div className="px-4 py-6"><h1 className="font-display text-3xl font-extrabold">课文句子</h1><p className="my-3 text-sm font-semibold text-ink/50">外研英语 · {book.label} · 按单元逐句跟读</p>{!unit ? <BookPlaceholder section="课文" /> : <><div className="mb-4 grid grid-cols-3 gap-2" role="group" aria-label="选择课文单元">{UNITS.map(u=><button className={`rounded-xl py-3 text-sm font-extrabold ${u.id===unit.id?'bg-brand-500 text-white':'bg-white text-ink/60'}`} key={u.id} aria-pressed={u.id===unit.id} onClick={()=>setUnitId(u.id)}>{u.code}</button>)}</div><div className="mb-4 flex items-center justify-between gap-2"><h2 className="font-display text-xl font-extrabold">{unit.title}</h2><button aria-pressed={showZh} className="shrink-0 rounded-xl bg-brand-50 px-3 py-3 text-sm font-bold text-brand-600" onClick={()=>setShowZh(v=>!v)}>{showZh?'隐藏中文':'显示中文'}</button></div>{!unit.texts.length && <PendingLesson />}
{unit.texts.map(section=>{const queue=section.tracks.map(t=>({src:t.src,title:`${unit.code} · ${section.title} · ${t.label}`}));return <section key={section.id} className="mb-6"><div className="mb-3 flex items-center justify-between gap-2"><h2 className="font-display text-lg font-extrabold">{section.title}</h2><button className="shrink-0 rounded-xl px-3 py-3 text-xs font-extrabold text-white" style={{background:unit.color}} onClick={()=>play({src:queue[0].src,title:queue[0].title,subtitle:section.subtitle,queue})}>全部播放（{queue.length} 段）</button></div><SentenceSections unit={unit} section={section} showZh={showZh}/></section>})}</>}</div>
}

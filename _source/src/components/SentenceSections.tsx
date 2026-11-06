import { Pause, Play } from 'lucide-react'
import SpeakButton from './SpeakButton'
import type { Unit, TextSection } from '../data/curriculum'
import { usePlayer } from '../lib/player'
export default function SentenceSections({unit, section, showZh}: {unit:Unit;section:TextSection;showZh:boolean}) {
 const { play, track, playing } = usePlayer()
 return <div className="space-y-3">{section.tracks.map((t,i)=>{
   const lines=section.lines.map((line,index)=>({...line,index})).filter(line=>(line.audio??0)===i)
   const active=track?.src===t.src && playing
   return <section key={t.src} className="card overflow-hidden" aria-label={`${section.title} ${t.label}`}>
    <div className="flex items-center gap-2 p-3" style={{background:unit.tint}}><h3 className="min-w-0 flex-1 text-xs font-extrabold" style={{color:unit.color}}>音频 {i+1} · {t.label}</h3><button className="inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-xs font-bold text-white" data-track="1" style={{background:unit.color}} onClick={()=>play({src:t.src,title:`${section.title} · ${t.label}`,subtitle:unit.code,accent:unit.color})} aria-label={`${active?'暂停':'播放'} ${unit.code} ${section.title} ${t.label}`}>{active?<Pause size={14}/>:<Play size={14}/>} {active?'暂停本段':'播放本段'}</button></div>
    {lines.map(line=><div key={line.index} className="flex items-center gap-3 border-b border-ink/5 p-3.5 last:border-0"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-extrabold" style={{background:unit.tint,color:unit.color}}>{line.index+1}</span><div className="min-w-0 flex-1"><p className="font-display text-[20px] font-bold leading-snug">{line.en}</p>{showZh&&<p className="mt-1 text-sm font-semibold leading-6 text-ink/55">{line.zh}</p>}</div><SpeakButton text={line.en} color={unit.color} tint={unit.tint}/></div>)}
    {!lines.length&&<p className="p-4 text-xs font-semibold leading-6 text-ink/50">本段配套音频已保留，暂无核对后的逐句文字。</p>}
   </section>
 })}</div>
}

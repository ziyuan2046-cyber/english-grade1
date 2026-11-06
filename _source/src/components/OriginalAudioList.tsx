import { Pause, Play } from 'lucide-react'
import { usePlayer } from '../lib/player'
import type { Track } from '../data/curriculum'
export default function OriginalAudioList({ tracks, title, description }: { tracks: Track[]; title?: string; description?: string }) {
  const { play, track, playing } = usePlayer()
  if (!tracks.length) return null
  const queue = tracks.map(t => ({ src: t.src, title: t.label }))
  return <section className="space-y-2" aria-label={title || '配套音频'}>
    {title && <h2 className="pt-4 font-display text-lg font-extrabold">{title}</h2>}
    {description && <p className="pb-2 text-xs font-semibold leading-6 text-ink/50">{description}</p>}
    {tracks.length > 1 && <button className="mb-2 rounded-xl bg-brand-500 px-4 py-3 text-sm font-extrabold text-white" onClick={() => play({ src:queue[0].src,title:queue[0].title,subtitle:title,queue })}>顺序播放全部（{tracks.length} 段）</button>}
    {tracks.map(t => { const active = track?.src === t.src; return <button key={t.src} className={`card flex w-full items-center gap-3 p-4 text-left ${active ? 'ring-2 ring-brand-400' : ''}`} onClick={() => play({ src:t.src,title:t.label,subtitle:title || '教材配套音频' })} aria-label={`${active && playing ? '暂停' : '播放'} ${t.label}`}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">{active && playing ? <Pause size={20} /> : <Play size={20} />}</span><span className="min-w-0 flex-1 break-words text-sm font-extrabold leading-6">{t.label}</span></button> })}
  </section>
}

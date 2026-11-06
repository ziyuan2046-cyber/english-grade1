import { Pause, Play, Repeat, SkipBack, SkipForward, X } from 'lucide-react'
import { usePlayer } from '../lib/player'

const fmt = (s: number) => {
  if (!isFinite(s) || s <= 0) return '0:00'
  const m = Math.floor(s / 60)
  const r = Math.floor(s % 60)
  return `${m}:${String(r).padStart(2, '0')}`
}

export default function MiniPlayer() {
  const { track, playing, toggle, stop, progress, duration, seek, next, prev, index, queueLen, repeat, toggleRepeat, error } = usePlayer()
  if (!track) return null
  const ratio = duration ? progress / duration : 0

  return (
    <div className="fixed inset-x-0 bottom-[calc(72px+env(safe-area-inset-bottom,0px))] z-40 px-3 pb-1">
      <div className="mx-auto max-w-md rounded-3xl border border-white/70 bg-white/95 p-3 shadow-pop backdrop-blur">
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="btn-3d grid h-14 w-14 shrink-0 place-items-center bg-brand-500 text-white shadow-key"
            aria-label={playing ? '暂停' : '播放'}
          >
            {playing ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
          </button>
          <div className="min-w-0 flex-1">
            <div className="truncate text-base font-extrabold">{track.title}</div>
            <div className="truncate text-xs font-bold text-ink/45">
              {track.subtitle ?? '正在播放'}
              {queueLen > 1 && ` · ${index + 1}/${queueLen}`}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[11px] tabular-nums text-ink/40">{fmt(progress)}</span>
              <input
                type="range"
                min={0}
                max={1000}
                value={Math.round(ratio * 1000)}
                onChange={(e) => seek(Number(e.target.value) / 1000)}
                className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-ink/10 accent-brand-500"
                aria-label="播放进度"
              />
              <span className="text-[11px] tabular-nums text-ink/40">{fmt(duration)}</span>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-center gap-1">
            <button
              onClick={toggleRepeat}
              className={`grid h-10 w-10 place-items-center rounded-full transition-colors ${
                repeat ? 'bg-brand-500 text-white' : 'text-ink/45 active:bg-ink/5'
              }`}
              aria-label="重复播放"
              aria-pressed={repeat}
            >
              <Repeat size={19} />
            </button>
            <button
              onClick={stop}
              className="grid h-8 w-8 place-items-center rounded-full text-ink/35 active:bg-ink/5"
              aria-label="关闭播放器"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {error && <p role="alert" className="mt-2 text-xs font-bold text-red-600">{error}</p>}
        {queueLen > 1 && (
          <div className="mt-2.5 flex gap-2">
            <button
              onClick={prev}
              disabled={index === 0}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-ink/[.045] py-2.5 text-sm font-extrabold text-ink/60 active:bg-ink/10 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <SkipBack size={16} /> 上一段
            </button>
            <button
              onClick={next}
              disabled={index >= queueLen - 1}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-ink/[.045] py-2.5 text-sm font-extrabold text-ink/60 active:bg-ink/10 disabled:cursor-not-allowed disabled:opacity-35"
            >
              下一段 <SkipForward size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
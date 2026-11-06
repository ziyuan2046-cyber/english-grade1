import { useBookNavigate } from '../lib/books'
import { useCurriculum } from '../lib/useCurriculum'
import Link from '../components/BookLink'
import {
  ArrowLeft,
  ChevronRight,
  FileText,
  Maximize,
  Minimize,
  Pause,
  Play,
  Repeat,
  SkipForward,
  Video,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePlayer } from '../lib/player'

const fmt = (s: number) => {
  if (!isFinite(s) || s <= 0) return '0:00'
  const m = Math.floor(s / 60)
  const r = Math.floor(s % 60)
  return `${m}:${String(r).padStart(2, '0')}`
}

export default function VideoPlayer() {
 const { units } = useCurriculum()
 const getUnit = (id: number) => units.find(unit => unit.id === id)

  const { unitId, videoId } = useParams()
  const nav = useBookNavigate()
  const unit = getUnit(Number(unitId))
  const video = unit?.videos.find((v) => v.id === videoId)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const shellRef = useRef<HTMLDivElement | null>(null)
  const { stop } = usePlayer()

  useEffect(() => {
    const pauseOther = (e: Event) => { if ((e as CustomEvent).detail !== 'video') videoRef.current?.pause() }
    window.addEventListener('study-media-start', pauseOther)
    return () => window.removeEventListener('study-media-start', pauseOther)
  }, [])
  const [playing, setPlaying] = useState(false)
  const [mediaError, setMediaError] = useState('')
  const [repeat, setRepeat] = useState(false)
  const [autoNext, setAutoNext] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)
  const [cur, setCur] = useState(0)
  const [dur, setDur] = useState(0)

  const idx = unit && video ? unit.videos.findIndex((v) => v.id === video.id) : -1
  const nextVideo = unit && idx >= 0 ? unit.videos[idx + 1] : undefined

  const repeatRef = useRef(repeat)
  const autoNextRef = useRef(autoNext)
  repeatRef.current = repeat
  autoNextRef.current = autoNext

  /* 切换视频时停止其它音频，避免重叠 */
  useEffect(() => {
    stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId])

  /* 进入即自动播放 */
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    setMediaError(''); setCur(0); setDur(0)
    el.load()
    const p = el.play()
    if (p && typeof p.catch === 'function') p.catch(() => setPlaying(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId])

  /* 监听全屏状态变化（含用户按 Esc 退出） */
  useEffect(() => {
    const onFsChange = () => {
      const d = document as Document & { webkitFullscreenElement?: Element }
      setFullscreen(Boolean(document.fullscreenElement || d.webkitFullscreenElement))
    }
    document.addEventListener('fullscreenchange', onFsChange)
    document.addEventListener('webkitfullscreenchange', onFsChange)
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange)
      document.removeEventListener('webkitfullscreenchange', onFsChange)
    }
  }, [])

  const togglePlay = useCallback(() => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) el.play().catch(() => {})
    else el.pause()
  }, [])

  const toggleFullscreen = useCallback(() => {
    type FsShell = HTMLDivElement & { webkitRequestFullscreen?: () => void }
    type FsDoc = Document & { webkitFullscreenElement?: Element; webkitExitFullscreen?: () => void }
    type FsVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void }

    const shell = shellRef.current as FsShell | null
    const el = videoRef.current as FsVideo | null
    const d = document as FsDoc
    const inFs = Boolean(document.fullscreenElement || d.webkitFullscreenElement)

    if (inFs) {
      if (document.exitFullscreen) void document.exitFullscreen()
      else if (d.webkitExitFullscreen) d.webkitExitFullscreen()
      return
    }
    if (shell && typeof shell.requestFullscreen === 'function') {
      const anyDoc = document as Document & { webkitExitFullscreen?: () => void }
      void shell.requestFullscreen().then(() => {
        type Lockable = ScreenOrientation & { lock?: (o: string) => Promise<void> }
        const so = (screen.orientation || {}) as Lockable
        if (typeof so.lock === 'function') so.lock('landscape').catch(() => {})
      }).catch(() => {})
      void anyDoc
      return
    }
    if (shell && typeof shell.webkitRequestFullscreen === 'function') {
      shell.webkitRequestFullscreen()
      return
    }
    // iOS Safari 不支持元素全屏，退化为视频原生全屏
    if (el && typeof el.webkitEnterFullscreen === 'function') el.webkitEnterFullscreen()
  }, [])

  const onEnded = useCallback(() => {
    if (repeatRef.current) {
      const el = videoRef.current
      if (el) {
        el.currentTime = 0
        el.play().catch(() => {})
      }
      return
    }
    if (autoNextRef.current && unit && video) {
      const i = unit.videos.findIndex((v) => v.id === video.id)
      const nv = unit.videos[i + 1]
      if (nv) {
        nav(`/watch/${unit.id}/${nv.id}`)
        return
      }
    }
    setPlaying(false)
  }, [nav, unit, video])

  if (!unit || !video) {
    return (
      <div className="px-6 pt-20 text-center">
        <div className="text-5xl">🎬</div>
        <p className="mt-3 text-lg font-bold text-ink/60">没有找到这个视频</p>
        <Link to="/" className="mt-4 inline-block rounded-2xl bg-brand-500 px-6 py-3 text-lg font-bold text-white">
          回到目录
        </Link>
      </div>
    )
  }

  const seek = (ratio: number) => {
    const el = videoRef.current
    if (!el || !el.duration) return
    el.currentTime = Math.max(0, Math.min(1, ratio)) * el.duration
  }

  return (
    <div className="pb-6">
      <header className="px-4 pb-2 pt-5">
        <Link
          to={`/unit/${unit.id}?tab=videos`}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/75 px-3.5 py-2 text-sm font-bold text-ink/70 shadow-soft backdrop-blur"
        >
          <ArrowLeft size={16} /> 返回 {unit.code} · {unit.titleZh}
        </Link>
      </header>

      <div className="px-3">
        {/* ===== 播放器（可全屏） ===== */}
        <div
          ref={shellRef}
          className="player-shell relative overflow-hidden rounded-[26px] bg-black shadow-pop"
        >
          {mediaError && <p role="alert" className="bg-red-50 p-4 text-sm font-bold text-red-700">{mediaError}</p>}
          <video
            ref={videoRef}
            key={video.id}
            src={video.src}
            poster={video.poster}
            playsInline
            preload="auto"
            controls={false}
            onPlay={() => { window.dispatchEvent(new CustomEvent('study-media-start', { detail: 'video' })); setPlaying(true) }}
            onPause={() => setPlaying(false)}
            onError={() => { setPlaying(false); setMediaError('视频暂时无法加载，请检查网络后重试。') }}
            onEnded={onEnded}
            onTimeUpdate={(e) => setCur((e.target as HTMLVideoElement).currentTime)}
            onLoadedMetadata={(e) => setDur((e.target as HTMLVideoElement).duration || 0)}
            className="mx-auto aspect-video w-full bg-black object-contain"
          />

          {/* 点画面任意处：暂停 / 继续（播放中也可以点） */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 cursor-pointer"
            aria-label={playing ? '暂停视频' : '播放视频'}
          />

          {/* 中央大按钮：暂停时显示，播放时隐藏 */}
          {!playing && (
            <button
              onClick={togglePlay}
              aria-label="播放"
              className="absolute inset-0 grid place-items-center bg-black/25"
            >
              <span className="grid h-20 w-20 place-items-center rounded-full bg-white/95 text-ink shadow-pop">
                <Play size={36} fill="currentColor" className="ml-1" />
              </span>
            </button>
          )}

          {/* 右上角：全屏 / 退出全屏 */}
          {playing && (
            <>
              <button
                onClick={togglePlay}
                aria-label="暂停"
                className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-black/45 text-white backdrop-blur active:scale-90"
              >
                <Pause size={20} fill="currentColor" />
              </button>
              <button
                onClick={toggleFullscreen}
                aria-label={fullscreen ? '退出全屏' : '全屏播放'}
                className="absolute right-3 top-16 grid h-11 w-11 place-items-center rounded-full bg-black/45 text-white backdrop-blur active:scale-90"
              >
                {fullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
            </>
          )}

          {/* 暂停时也提供全屏入口 */}
          {!playing && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleFullscreen()
              }}
              aria-label={fullscreen ? '退出全屏' : '全屏播放'}
              className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-black/45 text-white backdrop-blur active:scale-90"
            >
              {fullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          )}

          {/* 全屏时底部控制条：进度 + 播放/暂停 + 重复 */}
          <div className="fs-controls absolute inset-x-0 bottom-0 z-20">
            <div className="bg-gradient-to-t from-black/55 to-transparent px-4 pb-3 pt-8 transition-opacity hover:opacity-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/95 text-ink active:scale-90"
                  aria-label={playing ? '暂停' : '播放'}
                >
                  {playing ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
                </button>
                <span className="text-xs font-bold tabular-nums text-white/80">{fmt(cur)}</span>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  value={dur ? Math.round((cur / dur) * 1000) : 0}
                  onChange={(e) => seek(Number(e.target.value) / 1000)}
                  className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-white/25 accent-white"
                  aria-label="视频进度"
                />
                <span className="text-xs font-bold tabular-nums text-white/80">{fmt(dur)}</span>
                <button
                  onClick={() => setRepeat((v) => !v)}
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-full active:scale-90 ${
                    repeat ? 'bg-brand-500 text-white' : 'bg-white/20 text-white'
                  }`}
                  aria-label="重复播放"
                >
                  <Repeat size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* 全屏按钮（窗口模式右下角，方便找到） */}
          <button
            onClick={toggleFullscreen}
            aria-label={fullscreen ? '退出全屏' : '全屏播放'}
            className="fs-hide absolute bottom-2.5 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-extrabold text-white backdrop-blur active:scale-95"
          >
            <Maximize size={14} /> 全屏
          </button>

          <span className="fs-hide pointer-events-none absolute bottom-2.5 left-3 rounded-full bg-black/50 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
            第 {video.page} 页
          </span>
        </div>

        {/* 播放控制 */}
        <button
          onClick={toggleFullscreen}
          className="btn-3d mt-3 flex w-full items-center justify-center gap-2 py-4 text-base text-white shadow-key"
          style={{ background: unit.color }}
        >
          <Maximize size={20} /> {fullscreen ? '退出全屏' : '全屏 / 最大化播放'}
        </button>

        <div className="mt-2.5 grid grid-cols-3 gap-2">
          <button
            onClick={() => setRepeat((v) => !v)}
            className={`flex flex-col items-center gap-1 rounded-2xl py-3 text-xs font-extrabold transition-colors ${
              repeat ? 'text-white' : 'bg-white text-ink/55 shadow-soft'
            }`}
            style={repeat ? { background: unit.color } : undefined}
          >
            <Repeat size={20} />
            重复播放
          </button>
          <button
            onClick={() => setAutoNext((v) => !v)}
            className={`flex flex-col items-center gap-1 rounded-2xl py-3 text-xs font-extrabold transition-colors ${
              autoNext ? 'text-white' : 'bg-white text-ink/55 shadow-soft'
            }`}
            style={autoNext ? { background: unit.color } : undefined}
          >
            <SkipForward size={20} />
            自动连播
          </button>
          <button
            onClick={() => {
              const el = videoRef.current
              if (el) {
                el.currentTime = 0
                el.play().catch(() => {})
              }
            }}
            className="flex flex-col items-center gap-1 rounded-2xl bg-white py-3 text-xs font-extrabold text-ink/55 shadow-soft"
          >
            <Play size={20} />
            重新播放
          </button>
        </div>

        {/* 标题 */}
        <div className="mt-4 px-1">
          <div className="flex items-center gap-2.5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl" style={{ background: unit.tint }}>
              {unit.emoji}
            </span>
            <div className="min-w-0">
              <h1 className="font-display text-[25px] font-extrabold leading-tight">{video.title}</h1>
              <p className="text-sm font-bold text-ink/45">{video.subtitle}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link
              to={`/unit/${unit.id}?tab=videos`}
              className="card flex items-center justify-center gap-2 p-3.5 text-base font-extrabold active:scale-[.98]"
            >
              <Video size={19} /> 全部视频
            </Link>
            <Link
              to={`/read/${unit.id}/${unit.texts[0].id}`}
              className="card flex items-center justify-center gap-2 p-3.5 text-base font-extrabold active:scale-[.98]"
            >
              <FileText size={19} /> 读课文
            </Link>
          </div>

          {nextVideo ? (
            <Link
              to={`/watch/${unit.id}/${nextVideo.id}`}
              className="mt-3 flex items-center gap-3 rounded-[24px] p-3 text-white shadow-pop active:scale-[.99]"
              style={{ background: `linear-gradient(135deg, ${unit.color}, #171A2B)` }}
            >
              <img src={nextVideo.poster} alt="" className="h-16 w-24 shrink-0 rounded-2xl object-cover" />
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-bold text-white/70">下一个视频</span>
                <span className="block font-display text-lg font-extrabold leading-tight">{nextVideo.title}</span>
                <span className="block text-xs font-bold text-white/70">第 {nextVideo.page} 页</span>
              </span>
              <ChevronRight size={22} className="shrink-0 text-white/80" />
            </Link>
          ) : (
            <div className="card mt-3 p-4 text-center text-sm font-bold text-ink/45">这是本单元最后一个视频 🎉</div>
          )}

          <div className="card mt-3 p-4">
            <div className="text-sm font-extrabold text-ink/40">同单元更多视频</div>
            <div className="mt-2 space-y-1">
              {unit.videos
                .filter((v) => v.id !== video.id)
                .map((v) => (
                  <Link
                    key={v.id}
                    to={`/watch/${unit.id}/${v.id}`}
                    className="flex items-center gap-2.5 rounded-xl px-2 py-2.5 active:bg-ink/[.04]"
                  >
                    <img src={v.poster} alt="" className="h-10 w-16 shrink-0 rounded-lg object-cover" />
                    <span className="min-w-0 flex-1 text-base font-bold">{v.title}</span>
                    <span className="shrink-0 text-xs font-bold text-ink/40">P{v.page}</span>
                  </Link>
                ))}
            </div>
          </div>

          <p className="mt-4 px-2 text-center text-xs font-semibold text-ink/35">
            视频较大会占用流量，建议在 Wi-Fi 下观看
          </p>
        </div>
      </div>
    </div>
  )
}
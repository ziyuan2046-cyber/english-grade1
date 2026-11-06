import OriginalAudioList from '../components/OriginalAudioList'
import { ORIGINAL_AUDIO } from '../data/originalAudio'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookText, ChevronLeft, Pause, Play, Repeat, RotateCcw, Sparkles, Video, Volume2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import WordAvatar from '../components/WordAvatar'
import { getUnit, type Unit } from '../data/curriculum'
import { usePlayer } from '../lib/player'
import SpeakButton from '../components/SpeakButton'
import { speak } from '../lib/speak'

type Tab = 'words' | 'texts' | 'videos'
const TABS: { id: Tab; label: string; icon: typeof Sparkles }[] = [
  { id: 'words', label: '单词', icon: Sparkles },
  { id: 'texts', label: '课文', icon: BookText },
  { id: 'videos', label: '视频', icon: Video },
]

export default function UnitDetail() {
  const { unitId } = useParams()
  const nav = useNavigate()
  const [params, setParams] = useSearchParams()
  const unit = getUnit(Number(unitId))
  const rawTab = params.get('tab') as Tab | null
  const tab: Tab = rawTab && TABS.some((t) => t.id === rawTab) ? rawTab : 'words'
  const { play, track } = usePlayer()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [tab])

  if (!unit) {
    return (
      <div className="px-6 pt-20 text-center">
        <div className="text-5xl">🤔</div>
        <p className="mt-3 font-bold text-ink/60">找不到这个单元</p>
        <Link to="/" className="mt-4 inline-block rounded-2xl bg-brand-500 px-5 py-2.5 font-bold text-white">
          回到目录
        </Link>
      </div>
    )
  }

  return (
    <div className="pb-4">
      {/* 头部 */}
      <header
        className="relative overflow-hidden rounded-b-[34px] px-5 pb-6 pt-6 text-white"
        style={{ background: `linear-gradient(150deg, ${unit.color}, #171A2B)` }}
      >
        <div className="absolute -right-4 top-2 select-none text-[100px] opacity-25">{unit.emoji}</div>
        <div className="relative">
          <button
            onClick={() => nav('/')}
            className="mb-4 inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold backdrop-blur active:bg-white/30"
          >
            <ArrowLeft size={14} /> 返回目录
          </button>
          <div className="text-xs font-bold uppercase tracking-wider text-white/80">{unit.code}</div>
          <h1 className="font-display text-[28px] font-extrabold leading-tight">{unit.title}</h1>
          <p className="text-sm font-bold text-white/85">{unit.titleZh}</p>
        </div>
      </header>

      {/* 标签 */}
      <div className="sticky top-0 z-30 -mt-3 px-4">
        <div className="flex gap-1 rounded-2xl border border-white/70 bg-white/90 p-1 shadow-soft backdrop-blur">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setParams(id === 'words' ? {} : { tab: id }, { replace: true })}
              className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-extrabold transition-colors ${
                tab === id ? 'text-white' : 'text-ink/45'
              }`}
            >
              {tab === id && (
                <motion.span
                  layoutId="tabpill"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: unit.color }}
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative inline-flex items-center gap-1.5">
                <Icon size={15} /> {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <main className="px-4 pt-5">
        {tab === 'words' && <WordsTab unit={unit} play={play} currentSrc={track?.src} />}
        {tab === 'texts' && <TextsTab unit={unit} />}
        {tab === 'videos' && <VideosTab unit={unit} />}
        {tab !== 'videos' && <OriginalAudioList title={tab === 'words' ? '原始单词音频（含接上页）' : '原始课文与习题音频'} description="新增资料按原文件收录，不替换上方已有学习内容。" tracks={ORIGINAL_AUDIO.filter(t => t.unitId === unit.id && (tab === 'words' ? t.group === 'words' : t.group === 'text'))} />}
      </main>
    </div>
  )
}

function WordsTab({
  unit,
  play,
  currentSrc,
}: {
  unit: Unit
  play: (t: { src: string; title: string; subtitle?: string; accent?: string }) => void
  currentSrc?: string
}) {
  const [flash, setFlash] = useState(false)
  const isPlayingUnit = currentSrc === unit.wordsAudio

  return (
    <div>
      <div className="card mb-4 flex items-center gap-3 p-3">
        <button
          onClick={() =>
            play({ src: unit.wordsAudio, title: `${unit.code} ${unit.title} 单词跟读`, subtitle: '整单元连读', accent: unit.color })
          }
          className="btn-3d grid h-14 w-14 place-items-center text-white shadow-key"
          style={{ background: unit.color }}
          aria-label="播放整单元单词"
        >
          <Play size={24} fill="currentColor" />
        </button>
        <div className="min-w-0 flex-1">
          <div className="font-display text-lg font-extrabold">整单元单词跟读</div>
          <div className="text-xs font-bold text-ink/45">
            {isPlayingUnit ? '正在播放…' : `${unit.words.length} 个单词 · 点单词可单独发音`}
          </div>
        </div>
        <button
          onClick={() => setFlash((v) => !v)}
          className="shrink-0 rounded-xl px-3 py-2 text-xs font-extrabold active:opacity-70"
          style={{ background: unit.tint, color: unit.color }}
        >
          {flash ? '列表' : '卡片'}
        </button>
      </div>

      {flash ? (
        <Flashcards unit={unit} />
      ) : (
        <div className="grid gap-2">
          {unit.words.map((w, i) => (
            <motion.div
              key={w.en}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.24), duration: 0.25 }}
              className="card flex items-center gap-3 p-3.5"
            >
              <WordAvatar emoji={w.emoji} text={w.en} color={unit.color} size={54} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-display text-[23px] font-extrabold leading-tight">{w.en}</span>
                  <span className="text-xs font-semibold text-ink/40">{w.ipa}</span>
                </div>
                <div className="mt-0.5 text-[15px] font-bold text-ink/55">{w.zh}</div>
              </div>
              <SpeakButton text={w.en} color={unit.color} tint={unit.tint} size="lg" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

function Flashcards({ unit }: { unit: Unit }) {
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const w = unit.words[i]
  const go = (d: 1 | -1) => {
    setFlipped(false)
    setI((v) => (v + d + unit.words.length) % unit.words.length)
  }

  return (
    <div>
      <div className="relative h-[400px]">
        <motion.div
          key={i}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          onDragEnd={(_, info) => {
            if (info.offset.x < -70) go(1)
            else if (info.offset.x > 70) go(-1)
          }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.22 }}
          className="absolute inset-0"
        >
          <div
            className="relative h-full w-full overflow-hidden rounded-[32px] border border-white/70 shadow-soft"
            style={{ background: flipped ? `linear-gradient(165deg, #ffffff, ${unit.tint})` : '#ffffff' }}
          >
            {/* 点上半部分翻面 */}
            <button
              onClick={() => setFlipped((v) => !v)}
              className="flex h-full w-full flex-col items-center justify-start px-6 pt-7 text-center"
            >
              <span className="text-sm font-extrabold" style={{ color: unit.color }}>
                {unit.code} · 第 {i + 1}/{unit.words.length}
              </span>
              <span className="animate-floaty mt-3 text-[68px] leading-none">
                {w.emoji ?? <span style={{ color: unit.color }}>{w.en.charAt(0).toUpperCase()}</span>}
              </span>
              <span className="mt-4 font-display text-[46px] font-extrabold leading-none">{w.en}</span>
              <span className="mt-2.5 text-base font-semibold text-ink/40">{w.ipa}</span>
              {flipped ? (
                <span
                  className="animate-popin mt-4 rounded-full px-6 py-2 font-display text-2xl font-extrabold"
                  style={{ background: unit.tint, color: unit.color }}
                >
                  {w.zh}
                </span>
              ) : (
                <span className="mt-4 text-sm font-bold text-ink/25">轻点查看中文</span>
              )}
            </button>

            {/* 底部大播放按钮 */}
            <div className="absolute inset-x-0 bottom-0 p-4">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  speak(w.en)
                }}
                className="btn-3d flex w-full items-center justify-center gap-2 py-4 text-lg text-white shadow-key"
                style={{ background: unit.color }}
              >
                <Volume2 size={22} /> 听发音
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          onClick={() => go(-1)}
          className="btn-3d inline-flex items-center gap-1 bg-white px-5 py-3 text-base font-extrabold text-ink shadow-key"
        >
          <ChevronLeft size={18} /> 上一个
        </button>
        <button
          onClick={() => setFlipped(false)}
          className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink/50 shadow-soft active:scale-90"
        >
          <RotateCcw size={18} />
        </button>
        <button
          onClick={() => go(1)}
          className="btn-3d inline-flex items-center gap-1 px-5 py-3 text-base font-extrabold text-white shadow-key"
          style={{ background: unit.color }}
        >
          下一个 <ArrowRight size={18} />
        </button>
      </div>
      <p className="mt-3 text-center text-xs font-bold text-ink/30">左右滑动切换卡片</p>
    </div>
  )
}

function TextsTab({ unit }: { unit: Unit }) {
  const { play, track, playing, repeat, toggleRepeat } = usePlayer()
  const total = unit.texts.reduce((n, t) => n + t.tracks.length, 0)

  return (
    <div>
      <div className="card mb-4 p-3.5">
        <div className="flex items-center gap-3">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-2xl" style={{ background: unit.tint }}>
            🎧
          </span>
          <div className="min-w-0 flex-1">
            <div className="font-display text-lg font-extrabold">课文跟读音频</div>
            <div className="text-xs font-bold text-ink/45">{total} 段音频 · 可连续播放</div>
          </div>
          <button
            onClick={toggleRepeat}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-2xl px-3.5 py-2.5 text-sm font-extrabold transition-colors ${
              repeat ? 'text-white' : 'text-ink/55'
            }`}
            style={{ background: repeat ? unit.color : unit.tint }}
          >
            <Repeat size={16} /> 重复
          </button>
        </div>
        <button
          onClick={() =>
            play({
              src: unit.texts[0].tracks[0].src,
              title: `${unit.code} 课文跟读`,
              subtitle: '连续播放',
              accent: unit.color,
              queue: unit.texts.flatMap((t) => t.tracks.map((k) => ({ src: k.src, title: `${t.title} · ${k.label}` }))),
            })
          }
          className="btn-3d mt-3 w-full py-3.5 text-base text-white shadow-key"
          style={{ background: unit.color }}
        >
          ▶ 全部播放（{total} 段）
        </button>
      </div>

      <div className="space-y-3">
        {unit.texts.map((t) => (
          <div key={t.id} className="card overflow-hidden">
            <Link to={`/read/${unit.id}/${t.id}`} className="block p-4 active:bg-ink/[.03]">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl" style={{ background: unit.tint }}>
                  {t.kind === 'start' ? '🗣️' : t.kind === 'read' ? '📖' : '🔍'}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-xl font-extrabold">{t.title}</div>
                  <div className="text-xs font-bold text-ink/45">
                    {t.subtitle} · {t.tracks.length} 段音频
                  </div>
                </div>
                <ArrowRight size={20} className="shrink-0 text-ink/25" />
              </div>
              <p
                className="mt-3 rounded-2xl px-3.5 py-2.5 font-display text-[17px] font-bold leading-snug text-ink/70"
                style={{ background: unit.tint }}
              >
                {t.english[0]}
              </p>
            </Link>
            <div className="flex gap-2 border-t border-ink/5 p-3">
              {t.tracks.map((k) => {
                const active = track?.src === k.src
                return (
                  <button
                    key={k.src}
                    onClick={() =>
                      play({ src: k.src, title: `${t.title} · ${k.label}`, subtitle: `${unit.code} 课文音频`, accent: unit.color })
                    }
                    className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 text-sm font-extrabold ${
                      active ? 'text-white' : 'text-ink/70'
                    }`}
                    style={{ background: active ? unit.color : unit.tint }}
                  >
                    {active && playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                    {k.label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VideosTab({ unit }: { unit: Unit }) {
  return (
    <div className="space-y-3">
      {unit.videos.map((v, i) => (
        <motion.div key={v.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.25 }}>
          <Link to={`/watch/${unit.id}/${v.id}`} className="card block overflow-hidden active:scale-[.99]">
            {/* 视频真实首帧（课本页面）作为封面 */}
            <div className="relative w-full overflow-hidden bg-ink/5" style={{ aspectRatio: '16 / 9' }}>
              <img src={v.poster} alt={v.title} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 text-ink shadow-pop">
                  <Play size={24} fill="currentColor" className="ml-0.5" />
                </span>
              </span>
              <span
                className="absolute left-3 top-3 rounded-full px-3 py-1.5 text-xs font-extrabold text-white backdrop-blur"
                style={{ background: 'rgba(0,0,0,.45)' }}
              >
                第 {v.page} 页
              </span>
            </div>
            <div className="flex items-center gap-2 p-4">
              <div className="min-w-0 flex-1">
                <div className="font-display text-[22px] font-extrabold leading-tight">{v.title}</div>
                <div className="mt-0.5 text-sm font-bold text-ink/45">{v.subtitle}</div>
              </div>
              <ArrowRight size={22} className="shrink-0 text-ink/25" />
            </div>
          </Link>
        </motion.div>
      ))}
      <p className="px-2 pt-1 text-center text-xs font-semibold text-ink/35">
        视频较大会占用流量，建议在 Wi-Fi 下观看
      </p>
    </div>
  )
}
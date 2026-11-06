/**
 * 单词 / 句子的发音。
 * 优先播放随包发布的真实发音 MP3（public/audio/tts），
 * 找不到时自动回退到浏览器语音合成，保证任何情况下都有声音。
 *
 * 文件名的生成规则必须与 _tools/gen_tts.py 中的 slug_name() 完全一致。
 */

const djb2 = (s: string) => {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) >>> 0
  return h
}

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const ttsPath = (text: string) => {
  const n = normalize(text)
  if (!n) return ''
  const base = n.slice(0, 60).replace(/-+$/g, '')
  return `./audio/tts/${base}-${djb2(n).toString(36)}.mp3`
}

/* ---------------- 播放状态 ---------------- */

type Listener = (s: { text: string | null; playing: boolean }) => void

let current: HTMLAudioElement | null = null
let currentText: string | null = null
let listeners: Listener[] = []
let speechWarmed = false

const emit = () => {
  const s = { text: currentText, playing: !!current && !current.paused && !current.ended }
  listeners.forEach((l) => l(s))
}

export const subscribe = (l: Listener) => {
  listeners.push(l)
  return () => {
    listeners = listeners.filter((x) => x !== l)
  }
}

export const stopSpeaking = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel()
  if (current) {
    current.pause()
    current = null
  }
  currentText = null
  emit()
}

/* ---------------- 语音合成兜底 ---------------- */

function speakFallback(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false
  const synth = window.speechSynthesis
  if (!speechWarmed) {
    try {
      const t = new SpeechSynthesisUtterance(' ')
      t.volume = 0
      synth.speak(t)
      speechWarmed = true
    } catch {
      /* ignore */
    }
  }
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'en-US'
  u.rate = 0.82
  u.pitch = 1.05
  const voices = synth.getVoices().filter((v) => v.lang.toLowerCase().startsWith('en'))
  const preferred =
    voices.find((v) => /Ana|Samantha|Google US English|Microsoft Aria|Zira|Jenny/i.test(v.name)) ?? voices[0]
  if (preferred) u.voice = preferred
  synth.speak(u)
  return true
}

/* ---------------- 对外接口 ---------------- */

/** 播放某个单词/句子的发音；重复点击同一个会重新从头播放 */
export function speak(text: string) {
  const clean = (text ?? '').trim()
  if (!clean || typeof window === 'undefined') return

  // 若正在播放同一句，先停掉再重播，避免"点了没反应"
  window.dispatchEvent(new CustomEvent('study-media-start', { detail: 'speak' }))
  stopSpeaking()

  const src = ttsPath(clean)
  if (!src) return

  const audio = new Audio(src)
  audio.preload = 'auto'
  current = audio
  currentText = clean

  const fallback = () => {
    // 真实音频缺失（例如旧缓存）时退回到语音合成
    if (current !== audio) return
    current = null
    currentText = clean
    if (!speakFallback(clean)) currentText = null
    emit()
  }

  audio.addEventListener('playing', emit)
  audio.addEventListener('pause', emit)
  audio.addEventListener('ended', () => {
    if (current === audio) {
      current = null
      currentText = null
    }
    emit()
  })
  audio.addEventListener('error', fallback)

  audio.play().catch(fallback)
  emit()
}

export function isSpeaking(text: string) {
  return currentText === text.trim() && !!current && !current.paused && !current.ended
}

export const canSpeak = () =>
  typeof window !== 'undefined' && ('speechSynthesis' in window || typeof Audio !== 'undefined')
if (typeof window !== 'undefined') window.addEventListener('study-media-start', (event) => { if ((event as CustomEvent).detail !== 'speak') stopSpeaking() })

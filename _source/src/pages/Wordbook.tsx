import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from 'react'
import { flushSync } from 'react-dom'
import { ArrowLeft, ArrowRight, Layers, List, Maximize2, Minimize2, RotateCcw, Search, X } from 'lucide-react'
import SpeakButton from '../components/SpeakButton'
import WordAvatar from '../components/WordAvatar'
import { BookPlaceholder, useBook } from '../lib/books'
import { useCurriculum } from '../lib/useCurriculum'
import { prefetchPronunciations } from '../lib/speak'
import { wordPicture } from '../data/wordPictures'

const normalize = (value: string) => value.trim().toLowerCase().replaceAll('’', "'")
type LockableOrientation = ScreenOrientation & { lock?: (mode: 'landscape') => Promise<void> }

export default function Wordbook() {
  const { book } = useBook()
  const { units, partial, extraWordGroups, wordCount: total } = useCurriculum()
  const [chapter, setChapter] = useState(String(units[0]?.id ?? 'all'))
  const [query, setQuery] = useState('')
  const [view, setView] = useState<'cards' | 'list'>('cards')
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const expandButton = useRef<HTMLButtonElement>(null)
  const pointer = useRef<{ x: number; y: number } | null>(null)
  const ignoreClick = useRef(false)

  const groups = [
    ...units.map(unit => ({ id: String(unit.id), title: unit.title, subtitle: unit.titleZh, code: unit.code, words: unit.words, color: unit.color, tint: unit.tint })),
    ...extraWordGroups.map(group => ({ ...group, code: '', color: '#4F46E5', tint: '#EEF1FF' })),
  ]
  const keyword = normalize(query)
  const filtered = groups
    .filter(group => chapter === 'all' || chapter === group.id)
    .map(group => ({ ...group, words: group.words.filter(word => [word.en, word.form ?? '', word.zh, group.title, group.subtitle, group.code].some(text => normalize(text).includes(keyword))) }))
    .filter(group => group.words.length)
  const entries = filtered.flatMap(group => group.words.map(word => ({ word, group })))
  const entry = entries[index]
  const currentWord = entry?.word.en
  const nextWord = entries[index + 1]?.word.en
  const closeExpanded = () => setExpanded(false)
  const openExpanded = () => {
    flushSync(() => setExpanded(true))
    const element = stage.current
    const orientation = window.screen.orientation as LockableOrientation | undefined
    if (!element || !orientation?.lock || !window.matchMedia('(pointer: coarse)').matches) return
    const lock = () => {
      if (!element.isConnected || !dialog.current?.open) return
      void orientation.lock?.('landscape').then(() => {
        if (!element.isConnected || !dialog.current?.open) orientation.unlock?.()
      }).catch(() => { /* the CSS stage still presents a horizontal layout */ })
    }
    if (document.fullscreenEnabled && element.requestFullscreen) {
      void element.requestFullscreen().then(lock).catch(() => { /* keep the dialog open */ })
    } else if (window.matchMedia('(display-mode: standalone)').matches) lock()
  }
  useEffect(() => {
    if (view === 'cards' && currentWord) return prefetchPronunciations(currentWord, nextWord)
  }, [view, currentWord, nextWord])
  useLayoutEffect(() => {
    if (!expanded || !dialog.current || !stage.current) return
    const element = dialog.current
    const surface = stage.current
    const overflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    let enteredNative = false
    const onFullscreenChange = () => {
      if (document.fullscreenElement === surface) enteredNative = true
      else if (enteredNative) setExpanded(false)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange)
      if (enteredNative || window.matchMedia('(display-mode: standalone)').matches) window.screen.orientation?.unlock?.()
      if (document.fullscreenElement === surface) void document.exitFullscreen().catch(() => undefined)
      element.close()
      document.body.style.overflow = overflow
      expandButton.current?.focus({ preventScroll: true })
    }
  }, [expanded])
  const reset = () => { setIndex(0); setFlipped(false) }
  const step = (delta: number) => {
    setIndex(current => Math.max(0, Math.min(entries.length - 1, current + delta)))
    setFlipped(false)
  }
  const swipe = (event: PointerEvent<HTMLButtonElement>) => {
    const start = pointer.current
    pointer.current = null
    if (!start) return
    const dx = event.clientX - start.x, dy = event.clientY - start.y
    const rotated = expanded && window.matchMedia('(orientation: portrait)').matches
    const x = rotated ? dy : dx, y = rotated ? -dx : dy
    if (Math.abs(x) < 45 || Math.abs(x) < 1.4 * Math.abs(y)) return
    ignoreClick.current = true
    step(x < 0 ? 1 : -1)
  }
  const flashcard = (full = false) => {
    if (!entry) return null
    const picture = wordPicture(entry.word.en, entry.word.emoji)
    return <section className={full ? 'word-deck word-deck-landscape' : 'word-deck'} aria-label="单词卡片" onKeyDown={event => {
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (event.key === 'ArrowLeft' && index > 0) { event.preventDefault(); step(-1) }
      if (event.key === 'ArrowRight' && index < entries.length - 1) { event.preventDefault(); step(1) }
    }}>
      <div className="word-progress">
        <span>{entry.group.title}</span>
        <span className="word-deck-tools"><span aria-live="polite">{index + 1} / {entries.length}</span>
          {full ? <button type="button" aria-label="退出全屏" title="退出全屏" className="word-icon-button" onClick={closeExpanded}><Minimize2 size={20} /></button>
            : <button type="button" ref={expandButton} aria-haspopup="dialog" aria-label="全屏单词卡片" title="横屏全屏" className="word-icon-button" onClick={openExpanded}><Maximize2 size={20} /></button>}
        </span>
      </div>
      <button type="button" className="word-flashcard" aria-label={flipped ? '翻回单词正面' : '翻看中文释义'}
        onPointerDown={event => { ignoreClick.current = false; pointer.current = event.pointerType === 'touch' ? { x: event.clientX, y: event.clientY } : null }}
        onPointerUp={swipe} onPointerCancel={() => { pointer.current = null }}
        onClick={event => { if (event.detail > 0 && ignoreClick.current) { ignoreClick.current = false; return }; setFlipped(value => !value) }}>
        <RotateCcw className="word-flip-icon" size={18} aria-hidden="true" />
        <span className="word-emoji" aria-hidden="true">{picture || entry.word.en.charAt(0).toUpperCase()}</span>
        <span className="word-face-copy">
          <span className={flipped ? 'study-word study-word-translation' : 'study-word'}>{flipped ? entry.word.zh : entry.word.en}</span>
          <span className="word-pronunciation">{flipped ? entry.word.en : [entry.word.ipa, entry.word.form].filter(Boolean).join(' · ')}</span>
        </span>
      </button>
      <div className="word-card-actions">
        <button type="button" disabled={index === 0} onClick={() => step(-1)} aria-label="上一个单词" title="上一个单词"><ArrowLeft size={20} /> 上一个</button>
        <SpeakButton key={entry.word.en} text={entry.word.en} size="lg" />
        <button type="button" disabled={index === entries.length - 1} onClick={() => step(1)} aria-label="下一个单词" title="下一个单词">下一个 <ArrowRight size={20} /></button>
      </div>
    </section>
  }

  return <main className="wordbook-view">
    <header className="study-heading">
      <h1>单词本</h1>
      {total > 0 && <span>{partial ? '参考词汇' : '全册词汇'} · {total} 词</span>}
    </header>
    {!book.available ? <BookPlaceholder section="单词" /> : <div className="wordbook-layout">
      <nav className="chapter-nav" aria-label="词汇目录">
        <h2>词汇目录</h2>
        <div className="chapter-options">
          <button type="button" aria-pressed={chapter === 'all'} onClick={() => { setChapter('all'); reset() }}>
            <span className="chapter-code">全册</span><span className="chapter-label">全部词汇</span><span className="chapter-count">{total}</span>
          </button>
          {groups.map(group => <button type="button" key={group.id} aria-pressed={chapter === group.id} onClick={() => { setChapter(group.id); reset() }}>
            <span className="chapter-code">{group.code || '附录'}</span><span className="chapter-label">{group.subtitle}</span><span className="chapter-count">{group.words.length}</span>
          </button>)}
        </div>
      </nav>
      <section className="min-w-0" aria-label="词汇练习">
        <div className="wordbook-tools">
          <label className="word-search">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">搜索当前分类</span>
            <input id="word-search" type="search" value={query} placeholder={chapter === 'all' ? '搜索全册词汇' : '搜索本组单词'} onChange={e => { setQuery(e.target.value); reset() }} />
          </label>
          <div className="word-modes" role="group" aria-label="单词展示方式">
            <button type="button" aria-pressed={view === 'cards'} onClick={() => setView('cards')}><Layers size={16} aria-hidden="true" />卡片</button>
            <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')}><List size={17} aria-hidden="true" />列表</button>
          </div>
        </div>
        {!entry ? <div className="word-empty" role="status"><p>没有找到匹配的词汇</p><button type="button" onClick={() => { setQuery(''); reset() }}><X size={16} />清除搜索</button></div>
          : view === 'cards' ? <>
            {flashcard()}
            <dialog ref={dialog} className="word-fullscreen" aria-label="全屏单词卡片" onCancel={event => { event.preventDefault(); closeExpanded() }} onClose={() => { if (!dialog.current?.open) closeExpanded() }}>
              {expanded && <div ref={stage} className="word-landscape-stage">{flashcard(true)}</div>}
            </dialog>
          </> : <div className="word-list">{filtered.map(group => <section key={group.id}>
            <h2>{group.title} <span>{group.words.length} 词</span></h2>
            <ul>{group.words.map(word => <li key={word.en}>
              <button type="button" className="word-list-entry" onClick={() => {
                setIndex(entries.findIndex(item => item.word === word && item.group.id === group.id)); setFlipped(false); setView('cards')
              }}>
                <WordAvatar emoji={word.emoji} text={word.en} color={group.color} size={44} />
                <span className="word-list-copy"><strong>{word.en}</strong>{(word.ipa || word.form) && <span className="word-list-ipa">{[word.ipa, word.form].filter(Boolean).join(' · ')}</span>}<span className="word-list-meaning">{word.zh}</span></span>
              </button>
              <SpeakButton text={word.en} color={group.color} tint={group.tint} />
            </li>)}</ul>
          </section>)}</div>}
      </section>
    </div>}
  </main>
}

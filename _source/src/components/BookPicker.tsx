import { useEffect, useId, useRef, useState } from 'react'
import { BookOpen, Check, ChevronDown, X } from 'lucide-react'
import { BOOKS, GRADES, useBook } from '../lib/books'

const status = (book: typeof BOOKS[number]) => book.partial ? '词汇参考' : book.available ? '已开放' : '待更新'
export default function BookPicker({ compact = false }: { compact?: boolean }) {
  const { book, select } = useBook()
  const [open, setOpen] = useState(false)
  const [grade, setGrade] = useState(book.grade)
  const [term, setTerm] = useState(book.term)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const id = useId()
  const draft = BOOKS.find(item => item.id === `g${grade}-${term}`)!
  const close = () => { dialogRef.current?.close(); setOpen(false) }
  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    if (!dialog) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (!dialog.open) dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      triggerRef.current?.focus({ preventScroll: true })
    }
  }, [open])
  // Closing is also required when browser history or another navigation changes the book.
  useEffect(() => { setOpen(false) }, [book.id])
  const launch = () => { setGrade(book.grade); setTerm(book.term); setOpen(true) }
  const apply = () => { close(); select(draft.id) }
  return <>
    <button
      ref={triggerRef}
      type="button"
      aria-label={`切换教材，当前${book.label}`}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={`${id}-dialog`}
      data-book-picker={book.id}
      onClick={launch}
      className={compact ? 'book-switch-trigger' : 'book-switch-trigger book-switch-trigger-home'}
    >
      {!compact && <BookOpen size={18} aria-hidden="true" className="shrink-0 text-brand-500" />}
      <span className={compact ? '' : 'flex-1 text-left'}>
        {!compact && <span className="mb-0.5 block text-[10px] font-semibold text-ink/45">当前教材</span>}
        <span className="font-extrabold">{book.label}</span>
      </span>
      {!compact && <span className="text-[11px] font-bold text-ink/45">{status(book)}</span>}
      <ChevronDown size={15} aria-hidden="true" className="shrink-0 text-ink/45" />
    </button>
    <dialog ref={dialogRef} id={`${id}-dialog`} aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`} className="book-switch-dialog" onCancel={() => setOpen(false)} onClose={() => { if (!dialogRef.current?.open) setOpen(false) }} onKeyDown={event => {
      if (event.key !== 'Tab') return
      const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not([disabled])'))
      const first = buttons[0], last = buttons[buttons.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }} onClick={event => { if (event.target === event.currentTarget) close() }}>
      <div className="book-switch-panel">
        <div className="book-switch-grip" aria-hidden="true" />
        <header className="flex items-start justify-between gap-3">
          <div><h2 id={`${id}-title`} className="text-xl font-extrabold text-ink">切换教材</h2><p id={`${id}-description`} className="mt-1.5 text-xs font-semibold text-ink/50">选择年级和学期，确认后留在当前学习栏目</p></div>
          <button type="button" onClick={close} aria-label="关闭教材选择" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink/[.04] text-ink/50"><X size={19} /></button>
        </header>
        <fieldset className="mt-6"><legend className="mb-3 text-xs font-extrabold text-ink/55">年级</legend>
          <div className="grid grid-cols-3 gap-2.5" role="group" aria-label="选择年级">{GRADES.map((label, i) => <button type="button" key={label} onClick={() => setGrade(i + 1)} aria-pressed={grade === i + 1} className={`book-choice ${grade === i + 1 ? 'is-selected' : ''}`}>{label}{grade === i + 1 && <Check size={13} aria-hidden="true" />}</button>)}</div>
        </fieldset>
        <fieldset className="mt-5"><legend className="mb-3 text-xs font-extrabold text-ink/55">学期</legend>
          <div className="grid grid-cols-2 gap-2.5" role="group" aria-label="选择学期">{['up', 'down'].map(value => {
            const item = BOOKS.find(b => b.id === `g${grade}-${value}`)!
            return <button type="button" key={value} aria-pressed={term === value} onClick={() => setTerm(value)} className={`book-choice book-term-choice ${term === value ? 'is-selected' : ''}`}><span>{value === 'up' ? '上册' : '下册'}</span><span className="text-[10px] font-semibold opacity-60">{status(item)}</span></button>
          })}</div>
        </fieldset>
        <p className="mt-4 min-h-6 text-xs font-semibold leading-6 text-ink/50" aria-live="polite">{draft.partial ? '本册提供参考词汇与合成发音，原文原声仍待补充。' : draft.available ? '本册已有课程内容，可以开始学习。' : '本册资料待更新，切换后会显示预留页面。'}</p>
        <button type="button" onClick={apply} className="mt-4 min-h-12 w-full rounded-2xl bg-brand-500 px-4 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-brand-600">{draft.id === book.id ? '完成' : `切换到${draft.label}`}</button>
      </div>
    </dialog>
  </>
}

import { usePlayer } from './player'
import { stopSpeaking } from './speak'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const GRADES = ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级']
export const BOOKS = GRADES.flatMap((grade, i) => ['up', 'down'].map(term => ({
  id: `g${i + 1}-${term}`, grade: i + 1, term, label: `${grade}${term === 'up' ? '上册' : '下册'}`, available: i === 0 && term === 'up',
})))
export type Book = typeof BOOKS[number]
const DEFAULT = BOOKS[0]
const BookContext = createContext<{ book: Book; select: (id: string) => void }>({ book: DEFAULT, select: () => {} })
export function BookProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { stop } = usePlayer()
  const [book, setBook] = useState<Book>(() => {
    const fromUrl = new URLSearchParams(location.search).get('book')
    let saved = ''
    try { saved = localStorage.getItem('waiyan-book') || '' } catch { /* storage may be disabled */ }
    return BOOKS.find(b => b.id === (fromUrl || saved)) || DEFAULT
  })
  const select = (id: string) => { const next = BOOKS.find(b => b.id === id); if (next) setBook(next) }
  useEffect(() => {
    const id = new URLSearchParams(location.search).get('book')
    if (id) select(id)
  }, [location.search])
  useEffect(() => { stop(); stopSpeaking() }, [book.id, stop])
  useEffect(() => { try { localStorage.setItem('waiyan-book', book.id) } catch { /* optional preference only */ } }, [book.id])
  return <BookContext.Provider value={{ book, select }}>{children}</BookContext.Provider>
}
export const useBook = () => useContext(BookContext)
export function BookPlaceholder() {
  const { book } = useBook()
  return <section className="card p-6 text-center" aria-label="教材待更新">
    <div className="mb-3 text-4xl" aria-hidden="true">📚</div>
    <h2 className="font-display text-xl font-extrabold">{book.label} · 待更新</h2>
    <p className="my-3 text-sm font-semibold leading-7 text-ink/55">已为本册预留课程位置。教材内容、单词、课文和音视频将在核对后更新，暂不开放学习。</p>
    <Link className="btn-3d inline-flex bg-brand-500 px-5 py-3 text-sm text-white" to="/?book=g1-up">学习一年级上册</Link>
  </section>
}
export function BookGate({ children }: { children: ReactNode }) {
  const { book } = useBook()
  return book.available ? <>{children}</> : <div className="px-4 py-6"><BookPlaceholder /></div>
}

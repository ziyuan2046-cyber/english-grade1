import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { usePlayer } from './player'
import { stopSpeaking } from './speak'

export const GRADES = ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级']
export const BOOKS = GRADES.flatMap((grade, i) => ['up', 'down'].map(term => ({
  id: `g${i + 1}-${term}`, grade: i + 1, term,
  label: `${grade}${term === 'up' ? '上册' : '下册'}`, available: i === 0 && term === 'up',
})))
export type Book = typeof BOOKS[number]
const DEFAULT = BOOKS[0]
export function withBook(to: string, bookId: string) {
  const [pathAndQuery, hash] = to.split('#')
  const at = pathAndQuery.indexOf('?')
  const pathname = at < 0 ? pathAndQuery : pathAndQuery.slice(0, at)
  const params = new URLSearchParams(at < 0 ? '' : pathAndQuery.slice(at + 1))
  if (!params.has('book')) params.set('book', bookId)
  return `${pathname}?${params}${hash === undefined ? '' : `#${hash}`}`
}
const BookContext = createContext<{ book: Book; select: (id: string) => void }>({ book: DEFAULT, select: () => {} })
const isDetail = (pathname: string) => /^\/(unit|learn|read|watch|book-section)\//.test(pathname)
function sectionFor(pathname: string) {
  if (/^\/read\//.test(pathname)) return '/texts'
  if (/^\/book-section\//.test(pathname)) return '/extras'
  if (/^\/(unit|learn|watch)\//.test(pathname)) return '/'
  return pathname
}
export function BookProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { stop } = usePlayer()
  const [saved, setSaved] = useState(() => {
    try { return localStorage.getItem('waiyan-book') || DEFAULT.id } catch { return DEFAULT.id }
  })
  const requested = new URLSearchParams(location.search).get('book')
  // The URL is authoritative on every render, including back/forward. No delayed state copy.
  // Historical detail links without a book were created for g1-up; never bind them to a saved future book.
  const book = BOOKS.find(b => b.id === (requested ?? (isDetail(location.pathname) ? DEFAULT.id : saved))) || DEFAULT
  useEffect(() => {
    if (requested !== book.id) {
      const params = new URLSearchParams(location.search)
      params.set('book', book.id)
      navigate({ pathname: location.pathname, search: `?${params}`, hash: location.hash }, { replace: true })
    }
  }, [requested, book.id, location.pathname, location.search, location.hash, navigate])
  useEffect(() => {
    setSaved(book.id)
    try { localStorage.setItem('waiyan-book', book.id) } catch { /* optional preference */ }
    stop(); stopSpeaking()
  }, [book.id, stop])
  const select = useCallback((id: string) => {
    if (id === book.id || !BOOKS.some(b => b.id === id)) return
    stop(); stopSpeaking()
    const pathname = sectionFor(location.pathname)
    const params = new URLSearchParams(pathname === location.pathname ? location.search : '')
    params.set('book', id)
    navigate({ pathname, search: `?${params}` })
  }, [book.id, location.pathname, location.search, navigate, stop])
  return <BookContext.Provider value={{ book, select }}>{children}</BookContext.Provider>
}
export const useBook = () => useContext(BookContext)
export function useBookNavigate() {
  const navigate = useNavigate()
  const { book } = useBook()
  return useCallback((to: string) => navigate(withBook(to, book.id)), [navigate, book.id])
}
export function BookPlaceholder({ section = '课程' }: { section?: string }) {
  const { book } = useBook()
  const { pathname } = useLocation()
  const target = isDetail(pathname) ? sectionFor(pathname) : pathname
  return <section className="card p-6 text-center" aria-label="教材待更新" data-book-empty={book.id}>
    <div className="mb-3 text-4xl" aria-hidden="true">📚</div>
    <h2 className="font-display text-xl font-extrabold">{book.label} · {section}待更新</h2>
    <p className="my-3 text-sm font-semibold leading-7 text-ink/55">本册{section}已预留。资料核对完成后开放，不展示其他册次的学习内容。</p>
    <Link className="btn-3d inline-flex bg-brand-500 px-5 py-3 text-sm text-white" to={withBook(target, DEFAULT.id)}>查看一年级上册{section}</Link>
  </section>
}
export function BookGate({ children }: { children: ReactNode }) {
  const { book } = useBook()
  const { pathname } = useLocation()
  const section = pathname.startsWith('/read/') ? '课文' : pathname.startsWith('/watch/') ? '视频' : pathname.startsWith('/book-section/') ? '附录' : '单元'
  return book.available ? <>{children}</> : <div className="px-4 py-6"><h1 className="mb-3 text-2xl font-extrabold">{section}学习</h1><BookPlaceholder section={section} /></div>
}

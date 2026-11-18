import BookStatusNotice from './BookStatusNotice'
import { ArrowLeft, BookA, BookText, Home, Headphones } from 'lucide-react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useBook } from '../lib/books'
import { usePlayer } from '../lib/player'
import MiniPlayer from './MiniPlayer'
import BookPicker from './BookPicker'

const NAV = [
  { to: '/', label: '首页', icon: Home },
  { to: '/texts', label: '课文', icon: BookText },
  { to: '/wordbook', label: '单词本', icon: BookA },
  { to: '/extras', label: '跟读', icon: Headphones },
]
export default function Layout() {
  const { book } = useBook()
  const { track } = usePlayer()
  const { pathname } = useLocation()
  const activePath = pathname.startsWith('/read/') ? '/texts'
    : pathname.startsWith('/book-section/') || pathname === '/resources' ? '/extras'
    : /^\/(unit|learn|watch)\//.test(pathname) ? '/' : pathname
  useEffect(() => {
    window.scrollTo({ top: 0 })
    document.title = `外研英语 · ${book.label} | 单词 · 课文 · 视频`
  }, [pathname, book.id])
  const wide = pathname === '/' || pathname === '/wordbook'
  return <div className={`mx-auto min-h-[100dvh] w-full ${wide ? 'max-w-[70rem]' : 'max-w-[46rem]'} ${track ? 'pb-[22rem]' : 'pb-28'}`}>
    {pathname !== '/' && <>
      <div className="study-topbar flex items-center justify-between gap-2">
        <Link to={`/?book=${book.id}`} className="study-secondary"><ArrowLeft size={18} aria-hidden="true" /> 外研英语</Link>
        <BookPicker compact />
      </div>
      <div className="px-4"><BookStatusNotice /></div>
    </>}
    <div key={book.id} data-book-content={book.id}><Outlet /></div>
    <MiniPlayer />
    <nav aria-label="主导航" className="study-nav fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto flex max-w-[46rem] items-stretch">
        {NAV.map(({ to, label, icon: Icon }) => {
          const active = activePath === to
          return <Link key={to} to={`${to}?book=${book.id}`} aria-current={active ? 'page' : undefined} className="study-nav-link">
            <span><Icon size={22} aria-hidden="true" /></span>{label}
          </Link>
        })}
      </div>
      <div style={{ height: 'env(safe-area-inset-bottom,0px)' }} />
    </nav>
  </div>
}

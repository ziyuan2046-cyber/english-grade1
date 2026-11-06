import { ArrowRight, BookOpen, Headphones, Home as HomeIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { UNITS } from '../data/curriculum'
import { BOOKS, GRADES, BookPlaceholder, useBook } from '../lib/books'
import { usePlayer } from '../lib/player'
import { stopSpeaking } from '../lib/speak'

const PAGES = [1, 7, 13, 19, 25, 31]
export const BOOK_SECTIONS = [
  { id: 'wrap-up', title: 'Wrap up', zh: '综合复习', page: 37, emoji: '🌟', available: false },
  { id: 'beijing', title: 'This is Beijing!', zh: '这是北京！', page: 41, emoji: '🏯', available: true },
  { id: 'appendices', title: 'Appendices', zh: '附录', page: 49, emoji: '📚', available: true },
]
export default function Home() {
  const { book, select } = useBook()
  const { stop } = usePlayer()
  const nav = useNavigate()
  const choose = (id: string) => { stop(); stopSpeaking(); select(id); nav(`/?book=${id}`) }
  return <div className="px-4 pt-4">
    <a href="https://ziyuan2046-cyber.github.io/learning-hub/" className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-ink/60 shadow-soft"><HomeIcon size={16} /> 返回学习空间</a>
    <header className="relative overflow-hidden rounded-[32px] bg-brand-500 p-6 text-white shadow-pop" style={{ background: 'linear-gradient(135deg,#6366F1,#5B4BE0 65%,#7C5CFF)' }}>
      <div className="absolute -right-1 -top-3 text-[100px] opacity-15" aria-hidden="true">📖</div>
      <span className="chip bg-white/20 text-white">外研社 · 新交际英语</span>
      <h1 className="mt-3 font-display text-[32px] font-extrabold">外研英语</h1>
      <p className="mt-1 font-bold text-white/90">{book.label}</p>
      <p className="mt-2 text-xs font-semibold text-white/80">按课本目录学习 · 单词 / 课文 / 视频 / 跟读</p>
    </header>
    <section className="card my-5 p-4" aria-labelledby="book-picker-title">
      <div className="mb-3 flex items-center justify-between gap-2"><h2 id="book-picker-title" className="font-extrabold">选择教材</h2><span className="text-xs font-bold text-ink/50">1—6 年级 · 上下册</span></div>
      <div className="grid grid-cols-3 gap-2" role="group" aria-label="选择年级">
        {GRADES.map((grade, i) => <button key={grade} aria-pressed={book.grade === i + 1} className={`rounded-xl px-1 py-3 text-sm font-bold ${book.grade === i + 1 ? 'bg-brand-500 text-white' : 'bg-brand-50 text-ink/65'}`} onClick={() => choose(`g${i + 1}-${book.term}`)}>{grade}</button>)}
      </div>
      <div className="mt-3 flex gap-2" role="group" aria-label="选择学期">{['up','down'].map(term => {
        const b = BOOKS.find(b => b.id === `g${book.grade}-${term}`)!
        return <button key={term} aria-pressed={book.term === term} onClick={() => choose(b.id)} className={`flex-1 rounded-xl px-2 py-3 text-sm font-extrabold ${book.term === term ? 'bg-brand-500 text-white' : 'bg-ink/5 text-ink/60'}`}>{term === 'up' ? '上册' : '下册'}<span className="ml-2 text-[10px] opacity-80">{b.available ? '已开放' : '待更新'}</span></button>
      })}</div>
    </section>
    {!book.available ? <BookPlaceholder /> : <>
      <div className="mb-4 flex gap-3"><Link to="/unit/1" className="btn-3d flex flex-1 items-center justify-center gap-2 bg-brand-500 py-3 text-sm text-white"><BookOpen size={17} /> 开始学习</Link><Link to="/wordbook" className="btn-3d flex flex-1 items-center justify-center gap-2 bg-white py-3 text-sm text-brand-600">单词本 · 58 词</Link></div>
      <div className="mb-3 flex items-baseline justify-between px-1"><h2 className="text-lg font-extrabold">一年级上册 · 课本目录</h2><span className="text-[11px] font-bold text-ink/45">按教材页码排列</span></div>
      <ol className="space-y-3" aria-label="课本目录">
        {UNITS.map((u, i) => <li key={u.id}><Link to={`/unit/${u.id}`} className="card flex items-center gap-3 p-4 active:scale-[.99]" data-contents-title={u.title}>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-xl font-extrabold" style={{ background:u.tint,color:u.color }}>{u.id}</span>
          <div className="min-w-0 flex-1"><span className="text-[11px] font-extrabold" style={{ color:u.color }}>{u.code}</span><h3 className="font-display text-xl font-extrabold leading-tight">{u.title}</h3><p className="mt-1 text-xs font-bold text-ink/50">{u.titleZh} · {u.words.length} 词 · {u.videos.length} 视频</p></div>
          <div className="shrink-0 text-right"><span className="text-sm font-extrabold text-ink/50">P{PAGES[i]}</span><ArrowRight className="ml-auto mt-1 text-ink/30" size={16} /></div>
        </Link></li>)}
        {BOOK_SECTIONS.map(s => <li key={s.id}><Link to={`/book-section/${s.id}`} data-contents-title={s.title} className="card flex items-center gap-3 p-4 active:scale-[.99]"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-2xl">{s.emoji}</span><div className="min-w-0 flex-1"><h3 className="font-display text-xl font-extrabold">{s.title}</h3><p className="text-xs font-bold text-ink/50">{s.zh} · {s.available ? '配套音频' : '内容待补充'}</p></div><span className="shrink-0 text-sm font-extrabold text-ink/50">P{s.page}</span><ArrowRight size={16} className="text-ink/30" /></Link></li>)}
      </ol>
      <Link to="/resources" className="card mt-4 flex items-center gap-3 p-4 text-sm font-bold"><Headphones size={22} className="text-brand-500" /><span className="flex-1">原始配套资料 · 36 段音频<span className="mt-1 block text-xs font-semibold text-ink/50">含习题、单词接上页、趣味阅读与附加活动</span></span><ArrowRight size={18} /></Link>
    </>}
    <p className="my-6 px-2 text-center text-[11px] font-semibold leading-6 text-ink/45">外研英语 · {book.label}<br />已有学习内容保留，其余教材核对后陆续更新</p>
  </div>
}

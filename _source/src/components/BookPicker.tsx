import { BOOKS, GRADES, useBook } from '../lib/books'
export default function BookPicker({ compact = false }: { compact?: boolean }) {
  const { book, select } = useBook()
  if (compact) return <section className="card mx-4 mt-3 p-3" aria-label="切换教材" data-book-picker={book.id}>
    <div className="mb-2 flex items-center justify-between gap-2"><span className="text-xs font-extrabold text-ink/65">当前教材</span><span className="text-[11px] font-bold text-ink/45">{book.partial ? '词汇参考 · 原文原声待补' : book.available ? '已开放' : '资料待更新'}</span></div>
    <div className="grid grid-cols-2 gap-2">
      <label className="min-w-0"><span className="sr-only">年级</span><select aria-label="选择年级" className="w-full min-w-0 rounded-xl border border-brand-500/20 bg-white px-3 py-3 text-sm font-bold text-ink outline-none" value={book.grade} onChange={e => select(`g${e.target.value}-${book.term}`)}>{GRADES.map((g, i) => <option key={g} value={i + 1}>{g}</option>)}</select></label>
      <label className="min-w-0"><span className="sr-only">上下册</span><select aria-label="选择上下册" className="w-full min-w-0 rounded-xl border border-brand-500/20 bg-white px-3 py-3 text-sm font-bold text-ink outline-none" value={book.term} onChange={e => select(`g${book.grade}-${e.target.value}`)}><option value="up">上册</option><option value="down">下册</option></select></label>
    </div>
  </section>
  return <section className="card my-5 p-4" aria-labelledby="book-picker-title" data-book-picker={book.id}>
    <div className="mb-3 flex items-center justify-between gap-2"><h2 id="book-picker-title" className="font-extrabold">选择教材</h2><span className="text-xs font-bold text-ink/50">1—6 年级 · 上下册</span></div>
    <div className="grid grid-cols-3 gap-2" role="group" aria-label="选择年级">{GRADES.map((grade, i) => <button key={grade} aria-pressed={book.grade === i + 1} className={`rounded-xl px-1 py-3 text-sm font-bold ${book.grade === i + 1 ? 'bg-brand-500 text-white' : 'bg-brand-50 text-ink/65'}`} onClick={() => select(`g${i + 1}-${book.term}`)}>{grade}</button>)}</div>
    <div className="mt-3 flex gap-2" role="group" aria-label="选择学期">{['up', 'down'].map(term => {
      const b = BOOKS.find(b => b.id === `g${book.grade}-${term}`)!
      return <button key={term} aria-pressed={book.term === term} onClick={() => select(b.id)} className={`flex-1 rounded-xl px-2 py-3 text-sm font-extrabold ${book.term === term ? 'bg-brand-500 text-white' : 'bg-ink/5 text-ink/60'}`}>{term === 'up' ? '上册' : '下册'}<span className="ml-2 text-[10px] opacity-80">{b.partial ? '词汇参考' : b.available ? '已开放' : '待更新'}</span></button>
    })}</div>
  </section>
}

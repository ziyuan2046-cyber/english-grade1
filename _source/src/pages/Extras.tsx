import SupplementalResources from '../components/SupplementalResources'
import { useBook, BookPlaceholder } from '../lib/books'
import { useCurriculum } from '../lib/useCurriculum'
import Link from '../components/BookLink'

import OriginalAudioList from '../components/OriginalAudioList'
export default function Extras() {
 const { book } = useBook()
 const { extras: EXTRA_TRACKS, partial } = useCurriculum()

 if (partial) return <div className="px-4 py-6"><h1 className="font-display text-3xl font-extrabold">跟读乐园</h1><p className="my-3 text-sm font-semibold text-ink/50">外研英语 · {book.label} · 参考词汇辅助发音</p><SupplementalResources /><Link to="/resources" className="mt-5 inline-flex rounded-xl bg-brand-50 px-4 py-3 text-sm font-extrabold text-brand-600">查看来源及待补内容 →</Link></div>

 return <div className="px-4 py-6"><h1 className="font-display text-3xl font-extrabold">跟读乐园</h1><p className="my-3 text-sm font-semibold text-ink/50">外研英语 · {book.label} · 附录与趣味阅读</p>{!book.available ? <BookPlaceholder section="跟读" /> : <><OriginalAudioList tracks={EXTRA_TRACKS} /><Link to="/resources" className="mt-5 inline-flex rounded-xl bg-brand-50 px-4 py-3 text-sm font-extrabold text-brand-600">查看新增原始音频与习题 →</Link></>}</div>
}

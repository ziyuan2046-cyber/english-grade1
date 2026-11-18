import { useCurriculum } from '../lib/useCurriculum'
import BookLink from './BookLink'
export default function BookStatusNotice() {
 const { partial } = useCurriculum()
 if (!partial) return null
 return <aside role="note" className="my-3 flex flex-wrap items-baseline gap-x-3 text-xs font-semibold leading-6 text-ink/70" data-partial-notice>
  <span>词汇参考 · 合成发音，非教材原声</span>
  <BookLink to="/resources" className="inline-flex py-1 text-brand-700 underline underline-offset-2">资料来源</BookLink>
 </aside>
}

import { useCurriculum } from '../lib/useCurriculum'
import BookLink from './BookLink'
export default function BookStatusNotice() {
 const { partial } = useCurriculum()
 if (!partial) return null
 return <aside role="note" className="my-4 rounded-2xl border border-amber-300/60 bg-amber-50 p-4 text-xs font-semibold leading-6 text-amber-900" data-partial-notice>
  <p className="font-extrabold">补充中：目录与词汇参考，待纸质教材复核</p>
  <p>词汇音频为辅助合成发音，不是教材原声。完整课文、教材配音及视频尚未收录。</p>
  <BookLink to="/resources" className="inline-flex py-1 font-extrabold underline underline-offset-2">查看资料来源与待补内容 →</BookLink>
 </aside>
}

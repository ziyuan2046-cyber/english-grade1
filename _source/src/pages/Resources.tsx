import SupplementalResources from '../components/SupplementalResources'
import { useBook, BookPlaceholder } from '../lib/books'
import { useCurriculum } from '../lib/useCurriculum'
import Link from '../components/BookLink'

import OriginalAudioList from '../components/OriginalAudioList'
export default function Resources() {
 const { book } = useBook()
 const { units: UNITS, originals: ORIGINAL_AUDIO, partial } = useCurriculum()

 if (partial) return <div className="px-4 py-6"><Link to="/" className="inline-flex rounded-full bg-white px-4 py-3 text-sm font-bold text-brand-600">← 返回本册目录</Link><h1 className="mt-5 text-2xl font-extrabold">辅助音频与参考来源</h1><p className="mt-2 text-sm font-semibold text-ink/50">外研英语 · {book.label}</p><SupplementalResources showSources /></div>

 return <div className="px-4 py-6"><Link to="/" className="inline-flex rounded-full bg-white px-4 py-3 text-sm font-bold text-brand-600">← 返回课本目录</Link><h1 className="mt-5 text-2xl font-extrabold">原始配套资料</h1>{!book.available ? <BookPlaceholder section="配套资料" /> : <><p className="mt-2 text-sm font-semibold leading-7 text-ink/55">已逐文件核对并收录你提供文件夹中的全部 {ORIGINAL_AUDIO.length} 段音频。原文件原样保留，不替换原有课文、单词与视频。</p>
 {UNITS.map(u=><OriginalAudioList key={u.id} title={`${u.code} · ${u.title}`} tracks={ORIGINAL_AUDIO.filter(t=>t.unitId===u.id && t.group!=='supplementary')} />)}
 <OriginalAudioList title="Supplementary activities · 附加习题" tracks={ORIGINAL_AUDIO.filter(t=>t.group==='supplementary')} />
 <OriginalAudioList title="Reading for pleasure · 趣味阅读" tracks={ORIGINAL_AUDIO.filter(t=>t.group==='reading')} />
 </>}</div>
}

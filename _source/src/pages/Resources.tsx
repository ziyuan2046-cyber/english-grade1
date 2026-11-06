import { Link } from 'react-router-dom'
import OriginalAudioList from '../components/OriginalAudioList'
import { ORIGINAL_AUDIO } from '../data/originalAudio'
import { UNITS } from '../data/curriculum'
export default function Resources() {
 return <div className="px-4 py-6"><Link to="/" className="inline-flex rounded-full bg-white px-4 py-3 text-sm font-bold text-brand-600">← 返回课本目录</Link><h1 className="mt-5 text-2xl font-extrabold">原始配套资料</h1><p className="mt-2 text-sm font-semibold leading-7 text-ink/55">已逐文件核对并收录你提供文件夹中的全部 36 段音频。原文件原样保留，不替换原有课文、单词与视频。</p>
 {UNITS.map(u=><OriginalAudioList key={u.id} title={`${u.code} · ${u.title}`} tracks={ORIGINAL_AUDIO.filter(t=>t.unitId===u.id && t.group!=='supplementary')} />)}
 <OriginalAudioList title="Supplementary activities · 附加习题" tracks={ORIGINAL_AUDIO.filter(t=>t.group==='supplementary')} />
 <OriginalAudioList title="Reading for pleasure · 趣味阅读" tracks={ORIGINAL_AUDIO.filter(t=>t.group==='reading')} />
 </div>
}

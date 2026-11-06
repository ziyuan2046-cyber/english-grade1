import { Link, useParams } from 'react-router-dom'
import { EXTRA_TRACKS } from '../data/curriculum'
import { ORIGINAL_AUDIO } from '../data/originalAudio'
import OriginalAudioList from '../components/OriginalAudioList'
import { BOOK_SECTIONS } from './Home'
export default function BookSection() {
  const { sectionId } = useParams()
  const section = BOOK_SECTIONS.find(s => s.id === sectionId)
  return <div className="px-4 py-6"><Link to="/?book=g1-up" className="mb-4 inline-flex rounded-full bg-white px-4 py-3 text-sm font-bold text-brand-600">← 返回课本目录</Link>
    {!section ? <h1 className="font-extrabold">未找到此目录，请返回选择</h1> : <>
      <header className="mb-5"><p className="text-xs font-bold text-brand-600">外研英语 · 一年级上册 · P{section.page}</p><h1 className="mt-2 font-display text-3xl font-extrabold">{section.title}</h1><p className="mt-1 text-sm text-ink/55">{section.zh}</p></header>
      {sectionId === 'wrap-up' ? <div className="card p-6"><h2 className="text-lg font-extrabold">综合复习 · 内容待补充</h2><p className="mt-3 text-sm font-semibold leading-7 text-ink/55">已按教材目录保留第 37 页的位置。现有资料未提供可确认对应的课文或音频，暂不填入其他单元内容。</p><Link to="/texts" className="mt-4 inline-flex rounded-xl bg-brand-50 px-4 py-3 text-sm font-extrabold text-brand-600">先复习已开放的六个单元 →</Link></div> : sectionId === 'beijing' ? <><OriginalAudioList title="现有教材配套音频" tracks={EXTRA_TRACKS.slice(0,1)} /><p className="mt-5 text-sm leading-7 text-ink/50">保留原有完整音频；课文文字与其他素材待核对后补充。</p></> : <>
        <OriginalAudioList title="现有附录与趣味阅读" description="保留原有附录资源。以下为配套音频分类，不代表图片目录之外新增了课本章节。" tracks={EXTRA_TRACKS.slice(1)} />
        <OriginalAudioList title="Supplementary activities · 原始习题音频" description="按文件标注的教材页码排列，未提供的页面保持预留。" tracks={ORIGINAL_AUDIO.filter(t=>t.group==='supplementary')} />
        <OriginalAudioList title="Reading for pleasure · 原始趣味阅读" tracks={ORIGINAL_AUDIO.filter(t=>t.group==='reading')} />
      </>}
    </>}
  </div>
}

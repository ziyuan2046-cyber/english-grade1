import { useCurriculum } from '../lib/useCurriculum'
import OriginalAudioList from './OriginalAudioList'
export default function SupplementalResources({ showSources = false }: { showSources?: boolean }) {
 const { auxiliary, sources, wordCount } = useCurriculum()
 return <>
  <p className="my-3 text-sm font-semibold leading-7 text-ink/60">已提供 {wordCount} 条参考词汇和按 6 个单元分组的辅助合成发音。不是出版社原声，也不是完整课文录音。</p>
  <OriginalAudioList title="词汇辅助合成发音（非教材原声）" description="用于预习单词读音。参考词汇的分组与释义还需和你使用的纸质教材复核。" tracks={auxiliary} />
  {showSources && <section className="card mt-5 p-4" aria-labelledby="source-heading">
   <h2 id="source-heading" className="text-lg font-extrabold">资料来源与缺失说明</h2>
   <p className="my-3 text-sm font-semibold leading-7 text-ink/55">目录与词汇来自下列第三方参考页；未复制整篇课文、歌词、插图或第三方配音。官方配套资料能否获取，以教材随书说明及出版社答复为准。</p>
   <ul className="space-y-2">{sources.map(source => <li key={source.url}><a target="_blank" rel="noopener noreferrer" href={source.url} className="inline-flex py-2 text-sm font-bold text-brand-600 underline underline-offset-2">{source.label} ↗</a></li>)}</ul>
   <p className="mt-4 text-sm font-semibold leading-7 text-ink/55">待补：经纸质教材核对的完整课文、教材原声音频、页码和视频。需要有权使用的教材与配套文件后才能继续准确补充。</p>
  </section>}
 </>
}

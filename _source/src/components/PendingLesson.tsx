import BookLink from './BookLink'
export default function PendingLesson({ kind = '课文和教材原声' }: { kind?: string }) {
 return <section className="card my-4 p-5" aria-label={`${kind}待补充`}>
  <h2 className="text-lg font-extrabold">{kind}待补充</h2>
  <p className="mt-2 text-sm font-semibold leading-7 text-ink/55">尚未收录可核对的本册资料，不使用其他版本的内容代替，也不把辅助合成音频当作教材配音。</p>
  <BookLink to="/wordbook" className="mt-3 inline-flex rounded-xl bg-brand-50 px-4 py-3 text-sm font-extrabold text-brand-600">先学习本册参考词汇</BookLink>
 </section>
}

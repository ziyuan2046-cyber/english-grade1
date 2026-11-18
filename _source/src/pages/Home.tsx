import { ArrowRight, BookOpen, CornerUpLeft, Headphones } from 'lucide-react'
import BookStatusNotice from '../components/BookStatusNotice'
import BookLink from '../components/BookLink'
import BookPicker from '../components/BookPicker'
import { BookPlaceholder, useBook } from '../lib/books'
import { useCurriculum } from '../lib/useCurriculum'

export default function Home() {
  const { book } = useBook()
  const { units, sections, pages, originals, partial, intro } = useCurriculum()

  return <main className="study-home">
    <header className="home-heading kids-home-heading">
      <div className="kids-home-top">
        <div className="home-edition"><BookOpen size={17} aria-hidden="true" /> 外研社 · 新交际英语</div>
        <a href="https://ziyuan2046-cyber.github.io/learning-hub/" className="study-secondary home-return"><CornerUpLeft size={17} aria-hidden="true" /> 返回学习空间</a>
      </div>
      <div className="kids-home-title"><h1>外研英语</h1><BookPicker compact /></div>
    </header>
    <BookStatusNotice />
    {!book.available ? <BookPlaceholder /> : <>
      <h2 className="home-section-title"><BookOpen size={22} aria-hidden="true" />{partial ? '参考目录' : '课本目录'}</h2>
      <ol className="study-contents" aria-label="课本目录">
        {intro.map(item => <li key={item.id}>
          <BookLink to={`/book-section/${item.id}`} className="lesson-tile" data-tone="mint" data-contents-title={item.title}>
            <span className="lesson-top"><span className="lesson-number">课前</span><ArrowRight size={18} aria-hidden="true" /></span>
            <span className="lesson-picture" aria-hidden="true">{item.emoji}</span>
            <span className="lesson-title">{item.title}</span><span className="lesson-caption">{item.zh}</span>
          </BookLink>
        </li>)}
        {units.map((unit, index) => <li key={unit.id}>
          <BookLink to={`/unit/${unit.id}`} className="lesson-tile" data-tone={['mint', 'sky', 'peach', 'yellow', 'iris', 'pink'][index % 6]} data-contents-title={unit.title}>
            <span className="lesson-top"><span className="lesson-number">{unit.code}</span><ArrowRight size={18} aria-hidden="true" /></span>
            <span className="lesson-picture" aria-hidden="true">{unit.emoji}</span>
            <span className="lesson-title">{unit.title}</span>
            <span className="lesson-caption">{unit.titleZh}{pages[index] ? ` · 第 ${pages[index]} 页` : ''}</span>
          </BookLink>
        </li>)}
      </ol>
      <h2 className="home-section-title home-extras-title"><Headphones size={22} aria-hidden="true" />课后资料</h2>
      <ul className="home-extras">
        {sections.map(item => <li key={item.id}>
          <BookLink to={`/book-section/${item.id}`} className="home-extra" data-contents-title={item.title}>
            <span className="home-extra-icon" aria-hidden="true">{item.emoji}</span>
            <span className="home-extra-text"><strong>{item.title}</strong><small>{item.zh} · {item.available ? '配套音频' : '待补充'}</small></span>
            <ArrowRight size={18} aria-hidden="true" />
          </BookLink>
        </li>)}
        <li><BookLink to="/resources" className="home-extra">
          <span className="home-extra-icon"><Headphones size={20} aria-hidden="true" /></span>
          <span className="home-extra-text"><strong>{partial ? '词汇发音' : '教材配套录音'}</strong><small>{partial ? '辅助合成发音与资料来源' : `${originals.length} 段音频`}</small></span>
          <ArrowRight size={18} aria-hidden="true" />
        </BookLink></li>
      </ul>
    </>}
  </main>
}

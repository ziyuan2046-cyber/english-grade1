import { getCurriculum } from '../data/catalog'
import { useBook } from './books'
export function useCurriculum() {
  const { book } = useBook()
  const data = getCurriculum(book.id)
  return { ...data, wordCount: data.units.reduce((count, unit) => count + unit.words.length, 0) }
}

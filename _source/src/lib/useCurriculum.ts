import { getCurriculum } from '../data/catalog'
import { GRADE_ONE_EXTRA_WORDS } from '../data/gradeOneVocabulary'
import { useBook } from './books'
export function useCurriculum() {
  const { book } = useBook()
  const data = getCurriculum(book.id)
  const extraWordGroups = book.id === 'g1-up' ? GRADE_ONE_EXTRA_WORDS : []
  const wordCount = [...data.units, ...extraWordGroups].reduce((count, group) => count + group.words.length, 0)
  return { ...data, extraWordGroups, wordCount }
}

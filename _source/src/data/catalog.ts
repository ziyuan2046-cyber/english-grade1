import type { Unit, Track } from './curriculum'
import type { OriginalAudio } from './originalAudio'
import { SUPPLEMENTAL_BOOKS } from './supplementalBooks'
import { UNITS, EXTRA_TRACKS } from './curriculum'
import { ORIGINAL_AUDIO } from './originalAudio'
import { GRADE_ONE_UNIT_WORDS } from './gradeOneVocabulary'

export type BookSectionItem = { id: string; title: string; zh: string; page?: number; emoji: string; available: boolean }
export type BookCurriculum = { units: Unit[]; extras: Track[]; originals: OriginalAudio[]; sections: BookSectionItem[]; intro: BookSectionItem[]; pages: (number | null)[]; auxiliary: Track[]; partial: boolean; sources: { label: string; url: string }[] }
export const BOOK_SECTIONS: BookSectionItem[] = [
  { id: 'wrap-up', title: 'Wrap up', zh: '综合复习', page: 37, emoji: '🌟', available: false },
  { id: 'beijing', title: 'This is Beijing!', zh: '这是北京！', page: 41, emoji: '🏯', available: true },
  { id: 'appendices', title: 'Appendices', zh: '附录', page: 49, emoji: '📚', available: true },
]
export const COURSE_COLORS = [
  { color: '#6E65D7', tint: '#F0EEFF' },
  { color: '#4E83C3', tint: '#EAF3FF' },
  { color: '#8871C8', tint: '#F2EEFF' },
  { color: '#5F78C8', tint: '#EEF1FF' },
  { color: '#7865C0', tint: '#F0EDFF' },
  { color: '#5689B7', tint: '#EAF4FC' },
]
const gradeOneUnits = UNITS.map((unit, index) => ({
  ...unit,
  ...COURSE_COLORS[index],
  words: GRADE_ONE_UNIT_WORDS[index].map(word => ({ ...word, emoji: word.emoji || unit.words.find(previous => previous.en === word.en)?.emoji || '' })),
}))
const FIRST_BOOK: BookCurriculum = { units: gradeOneUnits, extras: EXTRA_TRACKS, originals: ORIGINAL_AUDIO, sections: BOOK_SECTIONS, pages: [1, 7, 13, 19, 25, 31], intro: [], auxiliary: [], partial: false, sources: [] }
const EMPTY_BOOK: BookCurriculum = { units: [], extras: [], originals: [], sections: [], pages: [], intro: [], auxiliary: [], partial: false, sources: [] }
// Each book gets its own dataset. Opening another book must never fall back to g1-up data.
export function getCurriculum(bookId: string) {
  if (bookId === 'g1-up') return FIRST_BOOK
  const supplemental = SUPPLEMENTAL_BOOKS[bookId]
  return supplemental ? { ...supplemental, units: supplemental.units.map((unit, index) => ({ ...unit, ...COURSE_COLORS[index % COURSE_COLORS.length] })) } : EMPTY_BOOK
}

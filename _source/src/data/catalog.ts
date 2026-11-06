import type { Unit, Track } from './curriculum'
import type { OriginalAudio } from './originalAudio'
import { SUPPLEMENTAL_BOOKS } from './supplementalBooks'
import { UNITS, EXTRA_TRACKS } from './curriculum'
import { ORIGINAL_AUDIO } from './originalAudio'

export type BookSectionItem = { id: string; title: string; zh: string; page?: number; emoji: string; available: boolean }
export type BookCurriculum = { units: Unit[]; extras: Track[]; originals: OriginalAudio[]; sections: BookSectionItem[]; intro: BookSectionItem[]; pages: (number | null)[]; auxiliary: Track[]; partial: boolean; sources: { label: string; url: string }[] }
export const BOOK_SECTIONS: BookSectionItem[] = [
  { id: 'wrap-up', title: 'Wrap up', zh: '综合复习', page: 37, emoji: '🌟', available: false },
  { id: 'beijing', title: 'This is Beijing!', zh: '这是北京！', page: 41, emoji: '🏯', available: true },
  { id: 'appendices', title: 'Appendices', zh: '附录', page: 49, emoji: '📚', available: true },
]
const FIRST_BOOK: BookCurriculum = { units: UNITS, extras: EXTRA_TRACKS, originals: ORIGINAL_AUDIO, sections: BOOK_SECTIONS, pages: [1, 7, 13, 19, 25, 31], intro: [], auxiliary: [], partial: false, sources: [] }
const EMPTY_BOOK: BookCurriculum = { units: [], extras: [], originals: [], sections: [], pages: [], intro: [], auxiliary: [], partial: false, sources: [] }
// Each book gets its own dataset. Opening another book must never fall back to g1-up data.
export function getCurriculum(bookId: string) { return bookId === 'g1-up' ? FIRST_BOOK : SUPPLEMENTAL_BOOKS[bookId] || EMPTY_BOOK }

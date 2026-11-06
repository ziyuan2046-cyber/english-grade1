import { UNITS, EXTRA_TRACKS } from './curriculum'
import { ORIGINAL_AUDIO } from './originalAudio'

export const BOOK_SECTIONS = [
  { id: 'wrap-up', title: 'Wrap up', zh: '综合复习', page: 37, emoji: '🌟', available: false },
  { id: 'beijing', title: 'This is Beijing!', zh: '这是北京！', page: 41, emoji: '🏯', available: true },
  { id: 'appendices', title: 'Appendices', zh: '附录', page: 49, emoji: '📚', available: true },
]
const FIRST_BOOK = { units: UNITS, extras: EXTRA_TRACKS, originals: ORIGINAL_AUDIO, sections: BOOK_SECTIONS, pages: [1, 7, 13, 19, 25, 31] }
const EMPTY_BOOK: typeof FIRST_BOOK = { units: [], extras: [], originals: [], sections: [], pages: [] }
// Each book gets its own dataset. Opening another book must never fall back to g1-up data.
export function getCurriculum(bookId: string) { return bookId === 'g1-up' ? FIRST_BOOK : EMPTY_BOOK }

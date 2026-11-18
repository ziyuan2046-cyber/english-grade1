// Pictures share the existing emoji icon style. Abstract words use a small visual cue.
const pictures: Record<string, string> = {
  "let's": '🤝', i: '🙋', too: '➕', miss: '👩‍🏫', and: '🔗', is: '🟰', me: '🙋',
  it: '📦', that: '👉', 'good job!': '👏', 'a(n)': '1️⃣', very: '❗', old: '🏺',
  look: '👀', thing: '🧸', no: '🚫', so: '❗', many: '🫧', go: '🚶', slow: '🐢',
  welcome: '🙌', friend: '🤝', ok: '👌', come: '🫴', see: '👁️', she: '👧', great: '🌟',
  city: '🏙️', 'the great wall': '🧱', 'the palace museum': '🏯', pick: '🤏', now: '⏰',
  toby: '👦', emma: '👧', may: '👧', 'yingtian academy': '📜', 'songyang academy': '📚',
}

export const wordPicture = (text: string, existing = '') => existing || pictures[text.trim().toLowerCase().replaceAll('’', "'")] || ''

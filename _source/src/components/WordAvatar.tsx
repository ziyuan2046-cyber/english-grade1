type Props = { emoji?: string; text?: string; color?: string; size?: number; className?: string }

/** 用 8 位十六进制给颜色叠加透明度，兼容不支持 color-mix 的旧浏览器 */
const tint = (hex: string, alpha: number) => {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const a = Math.round(alpha * 255).toString(16).padStart(2, '0')
  return `#${full}${a}`
}

export default function WordAvatar({ emoji, text, color = '#6366F1', size = 52, className = '' }: Props) {
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-2xl ${className}`}
      style={{ width: size, height: size, background: tint(color, 0.14), lineHeight: 1 }}
    >
      {emoji ? (
        <span style={{ fontSize: size * 0.5, lineHeight: 1 }}>{emoji}</span>
      ) : (
        <span className="font-display font-extrabold" style={{ color, fontSize: size * 0.4 }}>
          {(text ?? '?').charAt(0).toUpperCase()}
        </span>
      )}
    </span>
  )
}
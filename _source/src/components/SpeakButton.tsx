import { Volume2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { speak, subscribe } from '../lib/speak'

type Props = {
  text: string
  color?: string
  tint?: string
  /** 尺寸：md 用于列表行，lg 用于卡片 */
  size?: 'md' | 'lg'
  className?: string
  label?: string
}

/** 统一发音按钮：点击区域大、按下有反馈、播放中显示动效 */
export default function SpeakButton({ text, color = '#6366F1', tint, size = 'md', className = '', label }: Props) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    return subscribe((s) => setActive(s.text === text.trim() && s.playing))
  }, [text])

  const box = size === 'lg' ? 'h-14 w-14' : 'h-12 w-12'
  const icon = size === 'lg' ? 24 : 20

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        speak(text)
      }}
      aria-label={label ?? `播放 ${text}`}
      className={`relative grid shrink-0 place-items-center rounded-full transition-transform duration-100 active:scale-90 ${box} ${className}`}
      style={{ background: tint ?? '#EEF1FF', color }}
    >
      {active && (
        <span
          className="absolute inset-0 animate-ping rounded-full"
          style={{ background: color, opacity: 0.22 }}
        />
      )}
      <Volume2 size={icon} className="relative" strokeWidth={2.4} />
    </button>
  )
}
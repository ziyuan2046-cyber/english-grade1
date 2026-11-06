import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Unit } from '../data/curriculum'

type Props = {
  unit: Unit
  to: string
  meta: { icon: LucideIcon; text: string }[]
  index?: number
}

export default function UnitCard({ unit, to, meta, index = 0 }: Props) {
  return (
    <div style={{ animation: `slideup .32s ease-out ${Math.min(index * 0.04, 0.3)}s both` }}>
      <Link
        to={to}
        className="card block h-full p-4 transition-transform active:scale-[.97]"
        style={{ background: `linear-gradient(160deg, #ffffff 58%, ${unit.tint})` }}
      >
        <div className="flex items-start justify-between gap-1">
          <span className="grid h-12 w-12 place-items-center rounded-2xl text-2xl shadow-soft" style={{ background: unit.tint }}>
            {unit.emoji}
          </span>
          <span className="chip shrink-0" style={{ background: unit.tint, color: unit.color }}>
            {unit.code}
          </span>
        </div>
        <div className="mt-3 font-display text-[17px] font-extrabold leading-tight">{unit.title}</div>
        <div className="text-xs font-bold text-ink/45">{unit.titleZh}</div>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold text-ink/40">
          {meta.map(({ icon: Icon, text }) => (
            <span key={text} className="inline-flex items-center gap-1">
              <Icon size={11} /> {text}
            </span>
          ))}
        </div>
      </Link>
    </div>
  )
}
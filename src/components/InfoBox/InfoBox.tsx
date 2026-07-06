import React from 'react'

// ─── Figma specs ──────────────────────────────────────────────────────────────
// InfoBox — 2 variants (info / error)
// bg:    info=#eff4ff(primary-50)  error=#fdf5f5(negative-50)
// border: rgba(0,0,0,0.06), r=8, px=12, py=12
//
// title row:  ic_*_fill(18×18) + title text (14px Bold, colored)
// gap:        4px between title and context
// context row: body text (13px Regular #333333, flex-1) + ic_arrow_right (12×12)

export type InfoBoxType = 'info' | 'error'

interface InfoBoxProps {
  type?: InfoBoxType
  title: string
  children: React.ReactNode
}

// ─── ic_info_fill — filled blue circle with white "i" ─────────────────────────

const IcInfoFill: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
    <circle cx="9" cy="9" r="8.5" fill="#105aff" />
    <circle cx="9" cy="5.5" r="1.1" fill="white" />
    <path d="M9 8v5" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

// ─── ic_error_fill — filled red circle with white "!" ────────────────────────

const IcErrorFill: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
    <circle cx="9" cy="9" r="8.5" fill="#fa4553" />
    <path d="M9 5v5" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <circle cx="9" cy="12.5" r="1.1" fill="white" />
  </svg>
)

// ─── ic_arrow_right — 12×12 꺽쇠 우측 ───────────────────────────────────────

const IcArrowRight: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0">
    <path d="M4 2.5L8 6L4 9.5" stroke="#333333" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ─── styles ───────────────────────────────────────────────────────────────────

const styles = {
  info:  { bg: '#eff4ff', titleColor: '#105aff', Icon: IcInfoFill  },
  error: { bg: '#fdf5f5', titleColor: '#fa4553', Icon: IcErrorFill },
}

// ─── Component ────────────────────────────────────────────────────────────────

export const InfoBox: React.FC<InfoBoxProps> = ({ type = 'info', title, children }) => {
  const { bg, titleColor, Icon } = styles[type]

  return (
    <div
      role="note"
      className="rounded-lg"
      style={{ backgroundColor: bg, border: '1px solid rgba(0,0,0,0.06)', padding: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
    >
      {/* title row: icon + title text */}
      <div className="flex items-center gap-0.5">
        <Icon />
        <span className="text-body3 font-bold leading-snug" style={{ color: titleColor }}>
          {title}
        </span>
      </div>

      {/* context row: body text + arrow right */}
      <div className="flex items-center justify-between gap-2 mt-1">
        <span className="text-body4 font-regular text-secondary-800 leading-5">
          {children}
        </span>
        <IcArrowRight />
      </div>
    </div>
  )
}

export default InfoBox

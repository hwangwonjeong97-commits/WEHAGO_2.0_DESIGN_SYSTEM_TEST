import React from 'react'

// ─── Figma specs ──────────────────────────────────────────────────────────────
// ActionBar: bg #50596c (neutral-900), height: 48px, px:20
// Left: "N개" Bold 13px #719bfc + "선택됨" Bold 13px white
// Right:
//   warning (optional): ic_warning 18×18 + message 12px Regular white + divider 1px white/50
//   GhostButton actions: border #b4b4b4, text white 14px Regular, h:32, r:6

interface Action {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  disabled?: boolean
}

interface ActionBarProps {
  selectedCount?: number
  actions?: Action[]
  warningMessage?: string
  className?: string
}

// ic_warning_fill 18×18 — 피그마 원본
const WarningIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="flex-shrink-0">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.0008 1.5C9.35184 1.50003 9.69679 1.59145 9.99982 1.76514C10.3029 1.93885 10.5535 2.1889 10.7257 2.48877L16.2466 12.1106C16.4156 12.4057 16.5031 12.739 16.5001 13.0774C16.497 13.4158 16.4034 13.7477 16.2291 14.0398C16.0547 14.3319 15.8056 14.5745 15.5062 14.7429C15.2067 14.9114 14.8671 14.9998 14.5218 15H3.47907C3.13367 15 2.79433 14.9113 2.49469 14.7429C2.19495 14.5744 1.94475 14.3315 1.77033 14.0391C1.59604 13.7468 1.5029 13.4145 1.50006 13.0759C1.49727 12.7375 1.5849 12.4041 1.75422 12.1091L7.27594 2.48877C7.44812 2.18885 7.69869 1.93885 8.00177 1.76514C8.30483 1.59148 8.64975 1.5 9.0008 1.5ZM9.00007 11.5503C8.4617 11.5504 8.02529 11.9868 8.02521 12.5251C8.02521 13.0636 8.46165 13.4999 9.00007 13.5C9.53854 13.5 9.97492 13.0636 9.97492 12.5251C9.97484 11.9867 9.53849 11.5503 9.00007 11.5503ZM9.00007 4.5C8.46173 4.50008 8.02534 4.94763 8.02521 5.49976V9.50024C8.02534 10.0524 8.46173 10.4999 9.00007 10.5C9.53846 10.5 9.97479 10.0524 9.97492 9.50024V5.49976C9.97479 4.94758 9.53846 4.5 9.00007 4.5Z" fill="#FFA000"/>
  </svg>
)

const ActionBar: React.FC<ActionBarProps> = ({
  selectedCount = 0,
  actions = [],
  warningMessage,
  className = '',
}) => {
  return (
    <div
      className={[
        'flex items-center h-12 px-5',
        'bg-[#50596c]',
        className,
      ].join(' ')}
    >
      {/* Left — "N개 선택됨" gap=2px */}
      <div className="flex items-center gap-0.5 flex-shrink-0">
        <span className="text-body4 font-bold text-[#719bfc]">{selectedCount}개</span>
        <span className="text-body4 font-bold text-white">선택됨</span>
      </div>

      {/* Right section — flex-1 justify-end */}
      <div className="flex items-center gap-2 flex-1 justify-end">
        {/* Warning: icon(18) gap=4px text, divider */}
        {warningMessage && (
          <div className="flex items-center gap-1">
            <WarningIcon />
            <span className="text-body5 font-regular text-white whitespace-nowrap">
              {warningMessage}
            </span>
            {/* 구분선: 1px white/50%, h=12px */}
            <div className="w-px h-3 bg-white/50 flex-shrink-0 ml-1" aria-hidden="true" />
          </div>
        )}

        {/* Action buttons — gap=4px between buttons */}
        <div className="flex items-center gap-1">
          {actions.map((action, idx) => (
            <button
              key={idx}
              type="button"
              disabled={action.disabled}
              onClick={action.onClick}
              className={[
                'inline-flex items-center gap-1 h-8 px-3 rounded-md',
                'border border-secondary-400 text-white text-body3 font-regular',
                'hover:bg-white/10 transition-colors duration-150',
                'disabled:opacity-40 disabled:cursor-not-allowed',
                'focus:outline-none whitespace-nowrap',
              ].join(' ')}
            >
              {action.icon && (
                <span className="w-[14px] h-[14px] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  {action.icon}
                </span>
              )}
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ActionBar

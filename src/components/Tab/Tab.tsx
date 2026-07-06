import React from 'react'

// ─── Figma specs ──────────────────────────────────────────────────────────────
// TabBorder  (Tabs):    h=32, border-b #4a4a4a active / #e1e1e1 container,
//                       icon(24)+label 16px Bold #333 active / Regular #777
// TabChips   (Chips):   pill r=1000, h=32, active bg=#4a4a4a #fff Bold,
//                       inactive bg=#f7f8fa #777 500, icon(18)+label+count+arrow
// TabText    (Text):    h=21, label 14px + count, active Bold #333 count #105aff,
//                       inactive 500 #777, divider 1×12 #e1e1e1 between items
// TabIcon    (Icon):    container bg=#fff stroke=#d3d3d3 r=6, icon btn 32×32 r=6,
//                       active stroke=#4a4a4a
// TabSegment (Segment): container bg=#f4f4f4 r=6 p=4, active bg=#fff r=4 h=24,
//                       label 12px 500 #333 active / 400 #777 inactive

export type TabVariant = 'border' | 'chips' | 'text' | 'icon' | 'segment' | 'line' | 'pill'

export interface TabItem {
  value: string
  label: string
  icon?: React.ReactNode
  count?: number
  badge?: number
  disabled?: boolean
}

interface TabProps {
  tabs: TabItem[]
  value: string
  onChange: (value: string) => void
  variant?: TabVariant
  size?: 'sm' | 'md'
}

// ─── ic_arrow_down 12×12 (TabChips 우측 화살표) ───────────────────────────────

const IcArrowDown12: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0">
    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ─── Tab ──────────────────────────────────────────────────────────────────────

const Tab: React.FC<TabProps> = ({ tabs, value, onChange, variant = 'border', size = 'md' }) => {
  const v = variant === 'line' ? 'border' : variant === 'pill' ? 'chips' : variant

  const click = (tab: TabItem) => { if (!tab.disabled) onChange(tab.value) }

  // ── TabBorder ──────────────────────────────────────────────────────────────
  if (v === 'border') {
    return (
      <div className="flex items-end gap-5 border-b border-secondary-100 overflow-x-auto">
        {tabs.map(tab => {
          const sel = tab.value === value
          return (
            <button
              key={tab.value}
              type="button"
              disabled={tab.disabled}
              onClick={() => click(tab)}
              className={[
                'inline-flex items-center gap-0.5 h-8 shrink-0',
                'border-b-2 -mb-px transition-colors duration-150 outline-none',
                size === 'md' ? 'text-body1' : 'text-body3',
                tab.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                sel
                  ? 'border-secondary-700 text-secondary-800 font-bold'
                  : 'border-transparent text-secondary-600 font-regular hover:text-secondary-800',
              ].join(' ')}
            >
              {tab.icon && (
                <span className="w-6 h-6 flex items-center justify-center shrink-0" aria-hidden="true">
                  {tab.icon}
                </span>
              )}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className={['text-body5 font-bold', sel ? 'text-primary-base' : 'text-secondary-600'].join(' ')}>
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>
    )
  }

  // ── TabChips ───────────────────────────────────────────────────────────────
  if (v === 'chips') {
    return (
      <div className="flex items-center gap-1.5 flex-wrap">
        {tabs.map(tab => {
          const sel = tab.value === value
          return (
            <button
              key={tab.value}
              type="button"
              disabled={tab.disabled}
              onClick={() => click(tab)}
              className={[
                'inline-flex items-center gap-1.5 h-8 px-3 rounded-full transition-colors duration-150 outline-none',
                'text-body3',
                tab.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                sel
                  ? 'bg-secondary-700 text-white font-bold'
                  : 'bg-neutral-30 text-secondary-600 font-medium hover:bg-neutral-100',
              ].join(' ')}
            >
              {tab.icon && (
                <span className="w-[18px] h-[18px] flex items-center justify-center shrink-0" aria-hidden="true">
                  {tab.icon}
                </span>
              )}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={['text-body3 font-bold tabular-nums', sel ? 'text-white' : 'text-secondary-600'].join(' ')}>
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    )
  }

  // ── TabText ────────────────────────────────────────────────────────────────
  if (v === 'text') {
    return (
      <div className="flex items-center overflow-hidden">
        {tabs.map((tab, idx) => {
          const sel = tab.value === value
          return (
            <React.Fragment key={tab.value}>
              {idx > 0 && (
                <div className="w-px h-3 bg-secondary-100 shrink-0 mx-3" aria-hidden="true" />
              )}
              <button
                type="button"
                disabled={tab.disabled}
                onClick={() => click(tab)}
                className={[
                  'inline-flex items-center gap-1 min-w-0 overflow-hidden transition-colors duration-150 outline-none',
                  'text-body3',
                  tab.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                  sel ? 'font-bold text-secondary-800' : 'font-medium text-secondary-600 hover:text-secondary-800',
                ].join(' ')}
              >
                <span className="truncate">{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={['text-body3 font-bold tabular-nums shrink-0', sel ? 'text-primary-base' : 'text-secondary-600'].join(' ')}>
                    {tab.count}
                  </span>
                )}
              </button>
            </React.Fragment>
          )
        })}
      </div>
    )
  }

  // ── TabIcon ────────────────────────────────────────────────────────────────
  if (v === 'icon') {
    return (
      <div
        className="inline-flex items-center bg-white rounded-md overflow-hidden"
        style={{ border: '1px solid #d3d3d3' }}
      >
        {tabs.map(tab => {
          const sel = tab.value === value
          return (
            <button
              key={tab.value}
              type="button"
              disabled={tab.disabled}
              onClick={() => click(tab)}
              aria-label={tab.label}
              className={[
                'w-8 h-8 flex items-center justify-center rounded transition-colors duration-150 outline-none shrink-0',
                tab.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-black/[0.04]',
                sel ? 'text-secondary-800' : 'text-secondary-400',
              ].join(' ')}
              style={sel ? { border: '1px solid #4a4a4a' } : undefined}
            >
              {tab.icon && (
                <span className="w-[18px] h-[18px] flex items-center justify-center" aria-hidden="true">
                  {tab.icon}
                </span>
              )}
            </button>
          )
        })}
      </div>
    )
  }

  // ── TabSegment ─────────────────────────────────────────────────────────────
  return (
    <div className="inline-flex items-center bg-secondary-50 rounded-md p-1 gap-0.5">
      {tabs.map(tab => {
        const sel = tab.value === value
        return (
          <button
            key={tab.value}
            type="button"
            disabled={tab.disabled}
            onClick={() => click(tab)}
            className={[
              'inline-flex items-center justify-center h-6 px-3 rounded transition-colors duration-150 outline-none',
              'text-body5',
              tab.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
              sel
                ? 'bg-white text-secondary-800 font-medium shadow-sm'
                : 'bg-transparent text-secondary-600 font-regular hover:bg-white/50',
            ].join(' ')}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export default Tab

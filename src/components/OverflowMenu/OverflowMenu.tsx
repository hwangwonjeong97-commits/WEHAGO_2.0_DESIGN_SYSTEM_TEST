import React, { useState, useRef, useEffect, useCallback } from 'react'

// ─── Figma specs ──────────────────────────────────────────────────────────────
// Panel: bg #fff, stroke #e1e1e1, cornerRadius: 8, width: 180px
// Title row: 28px, back arrow + title (12px Bold #777777) + settings icon
// Item (Atomic/_ListSingleM): 172×32, px:8
//   Icon 18×18 + text 14px Regular #333333
//   Hover: rgba(0,0,0,0.03)
// Divider: 9px gap
// Danger item: #fa4553

type MenuItemVariant = 'default' | 'danger'

interface MenuAction {
  type?: never
  label: string
  onClick: () => void
  icon?: React.ReactNode
  disabled?: boolean
  variant?: MenuItemVariant
  /** 선택 상태: bg rgba(#105aff,5%) + text #105aff + Medium */
  selected?: boolean
}

interface MenuDivider {
  type: 'divider'
}

interface MenuTitle {
  type: 'title'
  label: string
}

type MenuItem = MenuAction | MenuDivider | MenuTitle

interface OverflowMenuProps {
  items: MenuItem[]
  trigger?: React.ReactNode
  align?: 'left' | 'right'
}

const DotsIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0">
    <circle cx="10" cy="4" r="1.5" />
    <circle cx="10" cy="10" r="1.5" />
    <circle cx="10" cy="16" r="1.5" />
  </svg>
)

// Selected 아이템 우측 체크 (Figma ic_check_thick 18×18, #105aff)
const CheckThick: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 ml-auto" aria-hidden="true">
    <path d="M14.5 5.2 7.3 12.4 3.5 8.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function isAction(item: MenuItem): item is MenuAction {
  return !('type' in item) || (item as MenuAction).type === undefined
}

function isDivider(item: MenuItem): item is MenuDivider {
  return (item as MenuDivider).type === 'divider'
}

function isTitle(item: MenuItem): item is MenuTitle {
  return (item as MenuTitle).type === 'title'
}

const OverflowMenu: React.FC<OverflowMenuProps> = ({ items, trigger, align = 'right' }) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClose = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleClose()
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, handleClose])

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Trigger */}
      <div onClick={() => setOpen(o => !o)} className="inline-block">
        {trigger ?? (
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded-md text-secondary-600 hover:bg-neutral-30 transition-colors"
            aria-label="메뉴 열기"
            aria-expanded={open}
          >
            <DotsIcon />
          </button>
        )}
      </div>

      {/* Panel — r:8, w:180, stroke #e1e1e1 */}
      {open && (
        <div
          role="menu"
          className={[
            'ds-overlay-panel',
            'absolute top-full mt-1 z-50',
            'bg-white border border-secondary-100 rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.1)]',
            'w-[180px] p-1',
            align === 'right' ? 'right-0' : 'left-0',
          ].join(' ')}
        >
          {items.map((item, idx) => {
            if (isDivider(item)) {
              return <div key={`d-${idx}`} className="my-1 border-t border-secondary-100" />
            }

            if (isTitle(item)) {
              return (
                <div key={`t-${idx}`} className="h-7 px-2 flex items-center">
                  <span className="text-body5 font-bold text-secondary-600">{item.label}</span>
                </div>
              )
            }

            // Action item — h:32, px:8
            const action = item as MenuAction
            return (
              <button
                key={`a-${idx}`}
                type="button"
                role="menuitem"
                disabled={action.disabled}
                onClick={() => {
                  if (!action.disabled) {
                    action.onClick()
                    handleClose()
                  }
                }}
                style={action.selected ? { backgroundColor: 'rgba(16,90,255,0.06)' } : undefined}
                className={[
                  'w-full flex items-center gap-1 h-8 px-2 rounded text-left',
                  'text-body3 transition-colors duration-100',
                  'disabled:opacity-40 disabled:cursor-not-allowed',
                  action.variant === 'danger'
                    ? 'text-negative-dangerPoint font-regular hover:bg-negative-50'
                    : action.selected
                    ? 'text-primary-base font-medium hover:bg-primary-50'
                    : 'text-secondary-800 font-regular hover:bg-black/[0.03]',
                ].join(' ')}
              >
                {action.icon && (
                  <span className="w-[18px] h-[18px] flex items-center justify-center flex-shrink-0">
                    {action.icon}
                  </span>
                )}
                <span>{action.label}</span>
                {action.selected && <CheckThick />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default OverflowMenu

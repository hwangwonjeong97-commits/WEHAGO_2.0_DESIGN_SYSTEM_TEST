import React, { forwardRef, HTMLAttributes } from 'react'

// ─── Figma specs ──────────────────────────────────────────────────────────────
// Tag (COMPONENT_SET):
//   Size=Medium: h-6 (24px), bg #f4f4f4, text #333333, 12px Medium, r:4
//   Size=Small:  h-5 (20px), bg #f4f4f4, text #333333, 11px Regular, r:4
//   icon slot + text + close button (12×12)
//   단일 회색 컬러만 (color variant 없음)
//
// TagUser (COMPONENT):
//   78×24, r:4, bg #f4f4f4
//   Avatar (18×18, r:6) + text 12px Medium #333333 + close (12×12)

type TagSize = 'md' | 'sm'

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  size?: TagSize
  icon?: React.ReactNode
  avatar?: React.ReactNode   // TagUser 용 Avatar 슬롯
  onRemove?: () => void
  children: React.ReactNode
}

const sizeMap: Record<TagSize, { wrap: string; text: string; close: string }> = {
  md: { wrap: 'h-6 px-1.5 gap-0.5', text: 'text-body5 font-medium',  close: 'w-3 h-3' },
  sm: { wrap: 'h-5 px-1 gap-0.5', text: 'text-body6 font-regular', close: 'w-2.5 h-2.5' },
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ size = 'md', icon, avatar, onRemove, className = '', children, ...props }, ref) => {
    const { wrap, text, close } = sizeMap[size]

    return (
      <span
        ref={ref}
        className={[
          // State=Default: bg #f4f4f4(secondary-50) · State=Hovered: bg rgba(0,0,0,0.03)
          'inline-flex items-center rounded bg-secondary-50 text-secondary-800 select-none',
          'hover:bg-black/[0.03] transition-colors',
          wrap,
          className,
        ].filter(Boolean).join(' ')}
        {...props}
      >
        {/* Avatar 슬롯 (TagUser 용) */}
        {avatar && (
          <span className="flex-shrink-0 flex items-center -ml-0.5" aria-hidden="true">
            {avatar}
          </span>
        )}
        {/* Icon 슬롯 */}
        {!avatar && icon && (
          <span className="flex-shrink-0 flex items-center" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className={text}>{children}</span>
        {onRemove && (
          <button
            type="button"
            onClick={e => { e.stopPropagation(); onRemove() }}
            aria-label="태그 제거"
            className={[
              'flex-shrink-0 flex items-center justify-center',
              'opacity-60 hover:opacity-100 transition-opacity focus:outline-none',
              close,
            ].join(' ')}
          >
            {/* ic_close 12×12 — 피그마 원본 */}
            <svg viewBox="0 0 12 12" fill="none" className="w-full h-full" aria-hidden="true">
              <path d="M9.23484 2.23483C9.38128 2.08839 9.61866 2.08839 9.76511 2.23483C9.91153 2.38128 9.91155 2.61867 9.76511 2.76511L6.53025 5.99997L9.76511 9.23484C9.91153 9.38128 9.91155 9.61867 9.76511 9.76511C9.61867 9.91155 9.38128 9.91153 9.23484 9.76511L5.99997 6.53025L2.76511 9.76511C2.61867 9.91155 2.38128 9.91153 2.23483 9.76511C2.08839 9.61866 2.08839 9.38128 2.23483 9.23484L5.4697 5.99997L2.23483 2.76511C2.08839 2.61866 2.08839 2.38128 2.23483 2.23483C2.38128 2.08839 2.61866 2.08839 2.76511 2.23483L5.99997 5.4697L9.23484 2.23483Z" fill="currentColor"/>
            </svg>
          </button>
        )}
      </span>
    )
  }
)

Tag.displayName = 'Tag'
export default Tag

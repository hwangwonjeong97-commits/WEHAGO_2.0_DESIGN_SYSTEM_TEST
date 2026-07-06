import React, { useState, useEffect } from 'react'

// ─── Figma specs ──────────────────────────────────────────────────────────────
// Type=Default:  bg #f7f8fa(neutral-30), topWrap(116: buttons+quickmenu), border-r #e1e1e1
// Type=2Depth:   bg #ffffff,             topWrap(52:  buttons only),       border-r #e1e1e1
//
// Menu item (Atomic/_Menu 188×36, r=4 → _ListSingle 188×32, r=4):
//   icon(18) + label(14px 500 #333) | count(14px 500 #105aff) | BadgeNoti(16) | Button | arrow(14)
// Category (Atomic/_MenuCate 188×32):
//   ic_arrow_down_thick(12) + label(12px 500 #777) | ic_add_thick(12)
// Sub item (Atomic/_MenuSub 188×28 → ListSingleS 188×24 r=4):
//   ic_inline(14) + ic_list_dot(14) + label(12px 400 #777) + dot-badge(4) | count(12px 500 #105aff)
// Divider: 188×1 #ededed between groups
// Bottom: border-t #ededed

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SNBSubItem {
  id: string
  label: string
  count?: number
  badge?: boolean
  onClick?: () => void
}

export interface SNBMenuItem {
  id: string
  label: string
  icon?: React.ReactNode
  count?: number
  badge?: boolean | string
  actionLabel?: string
  onAction?: () => void
  children?: SNBSubItem[]
  onClick?: () => void
}

export interface SNBGroup {
  category?: string
  items: SNBMenuItem[]
}

export interface SNBQuickItem {
  id: string
  icon: React.ReactNode
  label: string
  badge?: boolean
  onClick?: () => void
}

export interface SNBProps {
  variant?: 'default' | '2depth'
  groups?: SNBGroup[]
  activeId?: string
  onSelect?: (id: string) => void
  primaryAction?: { label: string; onClick: () => void }
  secondaryAction?: { label: string; onClick: () => void }
  quickMenus?: SNBQuickItem[]
  bottomItems?: SNBMenuItem[]
  className?: string
}

// ─── Internal icons ───────────────────────────────────────────────────────────

// ic_arrow_top_thick 14×14 — 피그마 원본
const IcArrowTop: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    width="14" height="14" viewBox="0 0 14 14" fill="none"
    className={['shrink-0 transition-transform duration-200', open ? '' : 'rotate-180'].join(' ')}
    aria-hidden="true"
  >
    <path d="M1.92183 8.92091C1.69402 9.14871 1.69402 9.51797 1.92183 9.74578C2.14964 9.97358 2.51889 9.97358 2.7467 9.74578L7.00093 5.49154L11.2552 9.74578C11.483 9.97358 11.8522 9.97358 12.08 9.74578C12.3078 9.51797 12.3078 9.1487 12.08 8.92091L7.41337 4.25424C7.19981 4.04068 6.86204 4.02753 6.63293 4.21436L6.5885 4.25424L1.92183 8.92091Z" fill="#989898"/>
  </svg>
)

// ic_arrow_down_thick 12×12 — 피그마 원본
const IcArrowDown: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    width="12" height="12" viewBox="0 0 12 12" fill="none"
    className={['shrink-0 transition-transform duration-200', open ? 'rotate-180' : ''].join(' ')}
    aria-hidden="true"
  >
    <path d="M1.64742 4.75355C1.45216 4.55829 1.45216 4.24178 1.64742 4.04652C1.84269 3.85126 2.15919 3.85126 2.35445 4.04652L6.00094 7.693L9.64742 4.04652C9.84268 3.85126 10.1592 3.85126 10.3545 4.04652C10.5497 4.24179 10.5497 4.5583 10.3545 4.75355L6.35445 8.75355C6.17141 8.9366 5.88189 8.94787 5.68551 8.78773L5.64742 8.75355L1.64742 4.75355Z" fill="#989898"/>
  </svg>
)

// ic_add_thick 12×12 — 피그마 원본
const IcAddThick: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M6 1C6.27614 1 6.5 1.22386 6.5 1.5V5.5H10.5C10.7761 5.5 11 5.72386 11 6C11 6.27614 10.7761 6.5 10.5 6.5H6.5V10.5C6.5 10.7761 6.27614 11 6 11C5.72386 11 5.5 10.7761 5.5 10.5V6.5H1.5C1.22386 6.5 1 6.27614 1 6C1 5.72386 1.22386 5.5 1.5 5.5H5.5V1.5C5.5 1.22386 5.72386 1 6 1Z" fill="#989898"/>
  </svg>
)

// ic_inline 14×14 — 피그마 원본
const IcInline: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0">
    <path d="M4.08301 2.479C4.32463 2.479 4.52051 2.67488 4.52051 2.9165V7.75806C4.52051 8.2252 4.89931 8.604 5.36646 8.604H10.208C10.4496 8.604 10.6455 8.79988 10.6455 9.0415C10.6455 9.28313 10.4496 9.479 10.208 9.479H5.36646C4.41607 9.479 3.64551 8.70845 3.64551 7.75806V2.9165C3.64551 2.67488 3.84138 2.479 4.08301 2.479Z" fill="#989898"/>
  </svg>
)

// ic_list_dot 14×14 — 피그마 원본
const IcListDot: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0">
    <path d="M2.47917 10.1204C2.88187 10.1204 3.20833 10.4469 3.20833 10.8496C3.20833 11.2523 2.88187 11.5788 2.47917 11.5788C2.07646 11.5788 1.75 11.2523 1.75 10.8496C1.75 10.4469 2.07646 10.1204 2.47917 10.1204Z" fill="#989898"/>
    <path d="M11.8148 10.4121C12.0564 10.4121 12.2523 10.608 12.2523 10.8496C12.2523 11.0912 12.0564 11.2871 11.8148 11.2871H4.67464C4.43302 11.2871 4.23714 11.0912 4.23714 10.8496C4.23714 10.608 4.43302 10.4121 4.67464 10.4121H11.8148Z" fill="#989898"/>
    <path d="M2.47917 6.27067C2.88187 6.27067 3.20833 6.59713 3.20833 6.99984C3.20833 7.40255 2.88187 7.729 2.47917 7.729C2.07646 7.729 1.75 7.40255 1.75 6.99984C1.75 6.59713 2.07646 6.27067 2.47917 6.27067Z" fill="#989898"/>
    <path d="M11.8148 6.56234C12.0564 6.56234 12.2523 6.75821 12.2523 6.99984C12.2523 7.24146 12.0564 7.43734 11.8148 7.43734H4.67464C4.43302 7.43734 4.23714 7.24146 4.23714 6.99984C4.23714 6.75821 4.43302 6.56234 4.67464 6.56234H11.8148Z" fill="#989898"/>
    <path d="M2.47917 2.4209C2.88187 2.4209 3.20833 2.74736 3.20833 3.15007C3.20833 3.55277 2.88187 3.87923 2.47917 3.87923C2.07646 3.87923 1.75 3.55277 1.75 3.15007C1.75 2.74736 2.07646 2.4209 2.47917 2.4209Z" fill="#989898"/>
    <path d="M11.8148 2.71257C12.0564 2.71257 12.2523 2.90844 12.2523 3.15007C12.2523 3.39169 12.0564 3.58757 11.8148 3.58757H4.67464C4.43302 3.58757 4.23714 3.39169 4.23714 3.15007C4.23714 2.90844 4.43302 2.71257 4.67464 2.71257H11.8148Z" fill="#989898"/>
  </svg>
)

// ─── Menu item row ────────────────────────────────────────────────────────────

const MenuRow: React.FC<{
  item: SNBMenuItem
  isActive: boolean
  isExpanded: boolean
  onToggle: () => void
  onSelect: (id: string) => void
}> = ({ item, isActive, isExpanded, onToggle, onSelect }) => {
  const hasChildren = Boolean(item.children?.length)

  return (
    <div className="px-4">
      {/* 1depth 행 (188×36, r=4) */}
      <button
        type="button"
        onClick={() => {
          if (hasChildren) onToggle()
          else { onSelect(item.id); item.onClick?.() }
        }}
        className={[
          'w-full flex items-center gap-2 px-1.5 h-9 rounded transition-colors duration-150 focus:outline-none text-left',
          isActive ? 'bg-primary-50' : 'hover:bg-black/[0.03]',
        ].join(' ')}
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-current={isActive ? 'page' : undefined}
      >
        {/* 아이콘 18×18 — active: #105aff, 기본: #777777(secondary-600) */}
        {item.icon && (
          <span
            className={['w-[18px] h-[18px] flex items-center justify-center shrink-0',
              isActive ? 'text-primary-base' : 'text-secondary-600'].join(' ')}
            aria-hidden="true"
          >
            {item.icon}
          </span>
        )}
        {/* 라벨 14px 500 — active: #105aff, 기본: #333333 */}
        <span className={['flex-1 text-body3 font-medium truncate',
          isActive ? 'text-primary-base' : 'text-secondary-800'].join(' ')}>
          {item.label}
        </span>
        {/* 카운트 14px 500 #105aff */}
        {item.count !== undefined && (
          <span className="text-body3 font-medium text-primary-base shrink-0">{item.count}</span>
        )}
        {/* 액션 버튼 (비우기 등) 49×24 r=4 */}
        {item.actionLabel && (
          <button
            type="button"
            onClick={e => { e.stopPropagation(); item.onAction?.() }}
            className="shrink-0 h-6 px-2 rounded border border-secondary-400 bg-white text-secondary-800 text-body5 font-regular hover:bg-secondary-50 transition-colors focus:outline-none"
          >
            {item.actionLabel}
          </button>
        )}
        {/* 펼침 화살표 14×14 */}
        {hasChildren && <IcArrowTop open={isExpanded} />}
      </button>

      {/* 서브메뉴 (Atomic/_MenuSub 188×28 → ListSingleS 188×24 r=4) */}
      {hasChildren && isExpanded && (
        <div>
          {item.children!.map(sub => (
            <button
              key={sub.id}
              type="button"
              onClick={() => { onSelect(sub.id); sub.onClick?.() }}
              className="w-full flex items-center gap-1.5 h-7 px-2 rounded hover:bg-black/[0.03] transition-colors focus:outline-none"
            >
              {/* Ttitle: ic_inline + ic_list_dot + label (gap:4) */}
              <span className="flex-1 flex items-center gap-1 min-w-0">
                <IcInline />
                <IcListDot />
                <span className="text-body5 font-regular text-secondary-600 truncate">{sub.label}</span>
              </span>
              {/* 작은 뱃지 도트 4×4 */}
              {sub.badge && (
                <span className="w-1 h-1 rounded-full bg-negative-dangerPoint shrink-0 mr-1" />
              )}
              {/* 카운트 12px 500 #105aff */}
              {sub.count !== undefined && (
                <span className="text-body5 font-medium text-primary-base shrink-0">{sub.count}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── SNB ──────────────────────────────────────────────────────────────────────

export const SNB: React.FC<SNBProps> = ({
  variant = 'default',
  groups = [],
  activeId,
  onSelect,
  primaryAction,
  secondaryAction,
  quickMenus,
  bottomItems,
  className = '',
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    const init = new Set<string>()
    groups.forEach(g => g.items.forEach(item => {
      if (item.children?.some(c => c.id === activeId)) init.add(item.id)
    }))
    return init
  })

  const [openCategories, setOpenCategories] = useState<Set<number>>(
    () => new Set(groups.map((_, i) => i))
  )

  useEffect(() => {
    groups.forEach(g => g.items.forEach(item => {
      if (item.children?.some(c => c.id === activeId)) {
        setExpandedIds(prev => {
          if (prev.has(item.id)) return prev
          const next = new Set(prev); next.add(item.id); return next
        })
      }
    }))
  }, [activeId, groups])

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleCategory = (idx: number) => {
    setOpenCategories(prev => {
      const next = new Set(prev)
      next.has(idx) ? next.delete(idx) : next.add(idx)
      return next
    })
  }

  const bg = variant === '2depth' ? 'bg-white' : 'bg-neutral-30'

  return (
    <nav
      className={[
        'flex flex-col w-[220px] border-r border-secondary-100 h-full overflow-hidden',
        bg,
        className,
      ].filter(Boolean).join(' ')}
      aria-label="서비스 네비게이션"
    >
      {/* ── 상단 영역 ── */}
      {(primaryAction || secondaryAction || quickMenus?.length) && (
        <>
          <div className="px-4 pt-4">
            {/* 버튼 행 (188×36) */}
            {(primaryAction || secondaryAction) && (
              <div className="flex gap-1 mb-3">
                {primaryAction && (
                  <button
                    type="button"
                    onClick={primaryAction.onClick}
                    className="flex-1 h-9 rounded-md bg-primary-base text-white text-body3 font-bold hover:bg-primary-700 transition-colors focus:outline-none"
                  >
                    {primaryAction.label}
                  </button>
                )}
                {secondaryAction && (
                  <button
                    type="button"
                    onClick={secondaryAction.onClick}
                    className="flex-1 h-9 rounded-md border border-primary-base text-primary-base text-body3 font-medium hover:bg-primary-50 transition-colors focus:outline-none"
                  >
                    {secondaryAction.label}
                  </button>
                )}
              </div>
            )}

            {/* 퀵메뉴 행 (Atomic/_TopMenu 54×52) — divider로 구분 */}
            {quickMenus?.length && (
              <div className="flex items-center border-t border-secondary-100 -mx-4 px-0">
                {quickMenus.map((qm, idx) => (
                  <React.Fragment key={qm.id}>
                    {idx > 0 && <div className="w-px h-9 bg-secondary-100 shrink-0" />}
                    <button
                      type="button"
                      onClick={qm.onClick}
                      className="flex-1 flex flex-col items-center justify-center gap-0.5 h-[52px] rounded hover:bg-black/[0.03] transition-colors focus:outline-none relative"
                    >
                      <span className="relative flex items-center justify-center w-6 h-6" aria-hidden="true">
                        {qm.icon}
                        {/* BadgeNoti 4×4 도트 */}
                        {qm.badge && (
                          <span className="absolute top-0 right-0 w-1 h-1 rounded-full bg-negative-dangerPoint" />
                        )}
                      </span>
                      <span className="text-body6 font-regular text-secondary-600">{qm.label}</span>
                    </button>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
          {/* 구분선 220×1 #ededed */}
          <div className="border-b border-[#ededed]" />
        </>
      )}

      {/* ── 메뉴 그룹 ── */}
      <div className="flex-1 py-1 overflow-y-auto overflow-x-hidden">
        {groups.map((group, gIdx) => (
          <div key={gIdx}>
            {/* 카테고리 헤더 (Atomic/_MenuCate 188×32) */}
            {group.category && (
              <div className="px-4">
                <button
                  type="button"
                  onClick={() => toggleCategory(gIdx)}
                  className="w-full flex items-center justify-between h-8 focus:outline-none"
                >
                  <span className="flex items-center gap-1">
                    <IcArrowDown open={openCategories.has(gIdx)} />
                    <span className="text-body5 font-medium text-secondary-600 truncate">{group.category}</span>
                  </span>
                  <IcAddThick />
                </button>
              </div>
            )}

            {/* 아이템 목록 */}
            {(!group.category || openCategories.has(gIdx)) && group.items.map(item => (
              <MenuRow
                key={item.id}
                item={item}
                isActive={activeId === item.id || Boolean(item.children?.some(c => c.id === activeId))}
                isExpanded={expandedIds.has(item.id)}
                onToggle={() => toggleExpand(item.id)}
                onSelect={id => onSelect?.(id)}
              />
            ))}

            {/* 그룹 구분선 188×1 #ededed */}
            {gIdx < groups.length - 1 && (
              <div className="border-b border-[#ededed] mx-4 my-1" />
            )}
          </div>
        ))}
      </div>

      {/* ── 하단 고정 영역 ── */}
      {bottomItems?.length && (
        <div className="border-t border-[#ededed] py-1">
          {bottomItems.map(item => (
            <MenuRow
              key={item.id}
              item={item}
              isActive={activeId === item.id}
              isExpanded={expandedIds.has(item.id)}
              onToggle={() => toggleExpand(item.id)}
              onSelect={id => onSelect?.(id)}
            />
          ))}
        </div>
      )}
    </nav>
  )
}

export default SNB

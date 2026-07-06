import React, { useState, useEffect } from 'react'

// ─── Figma specs ──────────────────────────────────────────────────────────────
// theme='light' (LNB — Local Navigation Bar):
//   bg #f7f8fa (neutral-30), right border #e1e1e1, width 220px
//   1-depth: h-9 (36px), icon 18×18, text 14px Medium #333333
//   2-depth: h-7 (28px), icon dot, text 12px Regular #777777
//   active: primary-50 bg, primary-base text
//
// theme='dark' (GNB — Global Navigation Bar):
//   bg #222222, width collapsed 48px / expanded 200px
//   Items: icon 24×24 + text 14px Medium #b4b4b4
//   Icon spacing: 40px between centers
//
// 2-depth sub: outer 188×28 (h-7), inner 24px, r:4
//   Dot icon: 14×14, Text: 12px Regular #777777
//   Count:    12px Medium #105aff
//
// Divider between groups: #ededed 1px
// Collapsed: w-14 (icon only)

export interface LNBSubItem {
  id: string
  label: string
  href?: string
  onClick?: () => void
  badge?: number | string
  count?: number
}

export interface LNBItem {
  id: string
  label: string
  icon?: React.ReactNode
  href?: string
  onClick?: () => void
  badge?: number | string
  count?: number
  children?: LNBSubItem[]
}

export interface LNBProps {
  items: LNBItem[]
  activeId?: string
  onSelect?: (id: string) => void
  collapsed?: boolean
  onToggleCollapse?: () => void
  variant?: 'default' | '2depth'
  /** 'light': 흰 배경 로컬 nav (기본) / 'dark': #222222 다크 GNB */
  theme?: 'light' | 'dark'
  /** dark 모드 전용 — 펼쳤을 때 상단에 표시할 로고 */
  logo?: React.ReactNode
  /** dark 모드 전용 — 접었을 때 상단에 표시할 로고 아이콘 */
  collapsedLogo?: React.ReactNode
  /** dark 모드 전용 — 상단 퀵 메뉴 (서비스 맵, AI 어시스트 등) */
  topItems?: LNBItem[]
  /** dark 모드 전용 — 하단 고정 메뉴 (설치형 WEHAGO, 도움말, 설정 등) */
  bottomItems?: LNBItem[]
  className?: string
}

// ─── Chevron icon ─────────────────────────────────────────────────────────────

const ChevronIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    width="14" height="14" viewBox="0 0 14 14" fill="none"
    className={['flex-shrink-0 transition-transform duration-200 ml-auto', open ? 'rotate-180' : ''].join(' ')}
    aria-hidden="true"
  >
    <path d="M3 5L7 9L11 5" stroke="#777777" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ─── Tooltip (collapsed mode) ─────────────────────────────────────────────────

const Tooltip: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => {
  const [visible, setVisible] = useState(false)
  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className="absolute left-full ml-2 z-50 whitespace-nowrap rounded bg-secondary-900 text-white text-body5 px-2 py-1 pointer-events-none"
        >
          {label}
          <span className="absolute top-1/2 -translate-y-1/2 right-full border-4 border-transparent border-r-secondary-900" aria-hidden="true" />
        </div>
      )}
    </div>
  )
}

// ─── LNB ──────────────────────────────────────────────────────────────────────

// ─── Dark GNB item button ─────────────────────────────────────────────────────

const DarkItem: React.FC<{
  item: LNBItem
  isActive: boolean
  collapsed: boolean
  onSelect?: (id: string) => void
}> = ({ item, isActive, collapsed, onSelect }) => (
  <button
    type="button"
    onClick={() => { onSelect?.(item.id); item.onClick?.() }}
    className={[
      'flex items-center h-10 w-full transition-colors duration-150 focus:outline-none',
      collapsed ? 'justify-center px-3' : 'gap-3 px-4',
      isActive ? 'text-white bg-white/10' : 'text-[#b4b4b4] hover:text-white hover:bg-white/[0.06]',
    ].join(' ')}
    aria-current={isActive ? 'page' : undefined}
  >
    {item.icon && (
      <span className="w-6 h-6 flex items-center justify-center shrink-0" aria-hidden="true">
        {item.icon}
      </span>
    )}
    {!collapsed && (
      <span className="text-body3 font-medium truncate">{item.label}</span>
    )}
  </button>
)

export const LNB: React.FC<LNBProps> = ({
  items,
  activeId,
  onSelect,
  collapsed = false,
  onToggleCollapse,
  variant = 'default',
  theme = 'light',
  logo,
  collapsedLogo,
  topItems,
  bottomItems,
  className = '',
}) => {
  // ─── Dark GNB mode ──────────────────────────────────────────────────────────
  // Figma Type=Default (48px collapsed) / Type=Open (200px)
  // bg #222222, item h=40px, icon 24×24, text 14px Medium #b4b4b4
  if (theme === 'dark') {
    return (
      <nav
        className={[
          'flex flex-col bg-[#222222] overflow-hidden transition-all duration-300',
          collapsed ? 'w-12' : 'w-[200px]',
          className,
        ].filter(Boolean).join(' ')}
        aria-label="글로벌 네비게이션"
      >
        {/* 상단 로고 영역 */}
        {(logo || collapsedLogo) && (
          <div className={['flex items-center py-3', collapsed ? 'justify-center px-3' : 'px-4'].join(' ')}>
            {collapsed ? collapsedLogo : logo}
          </div>
        )}

        {/* 상단 퀵 메뉴 (서비스 맵, AI 어시스트) */}
        {topItems?.map(item => (
          <DarkItem key={item.id} item={item} isActive={activeId === item.id} collapsed={collapsed} onSelect={onSelect} />
        ))}

        {/* 구분선 */}
        {(topItems?.length || logo || collapsedLogo) && (
          <div className="border-t border-white/10 my-1" />
        )}

        {/* 메인 메뉴 (스크롤) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-1">
          {items.map(item => (
            <DarkItem key={item.id} item={item} isActive={activeId === item.id} collapsed={collapsed} onSelect={onSelect} />
          ))}
        </div>

        {/* 구분선 */}
        {(bottomItems?.length || onToggleCollapse) && (
          <div className="border-t border-white/10 my-1" />
        )}

        {/* 하단 유틸 메뉴 */}
        {bottomItems?.map(item => (
          <DarkItem key={item.id} item={item} isActive={activeId === item.id} collapsed={collapsed} onSelect={onSelect} />
        ))}

        {/* 펼침/접힘 토글 버튼 */}
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className={[
              'flex items-center h-10 w-full text-[#b4b4b4] hover:text-white hover:bg-white/[0.06] transition-colors focus:outline-none',
              collapsed ? 'justify-center px-3' : 'px-4',
            ].join(' ')}
            aria-label={collapsed ? '펼치기' : '접기'}
          >
            {collapsed ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5.25971 3.21967C5.5526 2.92678 6.02736 2.92678 6.32026 3.21967L14.5703 11.4697L14.622 11.5263C14.8623 11.8209 14.8448 12.2556 14.5703 12.5302L6.32026 20.7802C6.02738 21.0731 5.55261 21.0731 5.25971 20.7802C4.96682 20.4873 4.96682 20.0126 5.25971 19.7197L12.9794 11.9999L5.25971 4.28022C4.96682 3.98732 4.96682 3.51256 5.25971 3.21967Z" fill="currentColor"/>
                <path d="M10.413 3.21967C10.7059 2.92678 11.1807 2.92678 11.4736 3.21967L19.7236 11.4697L19.7753 11.5263C20.0156 11.8209 19.9982 12.2556 19.7236 12.5302L11.4736 20.7802C11.1807 21.0731 10.7059 21.0731 10.413 20.7802C10.1201 20.4873 10.1201 20.0126 10.413 19.7197L18.1328 11.9999L10.413 4.28022C10.1201 3.98732 10.1201 3.51256 10.413 3.21967Z" fill="currentColor"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12.5304 3.21967C12.8233 2.92678 13.298 2.92678 13.5909 3.21967C13.8838 3.51256 13.8838 3.98732 13.5909 4.28022L5.87119 11.9999L13.5909 19.7197C13.8838 20.0126 13.8838 20.4873 13.5909 20.7802C13.298 21.0731 12.8232 21.0731 12.5304 20.7802L4.28037 12.5302C4.00578 12.2556 3.98835 11.8209 4.22861 11.5263L4.28037 11.4697L12.5304 3.21967Z" fill="currentColor"/>
                <path d="M17.6827 3.21967C17.9756 2.92678 18.4504 2.92678 18.7433 3.21967C19.0361 3.51256 19.0361 3.98732 18.7433 4.28022L11.0235 11.9999L18.7433 19.7197C19.0361 20.0126 19.0361 20.4873 18.7433 20.7802C18.4504 21.0731 17.9756 21.0731 17.6827 20.7802L9.43271 12.5302C9.15812 12.2556 9.14069 11.8209 9.38095 11.5263L9.43271 11.4697L17.6827 3.21967Z" fill="currentColor"/>
              </svg>
            )}
          </button>
        )}
      </nav>
    )
  }
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    const init = new Set<string>()
    items.forEach(item => {
      if (item.children?.some(c => c.id === activeId)) init.add(item.id)
    })
    return init
  })

  useEffect(() => {
    items.forEach(item => {
      if (item.children?.some(c => c.id === activeId)) {
        setExpandedIds(prev => {
          if (prev.has(item.id)) return prev
          const next = new Set(prev)
          next.add(item.id)
          return next
        })
      }
    })
  }, [activeId, items])

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // ─── Light mode (기존 흰 LNB) ─────────────────────────────────────────────
  const bgClass = variant === 'default' ? 'bg-neutral-30' : 'bg-white'

  return (
    <nav
      className={[
        'flex flex-col h-full border-r border-secondary-100 overflow-y-auto overflow-x-hidden transition-all duration-300 py-2',
        bgClass,
        collapsed ? 'w-14' : 'w-[220px]',
        className,
      ].filter(Boolean).join(' ')}
      aria-label="주 네비게이션"
    >
      {items.map((item, idx) => {
        const hasChildren = Boolean(item.children?.length)
        const isExpanded = expandedIds.has(item.id)
        const isActive = activeId === item.id
        const isChildActive = Boolean(item.children?.some(c => c.id === activeId))

        const menuRow = (
          <button
            type="button"
            onClick={() => {
              if (hasChildren) toggleExpand(item.id)
              onSelect?.(item.id)
              item.onClick?.()
            }}
            className={[
              // 외부 높이 36px, 좌우 margin 16px, cornerRadius 4
              'w-full flex items-center gap-2 mx-4 rounded',
              'text-body3 font-medium transition-colors duration-150',
              'focus:outline-none',
              collapsed ? 'px-1 justify-center w-10 mx-2' : 'px-1.5',
              'h-9',
              isActive || isChildActive
                ? 'bg-primary-50 text-primary-base'
                : 'text-secondary-800 hover:bg-black/[0.03]',
            ].join(' ')}
            aria-current={isActive ? 'page' : undefined}
            aria-expanded={hasChildren ? isExpanded : undefined}
            style={{ width: collapsed ? undefined : 'calc(100% - 2rem)' }}
          >
            {item.icon && (
              <span className="w-[18px] h-[18px] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                {item.icon}
              </span>
            )}
            {!collapsed && (
              <>
                <span className="flex-1 text-left truncate">{item.label}</span>
                {item.count !== undefined && (
                  <span className="text-body3 font-medium text-primary-base flex-shrink-0">{item.count}</span>
                )}
                {item.badge !== undefined && (
                  <span className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-negative-dangerPoint text-white text-[9px] font-bold">
                      {item.badge}
                    </span>
                  </span>
                )}
                {hasChildren && <ChevronIcon open={isExpanded} />}
              </>
            )}
          </button>
        )

        return (
          <div key={item.id}>
            {collapsed ? (
              <Tooltip label={item.label}>{menuRow}</Tooltip>
            ) : menuRow}

            {/* 2-depth sub items */}
            {hasChildren && !collapsed && (
              <div
                className={[
                  'overflow-hidden transition-all duration-200',
                  isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
                ].join(' ')}
                aria-hidden={!isExpanded}
              >
                {item.children!.map(child => {
                  const isChildSelected = activeId === child.id
                  return (
                    <button
                      key={child.id}
                      type="button"
                      onClick={() => {
                        onSelect?.(child.id)
                        child.onClick?.()
                      }}
                      className={[
                        // 2-depth: 28px 높이, 좌측 indent(dot + 14px icon area)
                        'w-full flex items-center gap-1 h-7 rounded',
                        'text-body5 transition-colors duration-150 focus:outline-none',
                        'focus-visible:ring-2 focus-visible:ring-primary-base',
                        'pl-10 pr-2',   // indent to align after parent icon
                        isChildSelected
                          ? 'text-primary-base font-medium bg-primary-50'
                          : 'text-secondary-600 font-regular hover:bg-black/[0.03]',
                      ].join(' ')}
                      style={{ width: 'calc(100% - 2rem)', marginLeft: '1rem', marginRight: '1rem' }}
                      aria-current={isChildSelected ? 'page' : undefined}
                    >
                      {/* 3-dot icon placeholder */}
                      <span className="flex-shrink-0 w-1 h-1 rounded-full bg-current opacity-50" aria-hidden="true" />
                      <span className="flex-1 text-left truncate">{child.label}</span>
                      {child.count !== undefined && (
                        <span className="text-body5 font-medium text-primary-base flex-shrink-0">{child.count}</span>
                      )}
                      {child.badge !== undefined && (
                        <span className="inline-flex items-center justify-center w-1 h-1 rounded-full bg-negative-dangerPoint flex-shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>
            )}

            {/* 그룹 구분선 */}
            {idx < items.length - 1 && (
              <div className="mx-4 border-b border-[#ededed] my-1" />
            )}
          </div>
        )
      })}
    </nav>
  )
}

export default LNB

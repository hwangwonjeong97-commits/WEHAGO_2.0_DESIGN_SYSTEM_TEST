import React from 'react'
import { Avatar } from '../Avatar/Avatar'
import { Badge } from '../Badge/Badge'

// ─── Figma specs ──────────────────────────────────────────────────────────────
// listWrap: bg=#ffffff, stroke=#d3d3d3, r=8, overflow:hidden
// 행 구분선: 1px #ededed (마지막 행 제외)
// 행 좌우 padding: 12px
//
// CheckboxList (h=32): Checkbox(14×14 r=4) + text(14px #333 truncate)
//   선택: bg rgba(#105aff, 0.05) · Checkbox fill=#719bfc
//   hover: bg rgba(#000, 0.03)
//
// IconList (h=36): icon(18×18) + text(14px #333 truncate) + ic_close(14×14)
//
// ProfileList (h=40): Avatar(24×24 r=10) + BadgeMe(선택) + text(14px #333) + BadgeAuth + ic_close

// ─── 공통 컨테이너 ────────────────────────────────────────────────────────────

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ background: '#fff', border: '1px solid #d3d3d3', borderRadius: 8, overflow: 'hidden' }}>
    {children}
  </div>
)

// ─── Checkbox (Figma: 14×14 r=4) ─────────────────────────────────────────────

const ListCheckbox: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    onClick={e => { e.stopPropagation(); onChange() }}
    className="flex items-center justify-center shrink-0 transition-colors focus:outline-none"
    style={{
      width: 14, height: 14, borderRadius: 4,
      backgroundColor: checked ? '#719bfc' : '#ffffff',
      border: checked ? 'none' : '1px solid #d3d3d3',
    }}
  >
    {checked && (
      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
        <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </button>
)

// ─── ic_close 14×14 ───────────────────────────────────────────────────────────

const IcClose: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button
    type="button"
    onClick={e => { e.stopPropagation(); onClick?.() }}
    className="shrink-0 text-secondary-300 hover:text-secondary-600 transition-colors focus:outline-none"
    aria-label="삭제"
  >
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  </button>
)

// ─── BadgeMe (18×18, #a5b2ea, "나") ──────────────────────────────────────────

const BadgeMe: React.FC = () => (
  <span
    className="inline-flex items-center justify-center shrink-0 rounded-full text-white font-bold text-[11px]"
    style={{ width: 18, height: 18, backgroundColor: '#a5b2ea' }}
    aria-label="나"
  >
    나
  </span>
)

// ─── Row 공통 래퍼 ────────────────────────────────────────────────────────────

const Row: React.FC<{
  height: number
  isLast: boolean
  selected?: boolean
  children: React.ReactNode
}> = ({ height, isLast, selected, children }) => (
  <div
    className="flex items-center gap-2 hover:bg-black/[0.03] transition-colors"
    style={{
      height,
      paddingLeft: 12,
      paddingRight: 12,
      borderBottom: isLast ? 'none' : '1px solid #ededed',
      backgroundColor: selected ? 'rgba(16,90,255,0.05)' : undefined,
    }}
  >
    {children}
  </div>
)

// ─── CheckboxList ─────────────────────────────────────────────────────────────
// Figma: h=32, Checkbox(14×14) + text 14px #333 truncate

export interface CheckboxItem {
  id: string
  label: string
}

export interface CheckboxListProps {
  items: CheckboxItem[]
  selectedIds?: string[]
  onSelectionChange?: (ids: string[]) => void
}

export const CheckboxList: React.FC<CheckboxListProps> = ({
  items,
  selectedIds = [],
  onSelectionChange,
}) => {
  const toggle = (id: string) => {
    if (!onSelectionChange) return
    onSelectionChange(
      selectedIds.includes(id)
        ? selectedIds.filter(s => s !== id)
        : [...selectedIds, id]
    )
  }

  return (
    <Wrap>
      {items.map((item, idx) => (
        <Row key={item.id} height={32} isLast={idx === items.length - 1} selected={selectedIds.includes(item.id)}>
          <ListCheckbox checked={selectedIds.includes(item.id)} onChange={() => toggle(item.id)} />
          <span className="flex-1 truncate text-body3 text-secondary-800">{item.label}</span>
        </Row>
      ))}
    </Wrap>
  )
}

// ─── IconList ─────────────────────────────────────────────────────────────────
// Figma: h=36, icon(18×18) + text 14px #333 truncate + ic_close(14×14)

export interface IconItem {
  id: string
  label: string
  icon: React.ReactNode
}

export interface IconListProps {
  items: IconItem[]
  onClose?: (id: string) => void
}

export const IconList: React.FC<IconListProps> = ({ items, onClose }) => (
  <Wrap>
    {items.map((item, idx) => (
      <Row key={item.id} height={36} isLast={idx === items.length - 1}>
        <span className="shrink-0">{item.icon}</span>
        <span className="flex-1 truncate text-body3 text-secondary-800">{item.label}</span>
        <IcClose onClick={() => onClose?.(item.id)} />
      </Row>
    ))}
  </Wrap>
)

// ─── ProfileList ──────────────────────────────────────────────────────────────
// Figma: h=40, Avatar(24×24 r=10) + BadgeMe(선택) + text + BadgeAuth + ic_close

export interface ProfileItem {
  id: string
  label: string
  avatarSrc?: string
  avatarName: string
  isMe?: boolean
  role?: 'master' | 'user' | 'guest'
}

export interface ProfileListProps {
  items: ProfileItem[]
  onClose?: (id: string) => void
}

export const ProfileList: React.FC<ProfileListProps> = ({ items, onClose }) => (
  <Wrap>
    {items.map((item, idx) => (
      <Row key={item.id} height={40} isLast={idx === items.length - 1}>
        <Avatar name={item.avatarName} src={item.avatarSrc} size="xs" />
        {item.isMe && <BadgeMe />}
        <span className="flex-1 truncate text-body3 text-secondary-800">{item.label}</span>
        {item.role && <Badge variant="auth" type={item.role} />}
        <IcClose onClick={() => onClose?.(item.id)} />
      </Row>
    ))}
  </Wrap>
)

// ─── 하위 호환 List (기존 코드용) ─────────────────────────────────────────────

export default CheckboxList
export { CheckboxList as List }

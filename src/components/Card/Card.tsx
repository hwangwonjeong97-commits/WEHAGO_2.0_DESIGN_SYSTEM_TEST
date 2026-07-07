import React, { useState } from 'react'

// ─── Figma 'Card' 스펙 (node 1:1462) ─────────────────────────────────────────
// Type=ListCardSingle | ListCardDouble,  State=Default | Reorder
// 공통: radius 8, border #e1e1e1, bg Default #ffffff / Reorder #f7f8fa, padding 0 16
// Single: h48, ic_doc 18 + label(14px #333)
// Double: h56, radio(14) + avatar(32) + context + role badge(마스터)

type CardType = 'single' | 'double'
type CardState = 'default' | 'reorder'

export interface CardProps {
  type?: CardType
  state?: CardState
  // single
  label?: string
  // double
  title?: string
  me?: boolean
  memberCount?: number
  date?: string
  time?: string
  role?: string
  avatarSrc?: string
}

// ─── icons ─────────────────────────────────────────────────────────────────
// Figma 원본 ic_doc (18×18, #4A4A4A)
const IcDoc = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M12.2476 11.4375C12.5582 11.4376 12.8101 11.6894 12.8101 12C12.8101 12.3106 12.5582 12.5624 12.2476 12.5625H5.75244C5.44178 12.5625 5.18994 12.3107 5.18994 12C5.18994 11.6893 5.44178 11.4375 5.75244 11.4375H12.2476Z" fill="#4A4A4A"/>
    <path d="M12.2476 8.4375C12.5582 8.43756 12.8101 8.68938 12.8101 9C12.8101 9.31062 12.5582 9.56244 12.2476 9.5625H5.75244C5.44178 9.5625 5.18994 9.31066 5.18994 9C5.18994 8.68934 5.44178 8.4375 5.75244 8.4375H12.2476Z" fill="#4A4A4A"/>
    <path d="M9.86719 5.44043C10.151 5.46911 10.3726 5.70867 10.3726 6C10.3726 6.29133 10.151 6.53089 9.86719 6.55957L9.81006 6.5625H5.75244C5.44178 6.5625 5.18994 6.31066 5.18994 6C5.18994 5.68934 5.44178 5.4375 5.75244 5.4375H9.81006L9.86719 5.44043Z" fill="#4A4A4A"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M13.5374 2.25C14.7593 2.25 15.75 3.24072 15.75 4.46265V13.5374C15.75 14.7593 14.7593 15.75 13.5374 15.75H4.46265C3.24072 15.75 2.25 14.7593 2.25 13.5374V4.46265C2.25 3.24072 3.24072 2.25 4.46265 2.25H13.5374ZM4.46265 3.375C3.86204 3.375 3.375 3.86204 3.375 4.46265V13.5374C3.375 14.138 3.86204 14.625 4.46265 14.625H13.5374C14.138 14.625 14.625 14.138 14.625 13.5374V4.46265C14.625 3.86204 14.138 3.375 13.5374 3.375H4.46265Z" fill="#4A4A4A"/>
  </svg>
)
// Figma 원본 ic_usergroup_fill (14×14, #BFC7D8)
const IcUserGroup = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M10.4328 7.63632C11.7702 7.70398 12.8339 8.81023 12.8339 10.1645V11.4958C12.8338 11.7164 12.6546 11.8951 12.434 11.8951H8.87874C8.9758 11.0091 8.96546 10.292 8.86564 9.45354C8.78858 8.80683 8.47507 8.25878 8.13932 7.85564C8.10938 7.8197 8.07818 7.78546 8.04761 7.75139C8.28858 7.67533 8.54486 7.63348 8.81095 7.63347H10.3029L10.4328 7.63632Z" fill="#BFC7D8"/>
    <path d="M9.57601 3.21005C10.623 3.21005 11.4718 4.05885 11.4718 5.10589C11.4718 6.15293 10.623 7.00172 9.57601 7.00172C8.52897 7.00172 7.68018 6.15293 7.68018 5.10589C7.68018 4.05885 8.52897 3.21005 9.57601 3.21005Z" fill="#BFC7D8"/>
    <path d="M5.71297 7.233C6.31042 7.26322 6.85782 7.48282 7.29663 7.83286C7.42007 7.9361 7.55772 8.06881 7.69141 8.22934C7.97988 8.57578 8.227 9.02155 8.2867 9.52304C8.38381 10.3389 8.39258 11.0253 8.29297 11.8951H1.604C1.3624 11.8951 1.16654 11.6992 1.1665 11.4576V10.0004C1.1665 8.47013 2.40705 7.22958 3.93734 7.22958H5.57056L5.71297 7.233Z" fill="#BFC7D8"/>
    <path d="M4.75423 2.33334C5.96235 2.33334 6.94173 3.31272 6.94173 4.52084C6.94173 5.72897 5.96235 6.70834 4.75423 6.70834C3.54611 6.70834 2.56673 5.72897 2.56673 4.52084C2.56673 3.31272 3.54611 2.33334 4.75423 2.33334Z" fill="#BFC7D8"/>
  </svg>
)
// Figma 원본 ic_time (14×14, #777777)
const IcTime = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M6.99984 4.24055C7.24146 4.24055 7.43734 4.43643 7.43734 4.67805V6.81884L9.35083 8.73233C9.52168 8.90319 9.52168 9.1807 9.35083 9.35155C9.18001 9.52223 8.903 9.52223 8.73218 9.35155L6.69051 7.30989C6.60853 7.2279 6.56241 7.1165 6.56234 7.00056V4.67805C6.56234 4.43643 6.75821 4.24055 6.99984 4.24055Z" fill="#777777"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M6.99984 1.16666C10.2215 1.16666 12.8332 3.77833 12.8332 6.99999C12.8332 10.2217 10.2215 12.8333 6.99984 12.8333C3.77818 12.8333 1.1665 10.2217 1.1665 6.99999C1.1665 3.77833 3.77818 1.16666 6.99984 1.16666ZM6.99984 2.04166C4.26143 2.04166 2.0415 4.26158 2.0415 6.99999C2.0415 9.7384 4.26143 11.9583 6.99984 11.9583C9.73825 11.9583 11.9582 9.7384 11.9582 6.99999C11.9582 4.26158 9.73825 2.04166 6.99984 2.04166Z" fill="#777777"/>
  </svg>
)
const IcCrown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M1.5 3.6l1.9 1.7L6 2.2l2.6 3.1 1.9-1.7-.8 5.2H2.3L1.5 3.6Z" fill="#fff" />
  </svg>
)

const cardBase: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  borderRadius: 8,
  border: '1px solid #e1e1e1',
  padding: '0 16px',
  boxSizing: 'border-box',
  width: '100%',
}

export const Card: React.FC<CardProps> = ({
  type = 'single',
  state = 'default',
  label = 'card list item',
  title = '김더존님의 미팅룸',
  me = true,
  memberCount = 1,
  date = '26.01.10',
  time = '09:00~12:00',
  role = '마스터',
  avatarSrc = '/Profile-image.png',
}) => {
  const [hovered, setHovered] = useState(false)
  const [selected, setSelected] = useState(false)

  // 디자인 시스템 상호작용 토큰 (List/Table 공통):
  //   hover=rgba(0,0,0,0.03) · selected=rgba(16,90,255,0.05) · reorder=#f7f8fa(고정)
  const bg =
    state === 'reorder'
      ? '#f7f8fa'
      : selected
      ? 'rgba(16,90,255,0.05)'
      : hovered
      ? 'rgba(0,0,0,0.03)'
      : '#ffffff'
  const hoverProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  }

  // Reorder 상태: 내부 Slot/Item content opacity 40%
  const slotOpacity = state === 'reorder' ? 0.4 : 1

  if (type === 'single') {
    return (
      <div style={{ ...cardBase, height: 48, background: bg, cursor: 'pointer' }} {...hoverProps}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, opacity: slotOpacity }}>
          <IcDoc />
          <span style={{ fontSize: 14, color: '#333333', letterSpacing: '-0.5px' }}>{label}</span>
        </div>
      </div>
    )
  }

  return (
    <div
      role="checkbox"
      aria-checked={selected}
      style={{ ...cardBase, height: 56, background: bg, cursor: 'pointer' }}
      {...hoverProps}
      onClick={() => setSelected((s) => !s)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', minWidth: 0, opacity: slotOpacity }}>
      {/* radio — 선택 시 #719bfc 채움 + 흰 점 6×6 (디자인 시스템 Radio 스펙) */}
      <span
        style={{
          width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: selected ? '#719bfc' : '#fff',
          border: selected ? 'none' : '1px solid #d3d3d3',
          boxSizing: 'border-box',
        }}
      >
        {selected && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
      </span>
      {/* avatar */}
      <span style={{ position: 'relative', flexShrink: 0 }}>
        <img src={avatarSrc} alt="" width={32} height={32} style={{ borderRadius: 12, display: 'block', objectFit: 'cover', border: '1px solid rgba(0,0,0,0.06)', boxSizing: 'border-box' }} />
        <span style={{ position: 'absolute', right: -1, bottom: -1, width: 8, height: 8, borderRadius: '50%', background: '#6cd3ff', border: '1.5px solid #fff' }} />
      </span>
      {/* context */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0 }}>
          {me && (
            <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#a5b2ea', color: '#fff', fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>나</span>
          )}
          <span style={{ fontSize: 14, fontWeight: 500, color: '#333333', letterSpacing: '-0.5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
            <IcUserGroup />
            <span style={{ fontSize: 12, color: '#777777' }}>{memberCount}</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <IcTime />
          <span style={{ fontSize: 12, color: '#777777', letterSpacing: '-0.5px' }}>{date}</span>
          {/* 날짜↔시간 divider 1×10 #E1E1E1 */}
          <span aria-hidden="true" style={{ width: 1, height: 10, backgroundColor: '#e1e1e1', flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: '#777777', letterSpacing: '-0.5px' }}>{time}</span>
        </div>
      </div>
      {/* role badge */}
      {role && (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, height: 20, padding: '0 6px', borderRadius: 9999, background: '#ffa000', color: '#fff', flexShrink: 0 }}>
          <IcCrown />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '-0.5px' }}>{role}</span>
        </span>
      )}
      </div>
    </div>
  )
}

export default Card

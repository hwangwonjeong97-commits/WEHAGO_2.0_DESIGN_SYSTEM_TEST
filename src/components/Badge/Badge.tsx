import React, { forwardRef, HTMLAttributes } from 'react'

// ─── BadgeNoti (알림 카운트 — 항상 빨간색) ────────────────────────────────────

interface BadgeNotiProps extends HTMLAttributes<HTMLSpanElement> {
  variant: 'noti'
  count?: number
  max?: number
  dot?: boolean
}

// ─── BadgeAuth (권한 뱃지) ────────────────────────────────────────────────────

interface BadgeAuthProps extends HTMLAttributes<HTMLSpanElement> {
  variant: 'auth'
  type: 'master' | 'user' | 'guest'
}

// ─── Badge (상태 라벨) ─────────────────────────────────────────────────────────

interface BadgeLabelProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'label'
  type?: 'default' | 'info' | 'positive' | 'negative'
  label?: string
  children?: React.ReactNode
}

type BadgeProps = BadgeNotiProps | BadgeAuthProps | BadgeLabelProps

// ─── Auth badge icons ─────────────────────────────────────────────────────────

// ic_master_fill 12×12 — 피그마 원본
const IcMasterFill: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M5.85742 3.20459C5.93388 3.17787 6.01706 3.17358 6.0957 3.19141C6.15859 3.20567 6.2188 3.23407 6.27051 3.27686C6.29626 3.29816 6.31992 3.32319 6.34082 3.35156L6.37402 3.40381L7.84863 6.14258L9.79053 4.32227C9.91797 4.20281 10.0804 4.18229 10.2183 4.22998C10.3216 4.26572 10.4105 4.34021 10.4614 4.43994C10.4979 4.51136 10.5153 4.59555 10.5029 4.68848L10.4844 4.82715V4.82812L9.79443 10.001C9.75635 10.2866 9.51275 10.4999 9.22461 10.5H9.1875C9.18528 10.5 9.18289 10.5005 9.18066 10.5005H2.81836C2.81449 10.5005 2.8105 10.5001 2.80664 10.5H2.7749C2.48683 10.4999 2.24267 10.2865 2.20459 10.001L1.51514 4.82812L1.51465 4.82715L1.49658 4.68848C1.48121 4.57249 1.51078 4.46933 1.56787 4.38867C1.59067 4.35643 1.61804 4.32777 1.64844 4.30322C1.66361 4.29098 1.67965 4.27964 1.69629 4.26953C1.7964 4.20871 1.92071 4.18779 2.03809 4.22266C2.05767 4.22847 2.07713 4.23612 2.09619 4.24512C2.11509 4.25405 2.13375 4.26466 2.15186 4.27686L2.2085 4.32227L4.1499 6.14307L5.62549 3.40381L5.65869 3.35156C5.69033 3.30858 5.72855 3.27384 5.77051 3.24707C5.79801 3.22951 5.8272 3.21519 5.85742 3.20459Z" fill="white"/>
    <path d="M1.7002 2.5C2.0867 2.50011 2.3999 2.81366 2.3999 3.2002C2.3998 3.58664 2.08664 3.8998 1.7002 3.8999C1.31366 3.8999 1.00011 3.5867 1 3.2002C1 2.8136 1.3136 2.5 1.7002 2.5Z" fill="white"/>
    <path d="M10.3003 2.5C10.6868 2.50011 11 2.81366 11 3.2002C10.9999 3.58664 10.6867 3.8998 10.3003 3.8999C9.91376 3.8999 9.6002 3.5867 9.6001 3.2002C9.6001 2.8136 9.91369 2.5 10.3003 2.5Z" fill="white"/>
    <path d="M6 1.5C6.38651 1.50011 6.69971 1.81366 6.69971 2.2002C6.6996 2.58664 6.38644 2.8998 6 2.8999C5.61347 2.8999 5.29991 2.5867 5.2998 2.2002C5.2998 1.8136 5.6134 1.5 6 1.5Z" fill="white"/>
  </svg>
)

// ic_user_fill 12×12 — 피그마 원본
const IcUserFill: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M6 1C7.24264 1 8.25 2.00736 8.25 3.25C8.25 4.49264 7.24264 5.5 6 5.5C4.75736 5.5 3.75 4.49264 3.75 3.25C3.75 2.00736 4.75736 1 6 1Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M6.94434 6.5C8.90802 6.5 10.5 8.09198 10.5 10.0557C10.4999 10.301 10.301 10.4999 10.0557 10.5H1.94434C1.69896 10.4999 1.50006 10.301 1.5 10.0557C1.5 8.09198 3.09198 6.5 5.05566 6.5H6.94434ZM5.85156 10.0649C5.86782 10.0962 5.88458 10.1271 5.90186 10.1577C5.88823 10.1271 5.8715 10.0961 5.85156 10.0649Z" fill="white"/>
  </svg>
)

// ic_link 12×12 — 피그마 원본
const IcLink: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M5.0752 3.375C5.28221 3.37511 5.4502 3.54296 5.4502 3.75C5.4502 3.95704 5.28221 4.12489 5.0752 4.125H3.53369C3.06585 4.125 2.6136 4.31849 2.27783 4.66846C1.94154 5.01901 1.75 5.49781 1.75 6L1.75244 6.09375C1.77469 6.56144 1.96253 7.00288 2.27783 7.33154C2.61361 7.68151 3.06587 7.875 3.53369 7.875H5.0752C5.28221 7.87511 5.4502 8.04296 5.4502 8.25C5.4502 8.45704 5.28221 8.62489 5.0752 8.625H3.53369C2.85667 8.625 2.21061 8.34441 1.73682 7.85059C1.26352 7.35722 1 6.69129 1 6C1 5.30872 1.26352 4.64278 1.73682 4.14941C2.21062 3.65557 2.85668 3.375 3.53369 3.375H5.0752Z" fill="white"/>
    <path d="M8.46729 3.375C9.14435 3.375 9.79036 3.65553 10.2642 4.14941C10.7375 4.64278 11.001 5.30871 11.001 6C11.001 6.69129 10.7375 7.35722 10.2642 7.85059C9.79036 8.34447 9.14435 8.625 8.46729 8.625H6.92578C6.71867 8.625 6.55078 8.45711 6.55078 8.25C6.55078 8.04289 6.71867 7.875 6.92578 7.875H8.46729C8.93515 7.875 9.38736 7.68157 9.72314 7.33154C10.0594 6.98099 10.251 6.50218 10.251 6C10.251 5.49782 10.0594 5.01901 9.72314 4.66846C9.38736 4.31843 8.93515 4.125 8.46729 4.125H6.92578C6.71867 4.125 6.55078 3.95711 6.55078 3.75C6.55078 3.54289 6.71867 3.375 6.92578 3.375H8.46729Z" fill="white"/>
    <path d="M8.5 5.62598C8.70711 5.62598 8.875 5.79387 8.875 6.00098C8.875 6.20808 8.70711 6.37598 8.5 6.37598H3.5C3.29289 6.37598 3.125 6.20808 3.125 6.00098C3.125 5.79387 3.29289 5.62598 3.5 5.62598H8.5Z" fill="white"/>
  </svg>
)

// ic_arrow_right 10×10 — Master·User 우측 화살표
const IcArrowRight10: React.FC = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M3.5 2L7 5L3.5 8" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// ─── Style maps ───────────────────────────────────────────────────────────────

const authConfig = {
  master: { bg: 'bg-[#ffa000]', label: '마스터', Icon: IcMasterFill, arrow: false },
  user:   { bg: 'bg-[#748ffc]', label: '참여자', Icon: IcUserFill,   arrow: false },
  guest:  { bg: 'bg-[#98a4b4]', label: '게스트', Icon: IcLink,       arrow: false },
}

// Figma Badge/State 정확 스펙 (bg / text 색)
const labelStyles = {
  default:  { bg: 'bg-[#f4f4f4]', text: 'text-[#777777]' },
  info:     { bg: 'bg-[#eff4ff]', text: 'text-[#105aff]' },
  positive: { bg: 'bg-[#daf9e1]', text: 'text-[#007e47]' },
  negative: { bg: 'bg-[#ffe8ea]', text: 'text-[#fa4553]' },
}

// ic_add 14×14 — Badge/State 선행 아이콘 (currentColor로 상태색 상속)
const IcAdd14: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 2.333v9.334M2.333 7h9.334" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

function formatCount(count: number, max?: number): string {
  if (max !== undefined && count > max) return `${max}+`
  return String(count)
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const { className = '', ...rest } = props

  // Noti variant
  if ('variant' in props && props.variant === 'noti') {
    const { count, max, dot } = props as BadgeNotiProps

    if (dot) {
      return (
        <span
          ref={ref}
          role="status"
          aria-label="알림"
          className={['block w-1 h-1 rounded-full bg-negative-dangerPoint flex-shrink-0', className].join(' ')}
          {...(rest as HTMLAttributes<HTMLSpanElement>)}
        />
      )
    }

    const display = count !== undefined ? formatCount(count, max) : ''
    const isWide = count !== undefined && count >= 10
    return (
      <span
        ref={ref}
        role="status"
        aria-label={count !== undefined ? `${count}개 알림` : '알림'}
        className={[
          'inline-flex items-center justify-center rounded-full bg-negative-dangerPoint text-white font-bold flex-shrink-0',
          'text-[9px] leading-none',
          isWide ? 'h-4 px-1 min-w-[23px]' : 'w-4 h-4',
          className,
        ].join(' ')}
        {...(rest as HTMLAttributes<HTMLSpanElement>)}
      >
        {display}
      </span>
    )
  }

  // Auth variant
  if ('variant' in props && props.variant === 'auth') {
    const { type } = props as BadgeAuthProps
    const { bg, label, Icon, arrow } = authConfig[type]
    return (
      <span
        ref={ref}
        className={[
          'inline-flex items-center gap-0.5 h-5 px-1.5 rounded-full text-[11px] font-bold text-white',
          bg, className,
        ].join(' ')}
        {...(rest as HTMLAttributes<HTMLSpanElement>)}
      >
        <Icon />
        <span>{label}</span>
        {arrow && <IcArrowRight10 />}
      </span>
    )
  }

  // Label variant (default)
  const { type = 'default', children } = props as BadgeLabelProps
  const label = ('label' in props ? (props as BadgeLabelProps).label : undefined) ?? children
  const s = labelStyles[type]
  return (
    <span
      ref={ref}
      className={[
        'inline-flex items-center gap-0.5 h-5 pl-1 pr-1.5 rounded text-[11px] font-medium',
        s.bg, s.text, className,
      ].join(' ')}
      {...(rest as HTMLAttributes<HTMLSpanElement>)}
    >
      <IcAdd14 />
      <span>{label}</span>
    </span>
  )
})

Badge.displayName = 'Badge'
export default Badge

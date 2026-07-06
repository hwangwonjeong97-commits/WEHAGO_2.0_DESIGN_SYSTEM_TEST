import React, { useEffect, useCallback } from 'react'

// ─── Figma specs ──────────────────────────────────────────────────────────────
// Dialog (448×475, r=20):
//   ic_close 18×18 — absolute top=24px right=24px
//   title section top=24px: Title 20px Bold #333 / subtitle 14px #777 gap=0
//   container gap=8px: mx=24px, inner border=#d3d3d3 r=8 p=12px
//   buttonWrap gap=8px: py=12px, buttons 58×36 gap=4px centered
//
// Alert (308×221, r=20):
//   top=20px, ic_warning 52×52 centered, gap=8px
//   Headline 18px Bold #333, gap=4px, Supporting 14px #777
//   gap=12px, buttonWrap, bottom=20px

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  type?: 'dialog' | 'alert'
  icon?: React.ReactNode
  infoContent?: React.ReactNode
  isInline?: boolean
}

const sizeMap = {
  sm: 'w-[308px]',
  md: 'w-[448px]',
  lg: 'w-[640px]',
}

// ─── ic_close 18×18 ───────────────────────────────────────────────────────────
const IcClose: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M13.8523 3.35225C14.0719 3.13258 14.428 3.13258 14.6477 3.35225C14.8673 3.57193 14.8673 3.92801 14.6477 4.14766L9.79537 8.99996L14.6477 13.8523C14.8673 14.0719 14.8673 14.428 14.6477 14.6477C14.428 14.8673 14.0719 14.8673 13.8523 14.6477L8.99996 9.79537L4.14766 14.6477C3.92801 14.8673 3.57193 14.8673 3.35225 14.6477C3.13258 14.428 3.13258 14.0719 3.35225 13.8523L8.20455 8.99996L3.35225 4.14766C3.13258 3.92799 3.13258 3.57192 3.35225 3.35225C3.57192 3.13258 3.92799 3.13258 4.14766 3.35225L8.99996 8.20455L13.8523 3.35225Z" fill="#777777"/>
  </svg>
)

// ─── ic_warning 52×52 ─────────────────────────────────────────────────────────
const IcWarning: React.FC = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
    <path d="M21.0193 7.18969C21.5167 6.32327 22.2403 5.60215 23.1159 5.10031C23.9915 4.59847 24.9875 4.33398 26.0018 4.33398C27.0161 4.33398 28.0121 4.59847 28.8877 5.10031C29.7632 5.60215 30.4868 6.32327 30.9842 7.18969L46.9351 34.9872C47.4233 35.8397 47.6755 36.8026 47.6666 37.7803C47.6577 38.7579 47.388 39.7163 46.8842 40.5602C46.3805 41.404 45.6603 42.104 44.7952 42.5906C43.93 43.0772 42.95 43.3335 41.9526 43.334H10.051C9.05267 43.334 8.07176 43.0779 7.20583 42.591C6.3399 42.1041 5.61913 41.4034 5.11524 40.5587C4.61134 39.714 4.34189 38.7547 4.33369 37.7763C4.32549 36.7978 4.57882 35.8343 5.06848 34.9816L21.0193 7.18969Z" fill="#FFA000"/>
    <path d="M25.9998 33.3675C27.5553 33.3675 28.8159 34.6283 28.8161 36.1838C28.8161 37.7394 27.5554 39 25.9998 39C24.4444 38.9998 23.1836 37.7392 23.1836 36.1838C23.1838 34.6285 24.4446 33.3677 25.9998 33.3675Z" fill="white"/>
    <path d="M25.9998 13C27.5552 13 28.8157 14.293 28.8161 15.8882V27.4452C28.8157 29.0403 27.5552 30.3333 25.9998 30.3333C24.4447 30.3331 23.184 29.0402 23.1836 27.4452V15.8882C23.184 14.2932 24.4447 13.0002 25.9998 13Z" fill="white"/>
  </svg>
)

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = 'md',
  type = 'dialog',
  icon,
  infoContent,
  isInline = false,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() },
    [onClose]
  )

  useEffect(() => {
    if (!isInline && isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, isInline, handleKeyDown])

  if (!isInline && !isOpen) return null

  const isAlert = type === 'alert'

  const panel = isAlert ? (
    /* ── Alert panel (308×221) ──────────────────────────────────────── */
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      className={[
        'flex flex-col bg-white rounded-[20px] shadow-[4px_8px_20px_rgba(0,0,0,0.1)]',
        sizeMap[size],
        isInline ? 'relative' : 'fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
      ].join(' ')}
      onClick={e => e.stopPropagation()}
    >
      {/* 상단 콘텐츠: pt=20px */}
      <div className="pt-5 px-5 text-center">
        {/* ic_warning 52×52, gap=8px */}
        {icon ? (
          <div className="flex justify-center mb-2">{icon}</div>
        ) : (
          <div className="flex justify-center mb-2"><IcWarning /></div>
        )}
        {/* Headline 18px Bold #333 */}
        <h2
          id="dialog-title"
          className="text-[18px] leading-[27px] font-bold text-secondary-800"
        >
          {title}
        </h2>
        {/* Supporting text 14px Regular #777, gap=4px */}
        {subtitle && (
          <p className="mt-1 text-body3 font-regular text-secondary-600">{subtitle}</p>
        )}
      </div>

      {/* Info slot (optional) bg=#f7f8fa r=8, mx=20px, mt=12px */}
      {infoContent && (
        <div className="mx-5 mt-3 rounded-lg bg-neutral-30 px-4 py-3">
          {infoContent}
        </div>
      )}

      {/* buttonWrap: gap=12px, pb=20px, buttons centered gap=4px */}
      {footer && (
        <div className="mt-3 pb-5 flex items-center justify-center gap-1">
          {footer}
        </div>
      )}
    </div>
  ) : (
    /* ── Dialog panel (448×475) ─────────────────────────────────────── */
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      className={[
        'flex flex-col bg-white rounded-[20px] shadow-[4px_8px_20px_rgba(0,0,0,0.1)]',
        sizeMap[size],
        isInline ? 'relative' : 'fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 max-h-[90vh]',
      ].join(' ')}
      onClick={e => e.stopPropagation()}
    >
      {/* ic_close: absolute top=24px right=24px */}
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute top-6 right-6 flex items-center justify-center hover:opacity-70 transition-opacity focus:outline-none"
      >
        <IcClose />
      </button>

      {/* title section: pt=24px, Title 20px, subtitle 14px gap=0 */}
      <div className="pt-6 px-6 text-center">
        <h2
          id="dialog-title"
          className="text-[20px] leading-[30px] font-bold text-secondary-800"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-body3 font-regular text-secondary-600">{subtitle}</p>
        )}
      </div>

      {/* container: gap=8px, mx=24px, border=#d3d3d3 r=8 p=12px */}
      {children && (
        <div className="mt-2 mx-6 flex-1 overflow-y-auto">
          <div className="border border-[#d3d3d3] rounded-lg p-3 text-body3 text-secondary-800">
            {children}
          </div>
        </div>
      )}

      {/* buttonWrap: gap=8px, py=12px, buttons centered gap=4px */}
      {footer && (
        <div className="mt-2 py-3 flex items-center justify-center gap-1">
          {footer}
        </div>
      )}
    </div>
  )

  if (isInline) return panel

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40" aria-hidden="true" onClick={onClose} />
      {panel}
    </>
  )
}

export default Dialog

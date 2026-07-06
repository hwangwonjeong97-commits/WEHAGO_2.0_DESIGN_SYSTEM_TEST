import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

// ─── Figma specs ──────────────────────────────────────────────────────────────
// SnackBar: bg #222222, cornerRadius: 1000 (pill/rounded-full), 305×48
//   Icon: 24×24, left
//   Message: 16px Medium white
//   Action: divider(1px #777777) + "실행취소" 14px Medium #b4b4b4
//   Type colors (from Snackbar section): dark for info, green for success, etc.

export type SnackbarType = 'info' | 'success' | 'warning' | 'error'

interface SnackbarItem {
  id: string
  message: string
  type: SnackbarType
  duration: number
  action?: string
  onAction?: () => void
}

interface SnackbarContextValue {
  show: (message: string, type?: SnackbarType, duration?: number, action?: string, onAction?: () => void) => void
}

// ─── Type styles ──────────────────────────────────────────────────────────────
// Pill shape (rounded-full) for all types

// 피그마: 모든 타입 bg=#222222, 아이콘 자체에 색상 내포
const typeStyles: Record<SnackbarType, string> = {
  info:    'bg-[#222222]',
  success: 'bg-[#222222]',
  warning: 'bg-[#222222]',
  error:   'bg-[#222222]',
}

// ─── Icons ────────────────────────────────────────────────────────────────────

// ic_check_circle — success
const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#27C36F"/>
    <path d="M15.2822 8.80365C15.6666 8.4073 16.2998 8.39774 16.6962 8.78216C17.0926 9.16665 17.1021 9.79979 16.7177 10.1962L11.3847 15.6962C11.1964 15.8904 10.9374 15.9999 10.6669 15.9999C10.3965 15.9999 10.1375 15.8903 9.94916 15.6962L7.28216 12.9462C6.89774 12.5498 6.9073 11.9166 7.30365 11.5322C7.70009 11.1477 8.33323 11.1573 8.71771 11.5536L10.666 13.5634L15.2822 8.80365Z" fill="white"/>
  </svg>
)

// ic_info — info
const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#719BFC"/>
    <path d="M12 10C12.7179 10 13.2996 10.5968 13.2998 11.333V16.667C13.2996 17.4032 12.7179 18 12 18C11.2822 17.9999 10.7004 17.4032 10.7002 16.667V11.333C10.7004 10.5968 11.2822 10.0001 12 10Z" fill="white"/>
    <path d="M12 6C12.718 6 13.2998 6.58183 13.2998 7.2998C13.2997 8.01769 12.7179 8.59961 12 8.59961C11.2822 8.5995 10.7003 8.01762 10.7002 7.2998C10.7002 6.5819 11.2821 6.00011 12 6Z" fill="white"/>
  </svg>
)

// ic_error (orange) — warning
const WarningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#FFA000"/>
    <path d="M12 15.4004C12.7179 15.4004 13.2997 15.9823 13.2998 16.7002C13.2998 17.4182 12.718 18 12 18C11.2821 17.9999 10.7002 17.4181 10.7002 16.7002C10.7003 15.9824 11.2822 15.4005 12 15.4004Z" fill="white"/>
    <path d="M12 6C12.7179 6 13.2996 6.59678 13.2998 7.33301V12.667C13.2996 13.4032 12.7179 14 12 14C11.2822 13.9999 10.7004 13.4032 10.7002 12.667V7.33301C10.7004 6.59684 11.2822 6.00011 12 6Z" fill="white"/>
  </svg>
)

// ic_error-1 (red) — error
const ErrorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#FA4553"/>
    <path d="M12 15.4004C12.7179 15.4004 13.2997 15.9823 13.2998 16.7002C13.2998 17.4182 12.718 18 12 18C11.2821 17.9999 10.7002 17.4181 10.7002 16.7002C10.7003 15.9824 11.2822 15.4005 12 15.4004Z" fill="white"/>
    <path d="M12 6C12.7179 6 13.2996 6.59678 13.2998 7.33301V12.667C13.2996 13.4032 12.7179 14 12 14C11.2822 13.9999 10.7004 13.4032 10.7002 12.667V7.33301C10.7004 6.59684 11.2822 6.00011 12 6Z" fill="white"/>
  </svg>
)

const typeIcons: Record<SnackbarType, React.FC> = {
  info: InfoIcon, success: CheckIcon, warning: WarningIcon, error: ErrorIcon,
}

// ─── Single Toast ─────────────────────────────────────────────────────────────

interface SnackbarToastProps {
  item: SnackbarItem
  onDismiss: (id: string) => void
}

const SnackbarToast: React.FC<SnackbarToastProps> = ({ item, onDismiss }) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => onDismiss(item.id), item.duration)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [item.id, item.duration, onDismiss])

  const Icon = typeIcons[item.type]

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={[
        // Figma: rounded-full (r:1000), h:48, pl:12 pr:20, gap:8
        'inline-flex items-center gap-2 h-12 pl-3 pr-5',
        'rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] pointer-events-auto',
        typeStyles[item.type],
      ].join(' ')}
    >
      <span className="flex-shrink-0"><Icon /></span>
      {/* Message: 16px Medium white */}
      <span className="text-body1 font-medium text-white">{item.message}</span>
      {/* Action button */}
      {item.action && (
        <>
          <span className="w-px h-[10px] bg-secondary-600 flex-shrink-0" aria-hidden="true" />
          <button
            type="button"
            onClick={() => { item.onAction?.(); onDismiss(item.id) }}
            className="text-body3 font-medium text-secondary-400 hover:text-white transition-colors focus:outline-none whitespace-nowrap flex-shrink-0"
          >
            {item.action}
          </button>
        </>
      )}
      {/* Close */}
      <button
        type="button"
        aria-label="닫기"
        onClick={() => onDismiss(item.id)}
        className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity focus:outline-none ml-1"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M12 4L4 12M4 4l8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

// ─── Context & Provider ───────────────────────────────────────────────────────

const SnackbarContext = createContext<SnackbarContextValue | null>(null)

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<SnackbarItem[]>([])

  const dismiss = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const show = useCallback((
    message: string,
    type: SnackbarType = 'info',
    duration = 3000,
    action?: string,
    onAction?: () => void,
  ) => {
    const id = `snackbar-${Date.now()}-${Math.random().toString(36).slice(2)}`
    setItems(prev => [...prev, { id, message, type, duration, action, onAction }])
  }, [])

  return (
    <SnackbarContext.Provider value={{ show }}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none"
      >
        {items.map(item => (
          <SnackbarToast key={item.id} item={item} onDismiss={dismiss} />
        ))}
      </div>
    </SnackbarContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useSnackbar = (): SnackbarContextValue => {
  const ctx = useContext(SnackbarContext)
  if (!ctx) throw new Error('useSnackbar must be used within a SnackbarProvider')
  return ctx
}

// ─── Standalone ───────────────────────────────────────────────────────────────

interface StandaloneSnackbarProps {
  message: string
  type?: SnackbarType
  duration?: number
  action?: string
  onAction?: () => void
  onClose?: () => void
}

export const Snackbar: React.FC<StandaloneSnackbarProps> = ({
  message, type = 'info', duration = 3000, action, onAction, onClose,
}) => {
  const item: SnackbarItem = {
    id: 'standalone', message, type, duration, action, onAction,
  }
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <SnackbarToast item={item} onDismiss={() => onClose?.()} />
    </div>
  )
}

export default Snackbar

import React, { forwardRef, ButtonHTMLAttributes } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────
// Figma Button specs:
//   Primary:   bg #105aff → hover #0943c6, disabled #d3d3d3, font Bold (700)
//   Secondary: bg #fff → hover #eff4ff, disabled #f4f4f4, border #d3d3d3, font Medium (500)
//   Tertiary:  bg #fff, no border, font Regular (400)
//   Sizes — Large:36px/14px/r6, Medium:32px/14px/r6, Small:28px/12px/r6, XSmall:24px/12px/r4
//   letterSpacing: -0.5px (global via theme.css)

type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
type ButtonSize = 'lg' | 'md' | 'sm' | 'xs'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isLoading?: boolean
  children: React.ReactNode
}

export interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  showArrow?: boolean
}

export interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  'aria-label': string
}

export interface GhostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children: React.ReactNode
}

// ─── Style maps ───────────────────────────────────────────────────────────────

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-base text-white font-bold hover:bg-primary-700 disabled:bg-secondary-200 disabled:text-white disabled:cursor-not-allowed',
  secondary:
    'bg-white border border-primary-base text-primary-base font-medium hover:bg-primary-50 disabled:bg-secondary-50 disabled:text-secondary-400 disabled:border-secondary-200 disabled:cursor-not-allowed',
  tertiary:
    'bg-white border border-secondary-400 text-secondary-800 font-normal hover:border-secondary-700 disabled:bg-secondary-50 disabled:border-secondary-200 disabled:text-secondary-400 disabled:cursor-not-allowed',
}

const sizeClasses: Record<ButtonSize, string> = {
  lg: 'h-9 px-4 text-body3 rounded-md gap-1',
  md: 'h-8 px-3 text-body3 rounded-md gap-1',
  sm: 'h-7 px-2 text-body5 rounded-md gap-0.5',
  xs: 'h-6 px-2 text-body5 rounded gap-0.5',
}

const iconSizeClasses: Record<ButtonSize, string> = {
  lg: 'w-[18px] h-[18px]',
  md: 'w-[18px] h-[18px]',
  sm: 'w-[14px] h-[14px]',
  xs: 'w-[14px] h-[14px]',
}

// ─── Button ───────────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', leftIcon, rightIcon, isLoading = false, disabled, className = '', children, ...props }, ref) => {
    const isDisabled = disabled || isLoading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={[
          'inline-flex items-center justify-center transition-colors duration-150',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-base focus-visible:ring-offset-1 select-none',
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].filter(Boolean).join(' ')}
        {...props}
      >
        {leftIcon && !isLoading && (
          <span className={['flex-shrink-0 flex items-center justify-center', iconSizeClasses[size]].join(' ')} aria-hidden="true">{leftIcon}</span>
        )}
        {isLoading ? <span aria-hidden="true" className="opacity-60">•••</span> : children}
        {rightIcon && !isLoading && (
          <span className={['flex-shrink-0 flex items-center justify-center', iconSizeClasses[size]].join(' ')} aria-hidden="true">{rightIcon}</span>
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'

// ─── TextButton ───────────────────────────────────────────────────────────────
// Figma: 13px Regular, Default #777777(secondary-600), Hover #333333(secondary-800)
// Arrow: 12×12

export const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(
  ({ children, showArrow = true, disabled, className = '', ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      aria-disabled={disabled}
      className={[
        'inline-flex items-center gap-0 text-body4 font-normal text-secondary-600',
        'hover:text-secondary-800 hover:underline transition-colors duration-150',
        'disabled:text-secondary-300 disabled:cursor-not-allowed',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-base focus-visible:ring-offset-1',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
      {showArrow && (
        <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M4.10983 1.60987C4.25628 1.46342 4.49366 1.46342 4.64011 1.60987L8.76511 5.73487L8.79099 5.76319C8.91112 5.91047 8.9024 6.12785 8.76511 6.26514L4.64011 10.3901C4.49367 10.5366 4.25628 10.5366 4.10983 10.3901C3.96339 10.2437 3.96339 10.0063 4.10983 9.85987L7.9697 6L4.10983 2.14014C3.96339 1.99369 3.96339 1.75631 4.10983 1.60987Z" fill="currentColor"/>
        </svg>
      )}
    </button>
  )
)
TextButton.displayName = 'TextButton'

// ─── ButtonIcon ───────────────────────────────────────────────────────────────
// Figma: 32×32, r:6
//   Default:  bg #fff, stroke #b4b4b4 (secondary-400)
//   Hovered:  bg #fff, stroke #4a4a4a (secondary-700)
//   Disabled: bg #f4f4f4 (secondary-50), stroke #d3d3d3 (secondary-200)

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ icon, disabled, className = '', ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      aria-disabled={disabled}
      className={[
        'inline-flex items-center justify-center w-8 h-8 rounded-md bg-white',
        'border border-secondary-400 hover:border-secondary-700 transition-colors duration-150',
        'disabled:bg-secondary-50 disabled:border-secondary-200 disabled:text-secondary-400 disabled:cursor-not-allowed',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-base focus-visible:ring-offset-1 flex-shrink-0',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <span className="w-[18px] h-[18px] flex items-center justify-center" aria-hidden="true">{icon}</span>
    </button>
  )
)
ButtonIcon.displayName = 'ButtonIcon'

// ─── GhostButton ──────────────────────────────────────────────────────────────

const ghostSizeClasses: Record<ButtonSize, string> = {
  lg: 'h-9 px-3 text-body3 rounded-md',
  md: 'h-8 px-3 text-body3 rounded-md',
  sm: 'h-7 px-2.5 text-body5 rounded-md',
  xs: 'h-6 px-2 text-body5 rounded',
}

const ghostIconSizeClasses: Record<ButtonSize, string> = {
  lg: 'w-[14px] h-[14px]',
  md: 'w-[14px] h-[14px]',
  sm: 'w-[14px] h-[14px]',
  xs: 'w-[14px] h-[14px]',
}

// Figma GhostButton:
//   Default:  transparent bg, stroke #b4b4b4 (secondary-400), text white Regular 14px
//   Hovered:  bg rgba(255,255,255,0.16), stroke #b4b4b4
//   Size: Medium only (32px) in Figma — keeping size prop for flexibility

export const GhostButton = forwardRef<HTMLButtonElement, GhostButtonProps>(
  ({ size = 'md', leftIcon, rightIcon, disabled, className = '', children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      aria-disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-1 font-normal',
        'border border-secondary-400 text-white hover:bg-white/[0.16] transition-colors duration-150',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 select-none',
        ghostSizeClasses[size],
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {leftIcon && <span className={['flex-shrink-0 flex items-center justify-center', ghostIconSizeClasses[size]].join(' ')} aria-hidden="true">{leftIcon}</span>}
      {children}
      {rightIcon && <span className={['flex-shrink-0 flex items-center justify-center', ghostIconSizeClasses[size]].join(' ')} aria-hidden="true">{rightIcon}</span>}
    </button>
  )
)
GhostButton.displayName = 'GhostButton'

export default Button

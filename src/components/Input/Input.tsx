import React, { forwardRef, InputHTMLAttributes, useId } from 'react'

type InputSize = 'md' | 'sm'
type InputStatus = 'default' | 'success' | 'warning' | 'error'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize
  status?: InputStatus
  helperText?: string
  clearable?: boolean
  onClear?: () => void
  action?: string
  onAction?: () => void
}

// ─── Inline icons ─────────────────────────────────────────────────────────────

// ic_del_fill — md: 18×18 / sm: 14×14 (피그마 원본)
const ClearIcon = ({ sm }: { sm?: boolean }) =>
  sm ? (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.99981 1.16669C8.54639 1.16834 10.0294 1.78321 11.123 2.87681C12.2166 3.97041 12.8315 5.45344 12.8331 7.00002C12.8331 8.15374 12.4909 9.28154 11.8499 10.2408C11.209 11.2001 10.2982 11.9481 9.23231 12.3896C8.16641 12.8311 6.99318 12.9462 5.86162 12.7211C4.73014 12.496 3.69065 11.9407 2.87489 11.1249C2.05913 10.3092 1.5038 9.26968 1.2787 8.1382C1.05362 7.00665 1.16873 5.83342 1.61024 4.76752C2.05175 3.70166 2.79976 2.79088 3.759 2.14992C4.71829 1.50895 5.84608 1.16669 6.99981 1.16669ZM9.05913 4.94069C8.88828 4.76984 8.61134 4.76985 8.44048 4.94069L6.99981 6.38137L5.55913 4.94069C5.38828 4.76984 5.11134 4.76985 4.94048 4.94069C4.76963 5.11155 4.76963 5.38849 4.94048 5.55935L6.38116 7.00002L4.94048 8.44069C4.76963 8.61155 4.76963 8.88849 4.94048 9.05935C5.11134 9.23012 5.38831 9.23017 5.55913 9.05935L6.99981 7.61867L8.44048 9.05935L8.47352 9.08954C8.64536 9.22964 8.89898 9.2195 9.05913 9.05935C9.21928 8.89919 9.22943 8.64557 9.08933 8.47373L9.05913 8.44069L7.61846 7.00002L9.05913 5.55935C9.22995 5.38852 9.2299 5.11155 9.05913 4.94069Z" fill="#B4B4B4"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.99996 1.5C10.9884 1.50213 12.8952 2.29268 14.3012 3.69873C15.7073 5.10479 16.4978 7.01154 16.5 9C16.5 10.4834 16.0599 11.9334 15.2358 13.1667C14.4117 14.4001 13.2407 15.3618 11.8703 15.9294C10.4999 16.4971 8.99144 16.6451 7.53658 16.3557C6.08182 16.0663 4.74534 15.3523 3.6965 14.3035C2.64766 13.2546 1.93367 11.9181 1.64425 10.4634C1.35486 9.00852 1.50286 7.50008 2.07052 6.12964C2.63817 4.75925 3.5999 3.58825 4.83321 2.76416C6.06658 1.94005 7.5166 1.5 8.99996 1.5ZM11.6477 6.35229C11.428 6.13263 11.0719 6.13264 10.8523 6.35229L8.99996 8.20459L7.14767 6.35229C6.928 6.13263 6.57193 6.13264 6.35226 6.35229C6.13259 6.57197 6.13259 6.92803 6.35226 7.14771L8.20455 9L6.35226 10.8523C6.13259 11.072 6.13259 11.428 6.35226 11.6477C6.57194 11.8673 6.92803 11.8673 7.14767 11.6477L8.99996 9.79541L10.8523 11.6477L10.8947 11.6865C11.1157 11.8667 11.4417 11.8536 11.6477 11.6477C11.8536 11.4418 11.8666 11.1157 11.6865 10.8948L11.6477 10.8523L9.79537 9L11.6477 7.14771C11.8673 6.92807 11.8672 6.57197 11.6477 6.35229Z" fill="#B4B4B4"/>
    </svg>
  )

// ic_check_circle_fill — 피그마 원본
const SuccessIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M9 1.5C13.1421 1.5 16.5 4.85786 16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5ZM12.5222 6.58667C12.2249 6.29835 11.75 6.30552 11.4617 6.60278L7.99951 10.1726L6.53833 8.66528C6.24997 8.36802 5.77511 8.36085 5.47778 8.64917C5.18052 8.93753 5.17335 9.41239 5.46167 9.70972L7.46191 11.7722C7.60315 11.9177 7.79746 12 8.00024 12C8.20305 11.9999 8.39738 11.9178 8.53857 11.7722L12.5383 7.64722C12.8266 7.3499 12.8194 6.87504 12.5222 6.58667Z" fill="#27C36F"/>
  </svg>
)

// ic_warning_fill — 피그마 원본
const WarningIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.0008 1.5C9.35184 1.50003 9.69679 1.59145 9.99982 1.76514C10.3029 1.93885 10.5535 2.1889 10.7257 2.48877L16.2466 12.1106C16.4156 12.4057 16.5031 12.739 16.5001 13.0774C16.497 13.4158 16.4034 13.7477 16.2291 14.0398C16.0547 14.3319 15.8056 14.5745 15.5062 14.7429C15.2067 14.9114 14.8671 14.9998 14.5218 15H3.47907C3.13367 15 2.79433 14.9113 2.49469 14.7429C2.19495 14.5744 1.94475 14.3315 1.77033 14.0391C1.59604 13.7468 1.5029 13.4145 1.50006 13.0759C1.49727 12.7375 1.5849 12.4041 1.75422 12.1091L7.27594 2.48877C7.44812 2.18885 7.69869 1.93885 8.00177 1.76514C8.30483 1.59148 8.64975 1.5 9.0008 1.5ZM9.00007 11.5503C8.4617 11.5504 8.02529 11.9868 8.02521 12.5251C8.02521 13.0636 8.46165 13.4999 9.00007 13.5C9.53854 13.5 9.97492 13.0636 9.97492 12.5251C9.97484 11.9867 9.53849 11.5503 9.00007 11.5503ZM9.00007 4.5C8.46173 4.50008 8.02534 4.94763 8.02521 5.49976V9.50024C8.02534 10.0524 8.46173 10.4999 9.00007 10.5C9.53846 10.5 9.97479 10.0524 9.97492 9.50024V5.49976C9.97479 4.94758 9.53846 4.5 9.00007 4.5Z" fill="#FFA000"/>
  </svg>
)

// ic_error_fill — 피그마 원본
const ErrorIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M9 1.5C13.1421 1.5 16.5 4.85786 16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5ZM9 11.5503C8.46164 11.5504 8.02523 11.9868 8.02515 12.5251C8.02515 13.0636 8.46159 13.4999 9 13.5C9.53848 13.5 9.97485 13.0636 9.97485 12.5251C9.97477 11.9867 9.53843 11.5503 9 11.5503ZM9 4.5C8.46167 4.50008 8.02528 4.94763 8.02515 5.49976V9.50024C8.02527 10.0524 8.46167 10.4999 9 10.5C9.5384 10.5 9.97472 10.0524 9.97485 9.50024V5.49976C9.97472 4.94758 9.5384 4.5 9 4.5Z" fill="#FA4553"/>
  </svg>
)

// ─── Style maps ───────────────────────────────────────────────────────────────

const borderClass: Record<InputStatus, string> = {
  default: 'border-secondary-200 focus-within:border-secondary-700',
  success: 'border-positive-success',
  warning: 'border-pending-warningPoint',
  error:   'border-negative-dangerPoint',
}

const helperClass: Record<InputStatus, string> = {
  default: 'text-secondary-600',
  success: 'text-positive-success',
  warning: 'text-pending-warningPoint',
  error:   'text-negative-dangerPoint',
}

const sizeMap = {
  md: { height: 'h-8',  text: 'text-body3', iconSm: false },
  sm: { height: 'h-7',  text: 'text-body5', iconSm: true  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      status = 'default',
      helperText,
      clearable,
      onClear,
      action,
      onAction,
      disabled,
      id: externalId,
      className = '',
      value,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = externalId ?? generatedId
    const helperId = helperText ? `${inputId}-helper` : undefined
    const { height, text, iconSm } = sizeMap[size]

    const wrapperBorder = disabled
      ? 'border-secondary-200 bg-secondary-40'
      : borderClass[status]

    const statusIcon =
      !disabled && status === 'success' ? <SuccessIcon /> :
      !disabled && status === 'warning' ? <WarningIcon /> :
      !disabled && status === 'error'   ? <ErrorIcon />   :
      null

    return (
      <div className={['flex flex-col gap-1', className].filter(Boolean).join(' ')}>

        {/* Input wrapper */}
        <div
          className={[
            'flex items-center px-2 rounded-[6px] border transition-colors duration-150',
            height,
            wrapperBorder,
            !disabled ? 'bg-white' : '',
          ].filter(Boolean).join(' ')}
        >
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-disabled={disabled}
            aria-invalid={status === 'error'}
            aria-describedby={helperId}
            value={value}
            className={[
              'flex-1 min-w-0 bg-transparent focus:outline-none',
              text,
              'font-regular tracking-[-0.03em]',
              'text-secondary-800 placeholder:text-secondary-400',
              disabled ? 'cursor-not-allowed text-secondary-400' : '',
            ].filter(Boolean).join(' ')}
            {...props}
          />

          {/* Clear button — 값이 있고 clearable일 때 */}
          {clearable && value && !disabled && (
            <button
              type="button"
              onClick={onClear}
              className="flex-shrink-0 ml-1 focus:outline-none"
              aria-label="내용 지우기"
            >
              <ClearIcon sm={iconSm} />
            </button>
          )}

          {/* Status icon */}
          {statusIcon && (
            <span className="flex-shrink-0 ml-1 flex items-center">
              {statusIcon}
            </span>
          )}

          {/* Right action text */}
          {action && !disabled && (
            <button
              type="button"
              onClick={onAction}
              className="flex-shrink-0 ml-1 text-body3 font-bold text-primary-base focus:outline-none whitespace-nowrap"
            >
              {action}
            </button>
          )}
        </div>

        {/* Helper text */}
        {helperText && (
          <p
            id={helperId}
            className={['flex items-center gap-0.5 text-body5 font-regular', helperClass[status]].join(' ')}
            role={status === 'error' ? 'alert' : undefined}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input

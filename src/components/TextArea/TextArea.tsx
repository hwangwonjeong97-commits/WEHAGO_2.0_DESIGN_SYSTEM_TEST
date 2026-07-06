import React, { forwardRef, TextareaHTMLAttributes, useId, useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────
// Figma TextArea specs:
//   State=Enabled:   bg #fff, stroke #d3d3d3, cornerRadius: 8
//   State=Focused:   bg #fff, stroke #4a4a4a
//   State=Typing:    bg #fff, stroke #4a4a4a, text #333333
//   State=Completed: bg #fff, stroke #d3d3d3, text #333333
//   Placeholder: #b4b4b4 (secondary-400)
//   Font: 14px Regular, letterSpacing -0.5px, lineHeight 21px
//   Padding: 12px all sides

type TextAreaState = 'default' | 'error' | 'disabled'

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'disabled' | 'rows' | 'maxLength'> {
  label?: string
  required?: boolean
  state?: TextAreaState
  helperText?: string
  rows?: number
  maxLength?: number
}

// ─── Style helpers ────────────────────────────────────────────────────────────

function getBorderClass(state: TextAreaState): string {
  switch (state) {
    case 'error':
      return 'border-negative-dangerPoint focus-within:border-negative-dangerPoint bg-white'
    case 'disabled':
      return 'border-secondary-200 bg-secondary-40'
    default:
      return 'border-secondary-200 focus-within:border-secondary-700 bg-white'
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      required = false,
      state = 'default',
      helperText,
      rows = 4,
      maxLength,
      id: externalId,
      value,
      defaultValue,
      onChange,
      className = '',
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const textareaId = externalId ?? generatedId
    const helperId = helperText ? `${textareaId}-helper` : undefined
    const isDisabled = state === 'disabled'
    const isError = state === 'error'

    const [uncontrolledLength, setUncontrolledLength] = useState(
      typeof defaultValue === 'string' ? defaultValue.length : 0
    )
    const isControlled = value !== undefined
    const currentLength = isControlled
      ? typeof value === 'string' ? value.length : 0
      : uncontrolledLength

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      if (!isControlled) setUncontrolledLength(e.target.value.length)
      onChange?.(e)
    }

    return (
      <div className={['flex flex-col gap-1', className].filter(Boolean).join(' ')}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-body3 font-medium text-secondary-800 flex items-center gap-0.5"
          >
            {label}
            {required && (
              <span className="text-negative-dangerPoint ml-0.5" aria-hidden="true">*</span>
            )}
          </label>
        )}

        {/* 테두리 래퍼 — cornerRadius: 8px */}
        <div
          className={[
            'relative rounded-lg border transition-colors duration-150',
            getBorderClass(state),
          ].join(' ')}
        >
          <textarea
            ref={ref}
            id={textareaId}
            disabled={isDisabled}
            aria-disabled={isDisabled}
            aria-invalid={isError}
            aria-describedby={helperId}
            aria-required={required}
            rows={rows}
            maxLength={maxLength}
            value={isControlled ? value : undefined}
            defaultValue={isControlled ? undefined : defaultValue}
            onChange={handleChange}
            className={[
              'w-full p-3 bg-transparent rounded-lg resize-none focus:outline-none',
              'text-body3 font-regular text-secondary-800',
              'placeholder:text-secondary-400',
              isDisabled ? 'cursor-not-allowed text-secondary-400' : '',
              maxLength !== undefined ? 'pb-7' : '',
            ].filter(Boolean).join(' ')}
            {...props}
          />

          {maxLength !== undefined && (
            <span
              aria-live="polite"
              aria-label={`${currentLength}자 / ${maxLength}자`}
              className={[
                'absolute bottom-2 right-3 text-body6 font-regular select-none',
                currentLength >= maxLength ? 'text-negative-dangerPoint' : 'text-secondary-400',
              ].join(' ')}
            >
              {currentLength}/{maxLength}
            </span>
          )}
        </div>

        {helperText && (
          <p
            id={helperId}
            className={[
              'text-body5 font-regular',
              isError ? 'text-negative-dangerPoint' : 'text-secondary-600',
            ].join(' ')}
            role={isError ? 'alert' : undefined}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'
export default TextArea

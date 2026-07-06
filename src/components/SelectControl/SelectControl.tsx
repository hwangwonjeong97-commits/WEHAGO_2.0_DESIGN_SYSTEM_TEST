import React from 'react'

// ─── Figma specs ──────────────────────────────────────────────────────────────
// Checkbox 14×14, cornerRadius: 4
//   Default:    bg #fff, stroke #d3d3d3
//   Selected:   bg #719bfc (primary-300), no stroke
//   Indeterminate: bg #719bfc
//   Disabled:   bg #f4f4f4, stroke #d3d3d3
//
// Radio 14×14 (circle)
//   Default:    fill #fff, stroke #d3d3d3
//   Selected:   fill #719bfc, inner dot 6×6 white
//   Disabled:   fill #f4f4f4, stroke #d3d3d3
//
// Toggle
//   Medium: 32×20, handle 16×16, r:12
//   Small:  24×16, handle 12×12, r:12
//   On:       bg #719bfc (primary-300)
//   Off:      bg #e1e1e1 (secondary-100)
//   Disabled: bg #f4f4f4, handle #e1e1e1

// ─── Checkbox ─────────────────────────────────────────────────────────────────

interface CheckboxProps {
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  label?: string
  onChange?: (checked: boolean) => void
}

const CheckmarkIcon = () => (
  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IndeterminateIcon = () => (
  <svg width="8" height="2" viewBox="0 0 8 2" fill="none">
    <path d="M1 1H7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  indeterminate = false,
  disabled = false,
  label,
  onChange,
}) => {
  const isActive = checked || indeterminate

  return (
    <label
      className={[
        'inline-flex items-center gap-2',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      ].join(' ')}
    >
      <div className="relative flex items-center justify-center w-[14px] h-[14px] flex-shrink-0">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={e => onChange?.(e.target.checked)}
          className="sr-only"
          ref={el => { if (el) el.indeterminate = indeterminate }}
        />
        <div
          className={[
            'w-[14px] h-[14px] flex items-center justify-center transition-colors duration-150',
            'border rounded',  // cornerRadius: 4px
            isActive
              ? 'bg-[#719bfc] border-[#719bfc]'     // primary-300, no stroke
              : 'bg-white border-secondary-200',
          ].join(' ')}
        >
          {indeterminate && !checked
            ? <IndeterminateIcon />
            : checked
            ? <CheckmarkIcon />
            : null}
        </div>
      </div>
      {label && (
        <span className="text-body3 text-secondary-800 select-none">{label}</span>
      )}
    </label>
  )
}

// ─── Radio ────────────────────────────────────────────────────────────────────

interface RadioProps {
  checked?: boolean
  disabled?: boolean
  label?: string
  value?: string
  name?: string
  onChange?: (value: string) => void
}

export const Radio: React.FC<RadioProps> = ({
  checked = false,
  disabled = false,
  label,
  value = '',
  name,
  onChange,
}) => (
  <label
    className={[
      'inline-flex items-center gap-2',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
    ].join(' ')}
  >
    <div className="relative flex items-center justify-center w-[14px] h-[14px] flex-shrink-0">
      <input
        type="radio"
        checked={checked}
        disabled={disabled}
        value={value}
        name={name}
        onChange={() => onChange?.(value)}
        className="sr-only"
      />
      {/* 14×14 circle */}
      <div
        className={[
          'w-[14px] h-[14px] rounded-full flex items-center justify-center transition-colors duration-150',
          checked
            ? 'bg-[#719bfc]'                              // primary-300, no stroke
            : 'bg-white border border-secondary-200',
        ].join(' ')}
      >
        {/* inner dot: 6×6 white */}
        {checked && (
          <div className="w-[6px] h-[6px] rounded-full bg-white flex-shrink-0" />
        )}
      </div>
    </div>
    {label && (
      <span className="text-body3 text-secondary-800 select-none">{label}</span>
    )}
  </label>
)

// ─── Toggle ───────────────────────────────────────────────────────────────────

interface ToggleProps {
  checked?: boolean
  disabled?: boolean
  size?: 'md' | 'sm'
  label?: string
  onChange?: (checked: boolean) => void
}

const toggleSizeMap = {
  md: {
    track: 'w-8 h-5',          // 32×20
    handle: 'w-4 h-4',         // 16×16
    onTranslate: 'translate-x-[14px]',
    offTranslate: 'translate-x-[2px]',
  },
  sm: {
    track: 'w-6 h-4',          // 24×16
    handle: 'w-3 h-3',         // 12×12
    onTranslate: 'translate-x-[10px]',
    offTranslate: 'translate-x-[2px]',
  },
}

export const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  disabled = false,
  size = 'md',
  label,
  onChange,
}) => {
  const s = toggleSizeMap[size]

  return (
    <label
      className={[
        'inline-flex items-center gap-2',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      ].join(' ')}
    >
      <div className="inline-flex items-center flex-shrink-0">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={e => onChange?.(e.target.checked)}
          className="sr-only"
        />
        {/* Track — relative로 핸들 포지셔닝 기준점 설정 */}
        <div
          className={[
            'relative rounded-xl transition-colors duration-200',
            s.track,
            disabled
              ? 'bg-secondary-50'
              : checked
              ? 'bg-[#719bfc]'
              : 'bg-secondary-100',
          ].join(' ')}
        >
          {/* Handle — track 기준 absolute 포지셔닝 */}
          <div
            className={[
              'absolute top-[2px] left-0 rounded-full shadow transition-transform duration-200',
              s.handle,
              checked ? s.onTranslate : s.offTranslate,
              disabled ? 'bg-secondary-100' : 'bg-white',
            ].join(' ')}
          />
        </div>
      </div>
      {label && (
        <span className={['text-body3 text-secondary-800 select-none', disabled ? 'opacity-50' : ''].join(' ')}>
          {label}
        </span>
      )}
    </label>
  )
}

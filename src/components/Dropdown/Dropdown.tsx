import React, { useState, useRef, useEffect } from 'react'

// ─── Figma specs ──────────────────────────────────────────────────────────────
// DropdownField:
//   Default:  bg #fff, stroke #d3d3d3, r:6, h:32, px:8
//   Focused:  bg #fff, stroke #4a4a4a
//   Disabled: bg #fafafa, stroke #d3d3d3, text #b4b4b4
//   Arrow: ic_arrow_down_thick 12×12
//   Text: 14px Regular, #333333
//
// DropdownMenu (open panel):
//   bg #fff, stroke #4a4a4a, r:6
//   Item height: 32px, px:8
//   Selected text: #105aff (primary-base)
//   Unselected text: #333333 (secondary-800)
//   Hover bg: neutral-30

export interface DropdownOption {
  value: string
  label: string
  disabled?: boolean
}

interface DropdownProps {
  options: DropdownOption[]
  value?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (value: string) => void
}

// ─── Arrow icons ──────────────────────────────────────────────────────────────

const ArrowDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="flex-shrink-0">
    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#777777" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ArrowUp = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="flex-shrink-0">
    <path d="M2.5 7.5L6 4L9.5 7.5" stroke="#4a4a4a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ─── Component ────────────────────────────────────────────────────────────────

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  placeholder = '선택',
  disabled = false,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(o => o.value === value)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = () => {
    if (!disabled) setIsOpen(prev => !prev)
  }

  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) return
    onChange?.(option.value)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger — DropdownField */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={[
          'w-full flex items-center justify-between gap-2',
          'h-8 px-2 rounded-md border',
          'text-body3 bg-white transition-colors duration-150 outline-none',
          disabled
            ? 'bg-secondary-40 border-secondary-200 cursor-not-allowed'
            : isOpen
            ? 'border-secondary-700'
            : 'border-secondary-200 hover:border-secondary-700 cursor-pointer',
        ].join(' ')}
      >
        <span
          className={[
            'truncate text-left',
            disabled
              ? 'text-secondary-400'
              : selectedOption
              ? 'text-secondary-800'
              : 'text-secondary-400',
          ].join(' ')}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        {isOpen ? <ArrowUp /> : <ArrowDown />}
      </button>

      {/* Panel — DropdownMenu */}
      {isOpen && (
        <ul
          role="listbox"
          className={[
            'ds-overlay-panel',
            'absolute z-50 left-0 right-0 top-full mt-0.5',
            'bg-white border border-secondary-700 rounded-md',
            'overflow-y-auto max-h-60',
          ].join(' ')}
        >
          {options.length === 0 ? (
            <li className="h-8 px-2 flex items-center text-body3 text-secondary-400">
              항목이 없습니다.
            </li>
          ) : (
            options.map(option => {
              const isSelected = option.value === value
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option)}
                  className={[
                    'h-8 px-2 flex items-center text-body3 transition-colors duration-100',
                    option.disabled
                      ? 'opacity-40 cursor-not-allowed text-secondary-400'
                      : isSelected
                      ? 'text-primary-base cursor-pointer hover:bg-neutral-30'
                      : 'text-secondary-800 cursor-pointer hover:bg-neutral-30',
                  ].join(' ')}
                >
                  {option.label}
                </li>
              )
            })
          )}
        </ul>
      )}
    </div>
  )
}

export default Dropdown

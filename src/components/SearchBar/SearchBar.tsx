import React, { useState, KeyboardEvent, useRef } from 'react'

// ─── Figma specs ──────────────────────────────────────────────────────────────
// SearchbarDefault / SearchbarFilter
//   h:32, cornerRadius:6, px:8
//   Enabled:   bg #fff, stroke #d3d3d3
//   Focused:   bg #fff, stroke #4a4a4a
//   Typing:    stroke #4a4a4a, del icon(18px) visible on right
//   Completed: stroke #d3d3d3, result count text before search icon
//   Error:     stroke #fa4553, del icon visible
//   Disabled:  bg #fafafa, stroke #d3d3d3, text #b4b4b4
//   Search icon: RIGHT side, 18×18
//   Filter variant: adds ic_filter 18×18 after search icon

type SearchBarStatus = 'default' | 'error'

interface SearchBarProps {
  value?: string
  placeholder?: string
  disabled?: boolean
  status?: SearchBarStatus
  showFilter?: boolean
  resultCount?: string   // "1/99" 형태, Completed 상태에서 표시
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  onFilter?: () => void
}

// ─── Icons ────────────────────────────────────────────────────────────────────

// ic_search 18×18 — 피그마 원본
const SearchIcon: React.FC<{ color?: string }> = ({ color = '#777777' }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M7.83813 1.80029C11.1725 1.80029 13.8755 4.50331 13.8755 7.83765C13.8755 9.30227 13.3536 10.6448 12.4861 11.6902L15.3982 14.6023C15.6178 14.822 15.6178 15.178 15.3982 15.3977C15.1785 15.6174 14.8225 15.6173 14.6028 15.3977L11.6907 12.4856C10.6453 13.3531 9.30276 13.875 7.83813 13.875C4.5038 13.875 1.80078 11.172 1.80078 7.83765C1.80078 4.50331 4.5038 1.80029 7.83813 1.80029ZM7.83813 2.92529C5.12512 2.92529 2.92578 5.12463 2.92578 7.83765C2.92578 10.5507 5.12512 12.75 7.83813 12.75C10.5512 12.75 12.7505 10.5507 12.7505 7.83765C12.7505 5.12463 10.5512 2.92529 7.83813 2.92529Z" fill={color}/>
  </svg>
)

// ic_del_fill 18×18 — 피그마 원본
const ClearIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.99996 1.5C10.9884 1.50213 12.8952 2.29268 14.3012 3.69873C15.7073 5.10479 16.4978 7.01154 16.5 9C16.5 10.4834 16.0599 11.9334 15.2358 13.1667C14.4117 14.4001 13.2407 15.3618 11.8703 15.9294C10.4999 16.4971 8.99144 16.6451 7.53658 16.3557C6.08182 16.0663 4.74534 15.3523 3.6965 14.3035C2.64766 13.2546 1.93367 11.9181 1.64425 10.4634C1.35486 9.00852 1.50286 7.50008 2.07052 6.12964C2.63817 4.75925 3.5999 3.58825 4.83321 2.76416C6.06658 1.94005 7.5166 1.5 8.99996 1.5ZM11.6477 6.35229C11.428 6.13263 11.0719 6.13264 10.8523 6.35229L8.99996 8.20459L7.14767 6.35229C6.928 6.13263 6.57193 6.13264 6.35226 6.35229C6.13259 6.57197 6.13259 6.92803 6.35226 7.14771L8.20455 9L6.35226 10.8523C6.13259 11.072 6.13259 11.428 6.35226 11.6477C6.57194 11.8673 6.92803 11.8673 7.14767 11.6477L8.99996 9.79541L10.8523 11.6477L10.8947 11.6865C11.1157 11.8667 11.4417 11.8536 11.6477 11.6477C11.8536 11.4418 11.8666 11.1157 11.6865 10.8948L11.6477 10.8523L9.79537 9L11.6477 7.14771C11.8673 6.92807 11.8672 6.57197 11.6477 6.35229Z" fill="#B4B4B4"/>
  </svg>
)

// ic_filter 18×18 — 피그마 원본
const FilterIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M5.8125 1.5C6.12316 1.5 6.375 1.75184 6.375 2.0625V3.05566C7.65882 3.31621 8.625 4.4518 8.625 5.8125C8.625 7.17365 7.65798 8.30855 6.37354 8.5686V15.9375C6.37353 16.2482 6.1217 16.5 5.81104 16.5C5.50038 16.5 5.24854 16.2482 5.24854 15.9375V8.56787C3.96556 8.30667 3 7.17261 3 5.8125C3 4.4518 3.96618 3.31621 5.25 3.05566V2.0625C5.25 1.75184 5.50184 1.5 5.8125 1.5ZM5.8125 4.125C4.88052 4.125 4.125 4.88052 4.125 5.8125C4.125 6.74448 4.88052 7.5 5.8125 7.5C6.74448 7.5 7.5 6.74448 7.5 5.8125C7.5 4.88052 6.74448 4.125 5.8125 4.125Z" fill="#777777"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12.186 1.5C12.4967 1.5 12.7485 1.75184 12.7485 2.0625V9.43066C14.0331 9.69067 15 10.8263 15 12.1875C15 13.5482 14.0337 14.683 12.75 14.9436V15.9375C12.75 16.2482 12.4982 16.5 12.1875 16.5C11.8768 16.5 11.625 16.2482 11.625 15.9375V14.9436C10.3413 14.683 9.375 13.5482 9.375 12.1875C9.375 10.8273 10.3405 9.69254 11.6235 9.4314V2.0625C11.6235 1.75184 11.8754 1.5 12.186 1.5ZM12.1875 10.5C11.2555 10.5 10.5 11.2555 10.5 12.1875C10.5 13.1195 11.2555 13.875 12.1875 13.875C13.1195 13.875 13.875 13.1195 13.875 12.1875C13.875 11.2555 13.1195 10.5 12.1875 10.5Z" fill="#777777"/>
  </svg>
)

// ─── Component ────────────────────────────────────────────────────────────────

const SearchBar: React.FC<SearchBarProps> = ({
  value: controlledValue,
  placeholder = '검색',
  disabled = false,
  status = 'default',
  showFilter = false,
  resultCount,
  onChange,
  onSearch,
  onFilter,
}) => {
  const [internalValue, setInternalValue] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    if (!isControlled) setInternalValue(v)
    onChange?.(v)
  }

  const handleClear = () => {
    if (!isControlled) setInternalValue('')
    onChange?.('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch?.(value)
  }

  // 테두리 색상
  const isError = status === 'error'
  const borderClass = disabled
    ? 'border-secondary-200'
    : isError
    ? 'border-negative-dangerPoint'
    : focused
    ? 'border-secondary-700'
    : 'border-secondary-200'

  return (
    <div
      className={[
        'flex items-center gap-1',
        'h-8 px-2 rounded-md border transition-colors duration-150',
        disabled ? 'bg-secondary-40 cursor-not-allowed' : 'bg-white',
        borderClass,
      ].join(' ')}
    >
      {/* Text input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={[
          'flex-1 min-w-0 bg-transparent outline-none',
          'text-body3 text-secondary-800 placeholder:text-secondary-400',
          disabled ? 'cursor-not-allowed text-secondary-400' : '',
        ].filter(Boolean).join(' ')}
      />

      {/* Right side icons */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {/* 결과 카운트 (Completed 상태) */}
        {resultCount && !value && (
          <span className="text-body3 text-secondary-800 whitespace-nowrap">{resultCount}</span>
        )}

        {/* 지우기 버튼 (타이핑 중일 때) */}
        {value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center justify-center focus:outline-none"
            aria-label="검색어 지우기"
          >
            <ClearIcon />
          </button>
        )}

        {/* 검색 아이콘 (항상 우측, 색상 고정 #777777) */}
        <button
          type="button"
          onClick={() => onSearch?.(value)}
          disabled={disabled}
          className={[
            'flex items-center justify-center focus:outline-none',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          ].join(' ')}
          aria-label="검색"
        >
          <SearchIcon color={disabled ? '#b4b4b4' : '#777777'} />
        </button>

        {/* divider + 필터 아이콘 (SearchbarFilter variant) */}
        {showFilter && (
          <>
            <div className="w-px h-3 bg-secondary-200 flex-shrink-0" aria-hidden="true" />
            <button
              type="button"
              onClick={onFilter}
              disabled={disabled}
              className={[
                'flex items-center justify-center focus:outline-none',
                disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
              ].join(' ')}
              aria-label="필터"
            >
              <FilterIcon />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default SearchBar

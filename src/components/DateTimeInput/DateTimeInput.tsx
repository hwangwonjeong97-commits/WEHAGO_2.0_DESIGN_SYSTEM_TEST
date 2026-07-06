import React, { useState, useRef, useEffect, useCallback } from 'react'

// ─── Figma specs ──────────────────────────────────────────────────────────────
// Trigger input: h-8 (32px), border secondary-200 → focus secondary-700, r:6
// Popup panel: bg #fff, stroke #4a4a4a, cornerRadius: 8, shadow
// DatePicker:  186×180, header "YYYY년 M월" Bold 12px #333333 + nav arrows
// TimePicker:  200×221, hour/minute scroll cols, selected #105aff Medium 11px
// DateRangePicker: two DatePickers side by side
// Selected date cell: #719bfc bg, white text
// Other month dates: #b4b4b4 (secondary-400)

type DateTimeType = 'date' | 'time' | 'datetime' | 'daterange'

interface BaseProps {
  disabled?: boolean
  className?: string
}

interface DateProps extends BaseProps {
  type: 'date'
  value?: string        // 'YYYY-MM-DD'
  onChange?: (v: string) => void
}

interface TimeProps extends BaseProps {
  type: 'time'
  value?: string        // 'HH:mm'
  onChange?: (v: string) => void
}

interface DateTimeProps extends BaseProps {
  type: 'datetime'
  value?: string        // 'YYYY-MM-DDTHH:mm'
  onChange?: (v: string) => void
}

interface DateRangeProps extends BaseProps {
  type: 'daterange'
  startValue?: string
  endValue?: string
  onChange?: (start: string, end: string) => void
}

type DateTimeInputProps = DateProps | TimeProps | DateTimeProps | DateRangeProps

// ─── Icons ────────────────────────────────────────────────────────────────────

// ic_calender 18×18 — 피그마 원본
const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M6.14648 11.2639C6.29193 11.2929 6.42541 11.3649 6.53027 11.4697C6.6351 11.5746 6.70642 11.7081 6.73535 11.8535C6.76429 11.999 6.74964 12.1501 6.69287 12.2871C6.63611 12.424 6.53996 12.5409 6.41675 12.6233C6.29341 12.7057 6.14834 12.75 6 12.75C5.80113 12.75 5.61037 12.6709 5.46973 12.5303C5.32912 12.3897 5.25005 12.1988 5.25 12C5.25 11.8517 5.2943 11.7066 5.37671 11.5833C5.45909 11.46 5.57593 11.3639 5.71289 11.3071C5.84994 11.2504 6.001 11.235 6.14648 11.2639Z" fill="currentColor"/>
    <path d="M9.14648 11.2639C9.29193 11.2929 9.42541 11.3649 9.53027 11.4697C9.6351 11.5746 9.70642 11.7081 9.73535 11.8535C9.76429 11.999 9.74964 12.1501 9.69287 12.2871C9.63611 12.424 9.53996 12.5409 9.41675 12.6233C9.29341 12.7057 9.14834 12.75 9 12.75C8.80113 12.75 8.61037 12.6709 8.46973 12.5303C8.32912 12.3897 8.25005 12.1988 8.25 12C8.25 11.8517 8.2943 11.7066 8.37671 11.5833C8.45909 11.46 8.57593 11.3639 8.71289 11.3071C8.84994 11.2504 9.001 11.235 9.14648 11.2639Z" fill="currentColor"/>
    <path d="M12.1465 11.2639C12.2919 11.2929 12.4254 11.3649 12.5303 11.4697C12.6351 11.5746 12.7064 11.7081 12.7354 11.8535C12.7643 11.999 12.7496 12.1501 12.6929 12.2871C12.6361 12.424 12.54 12.5409 12.4167 12.6233C12.2934 12.7057 12.1483 12.75 12 12.75C11.8011 12.75 11.6104 12.6709 11.4697 12.5303C11.3291 12.3897 11.2501 12.1988 11.25 12C11.25 11.8517 11.2943 11.7066 11.3767 11.5833C11.4591 11.46 11.5759 11.3639 11.7129 11.3071C11.8499 11.2504 12.001 11.235 12.1465 11.2639Z" fill="currentColor"/>
    <path d="M6.14648 8.26392C6.29192 8.29287 6.42541 8.36487 6.53027 8.46973C6.6351 8.57459 6.70642 8.70809 6.73535 8.85352C6.76429 8.999 6.74964 9.15006 6.69287 9.28711C6.63611 9.424 6.53995 9.54094 6.41675 9.62329C6.29341 9.7057 6.14834 9.75 6 9.75C5.80113 9.75 5.61037 9.67087 5.46973 9.53027C5.32912 9.38967 5.25005 9.19884 5.25 9C5.25 8.85166 5.2943 8.70659 5.37671 8.58325C5.45908 8.46 5.57595 8.36389 5.71289 8.30713C5.84994 8.25036 6.001 8.23498 6.14648 8.26392Z" fill="currentColor"/>
    <path d="M9.14648 8.26392C9.29193 8.29287 9.42541 8.36487 9.53027 8.46973C9.6351 8.57459 9.70642 8.70809 9.73535 8.85352C9.76429 8.999 9.74964 9.15006 9.69287 9.28711C9.63611 9.424 9.53995 9.54094 9.41675 9.62329C9.29341 9.7057 9.14834 9.75 9 9.75C8.80113 9.75 8.61037 9.67087 8.46973 9.53027C8.32912 9.38967 8.25005 9.19884 8.25 9C8.25 8.85166 8.2943 8.70659 8.37671 8.58325C8.45908 8.46 8.57595 8.36389 8.71289 8.30713C8.84994 8.25036 9.001 8.23498 9.14648 8.26392Z" fill="currentColor"/>
    <path d="M12.1465 8.26392C12.2919 8.29287 12.4254 8.36487 12.5303 8.46973C12.6351 8.57459 12.7064 8.70809 12.7354 8.85352C12.7643 8.999 12.7496 9.15006 12.6929 9.28711C12.6361 9.424 12.5399 9.54094 12.4167 9.62329C12.2934 9.7057 12.1483 9.75 12 9.75C11.8011 9.75 11.6104 9.67087 11.4697 9.53027C11.3291 9.38967 11.2501 9.19884 11.25 9C11.25 8.85166 11.2943 8.70659 11.3767 8.58325C11.4591 8.46 11.5759 8.36389 11.7129 8.30713C11.8499 8.25036 12.001 8.23498 12.1465 8.26392Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 1.5C12.3107 1.5 12.5625 1.75184 12.5625 2.0625V2.25H13.5374C14.7593 2.25 15.75 3.24072 15.75 4.46265V13.5374C15.75 14.7593 14.7593 15.75 13.5374 15.75H4.46265C3.24072 15.75 2.25 14.7593 2.25 13.5374V4.46265C2.25 3.24072 3.24072 2.25 4.46265 2.25H5.4375V2.0625C5.4375 1.75184 5.68934 1.5 6 1.5C6.31066 1.5 6.5625 1.75184 6.5625 2.0625V2.25H11.4375V2.0625C11.4375 1.75184 11.6893 1.5 12 1.5ZM3.375 13.5374C3.375 14.138 3.86204 14.625 4.46265 14.625H13.5374C14.138 14.625 14.625 14.138 14.625 13.5374V6.5625H3.375V13.5374ZM4.46265 3.375C3.86204 3.375 3.375 3.86204 3.375 4.46265V5.4375H14.625V4.46265C14.625 3.86204 14.138 3.375 13.5374 3.375H12.5625V3.5625C12.5625 3.87316 12.3107 4.125 12 4.125C11.6893 4.125 11.4375 3.87316 11.4375 3.5625V3.375H6.5625V3.5625C6.5625 3.87316 6.31066 4.125 6 4.125C5.68934 4.125 5.4375 3.87316 5.4375 3.5625V3.375H4.46265Z" fill="currentColor"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7L9 11" stroke="#4a4a4a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3L9 7L5 11" stroke="#4a4a4a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const ChevronsLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8 3L4 7L8 11M11 3L7 7L11 11" stroke="#4a4a4a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const ChevronsRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M6 3L10 7L6 11M3 3L7 7L3 11" stroke="#4a4a4a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

// ─── Trigger Input ────────────────────────────────────────────────────────────

interface TriggerProps {
  value: string
  placeholder: string
  disabled?: boolean
  open: boolean
  onClick: () => void
  icon?: React.ReactNode
}

const TriggerInput: React.FC<TriggerProps> = ({ value, placeholder, disabled, open, onClick, icon }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className={[
      'flex items-center justify-between gap-2 h-8 px-2 w-full',
      'rounded-md border text-body3 transition-colors duration-150',
      'focus:outline-none',
      disabled
        ? 'bg-secondary-40 border-secondary-200 cursor-not-allowed'
        : open
        ? 'border-secondary-700 bg-white text-secondary-800'
        : 'border-secondary-200 bg-white text-secondary-800 hover:border-secondary-700',
    ].filter(Boolean).join(' ')}
  >
    <span className={disabled ? 'text-[#b4b4b4]' : value ? 'text-secondary-800' : 'text-secondary-400'}>
      {value || placeholder}
    </span>
    <span className={['flex-shrink-0 flex items-center', disabled ? 'text-[#b4b4b4]' : ''].join(' ')}>{icon}</span>
  </button>
)

// ─── Popup shell ──────────────────────────────────────────────────────────────

const PopupPanel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div
    className={[
      'ds-overlay-panel',
      'absolute z-50 top-full mt-1',
      'bg-white rounded-lg shadow-lg',
      'border border-secondary-700',
      className,
    ].join(' ')}
  >
    {children}
  </div>
)

// ─── Calendar footer buttons ──────────────────────────────────────────────────

// Footer — h=44px, border-t #e1e1e1, px=12px
// 좌: 서브텍스트(13px #777), 우: 취소(38×28)+확인(38×28) gap=2px
const FooterButtons: React.FC<{
  onCancel: () => void
  onConfirm: () => void
  subText?: string
}> = ({ onCancel, onConfirm, subText }) => (
  <div className="flex items-center justify-between px-3 border-t border-[#e1e1e1]" style={{ height: 44 }}>
    <span className="text-[13px] font-regular text-secondary-600 truncate">
      {subText ?? ''}
    </span>
    <div className="flex items-center gap-0.5 flex-shrink-0">
      <button
        type="button"
        onClick={onCancel}
        className="h-7 w-[38px] rounded-md border border-secondary-400 text-body5 font-regular text-secondary-800 hover:bg-secondary-50 transition-colors"
      >
        취소
      </button>
      <button
        type="button"
        onClick={onConfirm}
        className="h-7 w-[38px] rounded-md bg-primary-base text-white text-body5 font-bold hover:bg-primary-700 transition-colors"
      >
        확인
      </button>
    </div>
  </div>
)

// ─── Calendar grid ────────────────────────────────────────────────────────────

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

interface CalendarGridProps {
  year: number
  month: number
  selected?: string   // 'YYYY-MM-DD'
  rangeStart?: string
  rangeEnd?: string
  onSelect: (date: string) => void
  onYearMonthChange: (year: number, month: number) => void
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  year, month, selected, rangeStart, rangeEnd, onSelect, onYearMonthChange,
}) => {
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const daysInPrevMonth = getDaysInMonth(year, month - 1)

  const cells: { dateStr: string; day: number; curMonth: boolean }[] = []

  // 이전 달 날짜
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i
    const m = month === 0 ? 12 : month
    const y = month === 0 ? year - 1 : year
    cells.push({ dateStr: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`, day: d, curMonth: false })
  }
  // 현재 달
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ dateStr: `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`, day: d, curMonth: true })
  }
  // 다음 달
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) {
    const m = month === 11 ? 1 : month + 2
    const y = month === 11 ? year + 1 : year
    cells.push({ dateStr: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`, day: d, curMonth: false })
  }

  const nav = (dy: number, dm: number) => {
    let ny = year + dy
    let nm = month + dm
    if (nm < 0) { nm = 11; ny-- }
    if (nm > 11) { nm = 0; ny++ }
    onYearMonthChange(ny, nm)
  }

  return (
    <div className="p-3 w-[186px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-0.5">
          <button type="button" onClick={() => nav(-1, 0)} className="w-[14px] h-[14px] flex items-center justify-center hover:opacity-60"><ChevronsLeft /></button>
          <button type="button" onClick={() => nav(0, -1)} className="w-[14px] h-[14px] flex items-center justify-center hover:opacity-60"><ChevronLeft /></button>
        </div>
        <span className="text-body5 font-bold text-secondary-800">{year}년 {month + 1}월</span>
        <div className="flex gap-0.5">
          <button type="button" onClick={() => nav(0, 1)} className="w-[14px] h-[14px] flex items-center justify-center hover:opacity-60"><ChevronRight /></button>
          <button type="button" onClick={() => nav(1, 0)} className="w-[14px] h-[14px] flex items-center justify-center hover:opacity-60"><ChevronsRight /></button>
        </div>
      </div>

      {/* Day labels — 10px #777777 (일월화수목금토 모두 동일색) */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map(d => (
          <div key={d} className="text-[10px] font-regular text-secondary-600 text-center py-0.5">
            {d}
          </div>
        ))}
      </div>

      {/* Date cells — 20×20 r=4, 10px Bold */}
      <div className="grid grid-cols-7">
        {cells.map(({ dateStr, day, curMonth }, idx) => {
          const isSelected = selected === dateStr
          const isToday = dateStr === todayStr
          const inRange = rangeStart && rangeEnd && dateStr > rangeStart && dateStr < rangeEnd
          const isRangeEnd = rangeEnd === dateStr
          const isRangeStart = rangeStart === dateStr
          const isSunday = idx % 7 === 0

          return (
            <div key={dateStr} className="flex items-center justify-center h-5">
              <button
                type="button"
                onClick={() => onSelect(dateStr)}
                className={[
                  'text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded transition-colors',
                  // 선택된 날짜: bg=#105aff, text=#fff
                  isSelected || isRangeStart || isRangeEnd
                    ? 'bg-primary-base text-white'
                    : inRange
                    ? 'bg-primary-50 text-primary-base'
                    : [
                        // 다른달: #989898
                        !curMonth ? 'text-[#989898]'
                        // 일요일: #fa4553
                        : isSunday ? 'text-negative-dangerPoint'
                        // 오늘(미선택): text=#105aff
                        : isToday ? 'text-primary-base'
                        // 일반: #333333
                        : 'text-secondary-800',
                        'hover:bg-neutral-100',
                      ].join(' '),
                ].filter(Boolean).join(' ')}
              >
                {day}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Time Picker Panel ────────────────────────────────────────────────────────
// full: 200px (시간 100px + 분 100px, 리스트 92px) — TimePicker standalone
// compact: 107px (시간 53px + 분 53px, 리스트 45px) — DateTimePicker 우측

interface TimePickerPanelProps {
  hour: number
  minute: number
  onHourChange: (h: number) => void
  onMinuteChange: (m: number) => void
  compact?: boolean
}

const TimePickerPanel: React.FC<TimePickerPanelProps> = ({ hour, minute, onHourChange, onMinuteChange, compact = false }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 60 }, (_, i) => i)
  const colW  = compact ? 53  : 100
  const itemW = compact ? 45  : 92
  const totalW = compact ? 107 : 200

  const ScrollList: React.FC<{
    items: number[]; selected: number; onChange: (v: number) => void
  }> = ({ items, selected, onChange }) => {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
      if (ref.current) {
        const el = ref.current.children[selected] as HTMLElement
        el?.scrollIntoView({ block: 'nearest' })
      }
    }, [selected])

    return (
      <div style={{ width: colW }}>
        <div ref={ref} className="overflow-y-auto scrollbar-none" style={{ height: 135 }}>
          {items.map(v => (
            <button
              key={v}
              type="button"
              onClick={() => onChange(v)}
              style={{ width: itemW }}
              className={[
                'h-6 mx-auto flex items-center justify-center text-[11px] rounded transition-colors',
                v === selected ? 'text-primary-base font-medium' : 'text-secondary-800 hover:bg-neutral-100',
              ].join(' ')}
            >
              {String(v).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: totalW }}>
      {/* Header — h=34px, border-b #ededed */}
      <div className="flex items-center border-b border-[#ededed]" style={{ height: 34 }}>
        <div className="flex items-center justify-center text-[12px] font-bold text-secondary-800" style={{ width: colW }}>시간</div>
        <div className="text-[12px] font-bold text-secondary-800">:</div>
        <div className="flex items-center justify-center text-[12px] font-bold text-secondary-800" style={{ width: colW }}>분</div>
      </div>
      {/* Scroll columns — h=135px */}
      <div className="flex">
        <ScrollList items={hours} selected={hour} onChange={onHourChange} />
        <div className="w-px bg-secondary-100" />
        <ScrollList items={minutes} selected={minute} onChange={onMinuteChange} />
      </div>
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseDate(val?: string) {
  if (!val) {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  }
  const [y, m] = val.split('-').map(Number)
  return { year: y, month: m - 1 }
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function displayDate(dateStr?: string) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  return `${y}.${m}.${d}`
}

function displayTime(h: number, m: number) {
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

// ─── useOutsideClick ──────────────────────────────────────────────────────────

function useOutsideClick(ref: React.RefObject<HTMLElement | null>, callback: () => void) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) callback()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [ref, callback])
}

// ─── DatePicker ───────────────────────────────────────────────────────────────

const DatePickerInput: React.FC<DateProps> = ({ value, onChange, disabled, className = '' }) => {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(value || '')
  const { year, month } = parseDate(draft)
  const [curYear, setCurYear] = useState(year)
  const [curMonth, setCurMonth] = useState(month)
  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick(ref, () => setOpen(false))

  const handleSelect = (dateStr: string) => setDraft(dateStr)

  const handleConfirm = () => {
    onChange?.(draft)
    setOpen(false)
  }

  return (
    <div ref={ref} className={['relative', className].join(' ')}>
      <TriggerInput
        value={displayDate(value)}
        placeholder="날짜 선택"
        disabled={disabled}
        open={open}
        onClick={() => setOpen(o => !o)}
        icon={<CalendarIcon />}
      />
      {open && (
        <PopupPanel className="w-[186px]">
          <CalendarGrid
            year={curYear} month={curMonth}
            selected={draft}
            onSelect={handleSelect}
            onYearMonthChange={(y, m) => { setCurYear(y); setCurMonth(m) }}
          />
          <FooterButtons onCancel={() => setOpen(false)} onConfirm={handleConfirm} />
        </PopupPanel>
      )}
    </div>
  )
}

// ─── TimePicker ───────────────────────────────────────────────────────────────

const TimePickerInput: React.FC<TimeProps> = ({ value, onChange, disabled, className = '' }) => {
  const [open, setOpen] = useState(false)
  const [h, setH] = useState(() => value ? parseInt(value.split(':')[0]) : 0)
  const [m, setM] = useState(() => value ? parseInt(value.split(':')[1]) : 0)
  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick(ref, () => setOpen(false))

  const handleConfirm = () => {
    onChange?.(displayTime(h, m))
    setOpen(false)
  }

  return (
    <div ref={ref} className={['relative', className].join(' ')}>
      <TriggerInput
        value={value || ''}
        placeholder="시간 선택"
        disabled={disabled}
        open={open}
        onClick={() => setOpen(o => !o)}
        icon={<ClockIcon />}
      />
      {open && (
        <PopupPanel className="w-[200px]">
          <TimePickerPanel hour={h} minute={m} onHourChange={setH} onMinuteChange={setM} />
          <FooterButtons
            subText={`${h}시간 ${String(m).padStart(2,'0')}분 소요`}
            onCancel={() => setOpen(false)}
            onConfirm={handleConfirm}
          />
        </PopupPanel>
      )}
    </div>
  )
}

// ─── DateTimePicker ───────────────────────────────────────────────────────────

const DateTimePickerInput: React.FC<DateTimeProps> = ({ value, onChange, disabled, className = '' }) => {
  const [open, setOpen] = useState(false)
  const datePart = value?.split('T')[0] || ''
  const timePart = value?.split('T')[1] || ''
  const [draftDate, setDraftDate] = useState(datePart)
  const [h, setH] = useState(() => timePart ? parseInt(timePart.split(':')[0]) : 0)
  const [m, setM] = useState(() => timePart ? parseInt(timePart.split(':')[1]) : 0)
  const { year, month } = parseDate(draftDate)
  const [curYear, setCurYear] = useState(year)
  const [curMonth, setCurMonth] = useState(month)
  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick(ref, () => setOpen(false))

  const displayVal = value ? `${displayDate(datePart)} ${displayTime(h, m)}` : ''

  const handleConfirm = () => {
    onChange?.(`${draftDate}T${displayTime(h, m)}`)
    setOpen(false)
  }

  return (
    <div ref={ref} className={['relative', className].join(' ')}>
      <TriggerInput
        value={displayVal}
        placeholder="날짜 및 시간 선택"
        disabled={disabled}
        open={open}
        onClick={() => setOpen(o => !o)}
        icon={<CalendarIcon />}
      />
      {open && (
        // DateTimePicker (293×222): 달력(185px) + compact 타임(107px) + 하단(44px)
        <PopupPanel className="w-fit">
          <div className="flex">
            {/* DatePicker 185px */}
            <div style={{ width: 185 }}>
              <CalendarGrid
                year={curYear} month={curMonth}
                selected={draftDate}
                onSelect={setDraftDate}
                onYearMonthChange={(y, m) => { setCurYear(y); setCurMonth(m) }}
              />
            </div>
            {/* Compact TimePicker 107px */}
            <div className="border-l border-secondary-100">
              <TimePickerPanel compact hour={h} minute={m} onHourChange={setH} onMinuteChange={setM} />
            </div>
          </div>
          <FooterButtons
            subText={draftDate ? `음력 ${draftDate.replace(/-/g, '.')}` : ''}
            onCancel={() => setOpen(false)}
            onConfirm={handleConfirm}
          />
        </PopupPanel>
      )}
    </div>
  )
}

// ─── DateRangePicker ──────────────────────────────────────────────────────────

const DateRangePickerInput: React.FC<DateRangeProps> = ({ startValue, endValue, onChange, disabled, className = '' }) => {
  const [open, setOpen] = useState(false)
  const [start, setStart] = useState(startValue || '')
  const [end, setEnd] = useState(endValue || '')
  const { year, month } = parseDate(start)
  const [curYear, setCurYear] = useState(year)
  const [curMonth, setCurMonth] = useState(month)
  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick(ref, () => setOpen(false))

  const nextMonth = curMonth === 11 ? 0 : curMonth + 1
  const nextYear = curMonth === 11 ? curYear + 1 : curYear

  const handleSelect = (dateStr: string) => {
    if (!start || (start && end)) {
      setStart(dateStr); setEnd('')
    } else {
      if (dateStr < start) { setEnd(start); setStart(dateStr) }
      else setEnd(dateStr)
    }
  }

  const handleConfirm = () => {
    onChange?.(start, end)
    setOpen(false)
  }

  const displayVal = start && end
    ? `${displayDate(start)} ~ ${displayDate(end)}`
    : start ? `${displayDate(start)} ~` : ''

  return (
    <div ref={ref} className={['relative', className].join(' ')}>
      <TriggerInput
        value={displayVal}
        placeholder="기간 선택"
        disabled={disabled}
        open={open}
        onClick={() => setOpen(o => !o)}
        icon={<CalendarIcon />}
      />
      {open && (
        <PopupPanel className="w-fit">
          <div className="flex">
            <CalendarGrid
              year={curYear} month={curMonth}
              rangeStart={start} rangeEnd={end}
              onSelect={handleSelect}
              onYearMonthChange={(y, m) => { setCurYear(y); setCurMonth(m) }}
            />
            <div className="border-l border-secondary-100">
              <CalendarGrid
                year={nextYear} month={nextMonth}
                rangeStart={start} rangeEnd={end}
                onSelect={handleSelect}
                onYearMonthChange={(y, m) => {
                  if (m === 0) { setCurYear(y - 1); setCurMonth(11) }
                  else { setCurYear(y); setCurMonth(m - 1) }
                }}
              />
            </div>
          </div>
          <FooterButtons onCancel={() => setOpen(false)} onConfirm={handleConfirm} />
        </PopupPanel>
      )}
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

const DateTimeInput: React.FC<DateTimeInputProps> = (props) => {
  if (props.type === 'time') return <TimePickerInput {...props} />
  if (props.type === 'datetime') return <DateTimePickerInput {...props} />
  if (props.type === 'daterange') return <DateRangePickerInput {...props} />
  return <DatePickerInput {...props} />
}

export default DateTimeInput

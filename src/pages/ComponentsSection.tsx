import React, { useState } from 'react'
import {
  Button, TextButton, ButtonIcon, GhostButton,
  Tag, Badge, Avatar,
  Input, TextArea, SearchBar, Dropdown, Checkbox, Radio, Toggle, DateTimeInput,
  Tab, Dialog, Snackbar, SnackbarProvider, useSnackbar, Tooltip,
  InfoBox, EmptySet, Loader,
  Thumbnail, FileUpload, OverflowMenu, ActionBar, Picker,
  CheckboxList, IconList, ProfileList, Table, FormTable, ProfileCard, Header, LNB, SNB, SidePanel,
} from '../components'
import { FileUploadBar } from '../components/FileUpload/FileUpload'
import {
  WehagoLogo, HeaderIconButton, HeaderAvatar, OneAiButton,
  IcSearch, IcAlarm, IcBookmark, IcVideo, IcChat, IcInbox, IcTree,
} from '../components/Header/Header'

// ─── PreviewCard ─────────────────────────────────────────────────────────────

function PreviewCard({
  title,
  description,
  importPath,
  children,
}: {
  title: string
  description: string
  importPath: string
  children: React.ReactNode
}) {
  const [showCode, setShowCode] = useState(false)

  return (
    <div style={{ borderRadius: 18, border: '1px solid #e0e0e0', width: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
      <div style={{
        padding: '20px 24px', borderBottom: '1px solid #e0e0e0',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16,
        background: '#ffffff', borderRadius: '18px 18px 0 0',
      }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <h4 style={{ fontSize: 17, fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.3px', margin: 0 }}>{title}</h4>
          <p style={{ fontSize: 14, color: '#6e6e73', marginTop: 4, letterSpacing: '-0.224px', lineHeight: 1.4, wordBreak: 'break-word' }}>{description}</p>
        </div>
        <button
          onClick={() => setShowCode(!showCode)}
          style={{
            flexShrink: 0, fontSize: 14, color: '#0066cc', fontWeight: 400,
            letterSpacing: '-0.224px', background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}
        >
          {showCode ? 'Hide' : 'Import'}
        </button>
      </div>
      {showCode && (
        <div style={{ padding: '12px 24px', borderBottom: '1px solid #e0e0e0', background: '#272729' }}>
          <code style={{ fontSize: 13, fontFamily: 'ui-monospace, monospace', color: '#68db8b', wordBreak: 'break-all' }}>{importPath}</code>
        </div>
      )}
      {/* 프리뷰 wrapper: 이 안에서만 가로 스크롤 */}
      <div style={{ overflowX: 'auto', minWidth: 0, borderRadius: '0 0 18px 18px', background: '#F9F9F9' }}>
        <div className="ds-component-preview" style={{
          padding: '24px', display: 'flex', flexWrap: 'nowrap', gap: 12,
          alignItems: 'flex-start', minHeight: 80,
        }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 56, width: '100%', minWidth: 0 }}>
      <h3 style={{ fontSize: 21, fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.3px', marginBottom: 16 }}>{title}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20, width: '100%' }}>{children}</div>
    </section>
  )
}

// ─── Button ──────────────────────────────────────────────────────────────────

const IcAdd = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 1.50073C9.31066 1.50073 9.5625 1.75257 9.5625 2.06323V8.4375H15.9368C16.2474 8.4375 16.4993 8.68934 16.4993 9C16.4993 9.31066 16.2474 9.5625 15.9368 9.5625H9.5625V15.9375C9.5625 16.2482 9.31066 16.5 9 16.5C8.68934 16.5 8.4375 16.2482 8.4375 15.9375V9.5625H2.0625C1.75184 9.5625 1.5 9.31066 1.5 9C1.5 8.68934 1.75184 8.4375 2.0625 8.4375H8.4375V2.06323C8.4375 1.75257 8.68934 1.50073 9 1.50073Z" fill="currentColor"/>
  </svg>
)

const IcScreenWin = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M14.2874 3C15.5093 3 16.5 3.99072 16.5 5.21265V12.7874C16.5 14.0093 15.5093 15 14.2874 15H3.71265C2.49072 15 1.5 14.0093 1.5 12.7874V5.21265C1.5 3.99072 2.49072 3 3.71265 3H14.2874ZM7.125 13.875H14.2874C14.888 13.875 15.375 13.388 15.375 12.7874V5.21265C15.375 4.61204 14.888 4.125 14.2874 4.125H7.125V13.875ZM3.71265 4.125C3.11204 4.125 2.625 4.61204 2.625 5.21265V12.7874C2.625 13.388 3.11204 13.875 3.71265 13.875H6V4.125H3.71265Z" fill="currentColor"/>
  </svg>
)

function ButtonStateRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-4 items-center gap-2">
      <p className="text-body5 text-neutral-500">{label}</p>
      {children}
    </div>
  )
}

function ButtonDemo() {
  return (
    <PreviewCard
      title="Button"
      description="Primary · Secondary · Tertiary 3가지 variant와 TextButton · ButtonIcon · Icon · GhostButton을 제공합니다."
      importPath={`import { Button, TextButton, ButtonIcon, GhostButton } from './components'`}
    >
      <div className="w-full space-y-6">

        {/* 상태 헤더 + 버튼 행 — 가로스크롤 */}
        <div className="overflow-x-auto">
          <div className="min-w-[420px] space-y-6">

            {/* Header */}
            <div className="grid grid-cols-4 gap-2">
              <div />
              {(['Default', 'Hover', 'Disabled'] as const).map(s => (
                <p key={s} className="text-body5 font-medium text-neutral-400">{s}</p>
              ))}
            </div>

            {/* Primary / Secondary / Tertiary */}
            <div className="space-y-3">
              <ButtonStateRow label="Primary">
                <Button variant="primary" leftIcon={<IcAdd />} rightIcon={<IcAdd />}>Button</Button>
                <Button variant="primary" className="!bg-primary-700" leftIcon={<IcAdd />} rightIcon={<IcAdd />}>Button</Button>
                <Button variant="primary" disabled leftIcon={<IcAdd />} rightIcon={<IcAdd />}>Button</Button>
              </ButtonStateRow>
              <ButtonStateRow label="Secondary">
                <Button variant="secondary" leftIcon={<IcAdd />} rightIcon={<IcAdd />}>Button</Button>
                <Button variant="secondary" className="!bg-primary-50" leftIcon={<IcAdd />} rightIcon={<IcAdd />}>Button</Button>
                <Button variant="secondary" disabled leftIcon={<IcAdd />} rightIcon={<IcAdd />}>Button</Button>
              </ButtonStateRow>
              <ButtonStateRow label="Tertiary">
                <Button variant="tertiary" leftIcon={<IcAdd />} rightIcon={<IcAdd />}>Button</Button>
                <Button variant="tertiary" className="!border-secondary-700" leftIcon={<IcAdd />} rightIcon={<IcAdd />}>Button</Button>
                <Button variant="tertiary" disabled leftIcon={<IcAdd />} rightIcon={<IcAdd />}>Button</Button>
              </ButtonStateRow>
            </div>

            {/* TextButton / ButtonIcon / Icon / GhostButton */}
            <div className="pt-4 border-t border-secondary-60 space-y-3">
              <div className="grid grid-cols-4 items-center gap-2">
                <p className="text-body5 text-neutral-500">TextButton</p>
                <TextButton>자세히보기</TextButton>
                <TextButton className="!text-secondary-800 !underline">자세히보기</TextButton>
                <div />
              </div>

              <ButtonStateRow label="ButtonIcon">
                <ButtonIcon aria-label="추가" icon={<IcAdd />} />
                <ButtonIcon aria-label="추가" className="!border-secondary-700" icon={<IcAdd />} />
                <ButtonIcon aria-label="추가" disabled icon={<IcAdd />} />
              </ButtonStateRow>

              <div className="grid grid-cols-4 items-center gap-2">
                <p className="text-body5 text-neutral-500">Icon</p>
                <button className="inline-flex items-center justify-center w-6 h-6 rounded text-secondary-600">
                  <IcScreenWin />
                </button>
                <button className="inline-flex items-center justify-center w-6 h-6 rounded bg-black/[0.03] text-secondary-700">
                  <IcScreenWin />
                </button>
                <div />
              </div>
            </div>

            {/* GhostButton — dark bg */}
            <div className="pt-4 border-t border-secondary-60">
              <div className="bg-secondary-800 rounded-xl px-4 py-4">
                <div className="grid grid-cols-4 items-center gap-2">
                  <p className="text-body5 text-neutral-400">GhostButton</p>
                  <GhostButton leftIcon={<IcAdd />} rightIcon={<IcAdd />}>Button</GhostButton>
                  <GhostButton className="!bg-white/[0.16]" leftIcon={<IcAdd />} rightIcon={<IcAdd />}>Button</GhostButton>
                  <div />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Size */}
        <div className="pt-4 border-t border-secondary-60">
          <p className="text-body5 font-medium text-neutral-500 mb-3">Size</p>
          <div className="flex flex-wrap gap-2 items-center">
            <Button size="lg">Large</Button>
            <Button size="md">Medium</Button>
            <Button size="sm">Small</Button>
            <Button size="xs">XSmall</Button>
          </div>
        </div>

      </div>
    </PreviewCard>
  )
}

// ─── Tag ─────────────────────────────────────────────────────────────────────

function TagDemo() {
  return (
    <PreviewCard
      title="Tag / TagUser"
      description="콘텐츠 분류 레이블로 md(24px) · sm(20px) 크기를 제공합니다. 삭제 버튼과 아바타를 포함할 수 있습니다."
      importPath={`import { Tag } from './components'`}
    >
      <div className="w-full space-y-3">
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-2">Tag — Medium / Small</p>
          <div className="flex flex-wrap gap-2">
            <Tag size="md">#디자인시스템</Tag>
            <Tag size="md" onRemove={() => {}}>#React</Tag>
            <Tag size="sm">#태그</Tag>
            <Tag size="sm" onRemove={() => {}}>#Tailwind</Tag>
          </div>
        </div>
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-2">TagUser — Avatar + 텍스트</p>
          <div className="flex flex-wrap gap-2">
            <Tag size="md" avatar={<Avatar name="황원정" size="18" src="https://i.pravatar.cc/48?img=5" />} onRemove={() => {}}>#태그</Tag>
            <Tag size="md" avatar={<Avatar name="김철수" size="18" src="https://i.pravatar.cc/48?img=12" />}>#멘션</Tag>
          </div>
        </div>
      </div>
    </PreviewCard>
  )
}

// ─── Badge ────────────────────────────────────────────────────────────────────

function BadgeDemo() {
  return (
    <PreviewCard
      title="Badge"
      description="알림 수(BadgeNoti) · 권한(BadgeAuth) · 상태(Badge) 3가지 타입을 제공합니다. 아이콘이나 아바타와 함께 오버레이 형태로 사용합니다."
      importPath={`import { Badge } from './components'`}
    >
      <div className="w-full space-y-4">
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-2">BadgeNoti — 알림 카운트 (항상 빨간색)</p>
          <div className="flex gap-3 items-center">
            <Badge variant="noti" count={3} />
            <Badge variant="noti" count={99} max={99} />
            <Badge variant="noti" dot />
          </div>
        </div>
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-2">BadgeAuth — 권한 뱃지</p>
          <div className="flex gap-2 items-center">
            <Badge variant="auth" type="master" />
            <Badge variant="auth" type="user" />
            <Badge variant="auth" type="guest" />
          </div>
        </div>
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-2">Badge — 상태 라벨</p>
          <div className="flex gap-2 items-center">
            <Badge type="default">badge</Badge>
            <Badge type="error">badge</Badge>
            <Badge type="info">badge</Badge>
          </div>
        </div>
      </div>
    </PreviewCard>
  )
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function AvatarDemo() {
  // 10가지 사이즈: px값, size key, Figma radius
  const sizes: Array<{ key: string; label: string }> = [
    { key: '18', label: '18' },
    { key: 'xs', label: '24' },
    { key: 'sm', label: '32' },
    { key: '36', label: '36' },
    { key: 'md', label: '40' },
    { key: '44', label: '44' },
    { key: 'lg', label: '48' },
    { key: '52', label: '52' },
    { key: 'xl', label: '56' },
    { key: '60', label: '60' },
  ]

  return (
    <PreviewCard
      title="Avatar"
      description="18~60px 10가지 크기를 지원하며 이미지, 이니셜, 온라인 상태 표시가 가능합니다."
      importPath={`import { Avatar } from './components'`}
    >
      <div className="w-full">
        <div className="flex flex-wrap gap-4 items-end">
          {sizes.map(({ key, label }) => (
            <div key={key} className="flex flex-col items-center gap-1.5">
              <Avatar size={key as 'xs'} />
              <span className="text-body6 text-neutral-500">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewCard>
  )
}

// ─── Input ────────────────────────────────────────────────────────────────────

function InputDemo() {
  const [val, setVal] = useState('')
  const [valSm, setValSm] = useState('')
  return (
    <PreviewCard
      title="Input"
      description="md(32px) · sm(28px) 크기와 success · warning · error 유효성 상태를 지원합니다."
      importPath={`import { Input } from './components'`}
    >
      <div className="w-full space-y-4">
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-2">Size</p>
          <div className="flex flex-wrap gap-3 items-center">
            <Input size="md" placeholder="Medium (32px)" className="w-48"
              value={val} onChange={e => setVal(e.target.value)}
              clearable onClear={() => setVal('')} />
            <Input size="sm" placeholder="Small (28px)" className="w-48"
              value={valSm} onChange={e => setValSm(e.target.value)}
              clearable onClear={() => setValSm('')} />
          </div>
        </div>
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-2">Status</p>
          <div className="flex flex-wrap gap-3 items-start">
            <Input size="md" placeholder="Default" className="w-44" />
            <Input size="md" status="success" defaultValue="내용 입력완료" helperText="사용 가능합니다." className="w-44" />
            <Input size="md" status="warning" defaultValue="내용 입력완료" helperText="사용을 권고하지 않습니다." className="w-44" />
            <Input size="md" status="error" defaultValue="내용 입력완료" helperText="필수입력 항목입니다." className="w-44" />
            <Input size="md" disabled placeholder="Disabled" className="w-44" />
          </div>
        </div>
      </div>
    </PreviewCard>
  )
}

// ─── TextArea ─────────────────────────────────────────────────────────────────

function TextAreaDemo() {
  return (
    <PreviewCard
      title="TextArea"
      description="여러 줄 텍스트 입력 필드입니다. Enabled · Focused · Typing · Completed · Disabled · Error 상태를 지원합니다."
      importPath={`import { TextArea } from './components'`}
    >
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-1.5">Enabled</p>
          <TextArea placeholder="내용을 입력하세요." rows={4} />
        </div>
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-1.5">Focused</p>
          <TextArea placeholder="내용을 입력하세요." rows={4} autoFocus />
        </div>
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-1.5">Typing</p>
          <TextArea defaultValue="내용 입력중" rows={4} />
        </div>
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-1.5">Completed</p>
          <TextArea defaultValue="사용자가 짧은 형식과 긴 형식의 콘텐츠를 모두 입력해야하는 경우가 있으며 때로는 동일한 형식으로되어 있습니다. 사용자가 입력 할 것으로 예상되는 콘텐츠의 길이를 반영 하도록 텍스트 입력 상자의 크기를 허용합니다." rows={4} />
        </div>
      </div>
    </PreviewCard>
  )
}

// ─── SearchBar ────────────────────────────────────────────────────────────────

// ─── SearchBar Filter Panel ───────────────────────────────────────────────────

const PERIOD_TABS = ['전체', '1주', '1개월', '3개월', '6개월', '직접입력'] as const

function FilterField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-5">
      <span className="w-[58px] shrink-0 text-body4 font-medium text-secondary-600">{label}</span>
      <div className="flex-1 flex items-center gap-2">{children}</div>
    </div>
  )
}

function FilterInput({ placeholder }: { placeholder: string }) {
  return (
    <input
      className="flex-1 h-8 px-2 rounded-md bg-neutral-30 text-body3 text-secondary-800 placeholder:text-secondary-400 outline-none"
      placeholder={placeholder}
    />
  )
}

function FilterSelect({ placeholder }: { placeholder: string }) {
  return (
    <div className="h-8 px-2 rounded-md bg-neutral-30 flex items-center justify-between gap-1 min-w-[94px] cursor-pointer">
      <span className="text-body3 text-secondary-600 whitespace-nowrap">{placeholder}</span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
        <path d="M2 4L6 8L10 4" stroke="#B4B4B4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

function SearchbarFilterPanel({ onClose }: { onClose: () => void }) {
  const [period, setPeriod] = useState<typeof PERIOD_TABS[number]>('전체')
  const [hasAttach, setHasAttach] = useState(false)

  return (
    <div className="w-full sm:w-[493px] bg-white rounded-xl border border-secondary-100 px-5 py-6 flex flex-col gap-4 mt-1 shadow-sm">

      {/* 기간 */}
      <FilterField label="기간">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center gap-1 bg-secondary-50 rounded-md p-1 w-full sm:w-[347px] flex-wrap sm:flex-nowrap">
            {PERIOD_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setPeriod(tab)}
                style={{ width: tab === '직접입력' ? 59 : 52 }}
                className={[
                  'shrink-0 h-6 px-1 rounded text-body5 whitespace-nowrap transition-colors',
                  period === tab
                    ? 'bg-white text-secondary-800 font-medium shadow-sm'
                    : 'text-secondary-600 font-normal',
                ].join(' ')}
              >
                {tab}
              </button>
            ))}
          </div>
          <span className="text-body5 font-medium text-secondary-500">조회기간: {period}</span>
        </div>
      </FilterField>

      {/* 메일함 */}
      <FilterField label="메일함">
        <div className="flex-1">
          <FilterSelect placeholder="전체 메일함" />
        </div>
      </FilterField>

      {/* 보낸사람 */}
      <FilterField label="보낸사람">
        <FilterInput placeholder="내용을 입력하세요." />
      </FilterField>

      {/* 받는사람 */}
      <FilterField label="받는사람">
        <FilterSelect placeholder="받는 사람" />
        <FilterInput placeholder="내용을 입력하세요." />
      </FilterField>

      {/* 내용 */}
      <FilterField label="내용">
        <FilterSelect placeholder="제목+본문" />
        <FilterInput placeholder="내용을 입력하세요." />
      </FilterField>

      {/* 담당자 */}
      <FilterField label="담당자">
        <FilterInput placeholder="내용을 입력하세요." />
      </FilterField>

      {/* 검색 */}
      <FilterField label="검색">
        <div className="flex-1 h-8 px-2 rounded-md bg-neutral-30 flex items-center gap-1">
          <input className="flex-1 bg-transparent text-body3 placeholder:text-secondary-400 outline-none" placeholder="이름을 검색하세요." />
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.83813 1.80029C11.1725 1.80029 13.8755 4.50331 13.8755 7.83765C13.8755 9.30227 13.3536 10.6448 12.4861 11.6902L15.3982 14.6023C15.6178 14.822 15.6178 15.178 15.3982 15.3977C15.1785 15.6174 14.8225 15.6173 14.6028 15.3977L11.6907 12.4856C10.6453 13.3531 9.30276 13.875 7.83813 13.875C4.5038 13.875 1.80078 11.172 1.80078 7.83765C1.80078 4.50331 4.5038 1.80029 7.83813 1.80029ZM7.83813 2.92529C5.12512 2.92529 2.92578 5.12463 2.92578 7.83765C2.92578 10.5507 5.12512 12.75 7.83813 12.75C10.5512 12.75 12.7505 10.5507 12.7505 7.83765C12.7505 5.12463 10.5512 2.92529 7.83813 2.92529Z" fill="#B4B4B4"/>
          </svg>
        </div>
      </FilterField>

      {/* 하단 버튼 영역 */}
      <div className="flex items-center justify-between pt-2 border-t border-secondary-60">
        <label className="flex items-center gap-1 cursor-pointer">
          <input type="checkbox" checked={hasAttach} onChange={e => setHasAttach(e.target.checked)} className="w-3.5 h-3.5 accent-primary-300 rounded" />
          <span className="text-body5 text-secondary-800">첨부파일</span>
        </label>
        <div className="flex items-center gap-1">
          <Button variant="tertiary" size="sm" onClick={onClose}>초기화</Button>
          <Button variant="primary" size="sm" onClick={onClose}>조회</Button>
        </div>
      </div>
    </div>
  )
}

function SearchBarDemo() {
  const [q, setQ] = useState('')
  const [showFilter, setShowFilter] = useState(false)

  return (
    <PreviewCard
      title="SearchBar"
      description="기본형과 필터 버튼이 포함된 Filter variant를 제공합니다. 입력 시 삭제 버튼, error · disabled 상태를 지원합니다."
      importPath={`import { SearchBar } from './components'`}
    >
      <div className="w-full space-y-3">
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-1.5">Default</p>
          <div className="flex flex-wrap gap-3">
            <div className="w-48">
              <p className="text-body5 text-neutral-400 mb-1">Default</p>
              <SearchBar value={q} onChange={setQ} placeholder="이름을 검색하세요." />
            </div>
            <div className="w-48">
              <p className="text-body5 text-neutral-400 mb-1">Error</p>
              <SearchBar status="error" value="e!@" onChange={() => {}} placeholder="검색" />
            </div>
            <div className="w-48">
              <p className="text-body5 text-neutral-400 mb-1">Disabled</p>
              <SearchBar disabled placeholder="이름을 검색하세요." />
            </div>
          </div>
        </div>
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-1.5">Filter variant</p>
          <div className="w-64">
            <SearchBar
              showFilter
              placeholder="검색어를 입력해주세요"
              onFilter={() => setShowFilter(v => !v)}
            />
            {showFilter && <SearchbarFilterPanel onClose={() => setShowFilter(false)} />}
          </div>
        </div>
      </div>
    </PreviewCard>
  )
}

// ─── Dropdown ─────────────────────────────────────────────────────────────────

function DropdownDemo() {
  const [val, setVal] = useState('option1')
  const options = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3 (비활성)', disabled: true },
  ]
  return (
    <PreviewCard
      title="Dropdown"
      description="목록에서 하나의 옵션을 선택하는 컴포넌트입니다. 비활성 항목과 disabled 상태를 지원합니다."
      importPath={`import { Dropdown } from './components'`}
    >
      <div className="flex flex-wrap gap-3 w-full">
        <div className="w-48"><Dropdown options={options} value={val} onChange={setVal} /></div>
        <div className="w-48"><Dropdown options={options} disabled placeholder="비활성화" /></div>
      </div>
    </PreviewCard>
  )
}

// ─── SelectControl ────────────────────────────────────────────────────────────

function SelectControlDemo() {
  const [checks, setChecks] = useState({ a: true, b: false })
  const [radio, setRadio] = useState('r1')
  const [toggle, setToggle] = useState(true)
  return (
    <PreviewCard
      title="SelectControl"
      description="Checkbox · Radio · Toggle 3가지 선택 컨트롤을 제공합니다. 다중 선택, 단일 선택, 켜고 끄기 등 다양한 선택 방식을 지원합니다."
      importPath={`import { Checkbox, Radio, Toggle } from './components'`}
    >
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Checkbox */}
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-3">Checkbox</p>
          <div className="flex flex-col gap-3">
            <Checkbox checked={checks.a} label="선택됨" onChange={v => setChecks(c => ({...c, a: v}))} />
            <Checkbox checked={checks.b} label="미선택" onChange={v => setChecks(c => ({...c, b: v}))} />
            <Checkbox checked={false} indeterminate label="Indeterminate" onChange={() => {}} />
            <Checkbox checked={false} disabled label="비활성" onChange={() => {}} />
          </div>
        </div>

        {/* Radio */}
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-3">Radio</p>
          <div className="flex flex-col gap-3">
            {['r1','r2','r3'].map(v => (
              <Radio key={v} checked={radio === v} value={v} name="demo-radio" label={`옵션 ${v.slice(1)}`} onChange={setRadio} />
            ))}
            <Radio checked={false} disabled label="비활성" onChange={() => {}} />
          </div>
        </div>

        {/* Toggle */}
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-3">Toggle</p>
          <div className="flex flex-col gap-3">
            <Toggle checked={toggle} size="md" label={`Medium ${toggle ? 'On' : 'Off'}`} onChange={setToggle} />
            <Toggle checked={toggle} size="sm" label={`Small ${toggle ? 'On' : 'Off'}`} onChange={setToggle} />
            <Toggle checked={false} disabled label="비활성" onChange={() => {}} />
          </div>
        </div>
      </div>
    </PreviewCard>
  )
}

// ─── DateTimeInput ────────────────────────────────────────────────────────────

function DateTimeInputDemo() {
  const [date, setDate] = useState('2026-04-23')
  const [time, setTime] = useState('14:30')
  const [rangeStart, setRangeStart] = useState('')
  const [rangeEnd, setRangeEnd] = useState('')
  return (
    <PreviewCard
      title="DateTimeInput"
      description="날짜 · 시간 · 날짜+시간 · 날짜 범위 4가지 타입의 입력을 지원합니다."
      importPath={`import { DateTimeInput } from './components'`}
    >
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-1.5">DatePicker</p>
          <DateTimeInput type="date" value={date} onChange={setDate} />
        </div>
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-1.5">TimePicker</p>
          <DateTimeInput type="time" value={time} onChange={setTime} />
        </div>
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-1.5">DateTimePicker</p>
          <DateTimeInput type="datetime" value="2026-04-23T14:30" onChange={() => {}} />
        </div>
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-1.5">DateRangePicker</p>
          <DateTimeInput
            type="daterange"
            startValue={rangeStart}
            endValue={rangeEnd}
            onChange={(s, e) => { setRangeStart(s); setRangeEnd(e) }}
          />
        </div>
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-1.5">Disabled</p>
          <DateTimeInput type="date" value="2026-04-23" disabled onChange={() => {}} />
        </div>
      </div>
    </PreviewCard>
  )
}

// ─── Tab 전용 아이콘 ─────────────────────────────────────────────────────────

// ic_chat 24×24 — TabBorder 아이콘
const IcChat24 = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 5h18v12H12.5L8 20v-3H3V5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
  </svg>
)

// ic_attach 18×18 — TabChips 아이콘 (클립)
const IcAttach18 = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M14.5 8.5L8.5 14.5a4 4 0 0 1-5.657-5.657l7.07-7.07a2.5 2.5 0 0 1 3.536 3.536L6.5 12.5a1 1 0 0 1-1.414-1.414L11.5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)

// ic_thumb_fill 18×18 — TabIcon: 2×2 격자 (갤러리/썸네일)
const IcThumbFill18 = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="2.5" y="2.5" width="5.5" height="5.5" rx="1.5" fill="currentColor"/>
    <rect x="10"  y="2.5" width="5.5" height="5.5" rx="1.5" fill="currentColor"/>
    <rect x="2.5" y="10"  width="5.5" height="5.5" rx="1.5" fill="currentColor"/>
    <rect x="10"  y="10"  width="5.5" height="5.5" rx="1.5" fill="currentColor"/>
  </svg>
)

// ic_list_thick 18×18 — TabIcon: 목록 줄
const IcListThick18 = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M3 5.5h12M3 9h12M3 12.5h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

// ─── TabDemo ─────────────────────────────────────────────────────────────────

function TabDemo() {
  const [border,  setBorder]  = useState('t1')
  const [chips,   setChips]   = useState('t1')
  const [text,    setText]    = useState('t1')
  const [icon,    setIcon]    = useState('t1')
  const [segment, setSegment] = useState('t1')

  // TabBorder (Tabs): 텍스트만, active border-b #4a4a4a
  const borderTabs = [
    { value: 't1', label: 'Tab Item' },
    { value: 't2', label: 'Tab Item' },
    { value: 't3', label: 'Tab Item' },
    { value: 't4', label: 'Tab 4'    },
  ]

  // TabChips: 텍스트 + count + ic_arrow_down, active bg=#4a4a4a
  const chipsTabs = [
    { value: 't1', label: 'Tab Item', count: 99 },
    { value: 't2', label: 'Tab Item', count: 0  },
    { value: 't3', label: 'Tab Item', count: 0  },
    { value: 't4', label: 'Tab Item', count: 0  },
  ]

  // TabText: 텍스트 + count, 아이템 사이 divider 1×12 #e1e1e1
  const textTabs = [
    { value: 't1', label: 'Tab Item', count: 0 },
    { value: 't2', label: 'Tab Item', count: 0 },
    { value: 't3', label: 'Tab Item', count: 0 },
    { value: 't4', label: 'Tab Item', count: 0 },
  ]

  // TabIcon: 아이콘만, 컨테이너 border r=6, active btn stroke=#4a4a4a
  const iconTabs = [
    { value: 't1', label: '갤러리', icon: <IcThumbFill18 /> },
    { value: 't2', label: '목록',   icon: <IcListThick18 /> },
    { value: 't3', label: '목록2',  icon: <IcListThick18 /> },
  ]

  // TabSegment: 컨테이너 bg=#f4f4f4 r=6, active bg=#fff r=4 h=24 12px
  const segmentTabs = [
    { value: 't1', label: 'Tab Item' },
    { value: 't2', label: 'Tab Item' },
    { value: 't3', label: 'Tab Item' },
  ]

  return (
    <PreviewCard
      title="Tab"
      description="동일 화면 내 콘텐츠 전환 컴포넌트입니다. Tabs · Chips · Text · Icon · Segment 5가지 스타일을 제공합니다."
      importPath={`import { Tab } from './components'`}
    >
      <div className="w-full space-y-6">
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-2">Tab Border</p>
          <Tab tabs={borderTabs} value={border} onChange={setBorder} variant="border" />
        </div>
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-2">Tab Chips</p>
          <Tab tabs={chipsTabs} value={chips} onChange={setChips} variant="chips" />
        </div>
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-2">Tab Text</p>
          <Tab tabs={textTabs} value={text} onChange={setText} variant="text" />
        </div>
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-2">Tab Icon</p>
          <Tab tabs={iconTabs} value={icon} onChange={setIcon} variant="icon" />
        </div>
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-2">Tab Segment</p>
          <Tab tabs={segmentTabs} value={segment} onChange={setSegment} variant="segment" />
        </div>
      </div>
    </PreviewCard>
  )
}

// ─── Dialog ───────────────────────────────────────────────────────────────────

function DialogDemo() {
  return (
    <PreviewCard
      title="Dialog / Alert"
      description="사용자 확인이 필요한 작업에 사용하는 모달입니다. 기본형과 아이콘이 포함된 Alert 타입을 지원합니다."
      importPath={`import { Dialog } from './components'`}
    >
      <div className="flex flex-wrap gap-6 items-start justify-center w-full">
        <Dialog
          isOpen={true}
          isInline
          onClose={() => {}}
          title="다이얼로그 제목"
          subtitle="텍스트 한줄로 설명글을 넣어주세요."
          footer={
            <>
              <Button variant="secondary" size="md">취소</Button>
              <Button variant="primary" size="md">확인</Button>
            </>
          }
        >
          <p>다이얼로그 내용 영역입니다.</p>
        </Dialog>
        <Dialog
          isOpen={true}
          isInline
          onClose={() => {}}
          title="삭제하시겠습니까?"
          subtitle="사용자의 확인이 필요한 항목에 대한 세부 내용을 표시합니다."
          size="sm"
          type="alert"
          icon={
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <path d="M21.0193 7.18969C21.5167 6.32327 22.2403 5.60215 23.1159 5.10031C23.9915 4.59847 24.9875 4.33398 26.0018 4.33398C27.0161 4.33398 28.0121 4.59847 28.8877 5.10031C29.7632 5.60215 30.4868 6.32327 30.9842 7.18969L46.9351 34.9872C47.4233 35.8397 47.6755 36.8026 47.6666 37.7803C47.6577 38.7579 47.388 39.7163 46.8842 40.5602C46.3805 41.404 45.6603 42.104 44.7952 42.5906C43.93 43.0772 42.95 43.3335 41.9526 43.334H10.051C9.05267 43.334 8.07176 43.0779 7.20583 42.591C6.3399 42.1041 5.61913 41.4034 5.11524 40.5587C4.61134 39.714 4.34189 38.7547 4.33369 37.7763C4.32549 36.7978 4.57882 35.8343 5.06848 34.9816L21.0193 7.18969Z" fill="#FFA000"/>
              <path d="M25.9998 33.3675C27.5553 33.3675 28.8159 34.6283 28.8161 36.1838C28.8161 37.7394 27.5554 39 25.9998 39C24.4444 38.9998 23.1836 37.7392 23.1836 36.1838C23.1838 34.6285 24.4446 33.3677 25.9998 33.3675Z" fill="white"/>
              <path d="M25.9998 13C27.5552 13 28.8157 14.293 28.8161 15.8882V27.4452C28.8157 29.0403 27.5552 30.3333 25.9998 30.3333C24.4447 30.3331 23.184 29.0402 23.1836 27.4452V15.8882C23.184 14.2932 24.4447 13.0002 25.9998 13Z" fill="white"/>
            </svg>
          }
          footer={
            <>
              <Button variant="secondary" size="md">취소</Button>
              <Button variant="primary" size="md">확인</Button>
            </>
          }
        />
      </div>
    </PreviewCard>
  )
}

// ─── Snackbar ─────────────────────────────────────────────────────────────────

// Snackbar 정적 미리보기 — 피그마 그대로
// 모든 타입 bg=#222222, 아이콘이 색상 구분, 실행취소 액션 포함
const SnackbarPreview: React.FC<{ icon: React.ReactNode; message: string; action?: boolean }> = ({ icon, message, action }) => (
  <div
    className="flex items-center gap-2 rounded-full bg-[#222222] shadow-lg w-full sm:w-auto"
    style={{ height: 48, maxWidth: action ? 305 : 186, paddingLeft: 12, paddingRight: 20 }}
  >
    <span className="flex-shrink-0">{icon}</span>
    <span className="text-[16px] font-medium text-white whitespace-nowrap leading-6">{message}</span>
    {action && (
      <span className="flex items-center gap-3 flex-shrink-0 ml-1">
        <span className="w-px h-[10px] bg-[#777777]" aria-hidden="true" />
        <span className="text-[14px] font-medium text-[#b4b4b4] whitespace-nowrap">실행취소</span>
      </span>
    )}
  </div>
)

function SnackbarDemo() {
  const IcCheckCircle = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#27C36F"/>
      <path d="M15.2822 8.80365C15.6666 8.4073 16.2998 8.39774 16.6962 8.78216C17.0926 9.16665 17.1021 9.79979 16.7177 10.1962L11.3847 15.6962C11.1964 15.8904 10.9374 15.9999 10.6669 15.9999C10.3965 15.9999 10.1375 15.8903 9.94916 15.6962L7.28216 12.9462C6.89774 12.5498 6.9073 11.9166 7.30365 11.5322C7.70009 11.1477 8.33323 11.1573 8.71771 11.5536L10.666 13.5634L15.2822 8.80365Z" fill="white"/>
    </svg>
  )
  const IcError = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#FFA000"/>
      <path d="M12 15.4004C12.7179 15.4004 13.2997 15.9823 13.2998 16.7002C13.2998 17.4182 12.718 18 12 18C11.2821 17.9999 10.7002 17.4181 10.7002 16.7002C10.7003 15.9824 11.2822 15.4005 12 15.4004Z" fill="white"/>
      <path d="M12 6C12.7179 6 13.2996 6.59678 13.2998 7.33301V12.667C13.2996 13.4032 12.7179 14 12 14C11.2822 13.9999 10.7004 13.4032 10.7002 12.667V7.33301C10.7004 6.59684 11.2822 6.00011 12 6Z" fill="white"/>
    </svg>
  )
  const IcError1 = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#FA4553"/>
      <path d="M12 15.4004C12.7179 15.4004 13.2997 15.9823 13.2998 16.7002C13.2998 17.4182 12.718 18 12 18C11.2821 17.9999 10.7002 17.4181 10.7002 16.7002C10.7003 15.9824 11.2822 15.4005 12 15.4004Z" fill="white"/>
      <path d="M12 6C12.7179 6 13.2996 6.59678 13.2998 7.33301V12.667C13.2996 13.4032 12.7179 14 12 14C11.2822 13.9999 10.7004 13.4032 10.7002 12.667V7.33301C10.7004 6.59684 11.2822 6.00011 12 6Z" fill="white"/>
    </svg>
  )
  const IcInfo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#719BFC"/>
      <path d="M12 10C12.7179 10 13.2996 10.5968 13.2998 11.333V16.667C13.2996 17.4032 12.7179 18 12 18C11.2822 17.9999 10.7004 17.4032 10.7002 16.667V11.333C10.7004 10.5968 11.2822 10.0001 12 10Z" fill="white"/>
      <path d="M12 6C12.718 6 13.2998 6.58183 13.2998 7.2998C13.2997 8.01769 12.7179 8.59961 12 8.59961C11.2822 8.5995 10.7003 8.01762 10.7002 7.2998C10.7002 6.5819 11.2821 6.00011 12 6Z" fill="white"/>
    </svg>
  )

  return (
    <PreviewCard
      title="Snackbar"
      description="화면 하단에 일시적으로 표시되는 알림 메시지입니다. 성공 · 경고 · 오류 · 정보 4가지 타입과 실행 취소 액션을 지원합니다."
      importPath={`import { Snackbar, SnackbarProvider, useSnackbar } from './components'`}
    >
      <div className="flex flex-col gap-3">
        <SnackbarPreview icon={<IcCheckCircle />} message="휴지통으로 이동했습니다." action />
        <SnackbarPreview icon={<IcError />}       message="경고성 문구입니다." />
        <SnackbarPreview icon={<IcError1 />}      message="오류성 문구입니다." />
        <SnackbarPreview icon={<IcInfo />}        message="정보성 문구입니다." />
      </div>
    </PreviewCard>
  )
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function TooltipDemo() {
  return (
    <PreviewCard
      title="Tooltip"
      description="요소에 hover 시 간단한 설명을 표시합니다. top · bottom 방향을 지원합니다."
      importPath={`import { Tooltip } from './components'`}
    >
      <div className="flex gap-6 flex-wrap">
        {(['top','bottom'] as const).map(p => (
          <Tooltip key={p} content={`${p} 툴팁`} placement={p}>
            <Button variant="secondary" size="sm">Hover ({p})</Button>
          </Tooltip>
        ))}
      </div>
    </PreviewCard>
  )
}

// ─── InfoBox ──────────────────────────────────────────────────────────────────

function InfoBoxDemo() {
  return (
    <PreviewCard
      title="InfoBox"
      description="인라인 형태의 안내 메시지입니다. info · error 2가지 타입을 제공하며 링크 액션을 포함할 수 있습니다."
      importPath={`import { InfoBox } from './components'`}
    >
      <div className="w-full space-y-2">
        <InfoBox type="error" title="Credit이 모두 소진되어 번역이 중지되었습니다.">크레딧 추가 구매는 회사 관리자에게 문의해주세요.</InfoBox>
        <InfoBox type="info" title="보유 크레딧을 80% 이상 사용하였습니다.">크레딧 추가 구매는 회사 관리자에게 문의해주세요.</InfoBox>
      </div>
    </PreviewCard>
  )
}

// ─── Feedback ────────────────────────────────────────────────────────────────


// ─── EmptySet ────────────────────────────────────────────────────────────────

function EmptySetDemo() {
  return (
    <PreviewCard
      title="EmptySet"
      description="데이터가 없을 때 표시하는 빈 상태 컴포넌트입니다. md · sm · xs 3가지 크기와 커스텀 아이콘 · 액션을 지원합니다."
      importPath={`import { EmptySet } from './components'`}
    >
      <div className="w-full flex flex-wrap gap-8 justify-center">
        <div className="flex flex-col items-center">
          <p className="text-body5 text-neutral-500 mb-2">Medium</p>
          <EmptySet size="md" description={'검색결과가 없습니다.\n검색어를 다시 확인해주세요.'} action={<Button variant="secondary" size="sm">새로 만들기</Button>} />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-body5 text-neutral-500 mb-2">Small</p>
          <EmptySet size="sm" description={'검색결과가 없습니다.\n검색어를 다시 확인해주세요.'} />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-body5 text-neutral-500 mb-2">XSmall</p>
          <EmptySet size="xs" description={'검색결과가 없습니다.\n검색어를 다시 확인해주세요.'} />
        </div>
      </div>
    </PreviewCard>
  )
}

// ─── Loading ─────────────────────────────────────────────────────────────────

function LoadingDemo() {
  return (
    <PreviewCard
      title="Loading"
      description="로딩 상태를 나타내는 스피너입니다. vertical · horizontal 2가지 레이아웃을 제공합니다."
      importPath={`import { Loader } from './components'`}
    >
      <div className="flex flex-wrap gap-10 items-center">
        <div className="flex flex-col items-center gap-2">
          <p className="text-body5 font-medium text-neutral-500 mb-1">Vertical</p>
          <Loader direction="vertical" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-body5 font-medium text-neutral-500 mb-1">Horizontal</p>
          <Loader direction="horizontal" />
        </div>
      </div>
    </PreviewCard>
  )
}

// ─── Thumbnail ───────────────────────────────────────────────────────────────

function ThumbnailDemo() {
  return (
    <PreviewCard
      title="Thumbnail (FileThumbnail)"
      description="이미지나 파일을 미리보기 형태로 표시합니다. default · selected · hovered · file · warning 상태를 지원합니다."
      importPath={`import { Thumbnail } from './components'`}
    >
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 190px)' }}>
        <div>
          <p className="text-body5 text-neutral-500 mb-1.5">Default (이미지)</p>
          <Thumbnail filename="프레젠테이션" extension=".pptx" author="김더존" fileSize="16MB" selectable />
        </div>
        <div>
          <p className="text-body5 text-neutral-500 mb-1.5">Selected</p>
          <Thumbnail state="selected" filename="보고서" extension=".pdf" author="이영희" fileSize="4MB" selectable selected />
        </div>
        <div>
          <p className="text-body5 text-neutral-500 mb-1.5">File (아이콘)</p>
          <Thumbnail state="file" fileType="PDF" filename="AI 에이전트 혁신" extension=".pdf" author="박민준" fileSize="2MB" selectable />
        </div>
        <div>
          <p className="text-body5 text-neutral-500 mb-1.5">Warning</p>
          <Thumbnail state="warning" filename="손상된 파일" extension=".xlsx" author="김더존" fileSize="8MB" selectable />
        </div>
      </div>
    </PreviewCard>
  )
}

// ─── FileUpload ───────────────────────────────────────────────────────────────

function FileUploadDemo() {
  const [progress, setProgress] = useState(30)
  const [resultFiles, setResultFiles] = useState([
    { id: '1', name: 'AI 에이전트 혁신 : 산업을 바꾸는 현재와 미래전망.pdf' },
    { id: '2', name: 'AI 기술의 발전 : 새로운 기회와 도전.pdf' },
    { id: '3', name: '2025 디자인 시스템 가이드라인.pdf' },
    { id: '4', name: 'WEHAGO 사용자 매뉴얼 최종본.pdf' },
    { id: '5', name: '프로젝트 기획안 v2.0.pdf' },
    { id: '6', name: 'AI 기술의 발전 : 새로운 기회와 도전.pdf' },
    { id: '7', name: '업무 프로세스 개선 제안서.pdf' },
    { id: '8', name: '2025 상반기 결산 보고서.pdf' },
  ])

  // ic_file_pdf 18×18 — 피그마 원본
  const IcFilePdf = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
      <g clipPath="url(#clip-pdf)">
        <path d="M15.3983 17.9977H2.60179C2.20708 17.9946 1.82975 17.8348 1.55283 17.5536C1.2759 17.2723 1.12205 16.8926 1.12505 16.4979V1.49981C1.12347 1.30437 1.1604 1.11049 1.23377 0.929327C1.30714 0.748163 1.41551 0.583257 1.55265 0.443975C1.68979 0.304694 1.853 0.19381 2.03302 0.117631C2.21304 0.0414512 2.40632 0.00147132 2.60179 0H11.5455C11.6752 0.000136205 11.8036 0.0260896 11.9231 0.076437C12.0426 0.126784 12.1508 0.200507 12.2415 0.293207L16.5878 4.70641C16.7724 4.89545 16.8756 5.14934 16.875 5.41357V16.4979C16.878 16.8926 16.7241 17.2723 16.4472 17.5536C16.1703 17.8348 15.793 17.9946 15.3983 17.9977Z" fill="#EF5959"/>
        <path d="M4.34465 13.923L4.10076 13.7941C4.06448 13.7699 4.03578 13.7358 4.01799 13.696C4.00021 13.6562 3.99422 13.6132 4.00042 13.57C4.00051 13.5401 4.00332 13.5101 4.0092 13.4807C4.0842 13.0885 4.56684 12.5006 5.52459 11.915C5.63259 11.8505 6.08928 11.6015 6.08928 11.6015C6.08928 11.6015 5.74685 11.9384 5.6696 12.0014C5.05937 12.4411 4.59979 13.0586 4.35344 13.7692V13.7927C5.00369 13.6989 5.97933 12.3436 7.23333 9.83369C7.54008 9.22176 7.88234 8.53309 8.15984 7.84468L8.26751 7.57664C8.01467 6.7151 7.86321 5.82668 7.81707 4.93C7.81679 4.72075 7.84242 4.51215 7.89251 4.30899C7.93301 4.21251 8.00279 4.1315 8.09246 4.07757C8.18213 4.02364 8.28707 3.9993 8.39128 4.00873H8.55828C8.87478 4.00273 9.0193 4.41586 9.03655 4.57409C9.03913 4.60979 9.03913 4.64531 9.03655 4.68101C9.02583 4.88716 8.99418 5.09203 8.94207 5.29177V5.25516C8.95419 5.01726 8.91777 4.77966 8.8344 4.55651C8.7069 4.2648 8.57771 4.08935 8.46746 4.0556C8.42798 4.08969 8.39605 4.1315 8.37371 4.17863C8.35137 4.22576 8.33922 4.27735 8.33782 4.32949C8.30544 4.53643 8.28813 4.74546 8.28655 4.9549C8.30157 5.57151 8.39658 6.18335 8.56926 6.77548C8.60451 6.67574 8.63825 6.57046 8.66375 6.47522C8.69825 6.33049 8.94207 5.35036 8.94207 5.35036C8.94207 5.35036 8.88267 6.65042 8.79192 7.04937C8.77467 7.12811 8.75433 7.21505 8.73333 7.30129C9.01813 8.14434 9.49673 8.90829 10.1315 9.53197C10.3783 9.75429 10.6499 9.94868 10.9408 10.109C11.4843 10.0246 12.0337 9.9811 12.5837 9.97869C13.0244 9.93558 13.467 10.0362 13.8456 10.2658C13.9321 10.3531 13.9826 10.4696 13.9863 10.5924C13.982 10.6593 13.9731 10.7201 13.9599 10.7799C13.9599 10.7128 13.9177 10.5659 13.4677 10.4166C12.8032 10.2858 12.1211 10.2749 11.4528 10.3844C12.1481 10.824 12.9617 11.0385 13.7834 10.9981C13.8502 10.9519 13.9088 10.8946 13.9555 10.8282C13.9328 10.9382 13.901 11.0458 13.8603 11.1504C13.8001 11.234 13.7133 11.2951 13.6142 11.3232C12.5769 11.3449 11.5569 11.0522 10.6889 10.484C9.41231 10.6839 8.15491 10.99 6.92937 11.3994C5.98662 13.0852 5.24755 13.9845 4.6303 13.9845C4.53254 13.9873 4.43552 13.9672 4.34685 13.9259L4.34465 13.923ZM7.62957 10.0431C7.42032 10.4503 7.21496 10.8208 7.02971 11.168C8.07513 10.7391 9.16371 10.4239 10.2765 10.2277C10.1317 10.1273 9.99344 10.0184 9.86199 9.90106C9.28669 9.39484 8.82097 8.77634 8.49382 8.08342C8.25322 8.75635 7.96372 9.4114 7.62957 10.0431Z" fill="white"/>
      </g>
      <defs><clipPath id="clip-pdf"><rect width="18" height="18" fill="white"/></clipPath></defs>
    </svg>
  )

  // ic_close 14×14 (row 삭제)
  const IcClose14 = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
      <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="#949daf" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )

  return (
    <PreviewCard
      title="FileUpload"
      description="파일 업로드 컴포넌트입니다. 드래그 앤 드롭과 클릭 선택을 지원하며 업로드 전(Default) · 후(Result) 상태를 제공합니다."
      importPath={`import { FileUpload } from './components'`}
    >
      <div className="w-full space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Type=Default */}
          <div>
            <p className="text-body5 font-medium text-neutral-500 mb-2">Default</p>
            <FileUpload
              onUpload={files => console.log(files)}
              accept="image/*,.pdf"
              multiple
              maxSize={2048}
              maxCount={5}
              onWeDrive={() => alert('WE Drive')}
            />
          </div>

          {/* Type=Result — 업로드 후 (380×184, bg=#f7f8fa, r=12) */}
          <div>
            <p className="text-body5 font-medium text-neutral-500 mb-2">Result</p>
            {/* 높이 고정 + overflow-y-auto → 내용 넘치면 스크롤바 자동 표시 */}
            <div className="bg-neutral-30 rounded-xl overflow-y-auto w-full sm:w-[380px]" style={{ height: 184 }}>
              <ul className="px-4" style={{ paddingTop: 12, paddingBottom: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {resultFiles.map(f => (
                  <li key={f.id} className="flex items-center gap-2" style={{ height: 20 }}>
                    <IcFilePdf />
                    <span className="flex-1 min-w-0 truncate text-secondary-800" style={{ fontSize: 13, lineHeight: '19.5px' }}>{f.name}</span>
                    <button
                      type="button"
                      onClick={() => setResultFiles(r => r.filter(x => x.id !== f.id))}
                      className="flex items-center justify-center hover:opacity-60 transition-opacity focus:outline-none"
                      aria-label={`${f.name} 제거`}
                    >
                      <IcClose14 />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-2">FileUploadBar</p>
          <div className="space-y-2">
            <FileUploadBar
              title="[260101WEHAGO.pdf]파일을 다운로드하고 있습니다.(1/5)"
              progress={progress}
              onClose={() => {}}
            />
            <FileUploadBar
              title="파일을 다운로드하고 있습니다.(1/5)"
              filename="AI 에이전트 혁신.pdf"
              fileSize="(12MB/24MB)"
              progress={80}
              expanded
              onCancel={() => {}}
            />
          </div>
        </div>
      </div>
    </PreviewCard>
  )
}

// ─── OverflowMenu ─────────────────────────────────────────────────────────────

const OvIcChat = ({ color = '#105AFF' }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
    <path d="M6.14674 8.26451C6.29223 8.29344 6.42637 8.36469 6.53126 8.46958C6.63605 8.57444 6.70741 8.70798 6.73634 8.85337C6.76528 8.99886 6.75063 9.14992 6.69386 9.28697C6.63713 9.42385 6.5409 9.54077 6.41774 9.62315C6.29446 9.70552 6.14926 9.74982 6.00099 9.74986C5.80215 9.74986 5.61135 9.67068 5.47072 9.53013C5.33009 9.38951 5.25102 9.19873 5.25099 8.99986C5.25099 8.85157 5.29461 8.70642 5.37697 8.58311C5.45938 8.45977 5.57684 8.36375 5.71388 8.30699C5.85083 8.25027 6.00136 8.23564 6.14674 8.26451Z" fill={color}/>
    <path d="M9.14674 8.26451C9.29223 8.29344 9.42637 8.36469 9.53126 8.46958C9.63605 8.57444 9.70741 8.70798 9.73634 8.85337C9.76528 8.99886 9.75063 9.14992 9.69386 9.28697C9.63713 9.42385 9.5409 9.54077 9.41774 9.62315C9.29446 9.70552 9.14926 9.74982 9.00099 9.74986C8.80215 9.74986 8.61135 9.67068 8.47072 9.53013C8.33009 9.38951 8.25102 9.19873 8.25099 8.99986C8.25099 8.85157 8.29461 8.70642 8.37697 8.58311C8.45938 8.45977 8.57684 8.36375 8.71388 8.30699C8.85083 8.25027 9.00136 8.23564 9.14674 8.26451Z" fill={color}/>
    <path d="M12.1475 8.26451C12.2928 8.2935 12.4265 8.3648 12.5313 8.46958C12.6361 8.57444 12.7074 8.70798 12.7363 8.85337C12.7653 8.99886 12.7506 9.14992 12.6939 9.28697C12.6371 9.42385 12.5409 9.54077 12.4177 9.62315C12.2945 9.70552 12.1493 9.74982 12.001 9.74986C11.8022 9.74986 11.6114 9.67068 11.4707 9.53013C11.3301 9.38951 11.251 9.19873 11.251 8.99986C11.251 8.85157 11.2946 8.70642 11.377 8.58311C11.4594 8.45977 11.5768 8.36375 11.7139 8.30699C11.8509 8.25023 12.002 8.23557 12.1475 8.26451Z" fill={color}/>
    <path fillRule="evenodd" clipRule="evenodd" d="M4.79616 3.01744C6.21728 2.01856 7.94815 1.5582 9.67775 1.71885C11.4075 1.87962 13.0236 2.65113 14.2363 3.89488C15.4491 5.13864 16.1795 6.77374 16.2966 8.50694C16.4136 10.24 15.9101 11.9587 14.8757 13.3541C13.8413 14.7494 12.3433 15.7307 10.6511 16.1227C8.99159 16.5069 7.25149 16.2981 5.72999 15.5367L3.96632 16.2779L3.96705 16.2787C3.63915 16.4193 3.27589 16.4582 2.92555 16.3907C2.57528 16.3232 2.25269 16.1523 2.0005 15.9C1.74839 15.6477 1.57781 15.3253 1.51051 14.975C1.44324 14.6246 1.48261 14.262 1.6233 13.9342L2.38869 12.1185C1.66063 10.575 1.49416 8.82435 1.9214 7.17027C2.35589 5.48861 3.37528 4.01634 4.79616 3.01744ZM9.57374 2.83872C8.11038 2.7028 6.64604 3.09232 5.44362 3.93736C4.24121 4.78261 3.37815 6.02919 3.01051 7.45225C2.64307 8.87524 2.79419 10.3829 3.43678 11.7047C3.47991 11.7921 3.50849 11.8854 3.52247 11.9815L3.532 12.0812L3.53053 12.1808C3.52349 12.28 3.49987 12.3778 3.46168 12.4701L3.46022 12.4737L2.65822 14.3744L2.65675 14.378C2.60486 14.4991 2.59023 14.6332 2.615 14.7626C2.6399 14.892 2.70346 15.0113 2.79664 15.1046C2.88986 15.1978 3.00923 15.2613 3.13869 15.2862C3.26805 15.3111 3.40212 15.2963 3.52321 15.2445L3.52687 15.243L5.3506 14.4762C5.47747 14.4197 5.61607 14.3925 5.7549 14.3963C5.84947 14.399 5.94282 14.4176 6.03175 14.4483C6.0739 14.4587 6.116 14.473 6.15626 14.4938C7.46144 15.1695 8.96514 15.3584 10.397 15.027C11.8289 14.6953 13.0966 13.8647 13.9719 12.6839C14.8472 11.5031 15.2729 10.0489 15.1738 8.58238C15.0747 7.11583 14.4569 5.73243 13.4307 4.68003C12.4045 3.62773 11.0373 2.97475 9.57374 2.83872Z" fill={color}/>
  </svg>
)
const OvIcMore = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9.00171 12.4497C9.7058 12.4498 10.2769 13.0207 10.2769 13.7249C10.2768 14.4289 9.70576 14.9999 9.00171 15C8.29759 15 7.72664 14.4289 7.72656 13.7249C7.72656 13.0207 8.29755 12.4497 9.00171 12.4497Z" fill="#4A4A4A"/>
    <path d="M9.00171 7.72485C9.7058 7.72493 10.2769 8.29589 10.2769 9C10.2768 9.70405 9.70576 10.2751 9.00171 10.2751C8.29759 10.2751 7.72664 9.7041 7.72656 9C7.72656 8.29584 8.29755 7.72485 9.00171 7.72485Z" fill="#4A4A4A"/>
    <path d="M9.00171 3C9.7058 3.00008 10.2769 3.57103 10.2769 4.27515C10.2768 4.97919 9.70576 5.55021 9.00171 5.55029C8.29759 5.55029 7.72664 4.97924 7.72656 4.27515C7.72656 3.57098 8.29755 3 9.00171 3Z" fill="#4A4A4A"/>
  </svg>
)
const OvIcShare = ({ color = '#4A4A4A' }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
    <path fillRule="evenodd" clipRule="evenodd" d="M13.1257 2.25C14.5755 2.25 15.7507 3.42524 15.7507 4.875C15.7507 6.3248 14.5755 7.5 13.1257 7.5C12.2526 7.49997 11.4797 7.07326 11.0024 6.41748L7.4458 8.47046C7.48086 8.64154 7.49999 8.81855 7.5 9C7.5 9.18121 7.48076 9.35794 7.4458 9.52881L11.0017 11.5825C11.4789 10.9265 12.2525 10.5 13.1257 10.5C14.5755 10.5 15.7507 11.6752 15.7507 13.125C15.7507 14.5748 14.5755 15.75 13.1257 15.75C11.676 15.75 10.5007 14.5748 10.5007 13.125C10.5007 12.9521 10.5179 12.7832 10.5498 12.6196L6.98438 10.5615C6.50611 11.2065 5.73969 11.625 4.875 11.625C3.42524 11.625 2.25 10.4498 2.25 9C2.25005 7.55027 3.42527 6.37505 4.875 6.375C5.73946 6.375 6.50609 6.793 6.98438 7.43774L10.5498 5.37964C10.518 5.2163 10.5007 5.04765 10.5007 4.875C10.5008 3.42527 11.676 2.25005 13.1257 2.25ZM13.1257 11.625C12.2973 11.625 11.6258 12.2966 11.6257 13.125C11.6257 13.9534 12.2973 14.625 13.1257 14.625C13.9542 14.625 14.6257 13.9535 14.6257 13.125C14.6257 12.2966 13.9542 11.625 13.1257 11.625ZM4.875 7.5C4.0466 7.50005 3.37505 8.1716 3.375 9C3.375 9.82845 4.04656 10.5 4.875 10.5C5.70348 10.5 6.375 9.82848 6.375 9C6.37495 8.17156 5.70345 7.5 4.875 7.5ZM13.1257 3.375C12.2973 3.37505 11.6258 4.0466 11.6257 4.875C11.6257 5.70345 12.2973 6.37495 13.1257 6.375C13.9542 6.375 14.6257 5.70348 14.6257 4.875C14.6257 4.04656 13.9542 3.375 13.1257 3.375Z" fill={color}/>
  </svg>
)
const OvIcNoti = ({ color = '#4A4A4A' }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
    <path fillRule="evenodd" clipRule="evenodd" d="M14.6602 2.59249C14.8592 2.62327 15.0449 2.70595 15.2014 2.82833C15.3574 2.95046 15.48 3.10838 15.5625 3.28463C15.6449 3.46088 15.6871 3.65369 15.687 3.84713V13.0888L15.6797 13.2287C15.6652 13.3676 15.6288 13.504 15.5713 13.6323C15.4945 13.8035 15.3804 13.9585 15.2344 14.0813C15.0882 14.2041 14.9137 14.2914 14.7239 14.3318C14.5336 14.3722 14.3367 14.3637 14.1511 14.3068L14.1453 14.3047L10.7476 13.2221C10.7279 13.7977 10.4933 14.3458 10.0847 14.7544C9.71142 15.1276 9.22193 15.358 8.70117 15.4099L8.47632 15.4209C7.87276 15.4209 7.29389 15.1811 6.86719 14.7544C6.44047 14.3276 6.20068 13.7487 6.20068 13.1452V12.0334H4.5271C3.94104 12.0334 3.37891 11.8007 2.96411 11.3867C2.54937 10.9727 2.31559 10.4112 2.31445 9.82516V7.52975C2.31445 6.94296 2.54772 6.38022 2.96265 5.96529C3.37757 5.55037 3.94031 5.3171 4.5271 5.3171H7.13599L14.0728 2.65621C14.2595 2.58404 14.4614 2.56187 14.6602 2.59249ZM7.32568 13.1452C7.32568 13.4503 7.44687 13.7432 7.6626 13.9589C7.87826 14.1746 8.17073 14.295 8.47559 14.2951C8.78064 14.295 9.07352 14.1746 9.28931 13.9589C9.50508 13.7432 9.62682 13.4504 9.62695 13.1452V12.8647L7.32568 12.1316V13.1452ZM14.4785 3.70577L14.4756 3.70724L7.32568 6.44869V10.9516L14.48 13.2309C14.4817 13.2314 14.484 13.2316 14.4851 13.2317C14.4862 13.2317 14.488 13.2319 14.4895 13.2317C14.4926 13.231 14.5006 13.2284 14.5107 13.2199C14.5212 13.2111 14.5339 13.1957 14.5444 13.1723C14.555 13.1488 14.562 13.1203 14.562 13.0896V3.84713C14.562 3.81527 14.5549 3.78538 14.5437 3.76144C14.5326 3.73781 14.5189 3.72274 14.5085 3.71456C14.4989 3.70705 14.4916 3.70477 14.4888 3.70431C14.4873 3.70411 14.4857 3.70417 14.4844 3.70431C14.4831 3.70446 14.481 3.70484 14.4785 3.70577ZM4.5271 6.4421C4.23868 6.4421 3.962 6.55676 3.75806 6.76071C3.55411 6.96465 3.43945 7.24133 3.43945 7.52975V9.82296L3.44531 9.92989C3.47038 10.1786 3.58033 10.4124 3.75879 10.5905C3.96267 10.794 4.23905 10.9084 4.5271 10.9084H6.20068V6.4421H4.5271Z" fill={color}/>
  </svg>
)
const OvIcInbox = ({ color = '#4A4A4A' }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
    <path fillRule="evenodd" clipRule="evenodd" d="M13.5374 2.25C14.7593 2.25 15.75 3.24072 15.75 4.46265V13.5374C15.75 14.7593 14.7593 15.75 13.5374 15.75H4.46265C3.24072 15.75 2.25 14.7593 2.25 13.5374V4.46265C2.25 3.24072 3.24072 2.25 4.46265 2.25H13.5374ZM3.375 13.5374C3.375 14.138 3.86204 14.625 4.46265 14.625H13.5374C14.138 14.625 14.625 14.138 14.625 13.5374V11.4375H11.4419C11.2591 11.8343 10.9813 12.1828 10.6304 12.4504C10.1619 12.8077 9.5891 13.0012 9 13.0012C8.4109 13.0012 7.83811 12.8077 7.36963 12.4504C7.01869 12.1828 6.74093 11.8343 6.55811 11.4375H3.375V13.5374ZM4.46265 3.375C3.86204 3.375 3.375 3.86204 3.375 4.46265V10.3125H6.94922C7.20257 10.3125 7.42492 10.482 7.49194 10.7263C7.5826 11.0567 7.7791 11.3484 8.05151 11.5562C8.32395 11.7639 8.65732 11.8762 9 11.8762C9.34268 11.8762 9.67605 11.7639 9.94849 11.5562C10.2209 11.3484 10.4174 11.0567 10.5081 10.7263L10.5403 10.6384C10.6311 10.4423 10.8291 10.3125 11.0508 10.3125H14.625V4.46265C14.625 3.86204 14.138 3.375 13.5374 3.375H4.46265Z" fill={color}/>
  </svg>
)
const OvIcTrash = ({ color = '#4A4A4A' }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
    <path d="M7.5 7.3125C7.81066 7.3125 8.0625 7.56434 8.0625 7.875V12.375C8.0625 12.6857 7.81066 12.9375 7.5 12.9375C7.18934 12.9375 6.9375 12.6857 6.9375 12.375V7.875C6.9375 7.56434 7.18934 7.3125 7.5 7.3125Z" fill={color}/>
    <path d="M10.5 7.3125C10.8107 7.3125 11.0625 7.56434 11.0625 7.875V12.375C11.0625 12.6857 10.8107 12.9375 10.5 12.9375C10.1893 12.9375 9.9375 12.6857 9.9375 12.375V7.875C9.9375 7.56434 10.1893 7.3125 10.5 7.3125Z" fill={color}/>
    <path fillRule="evenodd" clipRule="evenodd" d="M10.8003 1.5C11.7735 1.50016 12.5623 2.28904 12.5625 3.26221V3.9375H15.375C15.6857 3.9375 15.9375 4.18934 15.9375 4.5C15.9375 4.81066 15.6857 5.0625 15.375 5.0625H14.4375V14.2874C14.4375 15.5093 13.4468 16.5 12.2249 16.5H5.77515C4.55322 16.5 3.5625 15.5093 3.5625 14.2874V5.0625H2.625C2.31434 5.0625 2.0625 4.81066 2.0625 4.5C2.0625 4.18934 2.31434 3.9375 2.625 3.9375H5.4375V3.26221C5.43766 2.28904 6.22654 1.50016 7.19971 1.5H10.8003ZM4.6875 14.2874C4.6875 14.888 5.17454 15.375 5.77515 15.375H12.2249C12.8255 15.375 13.3125 14.888 13.3125 14.2874V5.0625H4.6875V14.2874ZM7.19971 2.625C6.84786 2.62516 6.56266 2.91036 6.5625 3.26221V3.9375H11.4375V3.26221C11.4373 2.91036 11.1521 2.62516 10.8003 2.625H7.19971Z" fill={color}/>
  </svg>
)
const OvIcClock = ({ color = '#4A4A4A' }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
    <path d="M8.99162 5.43798C9.30224 5.43803 9.55412 5.68985 9.55412 6.00048V8.78735L11.8891 11.123C12.1086 11.3427 12.1087 11.6988 11.8891 11.9185C11.6694 12.1377 11.3132 12.1378 11.0937 11.9185L8.59392 9.41796C8.48856 9.31254 8.42919 9.1693 8.42912 9.02026V6.00048C8.42912 5.68982 8.68096 5.43798 8.99162 5.43798Z" fill={color}/>
    <path fillRule="evenodd" clipRule="evenodd" d="M9.00041 2.43872C10.7409 2.43872 12.4103 3.12991 13.641 4.36059C14.8717 5.59129 15.5629 7.2608 15.5629 9.00122C15.5629 10.2991 15.178 11.5681 14.457 12.6472C14.2222 12.9985 13.954 13.3234 13.6593 13.6206C13.6769 13.6344 13.6944 13.6491 13.7106 13.6653L15.2106 15.1653C15.4301 15.385 15.4302 15.7411 15.2106 15.9607C14.991 16.1802 14.6349 16.1801 14.4152 15.9607L12.9152 14.4607C12.877 14.4225 12.8471 14.379 12.8222 14.334C12.4165 14.6247 11.9778 14.8712 11.5119 15.0642C10.3128 15.5609 8.99309 15.6909 7.72014 15.4377C6.74596 15.244 5.83263 14.8318 5.04606 14.238L3.58562 15.6992C3.36601 15.9187 3.00987 15.9186 2.79021 15.6992C2.57056 15.4796 2.57061 15.1235 2.79021 14.9038L4.20891 13.4844C3.37383 12.5919 2.80294 11.4831 2.56389 10.2815C2.3107 9.00858 2.4408 7.68882 2.93742 6.48974C3.4341 5.2907 4.27537 4.26573 5.35441 3.54467C6.43359 2.82359 7.70249 2.43873 9.00041 2.43872ZM9.00041 3.56372C7.92511 3.56373 6.87403 3.88262 5.9799 4.47998C5.08574 5.07747 4.38825 5.9269 3.97673 6.92041C3.56529 7.91384 3.45791 9.00715 3.66765 10.0618C3.87748 11.1164 4.39481 12.086 5.1552 12.8464C5.91562 13.6068 6.88514 14.1242 7.93986 14.334C8.9945 14.5437 10.0878 14.4363 11.0812 14.0249C12.0746 13.6134 12.9242 12.9165 13.5216 12.0225C14.1191 11.1283 14.4379 10.0766 14.4379 9.00122C14.4379 7.55915 13.8653 6.17571 12.8456 5.156C11.8259 4.1363 10.4425 3.56372 9.00041 3.56372Z" fill={color}/>
    <path d="M3.76506 1.50781C4.34703 1.46133 4.92692 1.62344 5.39982 1.96557C5.65143 2.14768 5.70781 2.49981 5.5258 2.75146C5.34369 3.00294 4.99225 3.05934 4.74064 2.87744C4.48463 2.69218 4.17048 2.60403 3.85515 2.62915C3.53974 2.65434 3.24341 2.79097 3.02019 3.0144C2.79702 3.23788 2.66076 3.53369 2.6364 3.8479C2.61214 4.16218 2.70141 4.47544 2.88762 4.73046C3.07079 4.98125 3.01596 5.33307 2.7653 5.51635C2.51448 5.69956 2.16267 5.6448 1.97941 5.39404C1.63517 4.92265 1.47014 4.34355 1.51506 3.76147C1.56006 3.17953 1.81162 2.63275 2.22404 2.21972C2.63654 1.80669 3.18309 1.55435 3.76506 1.50781Z" fill={color}/>
    <path d="M14.2431 1.50781C14.825 1.55439 15.3716 1.80668 15.7841 2.21972C16.1965 2.63276 16.4481 3.17953 16.4931 3.76147C16.538 4.34351 16.3729 4.92267 16.0287 5.39404C15.8455 5.6448 15.4937 5.69955 15.2428 5.51635C14.9921 5.33309 14.9373 4.98129 15.1205 4.73046C15.3067 4.47545 15.396 4.16214 15.3717 3.8479C15.3474 3.53368 15.2111 3.23788 14.988 3.0144C14.7648 2.79096 14.4684 2.65438 14.153 2.62915C13.8377 2.60403 13.5235 2.69224 13.2675 2.87744C13.0159 3.05934 12.6645 3.00294 12.4823 2.75146C12.3003 2.49981 12.3567 2.1477 12.6083 1.96557C13.0812 1.6235 13.6612 1.46133 14.2431 1.50781Z" fill={color}/>
  </svg>
)
const OvIcChangeVertical = ({ color = '#4A4A4A' }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
    <path d="M5.25 3.75V14.25M5.25 14.25L3 12M5.25 14.25L7.5 12" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.75 14.25V3.75M12.75 3.75L10.5 6M12.75 3.75L15 6" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const OvIcCard = ({ color = '#4A4A4A' }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
    <rect x="2.25" y="4.5" width="13.5" height="9" rx="1.5" stroke={color} strokeWidth="1.2"/>
    <path d="M2.25 7.5H15.75" stroke={color} strokeWidth="1.2"/>
    <path d="M4.5 10.5H7.5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)
const OvIcCamera = ({ color = '#4A4A4A' }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
    <path d="M6.75 3.75H11.25L12.75 5.25H15C15.4142 5.25 15.75 5.58579 15.75 6V13.5C15.75 13.9142 15.4142 14.25 15 14.25H3C2.58579 14.25 2.25 13.9142 2.25 13.5V6C2.25 5.58579 2.58579 5.25 3 5.25H5.25L6.75 3.75Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round"/>
    <circle cx="9" cy="9.75" r="2.25" stroke={color} strokeWidth="1.2"/>
  </svg>
)
const OvIcExport = ({ color = '#777777' }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
    <path d="M9 2.25V11.25M9 2.25L6.75 4.5M9 2.25L11.25 4.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 12V14.25C3 14.6642 3.33579 15 3.75 15H14.25C14.6642 15 15 14.6642 15 14.25V12" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)
const OvIcCheckThick = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
    <path d="M3.75 9L7.5 12.75L14.25 5.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// 패널 행 공통
function OvRow({ icon, label, selected = false }: { icon: React.ReactNode; label: string; selected?: boolean }) {
  return (
    <button
      className="w-full flex items-center gap-1 px-2 h-8 rounded text-left hover:bg-black/[0.03]"
      style={selected ? { background: 'rgba(16,90,255,0.05)' } : {}}
    >
      {icon}
      <span className={['flex-1 text-body3 whitespace-nowrap', selected ? 'font-medium text-primary-base' : 'text-secondary-800'].join(' ')}>{label}</span>
      {selected && <OvIcCheckThick color="#105aff" />}
    </button>
  )
}
function OvDivider() {
  return <div className="my-1"><div className="border-t border-[#ededed]" /></div>
}

function OverflowMenuDemo() {
  return (
    <PreviewCard
      title="OverflowMenu"
      description="공간이 부족할 때 더보기 아이콘으로 숨겨진 옵션을 표시합니다. default · hover · selected 상태를 지원합니다."
      importPath={`import { OverflowMenu } from './components'`}
    >
      <div className="flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-8 items-start">

        {/* Group 1: OptionTool (102×32) + OverflowMenu (102×177) */}
        <div className="flex flex-col gap-1">
          {/* OptionTool: ic_emoticon_add | ic_download | ic_export */}
          <div className="inline-flex items-center gap-1 bg-white border border-[#e1e1e1] rounded-md px-1.5 h-8 self-end shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-black/[0.03] focus:outline-none">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1.5C13.1421 1.5 16.5 4.85786 16.5 9C16.5 9.31066 16.2482 9.5625 15.9375 9.5625C15.6268 9.5625 15.375 9.31066 15.375 9C15.375 5.47918 12.5208 2.625 9 2.625C5.47918 2.625 2.625 5.47918 2.625 9C2.625 12.5208 5.47918 15.375 9 15.375C9.31066 15.375 9.5625 15.6268 9.5625 15.9375C9.5625 16.2482 9.31066 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5Z" fill="#777777"/>
                <path d="M13.6875 10.875C13.9982 10.875 14.25 11.1268 14.25 11.4375V13.125H15.9375C16.2482 13.125 16.5 13.3768 16.5 13.6875C16.5 13.9982 16.2482 14.25 15.9375 14.25H14.25V15.9375C14.25 16.2482 13.9982 16.5 13.6875 16.5C13.3768 16.5 13.125 16.2482 13.125 15.9375V14.25H11.4375C11.1268 14.25 10.875 13.9982 10.875 13.6875C10.875 13.3768 11.1268 13.125 11.4375 13.125H13.125V11.4375C13.125 11.1268 13.3768 10.875 13.6875 10.875Z" fill="#777777"/>
                <path d="M10.2393 10.8391C10.3422 10.5462 10.6633 10.3915 10.9563 10.4941C11.2491 10.597 11.4031 10.9182 11.3005 11.2112C11.1332 11.6878 10.8221 12.1013 10.4099 12.3933C9.99784 12.6853 9.505 12.8417 9 12.8416L8.99927 12.8408C8.49454 12.8408 8.00198 12.685 7.59009 12.3933C7.17802 12.1013 6.866 11.6877 6.69873 11.2112C6.59635 10.9183 6.75088 10.597 7.0437 10.4941C7.33661 10.3915 7.65774 10.5463 7.76074 10.8391C7.85082 11.0955 8.01878 11.3177 8.24048 11.4749C8.4623 11.632 8.72745 11.7166 8.99927 11.7166C9.27128 11.7167 9.53757 11.6321 9.75952 11.4749C9.9813 11.3176 10.1492 11.0956 10.2393 10.8391Z" fill="#777777"/>
                <path d="M7.125 6.1875C7.43566 6.1875 7.6875 6.43934 7.6875 6.75V8.25C7.6875 8.56066 7.43566 8.8125 7.125 8.8125C6.81434 8.8125 6.5625 8.56066 6.5625 8.25V6.75C6.5625 6.43934 6.81434 6.1875 7.125 6.1875Z" fill="#777777"/>
                <path d="M10.875 6.1875C11.1857 6.1875 11.4375 6.43934 11.4375 6.75V8.25C11.4375 8.56066 11.1857 8.8125 10.875 8.8125C10.5643 8.8125 10.3125 8.56066 10.3125 8.25V6.75C10.3125 6.43934 10.5643 6.1875 10.875 6.1875Z" fill="#777777"/>
              </svg>
            </button>
            <div className="w-px h-3 bg-[#e1e1e1] shrink-0" />
            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-black/[0.03] focus:outline-none">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M15.1875 10.875C15.4982 10.875 15.75 11.1268 15.75 11.4375V13.5374C15.75 14.7593 14.7593 15.75 13.5374 15.75H4.46265C3.27899 15.75 2.31232 14.8205 2.25293 13.6516L2.25 13.5374V11.4375C2.25 11.1268 2.50184 10.875 2.8125 10.875C3.12316 10.875 3.375 11.1268 3.375 11.4375V13.5374L3.38086 13.6487C3.43656 14.1971 3.89958 14.625 4.46265 14.625H13.5374C14.138 14.625 14.625 14.138 14.625 13.5374V11.4375C14.625 11.1268 14.8768 10.875 15.1875 10.875Z" fill="#777777"/>
                <path d="M9 2.25C9.31066 2.25 9.5625 2.50184 9.5625 2.8125V10.8296L11.6023 8.78979C11.822 8.57013 12.178 8.57013 12.3977 8.78979C12.6173 9.00947 12.6174 9.36555 12.3977 9.58521L9.45044 12.5325C9.43858 12.5443 9.42561 12.5547 9.41309 12.5654C9.31024 12.6778 9.16432 12.75 9 12.75C8.83551 12.75 8.68904 12.678 8.58618 12.5654C8.5738 12.5548 8.56129 12.5442 8.54956 12.5325L5.60229 9.58521C5.38263 9.36554 5.38263 9.00946 5.60229 8.78979C5.82196 8.57013 6.17804 8.57013 6.39771 8.78979L8.4375 10.8296V2.8125C8.4375 2.50184 8.68934 2.25 9 2.25Z" fill="#777777"/>
              </svg>
            </button>
            <div className="w-px h-3 bg-[#e1e1e1] shrink-0" />
            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-black/[0.03] focus:outline-none">
              <OvIcExport />
            </button>
          </div>
          {/* Panel */}
          <div className="bg-white border border-[#e1e1e1] rounded-lg p-1 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            <OvRow icon={<OvIcShare />} label="항목명" />
            <OvRow icon={<OvIcNoti />} label="항목명" />
            <OvRow icon={<OvIcChat color="#105aff" />} label="선택한 값" selected />
            <OvRow icon={<OvIcTrash />} label="항목명" />
            <OvDivider />
            <OvRow icon={<OvIcClock />} label="항목명" />
          </div>
        </div>

        {/* Group 2: Icon button (24×24) + OverflowMenu (112×136) */}
        <div className="flex flex-col" style={{ gap: 2 }}>
          <button className="w-6 h-6 flex items-center justify-center rounded focus:outline-none self-end" style={{ background: 'rgba(0,0,0,0.06)' }}>
            <OvIcMore />
          </button>
          <div className="bg-white border border-[#e1e1e1] rounded-lg p-1 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            <OvRow icon={<OvIcShare />} label="전체 공유" />
            <OvRow icon={<OvIcNoti />} label="공지로 등록" />
            <OvRow icon={<OvIcInbox />} label="보관함" />
            <OvRow icon={<OvIcTrash />} label="전체 삭제" />
          </div>
        </div>

        {/* Group 3: DropdownField (85×32) + OverflowMenu (121×177, 3번째 선택) */}
        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center justify-between gap-1 bg-white border border-secondary-700 rounded-md px-2 h-8 self-end" style={{ width: 85 }}>
            <span className="text-body3 text-secondary-800 whitespace-nowrap">선택한 값</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
              <path d="M2 4L6 8L10 4" stroke="#777777" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="bg-white border border-[#e1e1e1] rounded-lg p-1 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            <OvRow icon={<OvIcShare />} label="항목명" />
            <OvRow icon={<OvIcNoti />} label="항목명" />
            <OvRow icon={<OvIcChat color="#105aff" />} label="선택한 값" selected />
            <OvRow icon={<OvIcTrash />} label="항목명" />
            <OvDivider />
            <OvRow icon={<OvIcClock />} label="항목명" />
          </div>
        </div>

        {/* Group 4: 아이콘 전체 variant 표시 (ic_change_vertical, ic_card, ic_camera) */}
        <div className="flex flex-col gap-1">
          <div className="bg-white border border-[#e1e1e1] rounded-lg p-1 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            <OvRow icon={<OvIcShare />} label="항목명" />
            <OvRow icon={<OvIcNoti />} label="항목명" />
            <OvRow icon={<OvIcInbox />} label="항목명" />
            <OvRow icon={<OvIcTrash />} label="항목명" />
            <OvDivider />
            <OvRow icon={<OvIcClock />} label="항목명" />
            <OvRow icon={<OvIcChangeVertical />} label="항목명" />
            <OvRow icon={<OvIcCard />} label="항목명" />
            <OvRow icon={<OvIcCamera />} label="항목명" />
          </div>
        </div>

      </div>
    </PreviewCard>
  )
}

// ─── ActionBar ────────────────────────────────────────────────────────────────

function ActionBarDemo() {
  return (
    <PreviewCard
      title="ActionBar"
      description="항목 선택 시 하단에 나타나는 일괄 처리 툴바입니다. 선택 수 표시, 경고 메시지, GhostButton 액션을 포함합니다."
      importPath={`import { ActionBar } from './components'`}
    >
      <div className="w-full space-y-3">
        <ActionBar
          selectedCount={1}
          actions={[
            { label: '편집', onClick: () => {} },
            { label: '이동', onClick: () => {} },
            { label: '삭제', onClick: () => {} },
          ]}
        />
        <ActionBar
          selectedCount={3}
          warningMessage="안내 문구를 입력해주세요."
          actions={[
            { label: '다운로드', onClick: () => {} },
            { label: '공유', onClick: () => {} },
            { label: '삭제', onClick: () => {} },
          ]}
        />
      </div>
    </PreviewCard>
  )
}

// ─── Picker ───────────────────────────────────────────────────────────────────


// ─── List 전용 아이콘 ─────────────────────────────────────────────────────────

const IcDocList = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
    <path d="M12.2476 11.4375C12.5582 11.4376 12.8101 11.6894 12.8101 12C12.8101 12.3106 12.5582 12.5624 12.2476 12.5625H5.75244C5.44178 12.5625 5.18994 12.3107 5.18994 12C5.18994 11.6893 5.44178 11.4375 5.75244 11.4375H12.2476Z" fill="#4A4A4A"/>
    <path d="M12.2476 8.4375C12.5582 8.43756 12.8101 8.68938 12.8101 9C12.8101 9.31062 12.5582 9.56244 12.2476 9.5625H5.75244C5.44178 9.5625 5.18994 9.31066 5.18994 9C5.18994 8.68934 5.44178 8.4375 5.75244 8.4375H12.2476Z" fill="#4A4A4A"/>
    <path d="M9.86719 5.44043C10.151 5.46911 10.3726 5.70867 10.3726 6C10.3726 6.29133 10.151 6.53089 9.86719 6.55957L9.81006 6.5625H5.75244C5.44178 6.5625 5.18994 6.31066 5.18994 6C5.18994 5.68934 5.44178 5.4375 5.75244 5.4375H9.81006L9.86719 5.44043Z" fill="#4A4A4A"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M13.5374 2.25C14.7593 2.25 15.75 3.24072 15.75 4.46265V13.5374C15.75 14.7593 14.7593 15.75 13.5374 15.75H4.46265C3.24072 15.75 2.25 14.7593 2.25 13.5374V4.46265C2.25 3.24072 3.24072 2.25 4.46265 2.25H13.5374ZM4.46265 3.375C3.86204 3.375 3.375 3.86204 3.375 4.46265V13.5374C3.375 14.138 3.86204 14.625 4.46265 14.625H13.5374C14.138 14.625 14.625 14.138 14.625 13.5374V4.46265C14.625 3.86204 14.138 3.375 13.5374 3.375H4.46265Z" fill="#4A4A4A"/>
  </svg>
)

// ─── List ─────────────────────────────────────────────────────────────────────

function ListDemo() {
  const [sel, setSel] = useState<string[]>(['2'])
  const [iconItems, setIconItems] = useState([
    { id: '1', label: '텍스트 길어지면 말줄임 표시합니다. 말줄임', icon: <IcDocList /> },
    { id: '2', label: 'list item', icon: <IcDocList /> },
    { id: '3', label: 'list item', icon: <IcDocList /> },
    { id: '4', label: 'list item', icon: <IcDocList /> },
    { id: '5', label: 'list item', icon: <IcDocList /> },
  ])
  const [profileItems, setProfileItems] = useState([
    { id: '1', label: '텍스트 길어지면 말줄임 표시합니다. 말줄임', avatarName: '황원정', avatarSrc: 'https://i.pravatar.cc/48?img=5',  isMe: true,  role: 'master' as const },
    { id: '2', label: 'list item', avatarName: '김철수', avatarSrc: 'https://i.pravatar.cc/48?img=12', isMe: false, role: 'user'   as const },
    { id: '3', label: 'list item', avatarName: '이영희', avatarSrc: 'https://i.pravatar.cc/48?img=9',  isMe: false, role: 'user'   as const },
    { id: '4', label: 'list item', avatarName: '박민준', avatarSrc: 'https://i.pravatar.cc/48?img=11', isMe: false, role: 'user'   as const },
    { id: '5', label: 'list item', avatarName: '최지수', avatarSrc: 'https://i.pravatar.cc/48?img=15', isMe: false, role: 'user'   as const },
  ])

  const checkboxItems = [
    { id: '1', label: '텍스트 길어지면 말줄임 표시합니다. 말줄임' },
    { id: '2', label: 'list item' },
    { id: '3', label: 'list item' },
    { id: '4', label: 'list item' },
    { id: '5', label: 'list item' },
  ]

  return (
    <PreviewCard
      title="List"
      description="항목을 수직으로 나열하는 목록 컴포넌트입니다. CheckboxList · IconList · ProfileList 3가지 형태를 제공합니다."
      importPath={`import { CheckboxList, IconList, ProfileList } from './components'`}
    >
      <div className="flex flex-wrap gap-4 w-full">
        <div className="flex flex-col gap-1.5 flex-1 min-w-[220px]">
          <p className="text-body5 font-medium text-neutral-500">CheckboxList (h=32)</p>
          <CheckboxList
            items={checkboxItems}
            selectedIds={sel}
            onSelectionChange={setSel}
          />
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[220px]">
          <p className="text-body5 font-medium text-neutral-500">IconList (h=36)</p>
          <IconList
            items={iconItems}
            onClose={id => setIconItems(r => r.filter(x => x.id !== id))}
          />
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[220px]">
          <p className="text-body5 font-medium text-neutral-500">ProfileList (h=40)</p>
          <ProfileList
            items={profileItems}
            onClose={id => setProfileItems(r => r.filter(x => x.id !== id))}
          />
        </div>
      </div>
    </PreviewCard>
  )
}

// ─── Table ────────────────────────────────────────────────────────────────────

// ─── Table 전용 아이콘 ────────────────────────────────────────────────────────

// ic_favorite_fill — 18×18, 피그마 원본
const IcFavFill: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
    <path d="M9.00299 1.5C9.10387 1.50039 9.20363 1.51884 9.29743 1.55347L9.38898 1.59302L9.39557 1.59668L9.46149 1.63477C9.61056 1.72956 9.72872 1.86467 9.8028 2.02222L11.6331 5.90112L15.7193 6.52075L15.7361 6.52295C15.9452 6.5611 16.1333 6.66992 16.2708 6.82764L16.3265 6.89795C16.4688 7.09729 16.5267 7.34516 16.4891 7.58569C16.4605 7.79128 16.3656 7.97827 16.2261 8.12183L16.2239 8.12402L13.2642 11.1409L13.9637 15.4043L13.9754 15.4951C13.9929 15.7071 13.9371 15.9188 13.8179 16.095C13.6831 16.294 13.4776 16.4318 13.2459 16.4824C13.2382 16.4841 13.2303 16.4862 13.2225 16.4875C13.1976 16.4919 13.1457 16.4993 13.0826 16.4993L13.0797 16.5C12.9327 16.5 12.7892 16.4624 12.6629 16.3923L9.00226 14.3818L8.97956 14.3921L5.33796 16.3916C5.20806 16.4631 5.06543 16.4984 4.92414 16.4985H4.91462C4.7552 16.496 4.59495 16.4512 4.45392 16.3623C4.35034 16.2968 4.25933 16.2092 4.18952 16.1052C4.18225 16.0944 4.17551 16.0829 4.16901 16.0715L4.14631 16.032L4.13898 16.0188C4.1277 15.9985 4.11764 15.9774 4.10895 15.9558L4.08478 15.8958C4.07958 15.8828 4.07436 15.8695 4.07013 15.8562C4.02388 15.7108 4.01231 15.5554 4.03717 15.4036L4.73664 11.1401L1.77326 8.12402L1.76886 8.1189C1.6204 7.96396 1.52783 7.76482 1.50519 7.55347L1.50007 7.46191C1.49726 7.21963 1.58522 6.98033 1.75348 6.79688L1.7945 6.75659C1.79564 6.75558 1.797 6.75466 1.79816 6.75366C1.92556 6.63327 2.08773 6.55046 2.26618 6.52222H2.26984L6.36481 5.90112L8.19074 2.03394L8.19367 2.02734L8.19587 2.02222C8.26453 1.87182 8.37607 1.73834 8.52179 1.64355C8.66329 1.55166 8.82582 1.50342 8.98908 1.5H9.00299Z" fill="#FFA000"/>
  </svg>
)

// ic_favorite — 18×18, 피그마 원본
const IcFav: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.00299 1.5C9.10389 1.50039 9.20361 1.51882 9.29743 1.55347L9.38898 1.59302L9.39557 1.59668L9.46149 1.63477C9.61057 1.72956 9.72872 1.86466 9.8028 2.02222L11.6331 5.90112L15.7193 6.52075L15.7361 6.52295C15.9453 6.5611 16.1333 6.6699 16.2708 6.82764L16.3265 6.89795C16.4688 7.09729 16.5267 7.34515 16.4891 7.58569C16.4605 7.79128 16.3656 7.97827 16.2261 8.12183L16.2239 8.12402L13.2642 11.1409L13.9637 15.4043L13.9754 15.4951C13.9929 15.7071 13.9371 15.9188 13.8179 16.095C13.6831 16.2941 13.4776 16.4318 13.2459 16.4824C13.2382 16.4841 13.2303 16.4862 13.2225 16.4875C13.1977 16.4919 13.1457 16.4993 13.0826 16.4993L13.0797 16.5C12.9326 16.5 12.7892 16.4624 12.6629 16.3923L9.00226 14.3818L8.97956 14.3921L5.33796 16.3916C5.20805 16.4631 5.06545 16.4984 4.92414 16.4985H4.91462C4.75518 16.496 4.59497 16.4513 4.45392 16.3623C4.35032 16.2968 4.25934 16.2092 4.18952 16.1052C4.18224 16.0944 4.17551 16.0829 4.16901 16.0715L4.14631 16.032L4.13898 16.0188C4.1277 15.9985 4.11764 15.9774 4.10895 15.9558L4.08478 15.8958C4.07957 15.8828 4.07437 15.8695 4.07013 15.8562C4.02387 15.7108 4.01231 15.5554 4.03717 15.4036L4.73664 11.1401L1.77326 8.12402L1.76886 8.1189C1.62038 7.96396 1.52783 7.76483 1.50519 7.55347L1.50007 7.46191C1.49726 7.21962 1.5852 6.98034 1.75348 6.79688L1.7945 6.75659C1.79565 6.75556 1.79699 6.75468 1.79816 6.75366C1.92557 6.63325 2.0877 6.55045 2.26618 6.52222H2.26984L6.36481 5.90112L8.19074 2.03394L8.19367 2.02734L8.19587 2.02222C8.26453 1.87181 8.37605 1.73834 8.52179 1.64355C8.66331 1.55165 8.8258 1.5034 8.98908 1.5H9.00299ZM7.38141 6.38159C7.22139 6.7201 6.9037 6.95658 6.534 7.01294L2.81257 7.5769L5.53937 10.3521C5.79068 10.6079 5.90488 10.9679 5.84699 11.3218L5.21418 15.1765L8.45881 13.3953L8.48957 13.3792L8.55475 13.3484C8.566 13.3431 8.5776 13.3383 8.58918 13.3337C8.89841 13.2122 9.24845 13.2337 9.54279 13.3953L12.786 15.1765L12.1539 11.3225C12.0961 10.9687 12.2108 10.6083 12.4615 10.3528L15.1846 7.5769L11.4647 7.01294C11.0957 6.95687 10.7763 6.72135 10.6158 6.38159L8.9986 2.95605L7.38141 6.38159Z" fill="#B4B4B4"/>
  </svg>
)

// ic_doc — 18×18, 피그마 원본
const IcDoc: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
    <path d="M12.2476 11.4375C12.5582 11.4376 12.8101 11.6894 12.8101 12C12.8101 12.3106 12.5582 12.5624 12.2476 12.5625H5.75244C5.44178 12.5625 5.18994 12.3107 5.18994 12C5.18994 11.6893 5.44178 11.4375 5.75244 11.4375H12.2476Z" fill="#4A4A4A"/>
    <path d="M12.2476 8.4375C12.5582 8.43756 12.8101 8.68938 12.8101 9C12.8101 9.31062 12.5582 9.56244 12.2476 9.5625H5.75244C5.44178 9.5625 5.18994 9.31066 5.18994 9C5.18994 8.68934 5.44178 8.4375 5.75244 8.4375H12.2476Z" fill="#4A4A4A"/>
    <path d="M9.86719 5.44043C10.151 5.46911 10.3726 5.70867 10.3726 6C10.3726 6.29133 10.151 6.53089 9.86719 6.55957L9.81006 6.5625H5.75244C5.44178 6.5625 5.18994 6.31066 5.18994 6C5.18994 5.68934 5.44178 5.4375 5.75244 5.4375H9.81006L9.86719 5.44043Z" fill="#4A4A4A"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M13.5374 2.25C14.7593 2.25 15.75 3.24072 15.75 4.46265V13.5374C15.75 14.7593 14.7593 15.75 13.5374 15.75H4.46265C3.24072 15.75 2.25 14.7593 2.25 13.5374V4.46265C2.25 3.24072 3.24072 2.25 4.46265 2.25H13.5374ZM4.46265 3.375C3.86204 3.375 3.375 3.86204 3.375 4.46265V13.5374C3.375 14.138 3.86204 14.625 4.46265 14.625H13.5374C14.138 14.625 14.625 14.138 14.625 13.5374V4.46265C14.625 3.86204 14.138 3.375 13.5374 3.375H4.46265Z" fill="#4A4A4A"/>
  </svg>
)

// ic_check_circle — 24×24, 피그마 원본
const IcCheckCircle: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#27C36F"/>
    <path d="M15.2822 8.80365C15.6666 8.4073 16.2998 8.39774 16.6962 8.78216C17.0926 9.16665 17.1021 9.79979 16.7177 10.1962L11.3847 15.6962C11.1964 15.8904 10.9374 15.9999 10.6669 15.9999C10.3965 15.9999 10.1375 15.8903 9.94916 15.6962L7.28216 12.9462C6.89774 12.5498 6.9073 11.9166 7.30365 11.5322C7.70009 11.1477 8.33323 11.1573 8.71771 11.5536L10.666 13.5634L15.2822 8.80365Z" fill="white"/>
  </svg>
)

// ─── TableDemo ────────────────────────────────────────────────────────────────

function TableDemo() {
  // Table 1 — compact (h=40): 행4 선택
  const [sel1, setSel1] = useState<string[]>(['4'])
  const [rows1, setRows1] = useState([
    { id: '1', fav: true,  name: '김더존', avatar: 'https://i.pravatar.cc/48?img=11', content: '텍스트 길어지면 말줄임 표시합니다. 말줄임', col3: 'List Table', col4: 'List Table', role: 'master' as const },
    { id: '2', fav: false, name: '이영희', avatar: 'https://i.pravatar.cc/48?img=5',  content: '텍스트 길어지면 말줄임 표시합니다. 말줄임', col3: 'List Table', col4: 'List Table', role: 'master' as const },
    { id: '3', fav: false, name: '박민준', avatar: 'https://i.pravatar.cc/48?img=12', content: '텍스트 길어지면 말줄임 표시합니다. 말줄임', col3: 'List Table', col4: 'List Table', role: 'master' as const },
    { id: '4', fav: false, name: '최지수', avatar: 'https://i.pravatar.cc/48?img=9',  content: '텍스트 길어지면 말줄임 표시합니다. 말줄임', col3: 'List Table', col4: 'List Table', role: 'master' as const },
    { id: '5', fav: false, name: '정우성', avatar: 'https://i.pravatar.cc/48?img=15', content: '텍스트 길어지면 말줄임 표시합니다. 말줄임', col3: 'List Table', col4: 'List Table', role: 'master' as const },
  ])

  // Table 2 — tall (h=64): 행3 선택
  const [sel2, setSel2] = useState<string[]>(['3'])
  const [rows2, setRows2] = useState([
    { id: '1', date: '26.03.19(월) 11:12', title: 'List Table List Table List Table List Table List Table List Table List Table', dateSub: 'subtext', timeSub: 'subtext', title2: 'List Table List Table List Table List Table List Table List Table List Table', dateSub2: 'subtext', timeSub2: 'subtext', author: '김더존', avatar: 'https://i.pravatar.cc/64?img=11', authorSub: 'subtext subtext subtext subtext', status: 'List Table (5/7)' },
    { id: '2', date: '26.03.19(월) 11:12', title: 'List Table List Table List Table List Table List Table List Table List Table', dateSub: 'subtext', timeSub: 'subtext', title2: 'List Table List Table List Table List Table List Table List Table List Table', dateSub2: 'subtext', timeSub2: 'subtext', author: '이영희', avatar: 'https://i.pravatar.cc/64?img=5',  authorSub: 'subtext subtext subtext subtext', status: 'List Table (5/7)' },
    { id: '3', date: '26.03.19(월) 11:12', title: 'List Table List Table List Table List Table List Table List Table List Table', dateSub: 'subtext', timeSub: 'subtext', title2: 'List Table List Table List Table List Table List Table List Table List Table', dateSub2: 'subtext', timeSub2: 'subtext', author: '박민준', avatar: 'https://i.pravatar.cc/64?img=12', authorSub: 'subtext subtext subtext subtext', status: 'List Table (5/7)' },
    { id: '4', date: '26.03.19(월) 11:12', title: 'List Table List Table List Table List Table List Table List Table List Table', dateSub: 'subtext', timeSub: 'subtext', title2: 'List Table List Table List Table List Table List Table List Table List Table', dateSub2: 'subtext', timeSub2: 'subtext', author: '최지수', avatar: 'https://i.pravatar.cc/64?img=9',  authorSub: 'subtext subtext subtext subtext', status: 'List Table (5/7)' },
  ])

  // ── Table 1 컬럼 정의 (Figma 너비: 235/235/235/235/98) ──────────────────────
  const columns1 = [
    {
      key: 'profile',
      header: 'title',
      sortable: true,
      width: 235,
      render: (_: unknown, row: Record<string, unknown>) => (
        // ic_favorite(18) + Avatar(24px=xs) + 이름(14px #333)
        <div className="flex items-center gap-1.5 overflow-hidden">
          {row.fav ? <IcFavFill /> : <IcFav />}
          <Avatar name={row.name as string} src={row.avatar as string} size="xs" />
          <span className="truncate text-body3 text-secondary-800">{row.name as string}</span>
        </div>
      ),
    },
    {
      key: 'content',
      header: 'title',
      sortable: true,
      width: 235,
      render: (v: unknown) => (
        // ic_doc(18) + 긴 텍스트 말줄임(14px #333)
        <div className="flex items-center gap-1.5 overflow-hidden">
          <IcDoc />
          <span className="truncate text-body3 text-secondary-800">{v as string}</span>
        </div>
      ),
    },
    {
      key: 'col3',
      header: 'title',
      sortable: true,
      width: 235,
      // 기본 텍스트 — Table.tsx 기본 render가 truncate span으로 감쌈
    },
    {
      key: 'col4',
      header: 'title',
      sortable: true,
      width: 235,
    },
    {
      key: 'role',
      header: 'title',
      width: 98,
      render: (v: unknown) => (
        // BadgeAuth "마스터" — #ffa000, r=1000
        <Badge variant="auth" type={v as 'master' | 'user' | 'guest'} />
      ),
    },
  ]

  // ── Table 2 컬럼 정의 (Figma 너비: 145/275/275/228/145) ─────────────────────
  const columns2 = [
    {
      key: 'date',
      header: 'title',
      sortable: true,
      width: 145,
      render: (v: unknown) => (
        // 날짜 14px font-medium #333
        <span className="block truncate text-body3 font-medium text-secondary-800">{v as string}</span>
      ),
    },
    {
      key: 'title',
      header: 'title',
      sortable: true,
      width: 275,
      render: (v: unknown, row: Record<string, unknown>) => (
        // tit: ic_doc(18) + title 말줄임(14px medium #333) / subtext: date+time(12px #777)
        <div className="overflow-hidden">
          <div className="flex items-center gap-1.5 overflow-hidden">
            <IcDoc />
            <span className="truncate text-body3 font-medium text-secondary-800">{v as string}</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-body5 text-secondary-600 shrink-0">{row.dateSub as string}</span>
            <span className="w-px shrink-0" style={{ height: 10, backgroundColor: '#e1e1e1' }} aria-hidden="true" />
            <span className="text-body5 text-secondary-600 shrink-0">{row.timeSub as string}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'title2',
      header: 'title',
      sortable: true,
      width: 275,
      render: (v: unknown, row: Record<string, unknown>) => (
        <div className="overflow-hidden">
          <div className="flex items-center gap-1.5 overflow-hidden">
            <IcDoc />
            <span className="truncate text-body3 font-medium text-secondary-800">{v as string}</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-body5 text-secondary-600 shrink-0">{row.dateSub2 as string}</span>
            <span className="w-px shrink-0" style={{ height: 10, backgroundColor: '#e1e1e1' }} aria-hidden="true" />
            <span className="text-body5 text-secondary-600 shrink-0">{row.timeSub2 as string}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'author',
      header: 'title',
      width: 228,
      render: (v: unknown, row: Record<string, unknown>) => (
        // Avatar(32px=sm, r=12) + 이름(14px medium #333) + 서브(12px #777) 말줄임
        <div className="flex items-center gap-2 overflow-hidden">
          <Avatar name={v as string} src={row.avatar as string} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-body3 font-medium text-secondary-800">{v as string}</p>
            <p className="truncate text-body5 text-secondary-600">{row.authorSub as string}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'title',
      align: 'center' as const,
      width: 145,
      render: (v: unknown) => (
        // 아이콘 위, 텍스트 아래, 가운데 정렬
        <div className="flex flex-col items-center gap-1 overflow-hidden">
          <IcCheckCircle />
          <span className="truncate text-body3 text-secondary-800">{v as string}</span>
        </div>
      ),
    },
  ]

  return (
    <PreviewCard
      title="Table"
      description="행과 열로 구성된 데이터 표입니다. 정렬 · 선택 · 삭제 기능을 제공하며 compact · tall 두 가지 행 높이를 지원합니다."
      importPath={`import { Table } from './components'`}
    >
      <div className="w-full space-y-6">
        {/* ── Table 1: compact ── */}
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-2">Compact</p>
          <div className="bg-white rounded-xl border border-secondary-100 overflow-x-auto">
            <Table
              columns={columns1}
              data={rows1}
              selectable
              rowHeight="compact"
              selectedIds={sel1}
              onSelectionChange={setSel1}
              onDelete={id => setRows1(r => r.filter(x => x.id !== id))}
              onSort={(k, d) => console.log(k, d)}
            />
          </div>
        </div>

        {/* ── Table 2: tall ── */}
        <div>
          <p className="text-body5 font-medium text-neutral-500 mb-2">Tall</p>
          <div className="bg-white rounded-xl border border-secondary-100 overflow-x-auto">
            <Table
              columns={columns2}
              data={rows2}
              selectable
              rowHeight="tall"
              selectedIds={sel2}
              onSelectionChange={setSel2}
              onDelete={id => setRows2(r => r.filter(x => x.id !== id))}
              onSort={(k, d) => console.log(k, d)}
            />
          </div>
        </div>
      </div>
    </PreviewCard>
  )
}

// ─── FormTable ────────────────────────────────────────────────────────────────

function FormTableDemo() {
  const [radio1, setRadio1] = useState('public')
  const [radio2, setRadio2] = useState('public')
  const [toggle1, setToggle1] = useState(true)
  const [toggle2, setToggle2] = useState(true)

  const RadioBtn = ({ name, value, selected, onChange, label }: { name: string; value: string; selected: string; onChange: (v: string) => void; label: string }) => (
    <label className="inline-flex items-center gap-1.5 cursor-pointer" onClick={() => onChange(value)}>
      <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: selected === value ? '#719bfc' : '#fff', border: selected === value ? 'none' : '1px solid #d3d3d3' }}>
        {selected === value && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
      </span>
      <span className="text-body3 text-secondary-800 whitespace-nowrap">{label}</span>
    </label>
  )

  const ToggleBtn = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button type="button" onClick={onToggle}
      className="relative inline-flex h-5 w-8 items-center rounded-full transition-colors shrink-0"
      style={{ backgroundColor: on ? '#719bfc' : '#d3d3d3' }}>
      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
        style={{ transform: on ? 'translateX(14px)' : 'translateX(2px)' }} />
    </button>
  )

  const InputField = ({ placeholder = '내용을 입력하세요.' }: { placeholder?: string }) => (
    <input className="w-full h-8 px-2 rounded-md border border-[#d3d3d3] text-body3 text-secondary-800 placeholder:text-secondary-400 focus:outline-none focus:border-secondary-700 bg-white" placeholder={placeholder} />
  )

  return (
    <PreviewCard
      title="FormTable"
      description="입력 필드가 포함된 편집 가능한 테이블입니다. 4컬럼 구조로 레이블과 콘텐츠 영역을 구분하여 정보를 입력받습니다."
      importPath={`import { FormTable } from './components'`}
    >
      <div className="w-full">
        <FormTable
          rows={[
            // Row 1 (h=56): label | [full-width input, span 3cols]
            {
              cells: [{
                label: 'title', required: true, fullWidth: true,
                content: <InputField />,
              }],
            },
            // Row 2 (h=56): label|input | label|radio+toggle
            {
              cells: [
                {
                  label: 'title', required: true,
                  content: <InputField />,
                },
                {
                  label: 'title', required: true,
                  content: (
                    <div className="flex items-center gap-3 flex-wrap">
                      <RadioBtn name="r1" value="public" selected={radio1} onChange={setRadio1} label="전체공개" />
                      <RadioBtn name="r1" value="member" selected={radio1} onChange={setRadio1} label="멤버공개" />
                    </div>
                  ),
                },
              ],
            },
            // Row 3 (h=56): label|dropdown | label|toggle
            {
              cells: [
                {
                  label: 'title', required: true,
                  content: (
                    <div className="relative w-full h-8">
                      <select className="w-full h-8 px-2 pr-7 rounded-md border border-[#d3d3d3] text-body3 text-secondary-800 bg-white appearance-none focus:outline-none">
                        <option>기본선택값</option>
                      </select>
                      <svg className="absolute right-2 top-2.5 pointer-events-none" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1.64742 4.75355C1.45216 4.55829 1.45216 4.24178 1.64742 4.04652C1.84269 3.85126 2.15919 3.85126 2.35445 4.04652L6.00094 7.693L9.64742 4.04652C9.84268 3.85126 10.1592 3.85126 10.3545 4.04652C10.5497 4.24179 10.5497 4.5583 10.3545 4.75355L6.35445 8.75355C6.17141 8.9366 5.88189 8.94787 5.68551 8.78773L5.64742 8.75355L1.64742 4.75355Z" fill="#989898"/>
                      </svg>
                    </div>
                  ),
                },
                {
                  label: 'title', required: false,
                  content: <ToggleBtn on={toggle2} onToggle={() => setToggle2(t => !t)} />,
                },
              ],
            },
            // Row 4 (h=56): label | [date+time, span 3cols]
            {
              cells: [{
                label: 'title', required: true, fullWidth: true,
                content: (
                  <div className="flex flex-wrap items-center" style={{ gap: 4 }}>
                    {/* DateInput — ic_calender 피그마 원본 */}
                    <div className="flex items-center justify-between h-8 px-2 rounded-md border border-[#d3d3d3] bg-white flex-1 min-w-[140px] sm:flex-none" style={{ width: undefined }}>
                      <span className="text-body3 text-secondary-800">2025.05.15 (목)</span>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6.14648 11.2639C6.29193 11.2929 6.42541 11.3649 6.53027 11.4697C6.6351 11.5746 6.70642 11.7081 6.73535 11.8535C6.76429 11.999 6.74964 12.1501 6.69287 12.2871C6.63611 12.424 6.53996 12.5409 6.41675 12.6233C6.29341 12.7057 6.14834 12.75 6 12.75C5.80113 12.75 5.61037 12.6709 5.46973 12.5303C5.32912 12.3897 5.25005 12.1988 5.25 12C5.25 11.8517 5.2943 11.7066 5.37671 11.5833C5.45909 11.46 5.57593 11.3639 5.71289 11.3071C5.84994 11.2504 6.001 11.235 6.14648 11.2639Z" fill="#777777"/><path d="M9.14648 11.2639C9.29193 11.2929 9.42541 11.3649 9.53027 11.4697C9.6351 11.5746 9.70642 11.7081 9.73535 11.8535C9.76429 11.999 9.74964 12.1501 9.69287 12.2871C9.63611 12.424 9.53996 12.5409 9.41675 12.6233C9.29341 12.7057 9.14834 12.75 9 12.75C8.80113 12.75 8.61037 12.6709 8.46973 12.5303C8.32912 12.3897 8.25005 12.1988 8.25 12C8.25 11.8517 8.2943 11.7066 8.37671 11.5833C8.45909 11.46 8.57593 11.3639 8.71289 11.3071C8.84994 11.2504 9.001 11.235 9.14648 11.2639Z" fill="#777777"/><path d="M12.1465 11.2639C12.2919 11.2929 12.4254 11.3649 12.5303 11.4697C12.6351 11.5746 12.7064 11.7081 12.7354 11.8535C12.7643 11.999 12.7496 12.1501 12.6929 12.2871C12.6361 12.424 12.54 12.5409 12.4167 12.6233C12.2934 12.7057 12.1483 12.75 12 12.75C11.8011 12.75 11.6104 12.6709 11.4697 12.5303C11.3291 12.3897 11.2501 12.1988 11.25 12C11.25 11.8517 11.2943 11.7066 11.3767 11.5833C11.4591 11.46 11.5759 11.3639 11.7129 11.3071C11.8499 11.2504 12.001 11.235 12.1465 11.2639Z" fill="#777777"/><path d="M6.14648 8.26392C6.29192 8.29287 6.42541 8.36487 6.53027 8.46973C6.6351 8.57459 6.70642 8.70809 6.73535 8.85352C6.76429 8.999 6.74964 9.15006 6.69287 9.28711C6.63611 9.424 6.53995 9.54094 6.41675 9.62329C6.29341 9.7057 6.14834 9.75 6 9.75C5.80113 9.75 5.61037 9.67087 5.46973 9.53027C5.32912 9.38967 5.25005 9.19884 5.25 9C5.25 8.85166 5.2943 8.70659 5.37671 8.58325C5.45908 8.46 5.57595 8.36389 5.71289 8.30713C5.84994 8.25036 6.001 8.23498 6.14648 8.26392Z" fill="#777777"/><path d="M9.14648 8.26392C9.29193 8.29287 9.42541 8.36487 9.53027 8.46973C9.6351 8.57459 9.70642 8.70809 9.73535 8.85352C9.76429 8.999 9.74964 9.15006 9.69287 9.28711C9.63611 9.424 9.53995 9.54094 9.41675 9.62329C9.29341 9.7057 9.14834 9.75 9 9.75C8.80113 9.75 8.61037 9.67087 8.46973 9.53027C8.32912 9.38967 8.25005 9.19884 8.25 9C8.25 8.85166 8.2943 8.70659 8.37671 8.58325C8.45908 8.46 8.57595 8.36389 8.71289 8.30713C8.84994 8.25036 9.001 8.23498 9.14648 8.26392Z" fill="#777777"/><path d="M12.1465 8.26392C12.2919 8.29287 12.4254 8.36487 12.5303 8.46973C12.6351 8.57459 12.7064 8.70809 12.7354 8.85352C12.7643 8.999 12.7496 9.15006 12.6929 9.28711C12.6361 9.424 12.5399 9.54094 12.4167 9.62329C12.2934 9.7057 12.1483 9.75 12 9.75C11.8011 9.75 11.6104 9.67087 11.4697 9.53027C11.3291 9.38967 11.2501 9.19884 11.25 9C11.25 8.85166 11.2943 8.70659 11.3767 8.58325C11.4591 8.46 11.5759 8.36389 11.7129 8.30713C11.8499 8.25036 12.001 8.23498 12.1465 8.26392Z" fill="#777777"/><path fillRule="evenodd" clipRule="evenodd" d="M12 1.5C12.3107 1.5 12.5625 1.75184 12.5625 2.0625V2.25H13.5374C14.7593 2.25 15.75 3.24072 15.75 4.46265V13.5374C15.75 14.7593 14.7593 15.75 13.5374 15.75H4.46265C3.24072 15.75 2.25 14.7593 2.25 13.5374V4.46265C2.25 3.24072 3.24072 2.25 4.46265 2.25H5.4375V2.0625C5.4375 1.75184 5.68934 1.5 6 1.5C6.31066 1.5 6.5625 1.75184 6.5625 2.0625V2.25H11.4375V2.0625C11.4375 1.75184 11.6893 1.5 12 1.5ZM3.375 13.5374C3.375 14.138 3.86204 14.625 4.46265 14.625H13.5374C14.138 14.625 14.625 14.138 14.625 13.5374V6.5625H3.375V13.5374ZM4.46265 3.375C3.86204 3.375 3.375 3.86204 3.375 4.46265V5.4375H14.625V4.46265C14.625 3.86204 14.138 3.375 13.5374 3.375H12.5625V3.5625C12.5625 3.87316 12.3107 4.125 12 4.125C11.6893 4.125 11.4375 3.87316 11.4375 3.5625V3.375H6.5625V3.5625C6.5625 3.87316 6.31066 4.125 6 4.125C5.68934 4.125 5.4375 3.87316 5.4375 3.5625V3.375H4.46265Z" fill="#777777"/></svg>
                    </div>
                    {/* TimeInput — ic_time 피그마 원본 */}
                    <div className="flex items-center justify-between h-8 px-2 rounded-md border border-[#d3d3d3] bg-white flex-1 min-w-[140px] sm:flex-none" style={{ width: undefined }}>
                      <span className="text-body3 text-secondary-400">오전 hh:mm</span>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 5.45215C9.31066 5.45215 9.5625 5.70399 9.5625 6.01465V8.76709L12.0227 11.2273C12.2424 11.447 12.2424 11.8038 12.0227 12.0234C11.8031 12.2429 11.4469 12.2429 11.2273 12.0234L8.60229 9.39844C8.49689 9.29303 8.43759 9.14979 8.4375 9.00073V6.01465C8.4375 5.70399 8.68934 5.45215 9 5.45215Z" fill="#777777"/><path fillRule="evenodd" clipRule="evenodd" d="M9 1.5C13.1421 1.5 16.5 4.85786 16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5ZM9 2.625C5.47918 2.625 2.625 5.47918 2.625 9C2.625 12.5208 5.47918 15.375 9 15.375C12.5208 15.375 15.375 12.5208 15.375 9C15.375 5.47918 12.5208 2.625 9 2.625Z" fill="#777777"/></svg>
                    </div>
                  </div>
                ),
              }],
            },
            // Row 5 (h=125): label | [tag area, span 3cols]
            {
              height: 125,
              cells: [{
                label: 'title', required: true, fullWidth: true,
                content: (
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center gap-4 flex-wrap">
                      {['전체공개','멤버공개','나만보기'].map(opt => (
                        <RadioBtn key={opt} name="r2" value={opt} selected={radio2} onChange={setRadio2} label={opt} />
                      ))}
                    </div>
                    <p className="text-body4 text-secondary-600">게시판을 공개할 조직/구성원을 선택해주세요.</p>
                    <div className="flex items-center gap-2 px-3 rounded-lg border border-[#d3d3d3] bg-white" style={{ minHeight: 48 }}>
                      <div className="flex items-center gap-2 flex-wrap flex-1">
                        {/* Avatar size="18" (18×18 r=6) — 피그마 실측 */}
                        <Tag size="sm" avatar={<Avatar name="김더존" src="https://i.pravatar.cc/48?img=11" size="18" />} onRemove={() => {}}>김더존</Tag>
                        <Tag size="sm" avatar={<Avatar name="이영희" src="https://i.pravatar.cc/48?img=5"  size="18" />} onRemove={() => {}}>이영희</Tag>
                        <Tag size="sm" avatar={<Avatar name="박민준" src="https://i.pravatar.cc/48?img=12" size="18" />} onRemove={() => {}}>박민준</Tag>
                      </div>
                      {/* ButtonIcon 32×32, bg=#fff, stroke=#b4b4b4, r=6 — ic_tree 피그마 원본 */}
                      <button type="button" className="shrink-0 flex items-center justify-center rounded-md border border-[#b4b4b4] bg-white hover:bg-secondary-50 transition-colors" style={{ width: 32, height: 32 }}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M8.99927 1.5C10.5521 1.5002 11.8103 2.75958 11.8103 4.3125C11.8103 5.67146 10.8467 6.80562 9.56543 7.06787V8.4375H13.3125C14.0374 8.4375 14.625 9.02513 14.625 9.75V11.6902C15.7007 11.9435 16.5015 12.9095 16.5015 14.0625C16.5015 15.4084 15.4106 16.4999 14.0647 16.5C12.7187 16.5 11.6279 15.4084 11.6279 14.0625C11.6279 12.911 12.4264 11.9458 13.5 11.6909V9.75C13.5 9.64645 13.4161 9.5625 13.3125 9.5625H4.6875C4.58395 9.5625 4.5 9.64645 4.5 9.75V11.6909C5.57423 11.9453 6.37354 12.9105 6.37354 14.0625C6.37354 15.4084 5.28263 16.4999 3.93677 16.5C2.59082 16.5 1.5 15.4084 1.5 14.0625C1.5 12.91 2.30003 11.9447 3.375 11.6909V9.75C3.375 9.02513 3.96263 8.4375 4.6875 8.4375H8.44043V7.0686C7.1553 6.80927 6.1875 5.67413 6.1875 4.3125C6.1875 2.75946 7.44631 1.5 8.99927 1.5ZM3.93677 12.75C3.21266 12.75 2.625 13.3374 2.625 14.0625C2.625 14.7876 3.21266 15.375 3.93677 15.375C4.66079 15.3749 5.24854 14.7876 5.24854 14.0625C5.24854 13.3374 4.66079 12.7501 3.93677 12.75ZM14.0647 12.75C13.3406 12.75 12.7529 13.3374 12.7529 14.0625C12.7529 14.7876 13.3406 15.375 14.0647 15.375C14.7887 15.3749 15.3765 14.7876 15.3765 14.0625C15.3765 13.3374 14.7887 12.7501 14.0647 12.75ZM8.99927 2.625C8.06815 2.625 7.3125 3.38026 7.3125 4.3125C7.3125 5.24474 8.06815 6 8.99927 6C9.93021 5.9998 10.6853 5.24462 10.6853 4.3125C10.6853 3.38038 9.93021 2.6252 8.99927 2.625Z" fill="#4A4A4A"/></svg>
                      </button>
                    </div>
                  </div>
                ),
              }],
            },
          ]}
        />
      </div>
    </PreviewCard>
  )
}

// ─── ProfileCard ──────────────────────────────────────────────────────────────

function ProfileCardDemo() {
  return (
    <PreviewCard
      title="ProfileCard"
      description="사용자 프로필을 카드 형태로 표시합니다. 이름 · 직급 · 부서 등의 정보를 담으며 Default · Large 두 가지 크기를 제공합니다."
      importPath={`import { ProfileCard } from './components'`}
    >
      <div className="flex flex-wrap gap-4 items-start">
        <ProfileCard
          variant="default"
          name="황원정" title="사원"
          department="더존비즈온 > 플랫폼사업부문 > 서비스기획3Cell"
          phone="02-6233-0000"
          mobile="010-1234-5678"
          email="hwangwonjeong97@wehago.com"
          onMessage={() => {}} onChat={() => {}} onEmail={() => {}}
        />
        <ProfileCard
          variant="large"
          name="김철수" title="대리"
          department="더존비즈온 > 개발팀 > 프론트엔드Unit"
          phone="02-6233-1111"
          mobile="010-9876-5432"
          email="kim@wehago.com"
          badge="휴직"
          onMessage={() => {}} onChat={() => {}} onEmail={() => {}}
        />
      </div>
    </PreviewCard>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────

// WEbot — 우측 아이콘 줄 맨 끝의 AI 어시스트 아바타 (34×34)
const WebotButton = () => (
  <button
    type="button"
    aria-label="WEbot"
    style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer', width: 34, height: 34, flexShrink: 0 }}
  >
    <img src="/webot.png" alt="WEbot" width={34} height={34} style={{ display: 'block', objectFit: 'contain' }} />
  </button>
)

// 헤더 우측 아이콘 세트
const HeaderFullIcons = () => (
  <>
    <HeaderIconButton aria-label="검색" icon={<IcSearch />} />
    <HeaderIconButton aria-label="알림" icon={<IcAlarm />} badge="99+" />
    <HeaderIconButton aria-label="북마크" icon={<IcBookmark />} />
    <HeaderIconButton aria-label="영상" icon={<IcVideo />} />
    <HeaderIconButton aria-label="채팅" icon={<IcChat />} />
    <HeaderIconButton aria-label="받은함" icon={<IcInbox />} />
    <HeaderIconButton aria-label="조직도" icon={<IcTree />} />
    <WebotButton />
  </>
)
// WEHAGO T: 검색 아이콘·받은함 제외 (검색은 입력창으로 대체)
const HeaderTIcons = () => (
  <>
    <HeaderIconButton aria-label="알림" icon={<IcAlarm />} badge="99+" />
    <HeaderIconButton aria-label="북마크" icon={<IcBookmark />} />
    <HeaderIconButton aria-label="영상" icon={<IcVideo />} />
    <HeaderIconButton aria-label="채팅" icon={<IcChat />} />
    <HeaderIconButton aria-label="조직도" icon={<IcTree />} />
    <WebotButton />
  </>
)

// 회사칩 — (주)더존비즈온
const CompanyChip = () => (
  <span
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px',
      border: '1px solid #e1e1e1', borderRadius: 9999, background: '#fff',
      fontSize: 12, fontWeight: 500, letterSpacing: '-0.5px', color: '#333333', whiteSpace: 'nowrap',
    }}
  >
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#105aff' }} />
    (주)더존비즈온
  </span>
)

const PillChevron = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M1.64742 4.75355C1.45216 4.55829 1.45216 4.24178 1.64742 4.04652C1.84269 3.85126 2.15919 3.85126 2.35445 4.04652L6.00094 7.693L9.64742 4.04652C9.84268 3.85126 10.1592 3.85126 10.3545 4.04652C10.5497 4.24179 10.5497 4.5583 10.3545 4.75355L6.35445 8.75355C6.17141 8.9366 5.88189 8.94787 5.68551 8.78773L5.64742 8.75355L1.64742 4.75355Z" fill="#fff"/>
  </svg>
)

// Figma 기수/기간 pill 공통 스펙: bg #2656c5, 캡슐형(radius 1000), h28, Bold 12px/자간-0.5, padding 0 8
const pillStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', height: 28, padding: '0 8px',
  borderRadius: 9999, background: '#2656c5', color: '#fff', border: 'none',
  fontSize: 12, fontWeight: 700, letterSpacing: '-0.5px', lineHeight: '18px', whiteSpace: 'nowrap',
}

// 기수 드롭다운 pill
const PeriodPill = () => (
  <button type="button" style={{ ...pillStyle, gap: 4, cursor: 'pointer' }}>
    16기 <PillChevron />
  </button>
)

// 날짜 범위 pill
const DateRangePill = () => <span style={pillStyle}>2026.01.01~2026.12.31</span>

// 메뉴 검색 입력창 (WEHAGO T)
const MenuSearchInput = () => (
  <div style={{ position: 'relative', width: '100%', maxWidth: 460 }}>
    <input
      type="text"
      placeholder="메뉴명을 입력해주세요(F10)"
      style={{
        width: '100%', height: 32, padding: '0 36px 0 12px', borderRadius: 8,
        border: '1px solid #d3d3d3', fontSize: 14, color: '#333', outline: 'none',
        fontFamily: 'inherit',
      }}
    />
    <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M10.4502 2.40039C14.896 2.40039 18.5 6.00441 18.5 10.4502C18.5 12.403 17.8041 14.193 16.6475 15.5869L20.5303 19.4697C20.8231 19.7626 20.8231 20.2374 20.5303 20.5303C20.2374 20.8231 19.7626 20.8231 19.4697 20.5303L15.5869 16.6475C14.193 17.8041 12.403 18.5 10.4502 18.5C6.00441 18.5 2.40039 14.896 2.40039 10.4502C2.40039 6.00441 6.00441 2.40039 10.4502 2.40039ZM10.4502 3.90039C6.83284 3.90039 3.90039 6.83284 3.90039 10.4502C3.90039 14.0676 6.83284 17 10.4502 17C14.0676 17 17 14.0676 17 10.4502C17 6.83284 14.0676 3.90039 10.4502 3.90039Z" fill="#777777"/>
      </svg>
    </span>
  </div>
)

// WEHAGO T 로고 (Figma 원본 logo_wehagoT, 144×30)
const WehagoTLogo = () => (
  <img src="/logo_wehago_t.png" alt="WEHAGO T" style={{ height: 30, objectFit: 'contain', display: 'block' }} />
)

function HeaderVariant({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-body5 text-neutral-500 mb-1.5">{label}</p>
      <div className="border border-secondary-100 rounded-xl overflow-hidden">{children}</div>
    </div>
  )
}

function HeaderDemo() {
  const avatar = <HeaderAvatar name="김더존" src="https://i.pravatar.cc/32?img=12" />
  return (
    <PreviewCard
      title="Header"
      description="페이지 최상단 글로벌 헤더입니다. WEHAGO · WEHAGO T · Breadcrumb 3가지 타입을 지원합니다."
      importPath={`import { Header } from './components'`}
    >
      <div className="w-full space-y-4">
        <HeaderVariant label="WEHAGO">
          <Header
            logo={<WehagoLogo />}
            leftExtra={<CompanyChip />}
            rightActions={<OneAiButton />}
            rightIcons={<HeaderFullIcons />}
            userName="김더존" userTitle="대리" userAvatar={avatar}
          />
        </HeaderVariant>

        <HeaderVariant label="WEHAGO T">
          <Header
            logo={<WehagoTLogo />}
            leftExtra={
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <CompanyChip />
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <PeriodPill />
                  <DateRangePill />
                </span>
              </span>
            }
            center={<MenuSearchInput />}
            rightActions={<OneAiButton />}
            rightIcons={<HeaderTIcons />}
            userName="김더존" userTitle="대리" userAvatar={avatar}
          />
        </HeaderVariant>

        <HeaderVariant label="Breadcrumb">
          <Header
            breadcrumbs={[
              { label: '스페이스명', onClick: () => {} },
              { label: '서비스명', onClick: () => {} },
              { label: '09기', onClick: () => {} },
            ]}
            rightActions={<OneAiButton />}
            rightIcons={<HeaderFullIcons />}
            userName="김더존" userTitle="대리" userAvatar={avatar}
          />
        </HeaderVariant>
      </div>
    </PreviewCard>
  )
}

// ─── LNB 전용 아이콘 ──────────────────────────────────────────────────────────

// WEHAGO 로고 마크 — logo.svg 원본
const WehagoMark = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12.0049 2C10.0269 1.99904 8.09304 2.58469 6.44793 3.68288C4.80282 4.78107 3.52034 6.34247 2.76269 8.1696C2.00504 9.99673 1.80626 12.0075 2.1915 13.9476C2.57673 15.8877 3.52868 17.67 4.92693 19.0691C6.32518 20.4681 8.10693 21.4211 10.0468 21.8074C11.9867 22.1937 13.9976 21.9961 15.8252 21.2395C17.6527 20.4829 19.2148 19.2013 20.314 17.5568C21.4131 15.9123 21.9998 13.9788 22 12.0008C21.9991 9.34968 20.946 6.80729 19.0719 4.93213C17.1978 3.05696 14.656 2.00237 12.0049 2ZM12.0373 16.6092C11.1256 16.6095 10.2343 16.3394 9.47607 15.8331C8.71786 15.3268 8.12684 14.607 7.77775 13.7648C7.42867 12.9226 7.33721 11.9957 7.51494 11.1015C7.69267 10.2073 8.1316 9.38583 8.77623 8.74109C9.42085 8.09635 10.2422 7.65727 11.1364 7.47938C12.0306 7.30149 12.9575 7.39279 13.7998 7.74173C14.6421 8.09066 15.362 8.68156 15.8684 9.43968C16.3749 10.1978 16.6451 11.0891 16.6449 12.0008C16.6443 13.2225 16.1586 14.394 15.2946 15.2579C14.4306 16.1217 13.2591 16.6071 12.0373 16.6076V16.6092Z" fill="white"/>
  </svg>
)

// WEHAGO 로고 텍스트 — logo-1.svg 원본
const WehagoLogoText = () => (
  <svg width="88" height="24" viewBox="0 0 88 24" fill="none">
    <g clipPath="url(#lnb-logo-clip)">
      <path d="M55.584 12.2782C55.584 11.0693 55.9481 9.88767 56.63 8.8826C57.312 7.87753 58.2813 7.09419 59.4153 6.63165C60.5493 6.1691 61.7972 6.04812 63.001 6.284C64.2048 6.51988 65.3106 7.10203 66.1785 7.95683L65.3181 8.80417C64.5922 8.08893 63.66 7.6117 62.6485 7.4376C61.637 7.26349 60.5956 7.40099 59.6665 7.83134C58.7373 8.26169 57.9655 8.96391 57.4566 9.84219C56.9476 10.7205 56.7263 11.732 56.8227 12.7388C56.919 13.7456 57.3285 14.6985 57.9952 15.4677C58.6619 16.2368 59.5533 16.7845 60.5477 17.0363C61.5422 17.288 62.5914 17.2313 63.552 16.8741C64.5126 16.5169 65.3378 15.8764 65.9152 15.0402V12.8768H61.7907V11.6768H67.1316V18.2668H65.9131V16.8335C65.0209 17.6189 63.9168 18.1331 62.7343 18.314C61.5518 18.495 60.3414 18.335 59.2492 17.8533C58.157 17.3716 57.2298 16.5889 56.5794 15.5996C55.929 14.6103 55.5833 13.4567 55.584 12.2782ZM18.7302 18.2935V16.7895H27.8768V18.2935H18.7302ZM10.8962 18.2748L8.27922 8.0735L5.66156 18.2735H4.28132L1.20605 6.28683H2.46107L4.9711 16.0728L7.48249 6.28683H9.07596L11.5867 16.0728L14.0974 6.28683H15.3537L12.2765 18.2748H10.8962ZM53.0347 18.2702L51.6761 15.2702H45.7706L44.4127 18.2702H43.0798L48.5643 6.16683H48.8804L54.3669 18.2702H53.0347ZM46.3135 14.0755H51.1325L48.7261 8.75817L46.3135 14.0755ZM39.6214 18.2702V12.8768H32.9091V18.2702H31.6906V6.28683H32.9091V11.6795H39.6214V6.28683H40.8358V18.2702H39.6214ZM18.7296 13.0508V11.5482H27.8768V13.0508H18.7296ZM18.7296 7.7895V6.28683H27.8768V7.79017L18.7296 7.7895Z" fill="white"/>
      <path d="M78.0423 3.6665C76.4002 3.6657 74.7947 4.15374 73.429 5.0689C72.0632 5.98406 70.9985 7.28523 70.3695 8.80784C69.7405 10.3304 69.5755 12.0061 69.8953 13.6229C70.2151 15.2396 71.0054 16.7248 72.1662 17.8907C73.327 19.0566 74.8062 19.8507 76.4167 20.1727C78.0272 20.4946 79.6966 20.3299 81.2138 19.6994C82.731 19.0689 84.0279 18.0009 84.9404 16.6305C85.8529 15.2601 86.34 13.6488 86.3401 12.0005C86.3394 9.79124 85.4651 7.67258 83.9092 6.10994C82.3534 4.5473 80.2432 3.66848 78.0423 3.6665ZM78.0692 15.8408C77.3123 15.8411 76.5723 15.616 75.9429 15.1941C75.3134 14.7722 74.8228 14.1724 74.533 13.4705C74.2431 12.7686 74.1672 11.9963 74.3148 11.2511C74.4623 10.5059 74.8267 9.82136 75.3619 9.28408C75.897 8.74679 76.5789 8.38089 77.3213 8.23265C78.0636 8.08441 78.8331 8.1605 79.5324 8.45128C80.2316 8.74206 80.8293 9.23447 81.2497 9.86624C81.6702 10.498 81.8945 11.2407 81.8944 12.0005C81.8938 13.0186 81.4906 13.9949 80.7734 14.7147C80.0561 15.4346 79.0835 15.8391 78.0692 15.8395V15.8408Z" fill="white"/>
    </g>
    <defs>
      <clipPath id="lnb-logo-clip">
        <rect width="88" height="20" fill="white" transform="translate(0 2)"/>
      </clipPath>
    </defs>
  </svg>
)

// ic_grid_view 24×24 — 서비스 맵 (피그마 원본)
const IcGridView = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.65039 13C9.94795 13.0002 10.9998 14.052 11 15.3496V18.6504C10.9998 19.948 9.94795 20.9998 8.65039 21H5.34961C4.05205 20.9998 3.00021 19.948 3 18.6504V15.3496C3.00021 14.052 4.05205 13.0002 5.34961 13H8.65039ZM5.34961 14.5C4.88048 14.5002 4.50021 14.8805 4.5 15.3496V18.6504C4.50021 19.1195 4.88048 19.4998 5.34961 19.5H8.65039C9.11952 19.4998 9.49979 19.1195 9.5 18.6504V15.3496C9.49979 14.8805 9.11952 14.5002 8.65039 14.5H5.34961Z" fill="#b4b4b4"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M18.6504 13C19.948 13.0002 20.9998 14.052 21 15.3496V18.6504C20.9998 19.948 19.948 20.9998 18.6504 21H15.3496C14.052 20.9998 13.0002 19.948 13 18.6504V15.3496C13.0002 14.052 14.052 13.0002 15.3496 13H18.6504ZM15.3496 14.5C14.8805 14.5002 14.5002 14.8805 14.5 15.3496V18.6504C14.5002 19.1195 14.8805 19.4998 15.3496 19.5H18.6504C19.1195 19.4998 19.4998 19.1195 19.5 18.6504V15.3496C19.4998 14.8805 19.1195 14.5002 18.6504 14.5H15.3496Z" fill="#b4b4b4"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M8.65039 3C9.94795 3.00021 10.9998 4.05205 11 5.34961V8.65039C10.9998 9.94795 9.94795 10.9998 8.65039 11H5.34961C4.05205 10.9998 3.00021 9.94795 3 8.65039V5.34961C3.00021 4.05205 4.05205 3.00021 5.34961 3H8.65039ZM5.34961 4.5C4.88048 4.50021 4.50021 4.88048 4.5 5.34961V8.65039C4.50021 9.11952 4.88048 9.49979 5.34961 9.5H8.65039C9.11952 9.49979 9.49979 9.11952 9.5 8.65039V5.34961C9.49979 4.88048 9.11952 4.50021 8.65039 4.5H5.34961Z" fill="#b4b4b4"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M18.6504 3C19.948 3.00021 20.9998 4.05205 21 5.34961V8.65039C20.9998 9.94795 19.948 10.9998 18.6504 11H15.3496C14.052 10.9998 13.0002 9.94795 13 8.65039V5.34961C13.0002 4.05205 14.052 3.00021 15.3496 3H18.6504ZM15.3496 4.5C14.8805 4.50021 14.5002 4.88048 14.5 5.34961V8.65039C14.5002 9.11952 14.8805 9.49979 15.3496 9.5H18.6504C19.1195 9.49979 19.4998 9.11952 19.5 8.65039V5.34961C19.4998 4.88048 19.1195 4.50021 18.6504 4.5H15.3496Z" fill="#b4b4b4"/>
  </svg>
)

// Atomic/_ic_dobi 24×24 — AI 어시스트 (도비 캐릭터)
const IcDobi = () => (
  <img src="/dobi.png" width="24" height="24" alt="AI 어시스트" style={{ objectFit: 'contain' }} />
)

// ic_note 24×24 — 메뉴 아이템 (_ic.svg 원본)
const IcNote = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15.333 15.25C15.7471 15.2502 16.083 15.5859 16.083 16C16.083 16.4141 15.7471 16.7498 15.333 16.75H8.66602C8.2518 16.75 7.91602 16.4142 7.91602 16C7.91602 15.5858 8.2518 15.25 8.66602 15.25H15.333Z" fill="#b4b4b4"/>
    <path d="M15.333 11.25C15.7471 11.2502 16.083 11.5859 16.083 12C16.083 12.4141 15.7471 12.7498 15.333 12.75H8.66602C8.2518 12.75 7.91602 12.4142 7.91602 12C7.91602 11.5858 8.2518 11.25 8.66602 11.25H15.333Z" fill="#b4b4b4"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M18.0498 3C19.679 3 21 4.32096 21 5.9502V18.0498C21 19.679 19.679 21 18.0498 21H5.9502C4.32096 21 3 19.679 3 18.0498V5.9502C3 4.32096 4.32096 3 5.9502 3H18.0498ZM4.5 18.0498C4.5 18.8506 5.14938 19.5 5.9502 19.5H18.0498C18.8506 19.5 19.5 18.8506 19.5 18.0498V8.75H4.5V18.0498ZM5.9502 4.5C5.14938 4.5 4.5 5.14938 4.5 5.9502V7.25H19.5V5.9502C19.5 5.14938 18.8506 4.5 18.0498 4.5H5.9502Z" fill="#b4b4b4"/>
  </svg>
)

// ic_service — 설치형 WEHAGO
const IcService = () => (
  <img src="/ic_service.png" width="24" height="24" alt="설치형 WEHAGO" style={{ objectFit: 'contain', borderRadius: 6 }} />
)

// ic_question 24×24 — 도움말
const IcQuestion = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 16C12.5523 16 13 16.4477 13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16Z" fill="currentColor"/>
    <path d="M10.9023 6.94141C11.5317 6.71509 12.2163 6.68851 12.8613 6.86523C13.4257 7.01995 13.9366 7.32433 14.3408 7.74316L14.5078 7.92969L14.5146 7.93945C14.8079 8.30609 15.0211 8.73062 15.1406 9.18457C15.26 9.63854 15.2838 10.1127 15.209 10.5762C15.2079 10.5829 15.2064 10.59 15.2051 10.5967C15.1356 10.962 14.9902 11.3087 14.7783 11.6143C14.5663 11.9198 14.2926 12.178 13.9746 12.3711L13.9736 12.3701C13.7478 12.5129 13.4998 12.6531 13.3076 12.7646C13.0906 12.8906 12.9505 12.9781 12.8711 13.043C12.8644 13.0485 12.8575 13.0543 12.8506 13.0596C12.8165 13.0855 12.7894 13.1201 12.7725 13.1592C12.7555 13.1983 12.7486 13.2417 12.7529 13.2842C12.7556 13.3098 12.7568 13.3365 12.7568 13.3623V14.5C12.7568 14.9142 12.421 15.25 12.0068 15.25C11.5929 15.2497 11.2568 14.914 11.2568 14.5V13.3623C11.2406 13.0892 11.2865 12.8153 11.3955 12.5635C11.5111 12.2964 11.6925 12.0633 11.9209 11.8838C12.1073 11.7313 12.3502 11.5854 12.5547 11.4668C12.7802 11.3359 12.9873 11.2208 13.1826 11.0967L13.1963 11.0889C13.3345 11.0049 13.4536 10.8927 13.5459 10.7598C13.6358 10.6301 13.6965 10.4827 13.7275 10.3281C13.7673 10.0741 13.7559 9.81413 13.6904 9.56543C13.6252 9.31794 13.5091 9.08649 13.3506 8.88574L13.2617 8.78516C13.0441 8.55954 12.7687 8.39585 12.4648 8.3125C12.1176 8.21741 11.7489 8.2317 11.4102 8.35352C11.0713 8.47545 10.7774 8.69856 10.5703 8.99316C10.3632 9.28776 10.2529 9.63989 10.2529 10C10.2529 10.0198 10.2516 10.0399 10.25 10.0596C10.2496 10.0647 10.2503 10.0704 10.252 10.0752C10.2537 10.08 10.2573 10.0843 10.2607 10.0879C10.5507 10.3836 10.5456 10.8584 10.25 11.1484C9.95432 11.4384 9.47947 11.4342 9.18945 11.1387C9.03572 10.9818 8.91669 10.7932 8.8418 10.5869C8.77372 10.3991 8.74578 10.1992 8.75391 10C8.75389 9.3311 8.95908 8.67812 9.34375 8.13086C9.72845 7.58363 10.2729 7.16785 10.9023 6.94141Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5Z" fill="currentColor"/>
  </svg>
)

// ic_set 24×24 — 퀵메뉴 설정
const IcSet = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 8C14.2091 8 15.9999 9.79086 15.9999 12C15.9999 14.2091 14.2091 16 11.9999 16C9.79077 16 7.99991 14.2091 7.99991 12C7.99991 9.79086 9.79077 8 11.9999 8ZM11.9999 9.5C10.6192 9.5 9.49991 10.6193 9.49991 12C9.49991 13.3807 10.6192 14.5 11.9999 14.5C13.3806 14.5 14.4999 13.3807 14.4999 12C14.4999 10.6193 13.3806 9.5 11.9999 9.5Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M13.8798 2.00488C14.1493 2.02747 14.4089 2.12795 14.6249 2.29688C14.8414 2.4662 15.0034 2.69654 15.0868 2.95996L15.1181 3.07422L15.5058 4.82129C15.902 5.00521 16.2826 5.21952 16.6435 5.46289L18.4335 4.90527L18.4374 4.90332C18.6964 4.82413 18.9729 4.82223 19.2323 4.89551L19.3427 4.93164L19.4501 4.97656C19.6593 5.07544 19.8422 5.22561 19.9794 5.41504L20.0448 5.51367L20.0458 5.51465L21.8085 8.4668C21.9713 8.73926 22.0336 9.06069 21.9823 9.37598C21.9312 9.69082 21.7708 9.97443 21.5341 10.1816L21.5331 10.1826L20.1581 11.3818C20.1758 11.5856 20.1869 11.7904 20.1884 11.9951V12.0049C20.1869 12.2092 20.1757 12.4137 20.1581 12.6172L21.5331 13.8174L21.5341 13.8184C21.7708 14.0256 21.9312 14.3092 21.9823 14.624C22.0336 14.9393 21.9713 15.2607 21.8085 15.5332L20.0458 18.4854L20.0448 18.4863C19.8827 18.7565 19.6331 18.9596 19.3427 19.0684C19.0524 19.177 18.7335 19.1872 18.4374 19.0967L18.4335 19.0947L16.6435 18.5361C16.2826 18.7796 15.902 18.9938 15.5058 19.1777L15.1181 20.9248C15.0489 21.2357 14.8723 21.5097 14.6249 21.7031C14.3779 21.8962 14.0741 21.9997 13.7636 22H10.2362C9.92574 21.9997 9.6219 21.8962 9.37491 21.7031C9.12755 21.5097 8.95091 21.2367 8.88175 20.9258L8.49308 19.1777C8.09689 18.9937 7.71622 18.7796 7.35538 18.5361L5.56632 19.0947L5.56241 19.0967C5.26635 19.1872 4.9474 19.177 4.65714 19.0684C4.36652 18.9596 4.11703 18.7564 3.95499 18.4863L3.95401 18.4854L2.19132 15.5332C2.02854 15.2607 1.96627 14.9393 2.01749 14.624C2.06868 14.309 2.22979 14.0246 2.46671 13.8174L3.83878 12.6182C3.80271 12.2064 3.80265 11.7926 3.83878 11.3809L2.46671 10.1826L2.46573 10.1816C2.22898 9.97443 2.06865 9.69084 2.01749 9.37598C1.96627 9.06067 2.02854 8.73928 2.19132 8.4668L3.95401 5.51465L3.95499 5.51367C4.11703 5.24364 4.36652 5.04041 4.65714 4.93164L4.76749 4.89551C4.98981 4.83271 5.22454 4.82489 5.45011 4.87402L5.56241 4.90332L5.56632 4.90527L7.35538 5.46289C7.7162 5.2195 8.09693 5.00524 8.49308 4.82129L8.88175 3.0752C8.95091 2.76427 9.12755 2.4903 9.37491 2.29688L9.46964 2.22852C9.69761 2.07938 9.96447 2.00027 10.2362 2H13.7636L13.8798 2.00488ZM9.9423 5.2207L9.94034 5.22852C9.89169 5.43764 9.79342 5.63114 9.65616 5.79395C9.52156 5.9535 9.35242 6.07788 9.16398 6.16211L9.16495 6.16309C8.81751 6.32167 8.48451 6.50816 8.17081 6.72168C7.99644 6.84375 7.79736 6.92436 7.58878 6.95703C7.37989 6.98966 7.16527 6.975 6.9628 6.91309L6.9589 6.91113L5.1962 6.36035L3.54191 9.12988L5.12296 10.5098C5.31506 10.6776 5.40825 10.9322 5.37101 11.1846C5.2912 11.7255 5.2912 12.2745 5.37101 12.8154C5.40825 13.0678 5.31506 13.3224 5.12296 13.4902L3.54191 14.8691L5.1962 17.6387L6.9589 17.0889L6.9628 17.0869C7.11453 17.0405 7.27291 17.0208 7.43058 17.0273L7.58878 17.043L7.74308 17.0762C7.89262 17.1173 8.03506 17.1835 8.16398 17.2725L8.40421 17.4287C8.64815 17.5804 8.90221 17.717 9.16495 17.8369C9.35354 17.9211 9.52148 18.0464 9.65616 18.2061C9.75916 18.3282 9.83998 18.4678 9.89444 18.6182L9.94034 18.7715L9.9423 18.7793L10.3241 20.5H13.6757L14.0575 18.7793L14.0595 18.7715C14.1081 18.5623 14.2064 18.3689 14.3437 18.2061L14.4521 18.0908C14.5646 17.9851 14.6944 17.8997 14.8349 17.8369L15.0946 17.7109C15.3512 17.5804 15.5991 17.4341 15.8359 17.2725C16.0085 17.1533 16.2054 17.0752 16.411 17.043L16.5692 17.0273C16.7269 17.0208 16.8853 17.0405 17.037 17.0869L17.0409 17.0889L18.8026 17.6387L20.4569 14.8691L18.8769 13.4902C18.6861 13.3236 18.5926 13.0712 18.6278 12.8203C18.6658 12.5499 18.686 12.2776 18.6884 12.0049C18.6864 11.7289 18.6663 11.4533 18.6278 11.1797C18.5926 10.9288 18.6861 10.6764 18.8769 10.5098L20.4569 9.12988L18.8026 6.36035L17.0409 6.91113L17.037 6.91309C16.8346 6.97501 16.6199 6.98965 16.411 6.95703C16.2024 6.92436 16.0025 6.8448 15.828 6.72266C15.5145 6.50932 15.1821 6.32156 14.8349 6.16309C14.6467 6.07887 14.4781 5.95327 14.3437 5.79395C14.2064 5.63114 14.1081 5.43765 14.0595 5.22852L14.0575 5.2207L13.6757 3.5H10.3241L9.9423 5.2207Z" fill="currentColor"/>
  </svg>
)

// ─── LNBDemo ──────────────────────────────────────────────────────────────────

function LNBDemo() {
  const [active, setActive] = useState('m1')
  const [collapsed, setCollapsed] = useState(false)

  const topItems = [
    { id: 'service-map', label: '서비스 맵',   icon: <IcGridView /> },
    { id: 'ai-assist',   label: 'AI 어시스트', icon: <IcDobi />    },
  ]

  const menuItems = Array.from({ length: 9 }, (_, i) => ({
    id: `m${i + 1}`,
    label: 'menu name',
    icon: <IcNote />,
  }))

  const bottomItems = [
    { id: 'wehago',  label: '설치형 WEHAGO', icon: <IcService />  },
    { id: 'help',    label: '도움말',         icon: <IcQuestion /> },
    { id: 'setting', label: '퀵메뉴 설정',    icon: <IcSet /> },
  ]

  return (
    <PreviewCard
      title="LNB / GNB"
      description="좌측 메인 내비게이션입니다. 아이콘과 텍스트로 메뉴를 표시하며 collapsed(48px) · expanded(200px) 두 가지 상태를 지원합니다."
      importPath={`import { LNB } from './components'`}
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:min-h-[700px]">
        {/* Collapsed (48px) */}
        <div className="flex flex-col gap-1 w-fit">
          <p className="text-body5 font-medium text-neutral-500">Default (접힘)</p>
          <div className="overflow-hidden rounded-xl border border-secondary-100 w-fit">
            <LNB
              theme="dark"
              collapsed={true}
              items={menuItems}
              topItems={topItems}
              bottomItems={bottomItems}
              activeId={active}
              onSelect={setActive}
              collapsedLogo={<WehagoMark />}
              logo={<WehagoLogoText />}
              onToggleCollapse={() => setCollapsed(c => !c)}
            />
          </div>
        </div>

        {/* Open (200px) */}
        <div className="flex flex-col gap-1">
          <p className="text-body5 font-medium text-neutral-500">Open (펼침)</p>
          <div className="overflow-hidden rounded-xl border border-secondary-100">
            <LNB
              theme="dark"
              collapsed={false}
              items={menuItems}
              topItems={topItems}
              bottomItems={bottomItems}
              activeId={active}
              onSelect={setActive}
              collapsedLogo={<WehagoMark />}
              logo={<WehagoLogoText />}
              onToggleCollapse={() => setCollapsed(c => !c)}
            />
          </div>
        </div>
      </div>
    </PreviewCard>
  )
}

// ─── SNB 전용 아이콘 ──────────────────────────────────────────────────────────

// ic_folder 18×18 — 피그마 원본
const IcFolder = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M7.09497 2.4375C7.58776 2.43755 8.05614 2.65282 8.37671 3.0271L9.54932 4.39673C9.58494 4.43832 9.63738 4.46265 9.69214 4.46265H14.2874C15.5093 4.46265 16.5 5.45336 16.5 6.67529V13.3499C16.5 14.5718 15.5093 15.5625 14.2874 15.5625H3.71265C2.49072 15.5625 1.5 14.5718 1.5 13.3499V4.65015C1.5 3.42822 2.49072 2.4375 3.71265 2.4375H7.09497ZM3.71265 3.5625C3.11204 3.5625 2.625 4.04954 2.625 4.65015V13.3499C2.625 13.9505 3.11204 14.4375 3.71265 14.4375H14.2874C14.888 14.4375 15.375 13.9505 15.375 13.3499V6.67529C15.375 6.07468 14.888 5.58765 14.2874 5.58765H9.69214C9.30881 5.58765 8.94467 5.41956 8.69531 5.12842L7.52197 3.75879C7.41515 3.63418 7.25911 3.56255 7.09497 3.5625H3.71265Z" fill="currentColor"/>
  </svg>
)

// ic_time 24×24 — 피그마 원본
const IcTime = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 7.26953C12.4142 7.26953 12.75 7.60532 12.75 8.01953V11.6895L16.0303 14.9697C16.3232 15.2626 16.3232 15.7384 16.0303 16.0312C15.7374 16.3238 15.2626 16.3238 14.9697 16.0312L11.4697 12.5312C11.3292 12.3907 11.2501 12.1997 11.25 12.001V8.01953C11.25 7.60532 11.5858 7.26953 12 7.26953Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5Z" fill="currentColor"/>
  </svg>
)

// ic_rewind 18×18 — 피그마 원본
const IcRewind = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M4.35953 2.20532C4.57916 1.98569 4.93526 1.98577 5.15494 2.20532C5.37461 2.42499 5.37461 2.78106 5.15494 3.00073L3.41984 4.73584L11.2912 4.73584C12.6711 4.73994 13.9936 5.29015 14.9694 6.26587C15.9452 7.24166 16.4953 8.56411 16.4994 9.94409L16.4994 10.3542C16.4952 11.7341 15.9451 13.0567 14.9694 14.0325C13.9937 15.008 12.671 15.5584 11.2912 15.5625L7.68619 15.5625C7.37596 15.5622 7.12397 15.3102 7.12369 15C7.12369 14.6895 7.37579 14.4378 7.68619 14.4375L11.2882 14.4375C12.3708 14.4342 13.4084 14.0018 14.174 13.2363C14.939 12.4712 15.3706 11.4347 15.3744 10.3528L15.3744 9.94702C15.3711 8.86433 14.9396 7.82687 14.174 7.06128C13.4562 6.34354 12.4993 5.91953 11.4904 5.8667L11.2882 5.86084L3.44034 5.86084L5.15494 7.57544C5.37458 7.79511 5.3746 8.15119 5.15494 8.37085C4.93528 8.5904 4.57917 8.59045 4.35953 8.37085L1.75943 5.77075C1.66453 5.71004 1.58689 5.62227 1.54191 5.51367C1.51213 5.44173 1.49911 5.3659 1.50016 5.29101C1.49666 5.14271 1.55106 4.99334 1.66422 4.88013C1.69428 4.85007 1.72717 4.82432 1.76163 4.80249L4.35953 2.20532Z" fill="currentColor"/>
  </svg>
)

// ─── SNBDemo ─────────────────────────────────────────────────────────────────

function SNBDemo() {
  const [active1, setActive1] = useState('menu1')
  const [active2, setActive2] = useState('sub1')

  // ── SNB1 Type=Default: 1depth 메뉴 구조 ─────────────────────────────────────
  const groups1 = [
    {
      items: [
        { id: 'menu1', label: '1depth menu', icon: <IcFolder />, count: 999 },
        { id: 'menu2', label: '1depth menu', icon: <IcFolder />, count: 999 },
      ],
    },
    {
      category: '텍스트',
      items: [
        { id: 'menu3', label: '1depth menu', icon: <IcFolder />, count: 999 },
        { id: 'menu4', label: '1depth menu', icon: <IcFolder />, count: 999 },
      ],
    },
    {
      items: [
        {
          id: 'group1', label: '1depth group', icon: <IcFolder />,
          children: [
            { id: 'sub1', label: '1Depth 서브 메뉴', count: 999 },
            { id: 'sub2', label: '1Depth 서브 메뉴', count: 999 },
            { id: 'sub3', label: '2Depth 메뉴',      count: 999 },
          ],
        },
      ],
    },
  ]

  const quickMenus1 = [
    { id: 'q1', icon: <IcTime />, label: '최근', onClick: () => {} },
    { id: 'q2', icon: <IcTime />, label: '최근', onClick: () => {} },
    { id: 'q3', icon: <IcTime />, label: '최근', onClick: () => {} },
  ]

  // ── SNB2 Type=2Depth: 서브메뉴 확장 구조 ────────────────────────────────────
  const groups2 = [
    {
      items: [
        { id: 'm1', label: '1depth menu', icon: <IcFolder />, count: 999 },
        {
          id: 'm2', label: '1depth menu', icon: <IcFolder />, count: 999,
          children: [
            { id: 'sub1', label: '1Depth 서브 메뉴', count: 999 },
            { id: 'sub2', label: '1Depth 서브 메뉴', count: 999 },
            { id: 'sub3', label: '1Depth 서브 메뉴', count: 999 },
            { id: 'sub4', label: '1Depth 서브 메뉴', count: 999 },
            { id: 'sub5', label: '1Depth 서브 메뉴', count: 999 },
          ],
        },
      ],
    },
  ]

  return (
    <PreviewCard
      title="SNB"
      description="서브 내비게이션 바입니다. 1depth · 2depth 메뉴를 계층적으로 표시하며 퀵메뉴와 하단 액션을 포함합니다."
      importPath={`import { SNB } from './components'`}
    >
      <div className="flex flex-col sm:flex-row sm:items-stretch gap-4 sm:min-h-[700px]">
        {/* SNB1: Type=Default */}
        <div className="flex flex-col gap-1">
          <p className="text-body5 font-medium text-neutral-500">Default (1depth)</p>
          <div className="flex-1 overflow-hidden rounded-xl border border-secondary-100">
            <SNB
              variant="default"
              groups={groups1}
              activeId={active1}
              onSelect={setActive1}
              primaryAction={{ label: 'Button', onClick: () => {} }}
              secondaryAction={{ label: 'Button', onClick: () => {} }}
              quickMenus={quickMenus1}
              bottomItems={[
                { id: 'b1', label: '1depth menu', icon: <IcFolder />, actionLabel: '비우기', onAction: () => {} },
                { id: 'b2', label: '1depth menu', icon: <IcFolder />, actionLabel: '비우기', onAction: () => {} },
              ]}
            />
          </div>
        </div>

        {/* SNB2: Type=2Depth */}
        <div className="flex flex-col gap-1">
          <p className="text-body5 font-medium text-neutral-500">2Depth (서브메뉴 확장)</p>
          <div className="flex-1 overflow-hidden rounded-xl border border-secondary-100">
            <SNB
              variant="2depth"
              groups={groups2}
              activeId={active2}
              onSelect={setActive2}
              primaryAction={{ label: 'Button', onClick: () => {} }}
              secondaryAction={{ label: 'Button', onClick: () => {} }}
              bottomItems={[
                { id: 'home', label: '홈으로 돌아가기', icon: <IcRewind /> },
              ]}
            />
          </div>
        </div>
      </div>
    </PreviewCard>
  )
}


// ─── Stats Bar ───────────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { label: 'Components', value: '30' },
    { label: 'Color Tokens', value: '52' },
    { label: 'Typography', value: '10' },
    { label: 'Tailwind Classes', value: '80+' },
  ]
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {stats.map(s => (
        <div key={s.label} className="bg-white rounded-2xl border border-secondary-100 px-5 py-4 text-center">
          <p className="text-heading1 font-bold text-primary-base">{s.value}</p>
          <p className="text-body5 text-neutral-600 mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export type ComponentCategory =
  | 'form' | 'button' | 'display'
  | 'navigation' | 'overlay' | 'feedback'
  | 'data' | 'actions'

const CATEGORY_META: Record<ComponentCategory, { title: string; description: string }> = {
  form:       { title: 'Form & Input',      description: '사용자로부터 데이터를 입력받는 컴포넌트입니다. 다양한 입력 형태를 제공하며, 상태와 유효성 검사를 통해 일관된 입력 경험을 만들어냅니다.' },
  button:     { title: 'Button',            description: '버튼은 사용자의 액션을 유도하는 핵심 UI 요소입니다. 중요도와 상황에 따라 적절한 타입을 선택하여 명확한 시각적 위계를 형성합니다.' },
  display:    { title: 'Display',           description: '정보를 시각적으로 표현하고 구분하는 컴포넌트입니다. 레이블, 상태, 사용자 정보 등을 간결하게 전달하여 콘텐츠의 가독성을 높입니다.' },
  navigation: { title: 'Navigation',        description: '사용자가 콘텐츠를 탐색하고 이동할 수 있도록 돕는 컴포넌트입니다. 일관된 구조와 위계를 통해 직관적인 화면 이동 경험을 제공합니다.' },
  overlay:    { title: 'Overlay & Panel',   description: '현재 화면 위에 레이어로 표시되는 컴포넌트입니다. 추가 정보 전달, 사용자 확인, 옵션 선택 등 맥락에 따른 인터랙션에 활용합니다.' },
  feedback:   { title: 'Feedback & Status', description: '시스템 상태나 작업 결과를 사용자에게 알리는 컴포넌트입니다. 적절한 타이밍과 위치에서 명확한 피드백을 전달하여 사용자 경험을 향상시킵니다.' },
  data:       { title: 'Data',              description: '데이터를 구조화하여 표시하는 컴포넌트입니다. 목록, 표, 폼 형태로 다양한 정보를 체계적으로 정리하고 탐색할 수 있도록 합니다.' },
  actions:    { title: 'Actions',           description: '특정 맥락에서 실행 가능한 액션을 제공하는 컴포넌트입니다. 선택된 항목에 대한 일괄 처리나 파일 업로드 등 작업 중심의 인터랙션을 담당합니다.' },
}

export default function ComponentsSection({ category }: { category: ComponentCategory }) {
  const meta = CATEGORY_META[category]

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px', width: '100%', boxSizing: 'border-box', minWidth: 0 }}>
      <div style={{ marginBottom: 56 }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: '#0066cc', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Components</p>
        <h2 style={{ fontSize: 40, fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.3px', lineHeight: 1.1, marginBottom: 12 }}>{meta.title}</h2>
        <p style={{ fontSize: 17, color: '#6e6e73', letterSpacing: '-0.374px', lineHeight: 1.47, wordBreak: 'keep-all' }}>{meta.description}</p>
      </div>

      {category === 'form' && (
        <Section title="Form & Input">
          <InputDemo />
          <TextAreaDemo />
          <SearchBarDemo />
          <DropdownDemo />
          <SelectControlDemo />
          <DateTimeInputDemo />
        </Section>
      )}

      {category === 'button' && (
        <Section title="Button">
          <ButtonDemo />
        </Section>
      )}

      {category === 'display' && (
        <Section title="Display">
          <TagDemo />
          <BadgeDemo />
          <AvatarDemo />
          <ThumbnailDemo />
          <ProfileCardDemo />
        </Section>
      )}

      {category === 'navigation' && (
        <Section title="Navigation">
          <TabDemo />
          <HeaderDemo />
          <LNBDemo />
          <SNBDemo />
        </Section>
      )}

      {category === 'overlay' && (
        <Section title="Overlay & Panel">
          <DialogDemo />
          <TooltipDemo />
          <OverflowMenuDemo />
        </Section>
      )}

      {category === 'feedback' && (
        <Section title="Feedback & Status">
          <SnackbarDemo />
          <InfoBoxDemo />
          <EmptySetDemo />
          <LoadingDemo />
        </Section>
      )}

      {category === 'data' && (
        <Section title="Data">
          <ListDemo />
          <TableDemo />
          <FormTableDemo />
        </Section>
      )}

      {category === 'actions' && (
        <Section title="Actions">
          <ActionBarDemo />
          <FileUploadDemo />
        </Section>
      )}
    </div>
  )
}

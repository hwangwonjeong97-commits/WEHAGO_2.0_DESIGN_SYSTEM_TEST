import { useState } from 'react'
import { DocsPage } from '../docs'
import type { ComponentCategory } from './ComponentsSection'

export type GalleryTarget = { title: string; category: ComponentCategory }
export type FoundationKey = 'Color' | 'Scale' | 'Typography'

// ── 공용 프레젠테이션 ───────────────────────────────────────────────
type ViewItem = { label: string; desc: string; img: string; onClick: () => void }
type ViewGroup = { label?: string; items: ViewItem[] }

// 이미지가 아직 없으면 중립 플레이스홀더 표시.
function Thumb({ img, label }: { img: string; label: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <div
      style={{
        aspectRatio: '16 / 10',
        background: '#f5f6f8',
        borderBottom: '1px solid #ececee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {failed ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: '#b8bcc4' }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.6" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span style={{ fontSize: 11, letterSpacing: '-0.2px' }}>{label}</span>
        </div>
      ) : (
        <img
          src={img}
          alt={label}
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}
    </div>
  )
}

function Card({ item }: { item: ViewItem }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={item.onClick}
      style={{
        display: 'block',
        textAlign: 'left',
        padding: 0,
        border: `1px solid ${hover ? '#c9ccd2' : '#e6e7ea'}`,
        borderRadius: 14,
        background: '#fff',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform .14s ease, box-shadow .14s ease, border-color .14s ease',
        transform: hover ? 'translateY(-3px)' : 'none',
        boxShadow: hover ? '0 8px 20px rgba(0,0,0,0.08)' : '0 1px 2px rgba(0,0,0,0.03)',
      }}
    >
      <Thumb img={item.img} label={item.label} />
      <div style={{ padding: '13px 15px 15px' }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.3px' }}>{item.label}</div>
        <div style={{ fontSize: 13, color: '#6e6e73', letterSpacing: '-0.3px', marginTop: 3, lineHeight: 1.45 }}>{item.desc}</div>
      </div>
    </button>
  )
}

function GalleryView({
  eyebrow,
  title,
  description,
  groups,
}: {
  eyebrow: string
  title: string
  description: string
  groups: ViewGroup[]
}) {
  return (
    <DocsPage eyebrow={eyebrow} title={title} description={description}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {groups.map((group, i) => (
          <section key={group.label ?? i}>
            {group.label && (
              <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.4px', margin: '0 0 16px' }}>
                {group.label}
                <span style={{ fontSize: 14, fontWeight: 400, color: '#a0a0a5', marginLeft: 8 }}>{group.items.length}</span>
              </h2>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 16 }}>
              {group.items.map((item) => (
                <Card key={item.label} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </DocsPage>
  )
}

// ── 데이터 ──────────────────────────────────────────────────────────
type CItem = { title: string; label: string; desc: string; img: string }
type CGroup = { category: ComponentCategory; label: string; items: CItem[] }

// 이미지 파일은 public/components/ 에 <slug>.png 로 넣으면 자동 표시됩니다.
const GALLERY: CGroup[] = [
  {
    category: 'form',
    label: 'Form',
    items: [
      { title: 'Button', label: 'Button', desc: '액션을 실행하는 기본 버튼', img: '/components/button.png' },
      { title: 'Input', label: 'Input', desc: '한 줄 텍스트 입력 필드', img: '/components/input.png' },
      { title: 'TextArea', label: 'TextArea', desc: '여러 줄 텍스트 입력', img: '/components/textarea.png' },
      { title: 'SearchBar', label: 'SearchBar', desc: '검색어 입력·필터', img: '/components/searchbar.png' },
      { title: 'Dropdown', label: 'Dropdown', desc: '목록에서 하나 선택', img: '/components/dropdown.png' },
      { title: 'SelectControl', label: 'SelectControl', desc: '체크박스·라디오·토글', img: '/components/selectcontrol.png' },
      { title: 'DateTimeInput', label: 'DateTimeInput', desc: '날짜·시간 입력', img: '/components/datetimeinput.png' },
    ],
  },
  {
    category: 'action',
    label: 'Action',
    items: [
      { title: 'ActionBar', label: 'ActionBar', desc: '선택 항목 일괄 액션 바', img: '/components/actionbar.png' },
      { title: 'FileUpload', label: 'FileUpload', desc: '파일 첨부·업로드', img: '/components/fileupload.png' },
    ],
  },
  {
    category: 'navi',
    label: 'Navigation',
    items: [
      { title: 'Tab', label: 'Tab', desc: '콘텐츠 전환 탭', img: '/components/tab.png' },
      { title: 'Header', label: 'Header', desc: '상단 글로벌 헤더', img: '/components/header.png' },
      { title: 'LNB / GNB', label: 'LNB / GNB', desc: '좌측·전역 내비게이션', img: '/components/lnb.png' },
      { title: 'SNB', label: 'SNB', desc: '서브 내비게이션', img: '/components/snb.png' },
    ],
  },
  {
    category: 'display',
    label: 'Display',
    items: [
      { title: 'Tag', label: 'Tag', desc: '키워드·라벨 칩', img: '/components/tag.png' },
      { title: 'Badge', label: 'Badge', desc: '알림·상태·권한 표시', img: '/components/badge.png' },
      { title: 'Avatar', label: 'Avatar', desc: '사용자 프로필 이미지', img: '/components/avatar.png' },
      { title: 'FileThumbnail', label: 'FileThumbnail', desc: '파일 미리보기 카드', img: '/components/filethumbnail.png' },
      { title: 'ProfileCard', label: 'ProfileCard', desc: '사용자 정보 카드', img: '/components/profilecard.png' },
      { title: 'Tooltip', label: 'Tooltip', desc: '보조 설명 말풍선', img: '/components/tooltip.png' },
      { title: 'OverflowMenu', label: 'OverflowMenu', desc: '더보기 컨텍스트 메뉴', img: '/components/overflowmenu.png' },
      { title: 'List', label: 'List', desc: '선택 가능한 목록', img: '/components/list.png' },
      { title: 'Card', label: 'Card', desc: '콘텐츠 카드', img: '/components/card.png' },
      { title: 'DataListTable', label: 'DataListTable', desc: '데이터 목록 테이블', img: '/components/datalisttable.png' },
      { title: 'FormTable', label: 'FormTable', desc: '폼 입력 테이블', img: '/components/formtable.png' },
      { title: 'InfoBox', label: 'InfoBox', desc: '안내·경고 박스', img: '/components/infobox.png' },
      { title: 'EmptySet', label: 'EmptySet', desc: '빈 상태 화면', img: '/components/emptyset.png' },
    ],
  },
  {
    category: 'feedback',
    label: 'Feedback',
    items: [
      { title: 'Dialog / Alert', label: 'Dialog / Alert', desc: '모달 대화상자', img: '/components/dialog.png' },
      { title: 'Snackbar', label: 'Snackbar', desc: '하단 알림 토스트', img: '/components/snackbar.png' },
      { title: 'Loading', label: 'Loading', desc: '로딩 인디케이터', img: '/components/loading.png' },
    ],
  },
]

// 이미지 파일은 public/foundation/ 에 <slug>.png 로 넣으면 자동 표시됩니다.
const FOUNDATION: { name: FoundationKey; label: string; desc: string; img: string }[] = [
  { name: 'Color', label: 'Color', desc: '색상 팔레트 · Primitive/Semantic 토큰', img: '/foundation/color.png' },
  { name: 'Scale', label: 'Scale', desc: 'radius · gap · padding · size · shadow 스케일', img: '/foundation/scale.png' },
  { name: 'Typography', label: 'Typography', desc: '글꼴 · 타이포그래피 스케일', img: '/foundation/typography.png' },
]

// ── 페이지 ──────────────────────────────────────────────────────────
export default function ComponentGallery({ onSelect }: { onSelect: (t: GalleryTarget) => void }) {
  const total = GALLERY.reduce((n, g) => n + g.items.length, 0)
  const groups: ViewGroup[] = GALLERY.map((g) => ({
    label: g.label,
    items: g.items.map((it) => ({
      label: it.label,
      desc: it.desc,
      img: it.img,
      onClick: () => onSelect({ title: it.title, category: g.category }),
    })),
  }))
  return (
    <GalleryView
      eyebrow="Components"
      title="Overview"
      description={`WEHAGO 2.0의 UI 컴포넌트 ${total}종입니다. 카드를 클릭하면 상세와 코드 예시로 이동합니다.`}
      groups={groups}
    />
  )
}

export function FoundationGallery({ onSelect }: { onSelect: (name: FoundationKey) => void }) {
  const groups: ViewGroup[] = [
    {
      items: FOUNDATION.map((f) => ({
        label: f.label,
        desc: f.desc,
        img: f.img,
        onClick: () => onSelect(f.name),
      })),
    },
  ]
  return (
    <GalleryView
      eyebrow="Foundation"
      title="Overview"
      description="WEHAGO 2.0의 디자인 토큰 기반 기초 요소입니다. 카드를 클릭하면 상세로 이동합니다."
      groups={groups}
    />
  )
}

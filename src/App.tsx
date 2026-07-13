import React, { useState, useEffect } from 'react'
import OverviewPage from './pages/Overview'
import ColorPage from './pages/Color'
import ScalePage from './pages/Scale'
import TypographyPage from './pages/Typography'
import ComponentsSection, { type ComponentCategory } from './pages/ComponentsSection'
import ComponentGallery, { FoundationGallery, type FoundationKey } from './pages/ComponentGallery'
import './App.css'

const foundationPages = {
  Color: ColorPage,
  Scale: ScalePage,
  Typography: TypographyPage,
} as const

type FoundationName = keyof typeof foundationPages
const foundationNames = Object.keys(foundationPages) as FoundationName[]

const componentItems: { id: ComponentCategory; label: string }[] = [
  { id: 'form', label: 'Form' },
  { id: 'action', label: 'Action' },
  { id: 'navi', label: 'Navigation' },
  { id: 'display', label: 'Display' },
  { id: 'feedback', label: 'Feedback' },
]

const COMPONENT_IDS = new Set<string>(componentItems.map((i) => i.id))

type NavSection = 'overview' | 'gallery' | 'foundation' | FoundationName | ComponentCategory

// 컴포넌트 검색 인덱스: name(검색어) → 카테고리 + 스크롤 대상 제목(h4 텍스트)
const COMPONENT_INDEX: { name: string; title: string; category: ComponentCategory }[] = [
  { name: 'Button', title: 'Button', category: 'form' },
  { name: 'Input', title: 'Input', category: 'form' },
  { name: 'TextArea', title: 'TextArea', category: 'form' },
  { name: 'SearchBar', title: 'SearchBar', category: 'form' },
  { name: 'Dropdown', title: 'Dropdown', category: 'form' },
  { name: 'SelectControl · Checkbox · Radio · Toggle', title: 'SelectControl', category: 'form' },
  { name: 'DateTimeInput', title: 'DateTimeInput', category: 'form' },
  { name: 'ActionBar', title: 'ActionBar', category: 'action' },
  { name: 'FileUpload', title: 'FileUpload', category: 'action' },
  { name: 'Tab', title: 'Tab', category: 'navi' },
  { name: 'Header', title: 'Header', category: 'navi' },
  { name: 'LNB / GNB', title: 'LNB / GNB', category: 'navi' },
  { name: 'SNB', title: 'SNB', category: 'navi' },
  { name: 'Tag', title: 'Tag', category: 'display' },
  { name: 'Badge', title: 'Badge', category: 'display' },
  { name: 'Avatar · AvatarGroup', title: 'Avatar', category: 'display' },
  { name: 'FileThumbnail', title: 'FileThumbnail', category: 'display' },
  { name: 'ProfileCard', title: 'ProfileCard', category: 'display' },
  { name: 'Tooltip', title: 'Tooltip', category: 'display' },
  { name: 'OverflowMenu', title: 'OverflowMenu', category: 'display' },
  { name: 'List', title: 'List', category: 'display' },
  { name: 'Card', title: 'Card', category: 'display' },
  { name: 'DataListTable', title: 'DataListTable', category: 'display' },
  { name: 'FormTable', title: 'FormTable', category: 'display' },
  { name: 'InfoBox', title: 'InfoBox', category: 'display' },
  { name: 'EmptySet', title: 'EmptySet', category: 'display' },
  { name: 'Dialog / Alert', title: 'Dialog / Alert', category: 'feedback' },
  { name: 'Snackbar', title: 'Snackbar', category: 'feedback' },
  { name: 'Loading', title: 'Loading', category: 'feedback' },
]

const NAV_LINK: React.CSSProperties = {
  display: 'block',
  width: '100%',
  textAlign: 'left',
  padding: '7px 12px',
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 400,
  letterSpacing: '-0.224px',
  border: 'none',
  cursor: 'pointer',
  transition: 'background 0.12s',
}

const NAV_LABEL: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: '#6e6e73',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  padding: '4px 12px',
  marginBottom: 2,
}

const HEADER_H = 56

export default function App() {
  const [active, setActive] = useState<NavSection>('overview')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [pendingScroll, setPendingScroll] = useState<string | null>(null)

  const isGallery = active === 'gallery'
  const isFoundationGallery = active === 'foundation'
  const isComponent = COMPONENT_IDS.has(active) || isGallery
  const isOverview = active === 'overview'
  const FoundationPage =
    !isComponent && !isOverview && !isFoundationGallery ? foundationPages[active as FoundationName] : null

  const handleNavClick = (id: NavSection) => {
    setActive(id)
    setDrawerOpen(false)
  }

  // 검색 결과 선택 → 해당 카테고리로 이동 후 컴포넌트로 스크롤
  const goToComponent = (item: { title: string; category: ComponentCategory }) => {
    setActive(item.category)
    setSearch('')
    setPendingScroll(item.title)
    setDrawerOpen(false)
  }

  useEffect(() => {
    if (!pendingScroll) return
    const doScroll = (smooth: boolean) => {
      const el = Array.from(document.querySelectorAll('h4')).find(
        (h) => h.textContent?.trim() === pendingScroll,
      )
      if (el) {
        ;(el as HTMLElement).style.scrollMarginTop = `${HEADER_H + 16}px`
        el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
      }
    }
    // 이미지 로딩에 의한 레이아웃 시프트 보정: 두 번 스크롤
    const t1 = setTimeout(() => doScroll(false), 80)
    const t2 = setTimeout(() => { doScroll(true); setPendingScroll(null) }, 500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [active, pendingScroll])

  const results = search.trim()
    ? COMPONENT_INDEX.filter((c) => c.name.toLowerCase().includes(search.trim().toLowerCase()))
    : []

  // 상단 우측 탭: 그룹 전환 시 해당 그룹의 첫 메뉴로 이동
  const handleTab = (tab: 'foundation' | 'components') => {
    setActive(tab === 'foundation' ? 'foundation' : 'gallery')
    setDrawerOpen(false)
  }

  const tabButton = (label: string, isActive: boolean, onClick: () => void) => (
    <button
      onClick={onClick}
      style={{
        height: HEADER_H,
        padding: '0 4px',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontSize: 15,
        fontWeight: isActive ? 600 : 400,
        color: isActive ? '#1d1d1f' : '#6e6e73',
        borderBottom: isActive ? '2px solid #1d1d1f' : '2px solid transparent',
        letterSpacing: '-0.2px',
      }}
    >
      {label}
    </button>
  )

  const navButton = (id: NavSection, label: string) => (
    <button
      key={id}
      onClick={() => handleNavClick(id)}
      style={{
        ...NAV_LINK,
        color: active === id ? '#0066cc' : '#1d1d1f',
        background: active === id ? 'rgba(0,102,204,0.08)' : 'transparent',
        fontWeight: active === id ? 500 : 400,
      }}
    >
      {label}
    </button>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      {/* ── Top nav bar (white) ── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: HEADER_H,
          background: '#ffffff',
          borderBottom: '1px solid #e0e0e0',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: 10,
        }}
      >
        <button
          className="md:hidden"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          style={{ color: '#1d1d1f', background: 'none', border: 'none', cursor: 'pointer', padding: 4, marginRight: 4 }}
        >
          <svg width="18" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M1 2h16M1 7h16M1 12h16" />
          </svg>
        </button>
        <button
          onClick={() => handleNavClick('overview')}
          aria-label="개요로 이동"
          style={{ fontSize: 16, fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.3px', whiteSpace: 'nowrap', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          WEHAGO 2.0<span className="hidden sm:inline"> Design System</span>
        </button>

        {/* 상단 우측 탭 */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 20, height: HEADER_H }}>
          {tabButton('Foundation', !isComponent, () => handleTab('foundation'))}
          {tabButton('Components', isComponent, () => handleTab('components'))}
        </div>
      </nav>

      {/* ── Mobile backdrop ── */}
      {drawerOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 40 }}
          className="md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        style={{
          position: 'fixed',
          top: HEADER_H,
          left: 0,
          bottom: 0,
          width: 220,
          background: '#fff',
          borderRight: '1px solid #e0e0e0',
          overflowY: 'auto',
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
        }}
        className={`transition-transform duration-300 ease-in-out ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* 활성 탭의 메뉴만 표시 */}
        <nav style={{ flex: 1, padding: '16px 10px' }}>
          {isComponent ? (
            <>
              {/* 컴포넌트 검색 */}
              <div style={{ padding: '0 6px 10px' }}>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="컴포넌트 검색"
                  aria-label="컴포넌트 검색"
                  style={{ width: '100%', boxSizing: 'border-box', height: 32, padding: '0 10px', fontSize: 13, border: '1px solid #e0e0e0', borderRadius: 8, outline: 'none', background: '#f7f7f7', color: '#1d1d1f' }}
                />
              </div>
              {results.length > 0 ? (
                <div>
                  {results.map((r) => (
                    <button key={r.title} onClick={() => goToComponent(r)} style={{ ...NAV_LINK, color: '#1d1d1f' }}>
                      {r.name}
                    </button>
                  ))}
                </div>
              ) : search.trim() ? (
                <p style={{ ...NAV_LINK, color: '#8e8e93', cursor: 'default' }}>검색 결과가 없습니다</p>
              ) : (
                <>
                  {navButton('gallery', 'Overview')}
                  <p style={{ ...NAV_LABEL, marginTop: 16 }}>Components</p>
                  <div>{componentItems.map((item) => navButton(item.id, item.label))}</div>
                </>
              )}
            </>
          ) : (
            <>
              {navButton('foundation', 'Overview')}
              <p style={{ ...NAV_LABEL, marginTop: 16 }}>Foundation</p>
              <div>{foundationNames.map((name) => navButton(name, name))}</div>
            </>
          )}
        </nav>
        <div style={{ padding: '14px 22px', borderTop: '1px solid #e0e0e0' }}>
          <p style={{ fontSize: 12, color: '#6e6e73', letterSpacing: '-0.1px' }}>token.json 기반 · v1.0.0</p>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main style={{ marginTop: HEADER_H }} className="md:ml-[220px] min-h-screen overflow-x-hidden">
        {isOverview ? (
          <OverviewPage />
        ) : isGallery ? (
          <ComponentGallery onSelect={goToComponent} />
        ) : isFoundationGallery ? (
          <FoundationGallery onSelect={(name: FoundationKey) => handleNavClick(name)} />
        ) : FoundationPage ? (
          <FoundationPage />
        ) : (
          <ComponentsSection category={active as ComponentCategory} />
        )}
      </main>
    </div>
  )
}

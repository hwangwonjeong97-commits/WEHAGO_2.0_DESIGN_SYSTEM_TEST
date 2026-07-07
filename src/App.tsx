import React, { useState } from 'react'
import ColorPage from './pages/Color'
import ScalePage from './pages/Scale'
import TypographyPage from './pages/Typography'
import ComponentsSection, { type ComponentCategory } from './pages/ComponentsSection'
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

type NavSection = FoundationName | ComponentCategory

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
  const [active, setActive] = useState<NavSection>('Color')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const isComponent = COMPONENT_IDS.has(active)
  const FoundationPage = !isComponent ? foundationPages[active as FoundationName] : null

  const handleNavClick = (id: NavSection) => {
    setActive(id)
    setDrawerOpen(false)
  }

  // 상단 우측 탭: 그룹 전환 시 해당 그룹의 첫 메뉴로 이동
  const handleTab = (tab: 'foundation' | 'components') => {
    setActive(tab === 'foundation' ? 'Color' : componentItems[0].id)
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
        <span style={{ fontSize: 16, fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.3px' }}>WEHAGO 2.0 Design System</span>

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
          <p style={NAV_LABEL}>{isComponent ? 'Components' : 'Foundation'}</p>
          <div>
            {isComponent
              ? componentItems.map((item) => navButton(item.id, item.label))
              : foundationNames.map((name) => navButton(name, name))}
          </div>
        </nav>
        <div style={{ padding: '14px 22px', borderTop: '1px solid #e0e0e0' }}>
          <p style={{ fontSize: 12, color: '#6e6e73', letterSpacing: '-0.1px' }}>token.json 기반 · v1.0.0</p>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main style={{ marginTop: HEADER_H }} className="md:ml-[220px] min-h-screen overflow-x-hidden">
        {FoundationPage ? (
          <FoundationPage />
        ) : (
          <ComponentsSection category={active as ComponentCategory} />
        )}
      </main>
    </div>
  )
}

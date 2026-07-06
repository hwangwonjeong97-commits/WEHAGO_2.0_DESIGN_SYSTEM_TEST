import { useState } from 'react'
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

const componentCategories: { id: ComponentCategory; label: string }[] = [
  { id: 'button', label: 'Button' },
  { id: 'form', label: 'Form & Input' },
  { id: 'display', label: 'Display' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'overlay', label: 'Overlay & Panel' },
  { id: 'feedback', label: 'Feedback & Status' },
  { id: 'data', label: 'Data' },
  { id: 'actions', label: 'Actions' },
]

type Active = FoundationName | ComponentCategory

function isFoundation(a: Active): a is FoundationName {
  return (foundationNames as string[]).includes(a)
}

export default function App() {
  const [active, setActive] = useState<Active>('Color')
  const foundation = isFoundation(active)
  const ActivePage = foundation ? foundationPages[active] : null

  return (
    <div className="ds-shell">
      <aside className="ds-nav">
        <div className="ds-nav__brand">
          WEHAGO 2.0
          <span>Design System</span>
        </div>
        <nav>
          <div className="ds-nav__group">Foundation</div>
          <ul>
            {foundationNames.map((name) => (
              <li key={name}>
                <button
                  type="button"
                  className={`ds-nav__item${active === name ? ' ds-nav__item--active' : ''}`}
                  onClick={() => setActive(name)}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
          <div className="ds-nav__group">Components</div>
          <ul>
            {componentCategories.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  className={`ds-nav__item${active === c.id ? ' ds-nav__item--active' : ''}`}
                  onClick={() => setActive(c.id)}
                >
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ds-nav__foot">token.json 기반 · 자동 생성</div>
      </aside>
      <main className={foundation ? 'ds-content' : 'ds-content ds-content--flush'}>
        {ActivePage ? (
          <ActivePage />
        ) : (
          <div className="ds-component-preview">
            <ComponentsSection category={active as ComponentCategory} />
          </div>
        )}
      </main>
    </div>
  )
}

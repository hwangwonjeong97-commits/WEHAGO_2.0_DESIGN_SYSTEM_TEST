import { useState } from 'react'
import ColorPage from './pages/Color'
import ScalePage from './pages/Scale'
import TypographyPage from './pages/Typography'
import './App.css'

const pages = {
  Color: ColorPage,
  Scale: ScalePage,
  Typography: TypographyPage,
} as const

type PageName = keyof typeof pages

export default function App() {
  const [active, setActive] = useState<PageName>('Color')
  const ActivePage = pages[active]

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
            {(Object.keys(pages) as PageName[]).map((name) => (
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
        </nav>
        <div className="ds-nav__foot">token.json 기반 · 자동 생성</div>
      </aside>
      <main className="ds-content">
        <ActivePage />
      </main>
    </div>
  )
}

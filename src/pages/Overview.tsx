import React from 'react'
import { DocsPage, DocsSection } from '../docs'

const card: React.CSSProperties = {
  border: '1px solid #e0e0e0',
  borderRadius: 18,
  background: '#F9F9F9',
  padding: '20px 24px',
}
const h: React.CSSProperties = { fontSize: 16, fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.3px', margin: '0 0 6px' }
const p: React.CSSProperties = { fontSize: 14, color: '#4a4a4a', letterSpacing: '-0.3px', lineHeight: 1.6, margin: 0 }

const PRINCIPLES = [
  { t: '일관성 (Consistency)', d: '토큰과 규칙을 공유해 어떤 화면에서도 같은 요소는 같게 동작하고 보이도록 합니다.' },
  { t: '접근성 (Accessibility)', d: '키보드 조작·명도 대비·포커스 표시를 기본으로 지켜 모두가 쓸 수 있는 UI를 지향합니다.' },
  { t: '효율성 (Efficiency)', d: '검증된 컴포넌트를 재사용해 디자인·개발 반복 작업을 줄이고 품질을 균일하게 유지합니다.' },
  { t: '확장성 (Scalability)', d: 'Primitive → Semantic → Component로 이어지는 토큰 구조로 변경을 한 곳에서 전파합니다.' },
]

const A11Y = [
  { t: '키보드', d: '모든 인터랙티브 요소는 Tab으로 이동하고 Enter/Space로 조작할 수 있어야 합니다.' },
  { t: '포커스', d: '포커스 상태를 항상 시각적으로 표시합니다(포커스 링). 마우스·키보드 사용자 모두 현재 위치를 알 수 있게 합니다.' },
  { t: '명도 대비', d: '본문 텍스트는 배경과 WCAG AA(4.5:1) 이상 대비를 유지합니다. Semantic 색 토큰이 이를 전제로 설계돼 있습니다.' },
  { t: '의미 전달', d: '색만으로 상태를 전달하지 않습니다(예: 에러는 색 + 아이콘 + 문구). 아이콘 버튼엔 aria-label을 제공합니다.' },
]

export default function OverviewPage() {
  return (
    <DocsPage
      eyebrow="WEHAGO 2.0"
      title="Design System"
      description="일관되고 접근성 높은 UI를 빠르게 만들기 위한 WEHAGO 2.0의 디자인 토큰·컴포넌트 시스템입니다. Figma와 코드가 동일한 토큰을 공유합니다."
    >
      <DocsSection title="소개">
        <div style={card}>
          <p style={p}>
            이 문서는 WEHAGO 2.0의 <b>Foundation</b>(색상·타이포그래피·스케일 등 기본 토큰)과 <b>Components</b>(재사용 UI 컴포넌트)를 한곳에서 제공합니다.
            모든 값은 <b>token.json</b>(Tokens Studio)에서 관리되며, Figma 디자인과 코드가 같은 토큰을 참조하도록 <b>Figma Code Connect</b>로 연결돼 있습니다.
          </p>
        </div>
      </DocsSection>

      <DocsSection title="디자인 원칙">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {PRINCIPLES.map((it) => (
            <div key={it.t} style={card}>
              <h4 style={h}>{it.t}</h4>
              <p style={p}>{it.d}</p>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection title="시작하기">
        <div style={card}>
          <h4 style={h}>컴포넌트 사용</h4>
          <p style={{ ...p, marginBottom: 12 }}>컴포넌트는 배럴에서 import 해 바로 사용합니다.</p>
          <pre style={{ margin: 0, background: '#222222', color: '#e6e6e6', borderRadius: 10, padding: '14px 16px', fontSize: 13, lineHeight: 1.6, overflowX: 'auto', fontFamily: 'ui-monospace, monospace' }}>
{`import { Button, Badge, Card } from './components'

<Button variant="primary" size="md">확인</Button>
<Badge type="info">badge</Badge>`}
          </pre>
          <p style={{ ...p, marginTop: 14 }}>
            토큰은 <b>Primitive</b>(기본 값)를 <b>Semantic</b>(의미 값)이 참조하는 구조입니다. UI에서는 의미가 담긴 <b>Semantic 토큰</b> 사용을 권장합니다.
          </p>
        </div>
      </DocsSection>

      <DocsSection title="접근성">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {A11Y.map((it) => (
            <div key={it.t} style={card}>
              <h4 style={h}>{it.t}</h4>
              <p style={p}>{it.d}</p>
            </div>
          ))}
        </div>
      </DocsSection>
    </DocsPage>
  )
}

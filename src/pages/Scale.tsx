import { getFlat, semanticSet, type TokenEntry } from '../tokens'
import { DocsCard, DocsPage, DocsSection } from '../docs'
import './Scale.css'

function px(entry: TokenEntry): number | null {
  const v = entry.resolved.value
  return typeof v === 'number' ? v : null
}

function RadiusRow({ entry }: { entry: TokenEntry }) {
  const size = px(entry) ?? 0
  return (
    <div className="ds-scale-item">
      <div className="ds-scale-demo">
        <div className="ds-radius-box" style={{ borderRadius: Math.min(size, 40) }} />
      </div>
      <span className="ds-scale-label">
        {entry.name} · {px(entry)}px
      </span>
    </div>
  )
}

function BarRow({ entry, axis }: { entry: TokenEntry; axis: 'w' | 'h' }) {
  const size = px(entry) ?? 0
  const style = axis === 'w' ? { width: size } : { height: size }
  return (
    <div className="ds-scale-item">
      <div className="ds-scale-demo">
        <div className="ds-scale-bar" style={style} />
      </div>
      <span className="ds-scale-label">
        {entry.name} · {px(entry)}px
      </span>
    </div>
  )
}

function BoxRow({ entry }: { entry: TokenEntry }) {
  const size = px(entry) ?? 0
  return (
    <div className="ds-scale-item">
      <div className="ds-scale-demo">
        <div className="ds-pad-box" style={{ padding: size }}>
          <div className="ds-pad-inner" />
        </div>
      </div>
      <span className="ds-scale-label">
        {entry.name} · {px(entry)}px
      </span>
    </div>
  )
}

export default function ScalePage() {
  const radius = getFlat(semanticSet, 'radius')
  const gap = getFlat(semanticSet, 'gap')
  const padding = getFlat(semanticSet, 'padding')
  const size = getFlat(semanticSet, 'size')

  return (
    <DocsPage
      eyebrow="Foundation"
      title="Scale"
      description="radius · gap · padding · size 스케일입니다. token.json의 {number.*} 참조를 px로 해석합니다."
    >
      <DocsSection>
        <DocsCard title="Radius" description="모서리 곡률.">
          <div className="ds-scale-grid">
            {radius.map((e) => (
              <RadiusRow key={e.path} entry={e} />
            ))}
          </div>
        </DocsCard>
        <DocsCard title="Gap" description="요소 사이 간격.">
          <div className="ds-scale-grid">
            {gap.map((e) => (
              <BarRow key={e.path} entry={e} axis="w" />
            ))}
          </div>
        </DocsCard>
        <DocsCard title="Padding" description="내부 여백.">
          <div className="ds-scale-grid">
            {padding.map((e) => (
              <BoxRow key={e.path} entry={e} />
            ))}
          </div>
        </DocsCard>
        <DocsCard title="Size" description="컴포넌트 높이/너비.">
          <div className="ds-scale-grid">
            {size.map((e) => (
              <BarRow key={e.path} entry={e} axis="h" />
            ))}
          </div>
        </DocsCard>
      </DocsSection>
    </DocsPage>
  )
}

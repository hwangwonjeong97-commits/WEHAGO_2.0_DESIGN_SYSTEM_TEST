import { getFlat, semanticSet, type TokenEntry } from '../tokens'
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
    <div>
      <div className="ds-page-title">
        <h1>Scale</h1>
        <p>radius · gap · padding · size 스케일 ({'{number.*}'} 참조를 px로 해석).</p>
      </div>

      <section className="ds-section">
        <h2 className="ds-section__title">Radius</h2>
        <p className="ds-section__desc">모서리 곡률.</p>
        <div className="ds-scale-grid">
          {radius.map((e) => (
            <RadiusRow key={e.path} entry={e} />
          ))}
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section__title">Gap</h2>
        <p className="ds-section__desc">요소 사이 간격.</p>
        <div className="ds-scale-grid">
          {gap.map((e) => (
            <BarRow key={e.path} entry={e} axis="w" />
          ))}
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section__title">Padding</h2>
        <p className="ds-section__desc">내부 여백.</p>
        <div className="ds-scale-grid">
          {padding.map((e) => (
            <BoxRow key={e.path} entry={e} />
          ))}
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section__title">Size</h2>
        <p className="ds-section__desc">컴포넌트 높이/너비.</p>
        <div className="ds-scale-grid">
          {size.map((e) => (
            <BarRow key={e.path} entry={e} axis="h" />
          ))}
        </div>
      </section>
    </div>
  )
}

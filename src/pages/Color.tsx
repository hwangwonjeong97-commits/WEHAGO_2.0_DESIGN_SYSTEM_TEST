import { getFlat, getGroups, primitiveSet, semanticSet, type TokenEntry } from '../tokens'
import { DocsCard, DocsPage, DocsSection } from '../docs'
import './Color.css'

function Swatch({ entry }: { entry: TokenEntry }) {
  const { resolved } = entry
  const color = !resolved.broken && typeof resolved.value === 'string' ? resolved.value : null
  return (
    <div className="ds-swatch">
      <div
        className={`ds-swatch__chip${color ? '' : ' ds-swatch__chip--broken'}`}
        title={color ?? `깨진 참조: {${resolved.ref}}`}
      >
        {color ? <span className="ds-swatch__fill" style={{ background: color }} /> : <span>⚠</span>}
      </div>
      <div className="ds-swatch__meta">
        <span className="ds-swatch__name">{entry.name}</span>
        <span className="ds-swatch__value">{color ? color.toUpperCase() : `→ {${resolved.ref}} 없음`}</span>
        {typeof entry.raw === 'string' && entry.raw.startsWith('{') && color && (
          <span className="ds-swatch__ref">{entry.raw}</span>
        )}
      </div>
    </div>
  )
}

function SwatchGrid({ entries }: { entries: TokenEntry[] }) {
  return (
    <div className="ds-swatch-grid">
      {entries.map((e) => (
        <Swatch key={e.path} entry={e} />
      ))}
    </div>
  )
}

export default function ColorPage() {
  // deprecated 그룹은 문서 사이트에서 제외 (token.json에는 유지)
  const primitive = getGroups(primitiveSet, 'color').filter((g) => g.name !== 'deprecated')
  const semantic = getGroups(semanticSet, 'color')
  const alpha = getFlat(semanticSet, 'alpha')

  return (
    <DocsPage
      eyebrow="Foundation"
      title="Color"
      description="WEHAGO 2.0의 색상 팔레트입니다. Primitive(기본 색)를 Semantic(의미 색)이 참조하며, UI에는 Semantic 토큰 사용을 권장합니다."
    >
      <DocsSection title="Primitive">
        {primitive.map((g) => (
          <DocsCard key={g.name} title={g.name}>
            <SwatchGrid entries={g.entries} />
          </DocsCard>
        ))}
      </DocsSection>

      <DocsSection title="Semantic">
        {semantic.map((g) => (
          <DocsCard key={g.name} title={g.name}>
            <SwatchGrid entries={g.entries} />
          </DocsCard>
        ))}
        {alpha.length > 0 && (
          <DocsCard title="alpha">
            <SwatchGrid entries={alpha} />
          </DocsCard>
        )}
      </DocsSection>
    </DocsPage>
  )
}

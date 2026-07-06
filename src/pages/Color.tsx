import {
  componentSet,
  getFlat,
  getGroups,
  primitiveSet,
  semanticSet,
  type TokenEntry,
  type TokenGroup,
} from '../tokens'
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
        <span className="ds-swatch__value">
          {color ? color.toUpperCase() : `→ {${resolved.ref}} 없음`}
        </span>
        {typeof entry.raw === 'string' && entry.raw.startsWith('{') && color && (
          <span className="ds-swatch__ref">{entry.raw}</span>
        )}
      </div>
    </div>
  )
}

function GroupBlock({ group }: { group: TokenGroup }) {
  return (
    <div className="ds-color-group">
      <div className="ds-subheading">{group.name}</div>
      <div className="ds-swatch-grid">
        {group.entries.map((e) => (
          <Swatch key={e.path} entry={e} />
        ))}
      </div>
    </div>
  )
}

export default function ColorPage() {
  const primitive = getGroups(primitiveSet, 'color')
  const semantic = getGroups(semanticSet, 'color')
  const alpha = getFlat(semanticSet, 'alpha')
  const component = getGroups(componentSet, 'color')

  const brokenCount = component
    .flatMap((g) => g.entries)
    .concat(semantic.flatMap((g) => g.entries))
    .filter((e) => e.resolved.broken).length

  return (
    <div>
      <div className="ds-page-title">
        <h1>Color</h1>
        <p>token.json에서 읽어 alias를 실제 값까지 해석해 렌더링합니다.</p>
      </div>

      {brokenCount > 0 && (
        <div className="ds-banner">
          ⚠ 깨진 참조 {brokenCount}건 — 존재하지 않는 semantic 토큰을 가리키는 항목이 있습니다
          (아래 ⚠ 표시).
        </div>
      )}

      <section className="ds-section">
        <h2 className="ds-section__title">Primitive</h2>
        <p className="ds-section__desc">실제 raw 값. 이 계층만 변경 가능합니다.</p>
        {primitive.map((g) => (
          <GroupBlock key={g.name} group={g} />
        ))}
      </section>

      <section className="ds-section">
        <h2 className="ds-section__title">Semantic</h2>
        <p className="ds-section__desc">primitive를 참조합니다. (고정 계층)</p>
        {semantic.map((g) => (
          <GroupBlock key={g.name} group={g} />
        ))}
        {alpha.length > 0 && (
          <div className="ds-color-group">
            <div className="ds-subheading">alpha</div>
            <div className="ds-swatch-grid">
              {alpha.map((e) => (
                <Swatch key={e.path} entry={e} />
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="ds-section">
        <h2 className="ds-section__title">Component</h2>
        <p className="ds-section__desc">semantic을 참조합니다. (고정 계층)</p>
        {component.map((g) => (
          <GroupBlock key={g.name} group={g} />
        ))}
      </section>
    </div>
  )
}

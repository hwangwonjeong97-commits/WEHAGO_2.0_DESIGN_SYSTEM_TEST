import { getGroups, primitiveSet, type TokenEntry } from '../tokens'
import { DocsCard, DocsPage, DocsSection } from '../docs'
import './Typography.css'

function val(e: TokenEntry): string {
  const v = e.resolved.value
  return v == null ? '—' : String(v)
}

export default function TypographyPage() {
  const groups = getGroups(primitiveSet, 'typo')
  const find = (name: string) => groups.find((g) => g.name === name)?.entries ?? []

  const font = find('font')[0]
  const weights = find('font-weight')
  const spacing = find('letter-spacing')[0]

  const family = font ? String(font.resolved.value) : 'sans-serif'

  return (
    <DocsPage
      eyebrow="Foundation"
      title="Typography"
      description="token.json의 typo 토큰입니다. font · font-weight · letter-spacing."
    >
      <DocsSection>
        <DocsCard title="Font Family">
          <div className="ds-type-specimen" style={{ fontFamily: family }}>
            <div className="ds-type-big">가나다라 ABCDgh 0123</div>
            <div className="ds-type-name">{family}</div>
          </div>
        </DocsCard>

        <DocsCard title="Font Weight">
          <table className="ds-type-table">
            <tbody>
              {weights.map((w) => (
                <tr key={w.path}>
                  <td className="ds-type-key">{w.name}</td>
                  <td className="ds-type-val">{val(w)}</td>
                  <td
                    className="ds-type-preview"
                    style={{
                      fontFamily: family,
                      fontWeight: w.name === 'bold' ? 700 : w.name === 'medium' ? 500 : 400,
                    }}
                  >
                    다람쥐 헌 쳇바퀴에 타고파 Sphinx 1234
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DocsCard>

        <DocsCard title="Letter Spacing">
          <table className="ds-type-table">
            <tbody>
              <tr>
                <td className="ds-type-key">{spacing?.name ?? 'spacing'}</td>
                <td className="ds-type-val">{spacing ? `${val(spacing)}px` : '—'}</td>
                <td
                  className="ds-type-preview"
                  style={{
                    fontFamily: family,
                    letterSpacing: spacing ? `${spacing.resolved.value}px` : undefined,
                  }}
                >
                  WEHAGO 2.0 Design System
                </td>
              </tr>
            </tbody>
          </table>
        </DocsCard>
      </DocsSection>
    </DocsPage>
  )
}

import { useMemo, useRef, useState } from 'react'
import { DocsPage } from '../docs'
import { icons, searchIcons, type IconEntry, type IconGroup } from '../icons'

const GROUP_ORDER: IconGroup[] = [
  'Communication', 'Productivity', 'Finance', 'File', 'Action', 'Navigation', 'User', 'Service', 'Status',
]

function groupIcons(list: IconEntry[]): { group: IconGroup; items: IconEntry[] }[] {
  const map = new Map<IconGroup, IconEntry[]>()
  for (const ic of list) {
    if (!map.has(ic.group)) map.set(ic.group, [])
    map.get(ic.group)!.push(ic)
  }
  return GROUP_ORDER.filter((g) => map.has(g)).map((g) => ({ group: g, items: map.get(g)! }))
}

// 아이콘 컴포넌트를 SVG 문자열로 직렬화 (다운로드/복사용)
function svgString(wrapper: HTMLElement | null): string | null {
  const svg = wrapper?.querySelector('svg')
  if (!svg) return null
  const clone = svg.cloneNode(true) as SVGSVGElement
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  clone.setAttribute('width', '24')
  clone.setAttribute('height', '24')
  return new XMLSerializer().serializeToString(clone)
}

function DetailPanel({ icon }: { icon: IconEntry }) {
  const previewRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState<'code' | 'svg' | null>(null)
  const Comp = icon.Component

  const code = `import { ${icon.id} } from './icons'\n\n<${icon.id} width={24} height={24} />`

  const flash = (k: 'code' | 'svg') => {
    setCopied(k)
    setTimeout(() => setCopied(null), 1400)
  }
  const copyCode = () => navigator.clipboard?.writeText(code).then(() => flash('code'))
  const copySvg = () => {
    const s = svgString(previewRef.current)
    if (s) navigator.clipboard?.writeText(s).then(() => flash('svg'))
  }
  const downloadSvg = () => {
    const s = svgString(previewRef.current)
    if (!s) return
    const blob = new Blob([s], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${icon.id}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  const btn: React.CSSProperties = {
    flex: 1, height: 36, borderRadius: 9, border: '1px solid #e0e0e0', background: '#fff',
    fontSize: 13, fontWeight: 500, color: '#1d1d1f', cursor: 'pointer', letterSpacing: '-0.3px',
  }

  return (
    <div
      className="lg:sticky"
      style={{ top: 88, border: '1px solid #e6e7ea', borderRadius: 16, background: '#fff', overflow: 'hidden' }}
    >
      <div ref={previewRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 168, background: '#f5f6f8', color: '#1d1d1f' }}>
        <Comp width={56} height={56} />
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ fontSize: 17, fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.3px' }}>{icon.label}</div>
        <div style={{ fontSize: 13, color: '#8e8e93', marginTop: 2, fontFamily: 'ui-monospace, monospace' }}>{icon.id}</div>
        <div style={{ display: 'inline-block', marginTop: 8, fontSize: 11, fontWeight: 600, color: '#6e6e73', background: '#f0f1f3', borderRadius: 6, padding: '3px 8px', letterSpacing: '0.02em' }}>{icon.group}</div>

        <pre style={{ margin: '16px 0 0', background: '#222222', color: '#e6e6e6', borderRadius: 10, padding: '13px 14px', fontSize: 12.5, lineHeight: 1.6, overflowX: 'auto', fontFamily: 'ui-monospace, monospace' }}>{code}</pre>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button type="button" onClick={copyCode} style={btn}>{copied === 'code' ? '복사됨 ✓' : '코드 복사'}</button>
          <button type="button" onClick={copySvg} style={btn}>{copied === 'svg' ? '복사됨 ✓' : 'SVG 복사'}</button>
        </div>
        <button
          type="button"
          onClick={downloadSvg}
          style={{ width: '100%', height: 38, marginTop: 8, borderRadius: 9, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', letterSpacing: '-0.3px' }}
        >
          SVG 다운로드
        </button>
      </div>
    </div>
  )
}

export default function IconographyPage() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string>(icons[0]?.id ?? '')

  const filtered = useMemo(() => searchIcons(query), [query])
  const groups = useMemo(() => groupIcons(filtered), [filtered])
  const selected = icons.find((i) => i.id === selectedId) ?? icons[0]

  return (
    <DocsPage
      eyebrow="Foundation"
      title="Iconography"
      description={`WEHAGO 2.0의 아이콘 세트 ${icons.length}종입니다. 아이콘을 클릭하면 코드와 SVG를 확인·다운로드할 수 있습니다.`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
        {/* 좌: 검색 + 그리드 */}
        <div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="아이콘 검색 (이름·태그, 한글 가능)"
            aria-label="아이콘 검색"
            style={{ width: '100%', boxSizing: 'border-box', height: 40, padding: '0 14px', fontSize: 14, border: '1px solid #e0e0e0', borderRadius: 10, outline: 'none', background: '#f7f7f7', color: '#1d1d1f', marginBottom: 24 }}
          />

          {groups.length === 0 ? (
            <p style={{ fontSize: 14, color: '#8e8e93' }}>검색 결과가 없습니다.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {groups.map(({ group, items }) => (
                <section key={group}>
                  <h2 style={{ fontSize: 15, fontWeight: 600, color: '#6e6e73', letterSpacing: '-0.2px', margin: '0 0 12px' }}>
                    {group}
                    <span style={{ fontWeight: 400, color: '#b0b0b5', marginLeft: 6 }}>{items.length}</span>
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(92px, 1fr))', gap: 10 }}>
                    {items.map((ic) => {
                      const Comp = ic.Component
                      const on = ic.id === selectedId
                      return (
                        <button
                          key={ic.id}
                          onClick={() => setSelectedId(ic.id)}
                          title={ic.label}
                          style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                            padding: '16px 8px 10px', borderRadius: 12, cursor: 'pointer',
                            border: `1px solid ${on ? '#0066cc' : '#ececee'}`,
                            background: on ? 'rgba(0,102,204,0.06)' : '#fff',
                            color: '#1d1d1f', transition: 'border-color .12s, background .12s',
                          }}
                        >
                          <Comp width={26} height={26} />
                          <span style={{ fontSize: 11, color: '#6e6e73', letterSpacing: '-0.2px', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ic.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>

        {/* 우: 상세 패널 */}
        {selected && <DetailPanel key={selected.id} icon={selected} />}
      </div>
    </DocsPage>
  )
}

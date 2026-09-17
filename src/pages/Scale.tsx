import { getFlat, primitiveSet, semanticSet, type TokenEntry } from '../tokens'
import { DocsCard, DocsPage, DocsSection } from '../docs'
import tokens from '../../token.json'
import './Scale.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PRIM = (tokens as any)['primitive/Value']

const BOX = 56 // radius/padding 데모 박스 크기

function px(entry: TokenEntry): number | null {
  const v = entry.resolved.value
  if (typeof v === 'number') return v
  // 새 토큰은 number 원시값을 "4px" 같은 dimension 문자열로 관리 → 숫자 추출
  if (typeof v === 'string') {
    const n = parseFloat(v)
    return Number.isNaN(n) ? null : n
  }
  return null
}

// Figma 'Scale_2.0'(node 12726:23725) 라벨 형식: radius/xxsmall(4px)
function label(prefix: string, entry: TokenEntry): string {
  return `${prefix}/${entry.name}(${px(entry)}px)`
}

// Radius (Figma Radius.svg): box #f7f8fa+#989898, 우하단 원 중심 (60-r,60-r)·반지름 r, #719bfc@40%+#447cfc
function RadiusItem({ entry }: { entry: TokenEntry }) {
  const r = px(entry) ?? 0
  const rr = Math.min(r, 30) // max(1000) → 꽉 찬 원
  return (
    <div className="ds-scale-item">
      <div className="ds-scale-shape">
        <svg width={BOX} height={BOX} viewBox="0 0 60 60" fill="none">
          <rect x="0.5" y="0.5" width="59" height="59" rx={rr} fill="#F7F8FA" stroke="#989898" />
          <circle cx={60 - rr} cy={60 - rr} r={rr} fill="#719BFC" fillOpacity="0.4" stroke="#447CFC" strokeWidth="0.5" />
        </svg>
      </div>
      <span className="ds-scale-label">{label('radius', entry)}</span>
    </div>
  )
}

// Gap: 회색 트랙 가운데 gap 너비만큼 파란 블록.
function GapItem({ entry }: { entry: TokenEntry }) {
  const g = px(entry) ?? 0
  return (
    <div className="ds-scale-item">
      <div className="ds-scale-shape">
        <div className="ds-gap-track">
          <span className="ds-gap-bar" />
          <span className="ds-gap-fill" style={{ width: g }} />
          <span className="ds-gap-bar" />
        </div>
      </div>
      <span className="ds-scale-label">{label('gap', entry)}</span>
    </div>
  )
}

// Padding (Figma Padding.svg): box #f7f8fa+#989898, padding은 안쪽 #719bfc@40% stroke(두께=padding값)
function PaddingItem({ entry }: { entry: TokenEntry }) {
  const p = px(entry) ?? 0
  const pp = Math.min(p, 30)
  return (
    <div className="ds-scale-item">
      <div className="ds-scale-shape">
        <svg width={BOX} height={BOX} viewBox="0 0 60 60" fill="none">
          <rect x="0.5" y="0.5" width="59" height="59" rx="4" fill="#F7F8FA" stroke="#989898" />
          <rect x={pp / 2} y={pp / 2} width={60 - pp} height={60 - pp} fill="none" stroke="#719BFC" strokeOpacity="0.4" strokeWidth={pp} />
        </svg>
      </div>
      <span className="ds-scale-label">{label('padding', entry)}</span>
    </div>
  )
}

// Size: 전체 너비 가로 바(높이 = size), 라벨은 오른쪽. 세로로 스택.
function SizeRow({ entry }: { entry: TokenEntry }) {
  const s = px(entry) ?? 0
  return (
    <div className="ds-size-row">
      <div className="ds-size-bar" style={{ height: s }} />
      <span className="ds-size-rowlabel">{label('size', entry)}</span>
    </div>
  )
}

// shadow-level1/2/3 primitive 토큰에서 직접 CSS box-shadow 생성
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function shadowCss(v: any): string {
  return `${v.x}px ${v.y}px ${v.blur}px ${v.spread}px ${v.color}`
}
const SHADOWS = ['shadow-level1', 'shadow-level2', 'shadow-level3']
  .filter((k) => PRIM?.[k]?.$value)
  .map((k, i) => ({ name: `shadow-level ${i + 1}`, css: shadowCss(PRIM[k].$value) }))

export default function ScalePage() {
  const number = getFlat(primitiveSet, 'number')
  const radius = getFlat(semanticSet, 'radius')
  // Figma Scale_2.0은 gap·padding을 1~8까지 문서화 (token.json엔 그 이상도 존재).
  const gap = getFlat(semanticSet, 'gap').slice(0, 8)
  const padding = getFlat(semanticSet, 'padding').slice(0, 8)
  const size = getFlat(semanticSet, 'size')

  return (
    <DocsPage
      eyebrow="Foundation"
      title="Scale"
      description="number · radius · gap · padding · size · shadow의 기준 스케일입니다. 일관된 리듬을 위해 정해진 단계 값만 사용하세요."
    >
      <DocsSection>
        <DocsCard largeTitle title="Number" description="모든 간격·크기의 기준이 되는 primitive 스케일입니다. gap·padding·size·radius가 이 값을 참조합니다.">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {number.map((e) => (
              <div
                key={e.path}
                style={{ minWidth: 62, border: '1px solid #ececee', borderRadius: 10, padding: '10px 12px', background: '#fbfbfc', textAlign: 'center' }}
              >
                <div style={{ fontSize: 16, fontWeight: 600, color: '#1d1d1f', fontVariantNumeric: 'tabular-nums' }}>{px(e)}px</div>
                <div style={{ fontSize: 11, color: '#8e8e93', marginTop: 2 }}>number/{e.name}</div>
              </div>
            ))}
          </div>
        </DocsCard>

        <DocsCard largeTitle title="Radius" description="모서리 곡률. 우하단 원의 반지름이 곡률과 같습니다.">
          <div className="ds-scale-grid">
            {radius.map((e) => (
              <RadiusItem key={e.path} entry={e} />
            ))}
          </div>
        </DocsCard>

        <DocsCard largeTitle title="Gap" description="요소 사이 간격.">
          <div className="ds-scale-grid">
            {gap.map((e) => (
              <GapItem key={e.path} entry={e} />
            ))}
          </div>
        </DocsCard>

        <DocsCard largeTitle title="Padding" description="내부 여백. 파란 영역이 여백, 흰 사각형이 콘텐츠입니다.">
          <div className="ds-scale-grid">
            {padding.map((e) => (
              <PaddingItem key={e.path} entry={e} />
            ))}
          </div>
        </DocsCard>

        <DocsCard largeTitle title="Size" description="컴포넌트 높이/너비.">
          <div className="ds-size-list">
            {size.map((e) => (
              <SizeRow key={e.path} entry={e} />
            ))}
          </div>
        </DocsCard>

        <DocsCard largeTitle title="Shadow" description="그림자 레벨. token.json의 shadow-level 토큰 값을 그대로 반영합니다.">
          <div className="ds-shadow-grid">
            {SHADOWS.map((s) => (
              <div key={s.name} className="ds-shadow-item">
                <span className="ds-shadow-label">{s.name}</span>
                <div className="ds-shadow-box" style={{ boxShadow: s.css }} />
              </div>
            ))}
          </div>
        </DocsCard>
      </DocsSection>
    </DocsPage>
  )
}

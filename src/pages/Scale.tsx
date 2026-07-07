import { getFlat, semanticSet, type TokenEntry } from '../tokens'
import { DocsCard, DocsPage, DocsSection } from '../docs'
import './Scale.css'

const BOX = 56 // radius/padding 데모 박스 크기

function px(entry: TokenEntry): number | null {
  const v = entry.resolved.value
  return typeof v === 'number' ? v : null
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

// Figma는 shadow-level 1·2·3만 정의(실제 blur/offset 값은 Figma effect로 관리, 토큰 미포함).
const SHADOWS = [
  // Figma 정확값 (X Y Blur Spread #000 10%)
  { name: 'shadow-level 1', css: '0 2px 4px 0 rgba(0,0,0,0.1)' },   // X0 Y2 Blur4
  { name: 'shadow-level 2', css: '0 4px 12px 0 rgba(0,0,0,0.1)' },  // X0 Y4 Blur12
  { name: 'shadow-level 3', css: '4px 8px 20px 0 rgba(0,0,0,0.1)' },// X4 Y8 Blur20
]

export default function ScalePage() {
  const radius = getFlat(semanticSet, 'radius')
  // Figma Scale_2.0은 gap·padding을 1~8까지 문서화 (token.json엔 그 이상도 존재).
  const gap = getFlat(semanticSet, 'gap').slice(0, 8)
  const padding = getFlat(semanticSet, 'padding').slice(0, 8)
  const size = getFlat(semanticSet, 'size')

  return (
    <DocsPage
      eyebrow="Foundation"
      title="Scale"
      description="radius · gap · padding · size · shadow 스케일입니다. token.json의 {number.*} 참조를 px로 해석합니다."
    >
      <DocsSection>
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

        <DocsCard largeTitle title="Shadow" description="그림자 레벨. 실제 blur/offset 값은 Figma effect로 관리됩니다.">
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

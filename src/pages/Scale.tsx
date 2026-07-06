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

// Radius: 흰 박스(모서리=radius) + 우하단 파란 원(지름=2*radius). max는 원이 박스를 꽉 채움.
function RadiusItem({ entry }: { entry: TokenEntry }) {
  const r = px(entry) ?? 0
  const boxR = Math.min(r, BOX / 2)
  const circle = Math.min(r * 2, BOX)
  return (
    <div className="ds-scale-item">
      <div className="ds-scale-shape">
        <div className="ds-radius-box" style={{ borderRadius: boxR }}>
          <div className="ds-radius-corner" style={{ width: circle, height: circle }} />
        </div>
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

// Padding: 파란 사각형 + 안쪽 흰 사각형(흰 사각형 = 콘텐츠, 파란 여백 = padding).
function PaddingItem({ entry }: { entry: TokenEntry }) {
  const p = px(entry) ?? 0
  const inner = Math.max(4, BOX - p * 2)
  return (
    <div className="ds-scale-item">
      <div className="ds-scale-shape">
        <div className="ds-pad-box">
          <div className="ds-pad-inner" style={{ width: inner, height: inner }} />
        </div>
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
  { name: 'shadow-level 1', css: '0 1px 4px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.08)' },
  { name: 'shadow-level 2', css: '0 4px 14px rgba(0,0,0,0.14), 0 2px 4px rgba(0,0,0,0.08)' },
  { name: 'shadow-level 3', css: '0 12px 32px rgba(0,0,0,0.20), 0 4px 8px rgba(0,0,0,0.10)' },
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
        <DocsCard title="Radius" description="모서리 곡률. 우하단 원의 반지름이 곡률과 같습니다.">
          <div className="ds-scale-grid">
            {radius.map((e) => (
              <RadiusItem key={e.path} entry={e} />
            ))}
          </div>
        </DocsCard>

        <DocsCard title="Gap" description="요소 사이 간격.">
          <div className="ds-scale-grid">
            {gap.map((e) => (
              <GapItem key={e.path} entry={e} />
            ))}
          </div>
        </DocsCard>

        <DocsCard title="Padding" description="내부 여백. 파란 영역이 여백, 흰 사각형이 콘텐츠입니다.">
          <div className="ds-scale-grid">
            {padding.map((e) => (
              <PaddingItem key={e.path} entry={e} />
            ))}
          </div>
        </DocsCard>

        <DocsCard title="Size" description="컴포넌트 높이/너비.">
          <div className="ds-size-list">
            {size.map((e) => (
              <SizeRow key={e.path} entry={e} />
            ))}
          </div>
        </DocsCard>

        <DocsCard title="Shadow" description="그림자 레벨. 실제 blur/offset 값은 Figma effect로 관리됩니다.">
          <div className="ds-shadow-grid">
            {SHADOWS.map((s) => (
              <div key={s.name} className="ds-scale-item">
                <div className="ds-shadow-demo">
                  <div className="ds-shadow-box" style={{ boxShadow: s.css }} />
                </div>
                <span className="ds-scale-label">{s.name}</span>
              </div>
            ))}
          </div>
        </DocsCard>
      </DocsSection>
    </DocsPage>
  )
}

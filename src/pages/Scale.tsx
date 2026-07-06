import { getFlat, semanticSet, type TokenEntry } from '../tokens'
import { DocsCard, DocsPage, DocsSection } from '../docs'
import './Scale.css'

function px(entry: TokenEntry): number | null {
  const v = entry.resolved.value
  return typeof v === 'number' ? v : null
}

// Figma 'Scale_2.0'(node 12726:23725) 라벨 형식: radius/xxsmall(4px)
function label(prefix: string, entry: TokenEntry): string {
  return `${prefix}/${entry.name}(${px(entry)}px)`
}

function RadiusRow({ entry }: { entry: TokenEntry }) {
  const size = px(entry) ?? 0
  return (
    <div className="ds-scale-item">
      <div className="ds-scale-demo">
        <div className="ds-radius-box" style={{ borderRadius: Math.min(size, 40) }} />
      </div>
      <span className="ds-scale-label">{label('radius', entry)}</span>
    </div>
  )
}

function BarRow({ entry, axis, prefix }: { entry: TokenEntry; axis: 'w' | 'h'; prefix: string }) {
  const size = px(entry) ?? 0
  const style = axis === 'w' ? { width: size } : { height: size }
  return (
    <div className="ds-scale-item">
      <div className="ds-scale-demo">
        <div className="ds-scale-bar" style={style} />
      </div>
      <span className="ds-scale-label">{label(prefix, entry)}</span>
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
      <span className="ds-scale-label">{label('padding', entry)}</span>
    </div>
  )
}

// Figma는 shadow-level 1·2·3만 정의(실제 blur/offset 값은 Figma effect로 관리, 토큰 미포함).
const SHADOWS = [
  { name: 'shadow-level 1', css: '0 1px 3px rgba(0,0,0,0.10)' },
  { name: 'shadow-level 2', css: '0 4px 12px rgba(0,0,0,0.12)' },
  { name: 'shadow-level 3', css: '0 8px 24px rgba(0,0,0,0.16)' },
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
              <BarRow key={e.path} entry={e} axis="w" prefix="gap" />
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
              <BarRow key={e.path} entry={e} axis="h" prefix="size" />
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

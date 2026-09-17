import tokens from '../../token.json'
import { DocsCard, DocsPage, DocsSection } from '../docs'
import './Typography.css'

// token.json(primitive/Value)에서 타입 스케일을 직접 읽어 반영한다.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const P = (tokens as any)['primitive/Value']

const NOTO = "'Noto Sans KR', 'Noto Sans CJK KR', sans-serif"
const SAMPLE = '비즈니스 플랫폼 AaBbCc 9,0124,000 @#!?'

// fontSize.N → px
const FS: Record<string, number> = {}
for (const k of Object.keys(P.fontSize ?? {})) FS[k] = P.fontSize[k].$value

type Scale = { name: string; size: number; core?: boolean }

// 합성 타이포 토큰(Heading/Body)의 fontSize 참조를 실제 px로 해석
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function readScale(group: Record<string, any>, prefix: string, coreName?: string): Scale[] {
  return Object.keys(group).map((name) => {
    const ref: string = group[name]?.Regular?.$value?.fontSize ?? ''
    const m = ref.match(/\{fontSize\.(\w+)\}/)
    const size = m ? FS[m[1]] : 0
    return { name: `${prefix}/${name}`, size, core: name === coreName }
  })
}

const HEADING = readScale(P.Heading ?? {}, 'Heading')
const BODY = readScale(P.Body ?? {}, 'Body', 'Body3') // Body3(14px) = 기본 본문

// Weight: typo.font-weight (400px/500px/700px) → 숫자
const WEIGHTS = [
  { label: 'Regular', value: parseInt(P.typo?.['font-weight']?.regular?.$value ?? '400', 10) },
  { label: 'Medium', value: parseInt(P.typo?.['font-weight']?.medium?.$value ?? '500', 10) },
  { label: 'Bold', value: parseInt(P.typo?.['font-weight']?.bold?.$value ?? '700', 10) },
]

// 공통 속성 (단일/균일 값)
const PROPS = [
  { label: 'Line-height', value: String(P.lineHeights?.['0']?.$value ?? '150%') },
  { label: 'Letter-spacing', value: `${P.letterSpacing?.['0']?.$value ?? -0.5}px` },
  { label: 'Paragraph-spacing', value: `${P.paragraphSpacing?.['0']?.$value ?? 0}px` },
]

function ScaleRow({ item }: { item: Scale }) {
  return (
    <div className="ds-type-row">
      <div
        className="ds-type-row__sample"
        style={{ fontFamily: NOTO, fontSize: item.size, fontWeight: 500, letterSpacing: '-0.5px', lineHeight: 1.5 }}
      >
        {SAMPLE}
      </div>
      <div className="ds-type-row__meta">
        <span className="ds-type-row__name">
          {item.name}
          {item.core && <em className="ds-type-row__badge">Core size</em>}
        </span>
        <span className="ds-type-row__spec">{item.size}px · Regular / Medium / Bold</span>
      </div>
    </div>
  )
}

export default function TypographyPage() {
  return (
    <DocsPage
      eyebrow="Foundation"
      title="Typography"
      description="국문·영문·숫자 모두 Noto Sans CJK KR을 기본 글꼴로 사용합니다. 기본 줄간격은 150%, 자간은 -0.5px입니다."
    >
      <DocsSection title="Typeface">
        <DocsCard title="Noto Sans CJK KR" description="국문·영문·숫자 공통 기본 글꼴입니다.">
          <div className="ds-type-figure">
            <div className="ds-type-figure__box">
              <div className="ds-type-specimen" style={{ fontFamily: NOTO }}>가나다 AaBbCc 123 @#!?*</div>
              <div className="ds-type-lh">
                <span className="ds-type-lh__line" />
                <span className="ds-type-lh__label">Line-height : 150%</span>
              </div>
              <div className="ds-type-ls">
                <span className="ds-type-ls__line" />
                <span className="ds-type-ls__label">Letter-spacing : 0.5px</span>
              </div>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Heading">
        <DocsCard>
          <div className="ds-type-scale">
            {HEADING.map((h) => (
              <ScaleRow key={h.name} item={h} />
            ))}
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Body">
        <DocsCard>
          <div className="ds-type-scale">
            {BODY.map((b) => (
              <ScaleRow key={b.name} item={b} />
            ))}
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Weight">
        <DocsCard description="Noto Sans CJK KR은 Regular·Medium·Bold 3단계 굵기를 사용합니다.">
          <div className="ds-type-scale">
            {WEIGHTS.map((w) => (
              <div key={w.label} className="ds-type-row">
                <div
                  className="ds-type-row__sample"
                  style={{ fontFamily: NOTO, fontSize: 20, fontWeight: w.value, letterSpacing: '-0.5px', lineHeight: 1.5 }}
                >
                  {SAMPLE}
                </div>
                <div className="ds-type-row__meta">
                  <span className="ds-type-row__name">{w.label}</span>
                  <span className="ds-type-row__spec">{w.value}</span>
                </div>
              </div>
            ))}
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Properties">
        <DocsCard description="모든 텍스트 스타일에 공통 적용되는 값입니다.">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {PROPS.map((p) => (
              <div
                key={p.label}
                style={{ flex: '1 1 180px', border: '1px solid #ececee', borderRadius: 12, padding: '14px 16px', background: '#fbfbfc' }}
              >
                <div style={{ fontSize: 12, color: '#8e8e93', letterSpacing: '-0.2px' }}>{p.label}</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: '#1d1d1f', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{p.value}</div>
              </div>
            ))}
          </div>
        </DocsCard>
      </DocsSection>
    </DocsPage>
  )
}

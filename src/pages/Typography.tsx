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
    </DocsPage>
  )
}

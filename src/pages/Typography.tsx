import { getGroups, primitiveSet, type TokenEntry } from '../tokens'
import { DocsCard, DocsPage, DocsSection } from '../docs'
import './Typography.css'

// Figma 'Typography_2.0' (node 12726:23597)에서 확인한 실제 스펙.
const NOTO = "'Noto Sans KR', 'Noto Sans CJK KR', sans-serif"
const SAMPLE = '비즈니스 플랫폼 AaBbCc 9,0124,000 @#!?'

type Scale = { name: string; size: number; usage: string; core?: boolean }

const HEADING: Scale[] = [
  { name: 'Heading/Heading1', size: 20, usage: '페이지 단위 타이틀 쓰임새로 사용 권장' },
  { name: 'Heading/Heading2', size: 18, usage: '페이지 단위 타이틀 쓰임새로 사용 권장' },
]

const BODY: Scale[] = [
  { name: 'Body/Body1', size: 16, usage: '주요 본문 쓰임새로 사용 권장' },
  { name: 'Body/Body2', size: 15, usage: '주요 본문 쓰임새로 사용 권장' },
  { name: 'Body/Body3', size: 14, usage: '주요 본문 쓰임새로 사용 권장', core: true },
  { name: 'Body/Body4', size: 13, usage: '주요 본문 쓰임새로 사용 권장' },
  { name: 'Body/Body5', size: 12, usage: '본문 보조 쓰임새로 사용 권장' },
  { name: 'Body/Body6', size: 11, usage: '본문 보조·하위 위계 텍스트 쓰임새로 사용 권장' },
  { name: 'Body/Body7', size: 10, usage: '본문 보조·하위 위계 텍스트 쓰임새로 사용 권장' },
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
        <span className="ds-type-row__spec">
          {item.size}px · Regular / Medium / Bold
        </span>
        <span className="ds-type-row__usage">{item.usage}</span>
      </div>
    </div>
  )
}

export default function TypographyPage() {
  const groups = getGroups(primitiveSet, 'typo')
  const weights = groups.find((g) => g.name === 'font-weight')?.entries ?? []

  const weightRows: { label: string; css: number; token?: TokenEntry }[] = [
    { label: 'Regular', css: 400, token: weights.find((w) => w.name === 'regular') },
    { label: 'Medium', css: 500, token: weights.find((w) => w.name === 'medium') },
    { label: 'Bold', css: 700, token: weights.find((w) => w.name === 'bold') },
  ]

  return (
    <DocsPage
      eyebrow="Foundation"
      title="Typography"
      description="기본 글꼴로 국문·영문·숫자 모두 Noto Sans CJK KR 폰트를 사용합니다. Line-height 150%, Letter-spacing -0.5px."
    >
      <DocsSection title="Typeface">
        <DocsCard title="Noto Sans CJK KR" description="국문·영문·숫자 공통 기본 글꼴입니다.">
          <div className="ds-type-specimen" style={{ fontFamily: NOTO }}>
            <div className="ds-type-big">가나다 AaBbCc 123 @#!?*</div>
            <div className="ds-type-name">Noto Sans CJK KR · Line-height 150% · Letter-spacing -0.5px</div>
          </div>
        </DocsCard>

        <DocsCard title="Weight" description="Regular · Medium · Bold 세 가지 굵기를 사용합니다.">
          <div className="ds-type-weights">
            {weightRows.map((w) => (
              <div key={w.label} className="ds-type-weight">
                <span className="ds-type-weight__big" style={{ fontFamily: NOTO, fontWeight: w.css }}>
                  가나다 AaBbCc 123
                </span>
                <span className="ds-type-weight__label">
                  {w.label} · {w.css}
                  {w.token ? ` · {${w.token.name}}` : ''}
                </span>
              </div>
            ))}
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

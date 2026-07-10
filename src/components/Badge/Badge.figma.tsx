import figma from '@figma/code-connect'
import Badge from './Badge'

// Figma: Display / Badge/State (COMPONENT_SET) — Type=Default·Info·Positive·Negative
// node-id는 실제 파일 기준. 필요 시 Figma에서 컴포넌트 우클릭 > Copy link 로 갱신.
figma.connect(
  Badge,
  'https://www.figma.com/design/k8USRkR1jv3eeOwcggvhED/Display?node-id=1-918',
  {
    props: {
      type: figma.enum('Type', {
        Default: 'default',
        Info: 'info',
        Positive: 'positive',
        Negative: 'negative',
      }),
    },
    example: ({ type }) => <Badge type={type}>badge</Badge>,
  },
)

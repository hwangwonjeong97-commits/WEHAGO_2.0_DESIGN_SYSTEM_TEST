import figma from '@figma/code-connect'
import Badge from './Badge'

// Figma: Display / Badge/State (COMPONENT_SET) — Type=Default·Info·Positive·Negative
// node-id는 실제 파일 기준. 필요 시 Figma에서 컴포넌트 우클릭 > Copy link 로 갱신.
figma.connect(
  Badge,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=12306-15859',
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

// Badge/Role (권한) — Type=Master·Member·Guest
figma.connect(
  Badge,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=11692-10422',
  {
    props: {
      type: figma.enum('Type', {
        Master: 'master',
        Member: 'member',
        Guest: 'guest',
      }),
    },
    example: ({ type }) => <Badge variant="role" type={type} />,
  },
)

// Badge/Noti (알림) — Type=Default(카운트)·Dot
figma.connect(
  Badge,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=11651-10073',
  {
    props: {
      dot: figma.enum('Type', {
        Default: false,
        Dot: true,
      }),
    },
    example: ({ dot }) => <Badge variant="noti" dot={dot} count={100} max={99} />,
  },
)

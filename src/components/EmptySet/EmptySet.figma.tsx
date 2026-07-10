import figma from '@figma/code-connect'
import EmptySet from './EmptySet'

// Figma: Component / Display / EmptySet — Size=Medium·Small·XSmall
figma.connect(
  EmptySet,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=12175-6749',
  {
    props: {
      size: figma.enum('Size', {
        Medium: 'md',
        Small: 'sm',
        XSmall: 'xs',
      }),
    },
    example: ({ size }) => <EmptySet size={size} description="데이터가 없습니다." />,
  },
)

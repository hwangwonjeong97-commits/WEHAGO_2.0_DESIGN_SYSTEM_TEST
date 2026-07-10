import figma from '@figma/code-connect'
import SNB from './SNB'

// Figma: Component / Navi / SNB — Type=Default·2Depth
figma.connect(
  SNB,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=12378-25344',
  {
    props: {
      variant: figma.enum('Type', { Default: 'default', '2Depth': '2depth' }),
    },
    example: ({ variant }) => <SNB variant={variant} />,
  },
)

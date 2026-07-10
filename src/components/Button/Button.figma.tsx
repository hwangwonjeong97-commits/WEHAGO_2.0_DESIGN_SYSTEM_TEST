import figma from '@figma/code-connect'
import { Button, TextButton, GhostButton } from './Button'

// Figma: WEHAGO Web 2.0_DSG / --Base / Button (COMPONENT_SET)
// Type=Primary·Secondary·Tertiary, Size=Large·Medium·Small·XSmall
figma.connect(
  Button,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=6767-18526',
  {
    props: {
      variant: figma.enum('Type', {
        Primary: 'primary',
        Secondary: 'secondary',
        Tertiary: 'tertiary',
      }),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
        XSmall: 'xs',
      }),
    },
    example: ({ variant, size }) => (
      <Button variant={variant} size={size}>Button</Button>
    ),
  },
)

// TextButton — Label + State
figma.connect(
  TextButton,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=12116-6680',
  {
    example: () => <TextButton>자세히보기</TextButton>,
  },
)

// GhostButton
figma.connect(
  GhostButton,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=11916-12809',
  {
    example: () => <GhostButton>Button</GhostButton>,
  },
)

import figma from '@figma/code-connect'
import Tag from './Tag'

// Figma: Display / Tag (COMPONENT_SET) — Size=Medium·Small, State=Default·Hovered
figma.connect(
  Tag,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=12284-10601',
  {
    props: {
      size: figma.enum('Size', {
        Medium: 'md',
        Small: 'sm',
      }),
    },
    example: ({ size }) => <Tag size={size}>#태그</Tag>,
  },
)

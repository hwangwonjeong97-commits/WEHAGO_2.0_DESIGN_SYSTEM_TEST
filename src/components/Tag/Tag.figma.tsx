import figma from '@figma/code-connect'
import Tag from './Tag'

// Figma: Display / Tag (COMPONENT_SET) — Size=Medium·Small, State=Default·Hovered
figma.connect(
  Tag,
  'https://www.figma.com/design/k8USRkR1jv3eeOwcggvhED/Display?node-id=1-782',
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

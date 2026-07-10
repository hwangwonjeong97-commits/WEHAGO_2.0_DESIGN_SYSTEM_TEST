import figma from '@figma/code-connect'
import Avatar from './Avatar'

// Figma: Display / Avatar/Default (COMPONENT_SET) — Size=XSmall·Small·Medium·Large·XLarge
figma.connect(
  Avatar,
  'https://www.figma.com/design/k8USRkR1jv3eeOwcggvhED/Display?node-id=1-1059',
  {
    props: {
      size: figma.enum('Size', {
        XSmall: 'xsmall',
        Small: 'small',
        Medium: 'medium',
        Large: 'large',
        XLarge: 'xlarge',
      }),
    },
    example: ({ size }) => <Avatar size={size} src="/Profile-image.png" name="김더존" />,
  },
)

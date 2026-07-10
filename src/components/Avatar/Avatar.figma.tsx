import figma from '@figma/code-connect'
import Avatar, { AvatarGroup } from './Avatar'

// Figma: Display / Avatar/Default (COMPONENT_SET) — Size=XSmall·Small·Medium·Large·XLarge
figma.connect(
  Avatar,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=11530-8479',
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

// Avatar/MultiGroup — Type=Multi·Group, Size=Small·Medium·Large
figma.connect(
  AvatarGroup,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=11557-9446',
  {
    props: {
      type: figma.enum('Type', { Multi: 'multi', Group: 'group' }),
      size: figma.enum('Size', { Small: 'small', Medium: 'medium', Large: 'large' }),
    },
    example: ({ type, size }) => (
      <AvatarGroup
        type={type}
        size={size}
        max={4}
        avatars={[{ name: '김' }, { name: '이' }, { name: '박' }, { name: '최' }, { name: '정' }]}
      />
    ),
  },
)

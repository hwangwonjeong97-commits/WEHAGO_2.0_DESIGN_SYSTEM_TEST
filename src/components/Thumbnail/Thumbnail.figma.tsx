import figma from '@figma/code-connect'
import FileThumbnail from './Thumbnail'

// Figma: Display / FileThumbnail (COMPONENT_SET) — State=Default·Hovered·Selected, Preview=Thumbnail·File·Warning
figma.connect(
  FileThumbnail,
  'https://www.figma.com/design/k8USRkR1jv3eeOwcggvhED/Display?node-id=1-811',
  {
    props: {
      state: figma.enum('State', {
        Default: 'default',
        Hovered: 'hovered',
        Selected: 'selected',
      }),
    },
    example: ({ state }) => (
      <FileThumbnail state={state} filename="파일명" extension=".pdf" author="김더존" fileSize="16MB" selectable />
    ),
  },
)

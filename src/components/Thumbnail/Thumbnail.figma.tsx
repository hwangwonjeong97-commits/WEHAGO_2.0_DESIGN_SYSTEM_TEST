import figma from '@figma/code-connect'
import FileThumbnail from './Thumbnail'

// Figma: Display / FileThumbnail (COMPONENT_SET) — State=Default·Hovered·Selected, Preview=Thumbnail·File·Warning
figma.connect(
  FileThumbnail,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=11410-8265',
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

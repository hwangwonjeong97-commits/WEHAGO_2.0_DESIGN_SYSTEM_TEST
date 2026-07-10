import figma from '@figma/code-connect'
import Tooltip from './Tooltip'

// Figma: Display / Tooltip (COMPONENT_SET) — Arrow=Top·Bottom
figma.connect(
  Tooltip,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=11803-10453',
  {
    props: {
      placement: figma.enum('Arrow', {
        Top: 'top',
        Bottom: 'bottom',
      }),
    },
    example: ({ placement }) => (
      <Tooltip placement={placement} content="아이콘 버튼에 제공되는 툴팁">
        <button type="button">i</button>
      </Tooltip>
    ),
  },
)

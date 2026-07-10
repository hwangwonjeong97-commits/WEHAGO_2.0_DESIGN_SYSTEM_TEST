import figma from '@figma/code-connect'
import { Checkbox, Radio, Toggle } from './SelectControl'

// Checkbox (COMPONENT_SET) — Select=On·Off·Indeterminate
figma.connect(
  Checkbox,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=6702-19756',
  {
    props: {
      checked: figma.enum('Select', { On: true, Off: false, Indeterminate: false }),
      indeterminate: figma.enum('Select', { On: false, Off: false, Indeterminate: true }),
    },
    example: ({ checked, indeterminate }) => (
      <Checkbox checked={checked} indeterminate={indeterminate} />
    ),
  },
)

// Radio (COMPONENT_SET) — Select=On·Off
figma.connect(
  Radio,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=6702-19801',
  {
    props: {
      checked: figma.enum('Select', { On: true, Off: false }),
    },
    example: ({ checked }) => <Radio checked={checked} />,
  },
)

// ToggleSwitch (COMPONENT_SET) — Select=On·Off, Size=Medium·Small
figma.connect(
  Toggle,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=6702-19749',
  {
    props: {
      checked: figma.enum('Select', { On: true, Off: false }),
      size: figma.enum('Size', { Medium: 'md', Small: 'sm' }),
    },
    example: ({ checked, size }) => <Toggle checked={checked} size={size} />,
  },
)

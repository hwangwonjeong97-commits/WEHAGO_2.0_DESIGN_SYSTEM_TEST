import figma from '@figma/code-connect'
import Dropdown from './Dropdown'

// Figma: Component / --Base / Dropdown (State=Default·Focused·Completed·Disabled)
figma.connect(
  Dropdown,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=16007-25807',
  {
    example: () => (
      <Dropdown
        placeholder="선택하세요"
        options={[
          { value: '1', label: '옵션 1' },
          { value: '2', label: '옵션 2' },
        ]}
      />
    ),
  },
)

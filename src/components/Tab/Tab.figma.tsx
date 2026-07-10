import figma from '@figma/code-connect'
import Tab from './Tab'

// Figma: Component / Navi / TabBorder (Type=Default·Scrollable)
figma.connect(
  Tab,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=11484-8407',
  {
    example: () => (
      <Tab
        tabs={[
          { value: 'a', label: '탭 A' },
          { value: 'b', label: '탭 B' },
        ]}
        value="a"
        onChange={() => {}}
      />
    ),
  },
)

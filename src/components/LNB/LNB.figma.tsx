import figma from '@figma/code-connect'
import LNB from './LNB'

// Figma: Component / Navi / LNB — Type=Default·Open
figma.connect(
  LNB,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=12500-18458',
  {
    example: () => (
      <LNB
        items={[
          { id: '1', label: '메뉴 1' },
          { id: '2', label: '메뉴 2' },
        ]}
        activeId="1"
      />
    ),
  },
)

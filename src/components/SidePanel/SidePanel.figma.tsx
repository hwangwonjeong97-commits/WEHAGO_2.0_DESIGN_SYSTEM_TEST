import figma from '@figma/code-connect'
import SidePanel from './SidePanel'

// Figma: Component / Navi / SidePanel — Type=Default·FileViewer
figma.connect(
  SidePanel,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=16354-28949',
  {
    example: () => (
      <SidePanel isOpen onClose={() => {}} title="패널 제목">
        내용
      </SidePanel>
    ),
  },
)

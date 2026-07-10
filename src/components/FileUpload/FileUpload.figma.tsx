import figma from '@figma/code-connect'
import FileUpload from './FileUpload'

// Figma: Component / Action / FileUpload — Type=Default·Completed·ReadOnly
figma.connect(
  FileUpload,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=11942-13061',
  {
    example: () => <FileUpload />,
  },
)

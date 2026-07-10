import figma from '@figma/code-connect'
import Loading from './Loading'

// Figma: Component / Feedback / Loader/Circular — Type=Determinate·Indeterminate
figma.connect(
  Loading,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=11676-9336',
  {
    example: () => <Loading variant="spinner" size="md" />,
  },
)

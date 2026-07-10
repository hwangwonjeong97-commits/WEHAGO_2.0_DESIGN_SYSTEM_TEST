import figma from '@figma/code-connect'
import Header from './Header'

// Figma: Component / Navi / Header — Type=Default·WEHAGOT·Breadcrumb
figma.connect(
  Header,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=7029-39307',
  {
    example: () => <Header userName="김더존" />,
  },
)

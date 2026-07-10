import figma from '@figma/code-connect'
import DateTimeInput from './DateTimeInput'

// Figma: Component / --Base / DateInput (Size=Medium·Small, State=…)
figma.connect(
  DateTimeInput,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=11689-9360',
  {
    example: () => <DateTimeInput type="date" />,
  },
)

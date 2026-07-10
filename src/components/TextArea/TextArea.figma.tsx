import figma from '@figma/code-connect'
import TextArea from './TextArea'

// Figma: Component / --Base / TextArea (State=Default·Focused·Typing·Completed·Disabled)
figma.connect(
  TextArea,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=11484-8632',
  {
    example: () => <TextArea placeholder="내용을 입력하세요." rows={3} />,
  },
)

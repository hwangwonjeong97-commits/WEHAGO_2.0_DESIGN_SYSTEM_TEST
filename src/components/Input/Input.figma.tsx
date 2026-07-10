import figma from '@figma/code-connect'
import Input from './Input'

// Figma: WEHAGO Web 2.0_DSG / --Base / InputField (COMPONENT_SET)
// Size=Medium·Small, State=Default·Focused·Typing·Completed·Disabled·Success·Error·Warning
figma.connect(
  Input,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=6834-19135',
  {
    props: {
      size: figma.enum('Size', {
        Medium: 'md',
        Small: 'sm',
      }),
      status: figma.enum('State', {
        Success: 'success',
        Error: 'error',
        Warning: 'warning',
        Default: 'default',
      }),
    },
    example: ({ size, status }) => (
      <Input size={size} status={status} placeholder="내용을 입력하세요" />
    ),
  },
)

import figma from '@figma/code-connect'
import InfoBox from './InfoBox'

// Figma: Component / Display / InfoBox — State=Info·Error
figma.connect(
  InfoBox,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=12306-22586',
  {
    props: {
      type: figma.enum('State', {
        Info: 'info',
        Error: 'error',
      }),
    },
    example: ({ type }) => (
      <InfoBox type={type} title="안내">설명 텍스트를 넣어주세요.</InfoBox>
    ),
  },
)

import figma from '@figma/code-connect'
import Card from './Card'

// Figma: Component / Display / Card — Type=ListCardSingle·ListCardDouble, State=Default·Reorder
figma.connect(
  Card,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=12680-27535',
  {
    props: {
      type: figma.enum('Type', {
        ListCardSingle: 'single',
        ListCardDouble: 'double',
      }),
      state: figma.enum('State', {
        Default: 'default',
        Reorder: 'reorder',
      }),
    },
    example: ({ type, state }) => <Card type={type} state={state} />,
  },
)

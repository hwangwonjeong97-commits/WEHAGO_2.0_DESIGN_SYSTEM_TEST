import figma from '@figma/code-connect'
import ProfileCard from './ProfileCard'

// Figma: Display / ProfileCard (COMPONENT_SET) — Type=Horizontal·Vertical
figma.connect(
  ProfileCard,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=12268-12237',
  {
    props: {
      variant: figma.enum('Type', {
        Horizontal: 'horizontal',
        Vertical: 'vertical',
      }),
    },
    example: ({ variant }) => (
      <ProfileCard
        variant={variant}
        name="김더존"
        title="사원"
        department="더존비즈온 > 플랫폼사업부문 > 서비스기획3Cell"
        phone="02-6233-0000"
        email="kim@wehago.com"
      />
    ),
  },
)

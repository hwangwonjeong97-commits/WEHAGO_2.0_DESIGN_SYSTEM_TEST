import figma from '@figma/code-connect'
import ProfileCard from './ProfileCard'

// Figma: Display / ProfileCard (COMPONENT_SET) — Type=Horizontal·Vertical
figma.connect(
  ProfileCard,
  'https://www.figma.com/design/k8USRkR1jv3eeOwcggvhED/Display?node-id=1-998',
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

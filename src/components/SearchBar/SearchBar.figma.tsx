import figma from '@figma/code-connect'
import SearchBar from './SearchBar'

// Figma: Component / --Base / Searchbar (State=Default·Focused·Typing·Completed·Disabled·Error)
figma.connect(
  SearchBar,
  'https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV/WEHAGO-Web-2.0_DSG?node-id=6834-19510',
  {
    props: {
      status: figma.enum('State', {
        Default: 'default',
        Error: 'error',
      }),
    },
    example: ({ status }) => <SearchBar status={status} placeholder="검색" />,
  },
)

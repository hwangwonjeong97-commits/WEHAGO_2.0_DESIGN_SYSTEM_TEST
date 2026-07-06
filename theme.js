// Design tokens extracted from Figma WEHAGO Web 2.0_DSG
// Source: https://www.figma.com/design/vVNdCTvO5nvN88byoPuYkV

export const colors = {
  primary: {
    50:   '#eff4ff',
    100:  '#c3d7ff',
    200:  '#97baff',
    300:  '#719bfc',
    400:  '#447cfc',
    base: '#105aff', // 500 equivalent
    600:  '#124ceb',
    700:  '#0943c6',
    800:  '#002d93',
    900:  '#001b65',
  },
  secondary: {
    0:    '#ffffff',
    30:   '#fcfcfc',
    40:   '#fafafa',
    50:   '#f4f4f4',
    60:   '#ededed',
    100:  '#e1e1e1',
    200:  '#d3d3d3',
    300:  '#c6c6c6',
    400:  '#b4b4b4',
    500:  '#989898',
    600:  '#777777',
    700:  '#4a4a4a',
    800:  '#333333',
    900:  '#222222',
    1000: '#000000',
  },
  neutral: {
    30:  '#f7f8fa',
    50:  '#f5f6fa',
    100: '#f0f2f7',
    200: '#e4e7f0',
    300: '#d0d6e5',
    400: '#bfc7d8',
    500: '#afb7c9',
    600: '#949daf',
    700: '#767f90',
    800: '#65707e',
    900: '#50596c',
  },
  negative: {
    50:          '#fdf5f5',
    100:         '#ffe8ea',
    200:         '#ffbaba',
    dangerPoint: '#fa4553',
    600:         '#ed2947',
    900:         '#c4001e',
  },
  pending: {
    100:          '#fff2dc',
    200:          '#ffb764',
    warningPoint: '#ffa000',
    600:          '#ff8900',
    800:          '#eb6400',
  },
  positive: {
    100:     '#daf9e1',
    200:     '#68db8b',
    success: '#27c36f',
    600:     '#0fa75b',
    800:     '#007e47',
  },
}

// Font sizes with paired line heights (1.5×) and letter-spacing -0.5px
export const fontSize = {
  'heading1': ['1.25rem',    { lineHeight: '1.875rem',   letterSpacing: '-0.5px' }],  // 20px / 30px
  'heading2': ['1.125rem',   { lineHeight: '1.6875rem',  letterSpacing: '-0.5px' }],  // 18px / 27px
  'body1':    ['1rem',       { lineHeight: '1.5rem',     letterSpacing: '-0.5px' }],  // 16px / 24px
  'body2':    ['0.9375rem',  { lineHeight: '1.40625rem', letterSpacing: '-0.5px' }],  // 15px / 22.5px
  'body3':    ['0.875rem',   { lineHeight: '1.3125rem',  letterSpacing: '-0.5px' }],  // 14px / 21px
  'body4':    ['0.8125rem',  { lineHeight: '1.21875rem', letterSpacing: '-0.5px' }],  // 13px / 19.5px
  'body5':    ['0.75rem',    { lineHeight: '1.125rem',   letterSpacing: '-0.5px' }],  // 12px / 18px
  'body6':    ['0.6875rem',  { lineHeight: '1.03125rem', letterSpacing: '-0.5px' }],  // 11px / 16.5px
  'body7':    ['0.625rem',   { lineHeight: '0.9375rem',  letterSpacing: '-0.5px' }],  // 10px / 15px
  'body8':    ['0.5625rem',  { lineHeight: '0.84375rem', letterSpacing: '-0.5px' }],  //  9px / 13.5px
}

export const fontFamily = {
  base: ['"Noto Sans CJK KR"', 'sans-serif'],
}

export const fontWeight = {
  regular: '400',
  medium:  '500',
  bold:    '700',
}

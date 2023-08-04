const colors = {
  primary: '#937062',
  secondary: '#b58a79',
  black: '#000000',
  white: '#ffffff',
  grey: '#6e6e6e',
  lightGrey: '#d1d1d1',
  navy: '#0000aa',
  red: '#ff0000',
};

const layouts = {
  headerHeight: '65px',
};

const breakpoints = {
  extraLarge: '1440px',
  large: '1080px',
  medium: '820px',
  small: '390px',
  extraSmall: '170px',
};

const devices = {
  desktop: `(max-width: ${breakpoints.extraLarge})`,
  laptop: `(max-width: ${breakpoints.large})`,
  tablet: `(max-width: ${breakpoints.medium})`,
  mobile: `(max-width: ${breakpoints.small})`,
  narrow: `(max-width: ${breakpoints.extraSmall})`,
};

export const theme = {
  colors,
  layouts,
  breakpoints,
  devices,
};

const colors = {};

const layouts = {};

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

export enum Navigation {
  Top,
  SemanticTop,
  Side,
  Sticky,
}

export const config = {
  nav: {
    showAllRoutes: false,
    activeNav: Navigation.SemanticTop,
  },
  isProd: process.env.NODE_ENV === 'production',
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
}

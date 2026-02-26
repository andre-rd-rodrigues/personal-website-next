/**
 * Design tokens shared between JS/TS and Tailwind.
 * SCSS variables remain in assets/styles/_mixins.scss for stylesheet usage.
 */

export const BREAKPOINTS = {
  xxl: 1400,
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
  xs: 380,
  xxs: 330,
} as const;

/** Mobile breakpoint in px (matches Tailwind sm and SCSS $breaking-point-sm) */
export const MOBILE_BREAKPOINT = BREAKPOINTS.sm;

export const COLORS = {
  primary: '#ff56cd',
  secondary: '#8b5afe',
  white: '#ffffff',
  dark: '#161616',
} as const;

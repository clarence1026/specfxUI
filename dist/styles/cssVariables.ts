/**
 * 自动生成的CSS变量TypeScript接口
 * 不要手动修改此文件
 */

export interface ColorVariables {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  white: string;
  black: string;
  gray-100: string;
  gray-200: string;
  gray-300: string;
  gray-400: string;
  gray-500: string;
  gray-600: string;
  gray-700: string;
  gray-800: string;
  gray-900: string;
  background: string;
  background-light: string;
  background-dark: string;
  text-primary: string;
  text-secondary: string;
  text-disabled: string;
  border: string;
  border-light: string;
  border-dark: string;
}

export interface FontVariables {
  family: string;
  size-xs: string;
  size-sm: string;
  size-md: string;
  size-lg: string;
  size-xl: string;
  size-xxl: string;
}

export interface LineVariables {
  height-tight: string;
  height-normal: string;
  height-loose: string;
}

export interface SpacingVariables {
  xxs: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface BorderVariables {
  width: string;
  style: string;
  radius-sm: string;
  radius: string;
  radius-lg: string;
  radius-xl: string;
  radius-circle: string;
}

export interface ShadowVariables {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface TransitionVariables {
  fast: string;
  slow: string;
  timing: string;
}

export interface ZVariables {
  0: string;
  10: string;
  20: string;
  30: string;
  40: string;
  50: string;
  negative: string;
  auto: string;
  dropdown: string;
  sticky: string;
  fixed: string;
  modal: string;
  popover: string;
  tooltip: string;
}

export interface GridVariables {
  columns: string;
  gutter: string;
}

export interface ScreenVariables {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface ButtonVariables {
  height-sm: string;
  height: string;
  height-lg: string;
}

export interface InputVariables {
  height-sm: string;
  height: string;
  height-lg: string;
}

export interface TableVariables {
  header-bg: string;
  row-hover-bg: string;
}

export interface ModalVariables {
  header-padding: string;
  body-padding: string;
  footer-padding: string;
}

export interface CssVariables {
  color: ColorVariables;
  font: FontVariables;
  line: LineVariables;
  spacing: SpacingVariables;
  border: BorderVariables;
  shadow: ShadowVariables;
  transition: TransitionVariables;
  z: ZVariables;
  grid: GridVariables;
  screen: ScreenVariables;
  button: ButtonVariables;
  input: InputVariables;
  table: TableVariables;
  modal: ModalVariables;
}

export const cssVariables: CssVariables = {
  color: {
    primary: 'var(--sc-color-primary)',
    secondary: 'var(--sc-color-secondary)',
    success: 'var(--sc-color-success)',
    warning: 'var(--sc-color-warning)',
    error: 'var(--sc-color-error)',
    info: 'var(--sc-color-info)',
    white: 'var(--sc-color-white)',
    black: 'var(--sc-color-black)',
    gray-100: 'var(--sc-color-gray-100)',
    gray-200: 'var(--sc-color-gray-200)',
    gray-300: 'var(--sc-color-gray-300)',
    gray-400: 'var(--sc-color-gray-400)',
    gray-500: 'var(--sc-color-gray-500)',
    gray-600: 'var(--sc-color-gray-600)',
    gray-700: 'var(--sc-color-gray-700)',
    gray-800: 'var(--sc-color-gray-800)',
    gray-900: 'var(--sc-color-gray-900)',
    background: 'var(--sc-color-background)',
    background-light: 'var(--sc-color-background-light)',
    background-dark: 'var(--sc-color-background-dark)',
    text-primary: 'var(--sc-color-text-primary)',
    text-secondary: 'var(--sc-color-text-secondary)',
    text-disabled: 'var(--sc-color-text-disabled)',
    border: 'var(--sc-color-border)',
    border-light: 'var(--sc-color-border-light)',
    border-dark: 'var(--sc-color-border-dark)',
  },
  font: {
    family: 'var(--sc-font-family)',
    size-xs: 'var(--sc-font-size-xs)',
    size-sm: 'var(--sc-font-size-sm)',
    size-md: 'var(--sc-font-size-md)',
    size-lg: 'var(--sc-font-size-lg)',
    size-xl: 'var(--sc-font-size-xl)',
    size-xxl: 'var(--sc-font-size-xxl)',
  },
  line: {
    height-tight: 'var(--sc-line-height-tight)',
    height-normal: 'var(--sc-line-height-normal)',
    height-loose: 'var(--sc-line-height-loose)',
  },
  spacing: {
    xxs: 'var(--sc-spacing-xxs)',
    xs: 'var(--sc-spacing-xs)',
    sm: 'var(--sc-spacing-sm)',
    md: 'var(--sc-spacing-md)',
    lg: 'var(--sc-spacing-lg)',
    xl: 'var(--sc-spacing-xl)',
    xxl: 'var(--sc-spacing-xxl)',
  },
  border: {
    width: 'var(--sc-border-width)',
    style: 'var(--sc-border-style)',
    radius-sm: 'var(--sc-border-radius-sm)',
    radius: 'var(--sc-border-radius)',
    radius-lg: 'var(--sc-border-radius-lg)',
    radius-xl: 'var(--sc-border-radius-xl)',
    radius-circle: 'var(--sc-border-radius-circle)',
  },
  shadow: {
    sm: 'var(--sc-shadow-sm)',
    md: 'var(--sc-shadow-md)',
    lg: 'var(--sc-shadow-lg)',
    xl: 'var(--sc-shadow-xl)',
  },
  transition: {
    fast: 'var(--sc-transition-fast)',
    slow: 'var(--sc-transition-slow)',
    timing: 'var(--sc-transition-timing)',
  },
  z: {
    0: 'var(--sc-z-0)',
    10: 'var(--sc-z-10)',
    20: 'var(--sc-z-20)',
    30: 'var(--sc-z-30)',
    40: 'var(--sc-z-40)',
    50: 'var(--sc-z-50)',
    negative: 'var(--sc-z-negative)',
    auto: 'var(--sc-z-auto)',
    dropdown: 'var(--sc-z-dropdown)',
    sticky: 'var(--sc-z-sticky)',
    fixed: 'var(--sc-z-fixed)',
    modal: 'var(--sc-z-modal)',
    popover: 'var(--sc-z-popover)',
    tooltip: 'var(--sc-z-tooltip)',
  },
  grid: {
    columns: 'var(--sc-grid-columns)',
    gutter: 'var(--sc-grid-gutter)',
  },
  screen: {
    xs: 'var(--sc-screen-xs)',
    sm: 'var(--sc-screen-sm)',
    md: 'var(--sc-screen-md)',
    lg: 'var(--sc-screen-lg)',
    xl: 'var(--sc-screen-xl)',
    xxl: 'var(--sc-screen-xxl)',
  },
  button: {
    height-sm: 'var(--sc-button-height-sm)',
    height: 'var(--sc-button-height)',
    height-lg: 'var(--sc-button-height-lg)',
  },
  input: {
    height-sm: 'var(--sc-input-height-sm)',
    height: 'var(--sc-input-height)',
    height-lg: 'var(--sc-input-height-lg)',
  },
  table: {
    header-bg: 'var(--sc-table-header-bg)',
    row-hover-bg: 'var(--sc-table-row-hover-bg)',
  },
  modal: {
    header-padding: 'var(--sc-modal-header-padding)',
    body-padding: 'var(--sc-modal-body-padding)',
    footer-padding: 'var(--sc-modal-footer-padding)',
  },
};

export default cssVariables;

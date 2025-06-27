/**
 * CSS变量的TypeScript接口
 * 提供在JavaScript/TypeScript中使用CSS变量的便捷方式
 */

// 颜色变量
const colors = {
  primary: "var(--sc-color-primary)",
  secondary: "var(--sc-color-secondary)",
  success: "var(--sc-color-success)",
  warning: "var(--sc-color-warning)",
  error: "var(--sc-color-error)",
  info: "var(--sc-color-info)",

  white: "var(--sc-color-white)",
  black: "var(--sc-color-black)",

  gray: {
    100: "var(--sc-color-gray-100)",
    200: "var(--sc-color-gray-200)",
    300: "var(--sc-color-gray-300)",
    400: "var(--sc-color-gray-400)",
    500: "var(--sc-color-gray-500)",
    600: "var(--sc-color-gray-600)",
    700: "var(--sc-color-gray-700)",
    800: "var(--sc-color-gray-800)",
    900: "var(--sc-color-gray-900)",
  },

  background: {
    default: "var(--sc-color-background)",
    light: "var(--sc-color-background-light)",
    dark: "var(--sc-color-background-dark)",
  },

  text: {
    primary: "var(--sc-color-text-primary)",
    secondary: "var(--sc-color-text-secondary)",
    disabled: "var(--sc-color-text-disabled)",
  },

  border: {
    default: "var(--sc-color-border)",
    light: "var(--sc-color-border-light)",
    dark: "var(--sc-color-border-dark)",
  },
};

// 间距变量
const spacing = {
  xxs: "var(--sc-spacing-xxs)",
  xs: "var(--sc-spacing-xs)",
  sm: "var(--sc-spacing-sm)",
  md: "var(--sc-spacing-md)",
  lg: "var(--sc-spacing-lg)",
  xl: "var(--sc-spacing-xl)",
  xxl: "var(--sc-spacing-xxl)",
};

// 字体变量
const font = {
  family: "var(--sc-font-family)",
  size: {
    xs: "var(--sc-font-size-xs)",
    sm: "var(--sc-font-size-sm)",
    md: "var(--sc-font-size-md)",
    lg: "var(--sc-font-size-lg)",
    xl: "var(--sc-font-size-xl)",
    xxl: "var(--sc-font-size-xxl)",
  },
  lineHeight: {
    tight: "var(--sc-line-height-tight)",
    normal: "var(--sc-line-height-normal)",
    loose: "var(--sc-line-height-loose)",
  },
};

// 边框变量
const border = {
  width: "var(--sc-border-width)",
  style: "var(--sc-border-style)",
  radius: {
    sm: "var(--sc-border-radius-sm)",
    default: "var(--sc-border-radius)",
    lg: "var(--sc-border-radius-lg)",
    xl: "var(--sc-border-radius-xl)",
    circle: "var(--sc-border-radius-circle)",
  },
};

// 阴影变量
const shadow = {
  sm: "var(--sc-shadow-sm)",
  default: "var(--sc-shadow)",
  md: "var(--sc-shadow-md)",
  lg: "var(--sc-shadow-lg)",
  xl: "var(--sc-shadow-xl)",
};

// 过渡变量
const transition = {
  fast: "var(--sc-transition-fast)",
  default: "var(--sc-transition)",
  slow: "var(--sc-transition-slow)",
  timing: "var(--sc-transition-timing)",
};

// Z-index变量
const zIndex = {
  negative: "var(--sc-z-negative)",
  0: "var(--sc-z-0)",
  10: "var(--sc-z-10)",
  20: "var(--sc-z-20)",
  30: "var(--sc-z-30)",
  40: "var(--sc-z-40)",
  50: "var(--sc-z-50)",
  auto: "var(--sc-z-auto)",
  dropdown: "var(--sc-z-dropdown)",
  sticky: "var(--sc-z-sticky)",
  fixed: "var(--sc-z-fixed)",
  modal: "var(--sc-z-modal)",
  popover: "var(--sc-z-popover)",
  tooltip: "var(--sc-z-tooltip)",
};

// 栅格变量
const grid = {
  columns: "var(--sc-grid-columns)",
  gutter: "var(--sc-grid-gutter)",
};

// 断点变量
const screens = {
  xs: "var(--sc-screen-xs)",
  sm: "var(--sc-screen-sm)",
  md: "var(--sc-screen-md)",
  lg: "var(--sc-screen-lg)",
  xl: "var(--sc-screen-xl)",
  xxl: "var(--sc-screen-xxl)",
};

// 组件特定变量
const components = {
  button: {
    height: {
      sm: "var(--sc-button-height-sm)",
      default: "var(--sc-button-height)",
      lg: "var(--sc-button-height-lg)",
    },
  },
  input: {
    height: {
      sm: "var(--sc-input-height-sm)",
      default: "var(--sc-input-height)",
      lg: "var(--sc-input-height-lg)",
    },
  },
  table: {
    headerBg: "var(--sc-table-header-bg)",
    rowHoverBg: "var(--sc-table-row-hover-bg)",
  },
  modal: {
    headerPadding: "var(--sc-modal-header-padding)",
    bodyPadding: "var(--sc-modal-body-padding)",
    footerPadding: "var(--sc-modal-footer-padding)",
  },
};

/**
 * CSS变量的TypeScript接口
 * 可以在JavaScript/TypeScript中直接使用
 *
 * 示例:
 * import { cssVariables } from 'speccapitals-common/styles';
 *
 * const style = {
 *   color: cssVariables.colors.primary,
 *   padding: cssVariables.spacing.md,
 *   borderRadius: cssVariables.border.radius.default,
 * };
 */
export const cssVariables = {
  colors,
  spacing,
  font,
  border,
  shadow,
  transition,
  zIndex,
  grid,
  screens,
  components,
};

export default cssVariables;

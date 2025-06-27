/**
 * 主题样式系统
 * 提供统一的主题定义和样式工具
 */
import React, { createContext, ReactNode, useContext } from "react";

/**
 * 颜色定义接口
 */
export interface Color {
  hex: string;
  rgb: [number, number, number];
}

/**
 * 主题颜色接口
 */
export interface ThemeColors {
  gradientStart: Color;
  gradientEnd: Color;
  primary: Color;
  secondary: Color;
  white: Color;
  black: Color;
  pale: Color;
  gray: Color;
  lightGray: Color;
  disabled: Color;
  error: Color;
  success: Color;
  warning: Color;
  bodyBackground: Color;
  mobileMenu: Color;
  newMessage: Color;
  topMenu: Color;
  columHead: { hex: string };

  // 表格相关颜色
  tableHeaderBg: Color;
  tableHeaderColor: Color;
  tableRowHoverBg: Color;
  tableRowOddBg: Color;
  tableRowEvenBg: Color;
  tableBorderColor: Color;
}

/**
 * 边框样式接口
 */
export interface ThemeBorder {
  radius: string;
  sectionRadius: string;
  tableRadius: string;
}

/**
 * 图片资源接口
 */
export interface ThemeImages {
  logo: string | null;
  authImage: string | null;
}

/**
 * 主题接口
 */
export interface Theme {
  colors: ThemeColors;
  border: ThemeBorder;
  images: ThemeImages;
}

/**
 * 默认主题
 */
export const defaultTheme: Theme = {
  colors: {
    gradientStart: { hex: "#1f3472", rgb: [31, 52, 114] },
    gradientEnd: { hex: "#1f3472", rgb: [31, 52, 114] },
    primary: { hex: "#1f3472", rgb: [31, 52, 114] },
    secondary: { hex: "#1c1a19", rgb: [28, 26, 25] },
    white: { hex: "#FFFFFF", rgb: [255, 255, 255] },
    black: { hex: "#1D1D1D", rgb: [29, 29, 29] },
    pale: { hex: "#5D647D", rgb: [93, 100, 125] },
    gray: { hex: "#777777", rgb: [119, 119, 119] },
    lightGray: { hex: "#C5C5C5", rgb: [197, 197, 197] },
    disabled: { hex: "#fbfbfb", rgb: [251, 251, 251] },
    error: { hex: "#a1261f", rgb: [161, 38, 31] },
    success: { hex: "#24A661", rgb: [36, 166, 97] },
    warning: { hex: "#ffae57", rgb: [255, 174, 87] },
    bodyBackground: { hex: "#F9FAFB", rgb: [249, 250, 251] },
    mobileMenu: { hex: "#212121", rgb: [33, 33, 33] },
    newMessage: { hex: "#ffe6bd", rgb: [255, 230, 189] },
    topMenu: { hex: "#FFFFFF", rgb: [255, 255, 255] },
    columHead: { hex: "#F8FAFF" },

    // 表格相关颜色
    tableHeaderBg: { hex: "#fafafa", rgb: [250, 250, 250] },
    tableHeaderColor: { hex: "rgba(0, 0, 0, 0.85)", rgb: [0, 0, 0] },
    tableRowHoverBg: { hex: "#e6f7ff", rgb: [230, 247, 255] },
    tableRowOddBg: { hex: "#fafafa", rgb: [250, 250, 250] },
    tableRowEvenBg: { hex: "#ffffff", rgb: [255, 255, 255] },
    tableBorderColor: { hex: "#e8e8e8", rgb: [232, 232, 232] },
  },
  border: {
    radius: "4px",
    sectionRadius: "8px",
    tableRadius: "4px",
  },
  images: { logo: null, authImage: null },
};

/**
 * 创建主题上下文
 */
const ThemeContext = createContext<Theme>(defaultTheme);

/**
 * 主题提供者属性接口
 */
export interface ThemeProviderProps {
  theme?: Partial<Theme>;
  children: ReactNode;
}

/**
 * 主题提供者组件
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme = {},
  children,
}) => {
  const mergedTheme = {
    ...defaultTheme,
    ...theme,
    colors: {
      ...defaultTheme.colors,
      ...(theme.colors || {}),
    },
    border: {
      ...defaultTheme.border,
      ...(theme.border || {}),
    },
    images: {
      ...defaultTheme.images,
      ...(theme.images || {}),
    },
  };

  return React.createElement(
    ThemeContext.Provider,
    { value: mergedTheme },
    children
  );
};

/**
 * 使用主题的Hook
 */
export const useTheme = (): Theme => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};

/**
 * 创建渐变样式
 */
export const gradient = (
  angle: number,
  from: [number, number, number, number],
  percentFrom: number,
  to: [number, number, number, number],
  percentTo: number
): string => {
  return `linear-gradient(${angle}deg, rgba(${from.join(
    ","
  )}) ${percentFrom}%, rgba(${to.join(",")}) ${percentTo}%)`;
};

/**
 * 创建RGBA颜色
 */
export const rgba = (color: [number, number, number, number]): string =>
  `rgba(${color.join(",")})`;

/**
 * 检查是否为RTL布局
 */
export const isRTL = (): boolean => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("locale") === "ar";
  }
  return false;
};

/**
 * 处理样式标签内容
 */
export const taggedStylesToString = (styles: any): string => {
  return styles.join ? styles.join("") : styles.toString();
};

/**
 * 高阶组件：使用主题
 */
export function withTheme<P extends { theme?: Theme }>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, "theme">> {
  return (props: Omit<P, "theme">) => {
    const theme = useTheme();
    return React.createElement(Component, { ...(props as P), theme });
  };
}

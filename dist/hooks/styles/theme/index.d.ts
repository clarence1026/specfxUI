/**
 * 主题样式系统
 * 提供统一的主题定义和样式工具
 */
import React, { ReactNode } from "react";
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
    columHead: {
        hex: string;
    };
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
export declare const defaultTheme: Theme;
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
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
/**
 * 使用主题的Hook
 */
export declare const useTheme: () => Theme;
/**
 * 创建渐变样式
 */
export declare const gradient: (angle: number, from: [number, number, number, number], percentFrom: number, to: [number, number, number, number], percentTo: number) => string;
/**
 * 创建RGBA颜色
 */
export declare const rgba: (color: [number, number, number, number]) => string;
/**
 * 检查是否为RTL布局
 */
export declare const isRTL: () => boolean;
/**
 * 处理样式标签内容
 */
export declare const taggedStylesToString: (styles: any) => string;
/**
 * 高阶组件：使用主题
 */
export declare function withTheme<P extends {
    theme?: Theme;
}>(Component: React.ComponentType<P>): React.FC<Omit<P, "theme">>;

/**
 * Button组件
 * 通用按钮组件，支持多种样式和状态
 */
import React, { ButtonHTMLAttributes } from "react";
export type ButtonType = "primary" | "secondary" | "ghost" | "link" | "danger";
export type ButtonSize = "small" | "medium" | "large";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** 按钮类型 */
    buttonType?: ButtonType;
    /** 按钮大小 */
    size?: ButtonSize;
    /** 是否填充样式 */
    filled?: boolean;
    /** 是否加载中 */
    loading?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否显示加号图标 */
    plus?: boolean;
    /** 是否显示箭头图标 */
    arrow?: boolean;
    /** 是否为下一步按钮 */
    next?: boolean;
    /** 是否为上一步按钮 */
    previous?: boolean;
    /** 是否无边框 */
    noBorder?: boolean;
    /** 是否选中状态 */
    selected?: boolean;
    /** 是否自适应内容宽度 */
    fitContent?: boolean;
    /** 是否使用大写文本 */
    isUpperCase?: boolean;
    /** 自定义按钮颜色 */
    color?: string;
    /** 按钮文本 */
    children: React.ReactNode;
    /** 自定义类名 */
    className?: string;
    /** 点击事件处理函数 */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
/**
 * Button组件
 * 通用按钮，支持多种样式和状态
 */
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export default Button;

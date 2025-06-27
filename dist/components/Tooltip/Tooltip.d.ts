/**
 * Tooltip组件
 * 提供文本提示功能的组件
 */
import React, { ReactNode } from 'react';
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export interface TooltipProps {
    /** 提示文本内容 */
    title: ReactNode;
    /** 提示框位置 */
    placement?: TooltipPlacement;
    /** 子元素 */
    children: ReactNode;
    /** 是否显示箭头 */
    arrow?: boolean;
    /** 自定义类名 */
    className?: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 触发方式 */
    trigger?: 'hover' | 'click' | 'focus';
    /** 自定义样式 */
    style?: React.CSSProperties;
    /** 显示延迟(毫秒) */
    mouseEnterDelay?: number;
    /** 隐藏延迟(毫秒) */
    mouseLeaveDelay?: number;
}
/**
 * Tooltip组件
 * 提供文本提示功能
 */
export declare const Tooltip: React.FC<TooltipProps>;
export default Tooltip;

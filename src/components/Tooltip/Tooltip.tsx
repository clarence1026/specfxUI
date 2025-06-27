/**
 * Tooltip组件
 * 提供文本提示功能的组件
 */
import React, { ReactNode } from 'react';
import styled from 'styled-components';

// Tooltip位置类型
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

// Tooltip属性接口
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

// Tooltip容器样式
const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

// Tooltip内容样式
const TooltipContent = styled.div<{
  placement: TooltipPlacement;
  visible: boolean;
  arrow: boolean;
}>`
  position: absolute;
  z-index: 1000;
  padding: 6px 8px;
  font-size: 12px;
  line-height: 1.5;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 0.3s, visibility 0.3s;
  
  ${props => props.placement === 'top' && `
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-8px);
    margin-bottom: ${props.arrow ? '10px' : '0'};
    
    &::after {
      ${props.arrow ? `
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: rgba(0, 0, 0, 0.75) transparent transparent transparent;
      ` : ''}
    }
  `}
  
  ${props => props.placement === 'bottom' && `
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(8px);
    margin-top: ${props.arrow ? '10px' : '0'};
    
    &::after {
      ${props.arrow ? `
        content: '';
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent rgba(0, 0, 0, 0.75) transparent;
      ` : ''}
    }
  `}
  
  ${props => props.placement === 'left' && `
    right: 100%;
    top: 50%;
    transform: translateY(-50%) translateX(-8px);
    margin-right: ${props.arrow ? '10px' : '0'};
    
    &::after {
      ${props.arrow ? `
        content: '';
        position: absolute;
        left: 100%;
        top: 50%;
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent transparent rgba(0, 0, 0, 0.75);
      ` : ''}
    }
  `}
  
  ${props => props.placement === 'right' && `
    left: 100%;
    top: 50%;
    transform: translateY(-50%) translateX(8px);
    margin-left: ${props.arrow ? '10px' : '0'};
    
    &::after {
      ${props.arrow ? `
        content: '';
        position: absolute;
        right: 100%;
        top: 50%;
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent rgba(0, 0, 0, 0.75) transparent transparent;
      ` : ''}
    }
  `}
`;

/**
 * Tooltip组件
 * 提供文本提示功能
 */
export const Tooltip: React.FC<TooltipProps> = ({
  title,
  placement = 'top',
  children,
  arrow = true,
  className,
  disabled = false,
  trigger = 'hover',
  style,
  mouseEnterDelay = 100,
  mouseLeaveDelay = 100,
}) => {
  const [visible, setVisible] = React.useState(false);
  const timeoutRef = React.useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (disabled || trigger !== 'hover') return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = window.setTimeout(() => {
      setVisible(true);
    }, mouseEnterDelay);
  };

  const handleMouseLeave = () => {
    if (disabled || trigger !== 'hover') return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = window.setTimeout(() => {
      setVisible(false);
    }, mouseLeaveDelay);
  };

  const handleClick = () => {
    if (disabled || trigger !== 'click') return;
    setVisible(!visible);
  };

  const handleFocus = () => {
    if (disabled || trigger !== 'focus') return;
    setVisible(true);
  };

  const handleBlur = () => {
    if (disabled || trigger !== 'focus') return;
    setVisible(false);
  };

  return (
    <TooltipContainer
      className={`sc-tooltip-container ${className || ''}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
      <TooltipContent
        className="sc-tooltip-content"
        placement={placement}
        visible={visible && !disabled && !!title}
        arrow={arrow}
      >
        {title}
      </TooltipContent>
    </TooltipContainer>
  );
};

export default Tooltip; 
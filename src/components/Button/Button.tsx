/**
 * Button组件
 * 通用按钮组件，支持多种样式和状态
 */
import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import styled from "styled-components";

// 按钮类型定义
export type ButtonType = "primary" | "secondary" | "ghost" | "link" | "danger";

// 按钮大小定义
export type ButtonSize = "small" | "medium" | "large";

// 按钮属性接口
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

// 加载图标组件
const LoadingIcon = () => (
  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <path d="M512 64c-247.4 0-448 200.6-448 448s200.6 448 448 448 448-200.6 448-448-200.6-448-448-448zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
    <path d="M512 140c-30.9 0-56 25.1-56 56s25.1 56 56 56 56-25.1 56-56-25.1-56-56-56zm0 696c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm-176-176c-13.8 0-24-10.2-24-24s10.2-24 24-24 24 10.2 24 24-10.2 24-24 24zm352 0c-13.8 0-24-10.2-24-24s10.2-24 24-24 24 10.2 24 24-10.2 24-24 24z" />
  </svg>
);

// 加号图标组件
const PlusIcon = () => (
  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
    <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" />
  </svg>
);

// 箭头图标组件
const ArrowIcon = () => (
  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <path d="M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z" />
  </svg>
);

// 样式化按钮组件
const StyledButton = styled.button<ButtonProps>`
  position: relative;
  display: inline-flex;
  padding: ${(props) =>
    props.size === "small"
      ? "6px 12px"
      : props.size === "large"
      ? "12px 24px"
      : "8px 20px"};
  justify-content: center;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: ${(props) =>
    props.size === "small" ? "12px" : props.size === "large" ? "16px" : "14px"};
  line-height: 1.5;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  min-width: ${(props) => (props.fitContent ? "auto" : "120px")};
  letter-spacing: 0.5px;
  border-radius: 4px;
  transition: all 0.3s ease;

  ${(props) =>
    props.buttonType === "primary" &&
    `
    background-color: #1890ff;
    border: 1px solid #1890ff;
    color: white;
    
    &:hover {
      background-color: #40a9ff;
      border-color: #40a9ff;
    }
    
    &:active {
      background-color: #096dd9;
      border-color: #096dd9;
    }
  `}

  ${(props) =>
    props.buttonType === "secondary" &&
    `
    background-color: white;
    border: 1px solid #d9d9d9;
    color: rgba(0, 0, 0, 0.85);
    
    &:hover {
      border-color: #40a9ff;
      color: #40a9ff;
    }
    
    &:active {
      border-color: #096dd9;
      color: #096dd9;
    }
  `}
  
  ${(props) =>
    props.buttonType === "ghost" &&
    `
    background-color: transparent;
    border: 1px solid #d9d9d9;
    color: rgba(0, 0, 0, 0.85);
    
    &:hover {
      border-color: #40a9ff;
      color: #40a9ff;
    }
    
    &:active {
      border-color: #096dd9;
      color: #096dd9;
    }
  `}
  
  ${(props) =>
    props.buttonType === "link" &&
    `
    background-color: transparent;
    border: none;
    color: #1890ff;
    min-width: auto;
    padding: 0;
    
    &:hover {
      color: #40a9ff;
    }
    
    &:active {
      color: #096dd9;
    }
  `}
  
  ${(props) =>
    props.buttonType === "danger" &&
    `
    background-color: #ff4d4f;
    border: 1px solid #ff4d4f;
    color: white;
    
    &:hover {
      background-color: #ff7875;
      border-color: #ff7875;
    }
    
    &:active {
      background-color: #d9363e;
      border-color: #d9363e;
    }
  `}
  
  ${(props) =>
    props.filled &&
    `
    color: white;
  `}
  
  ${(props) =>
    props.noBorder &&
    `
    border: none;
    padding: 0;
    background: transparent;
    min-width: auto;
  `}
  
  ${(props) =>
    props.selected &&
    `
    background-color: #1890ff;
    color: white;
  `}
  
  ${(props) =>
    props.disabled &&
    `
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  `}
  
  ${(props) =>
    props.color &&
    `
    background-color: ${props.color};
    border-color: ${props.color};
    color: white;
    
    &:hover {
      opacity: 0.8;
    }
    
    &:active {
      opacity: 1;
    }
  `}
  
  .button-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button-plus {
    width: 14px;
    height: 14px;
  }

  .button-arrow {
    width: 14px;
    height: 14px;
  }

  .button-loading {
    position: absolute;
    left: 15px;
    width: 16px;
    height: 16px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

/**
 * Button组件
 * 通用按钮，支持多种样式和状态
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      buttonType = "primary",
      size = "medium",
      filled = false,
      loading = false,
      disabled = false,
      plus = false,
      arrow = false,
      next = false,
      previous = false,
      noBorder = false,
      selected = false,
      fitContent = false,
      isUpperCase = false,
      color,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const buttonText =
      isUpperCase && typeof children === "string"
        ? children.toUpperCase()
        : children;

    return (
      <StyledButton
        ref={ref}
        buttonType={buttonType}
        size={size}
        filled={filled}
        disabled={disabled || loading}
        noBorder={noBorder}
        selected={selected}
        fitContent={fitContent}
        color={color}
        className={classNames(className, {
          "button-uppercase": isUpperCase,
        })}
        {...rest}
      >
        {loading && (
          <span className="button-icon button-loading">
            <LoadingIcon />
          </span>
        )}
        {plus && !loading && (
          <span className="button-icon button-plus">
            <PlusIcon />
          </span>
        )}
        {(previous || next) && !loading && (
          <span
            className={`button-icon button-arrow ${
              previous ? "button-arrow-prev" : ""
            }`}
          >
            <ArrowIcon />
          </span>
        )}
        <span className="button-text">{buttonText}</span>
        {arrow && !loading && !next && (
          <span className="button-icon button-arrow">
            <ArrowIcon />
          </span>
        )}
      </StyledButton>
    );
  }
);

Button.displayName = "Button";

export default Button;

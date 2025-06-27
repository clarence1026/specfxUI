/**
 * 开关组件
 * 提供开关功能，支持不同尺寸和自定义文本
 */
import React, { forwardRef, useState, useEffect } from "react";
import styled from "styled-components";
import { SwitchProps } from "../types";

interface SwitchContainerProps {
  checked: boolean;
  disabled: boolean;
  hasError: boolean;
  size: "small" | "default" | "large";
}

const SwitchContainer = styled.button<SwitchContainerProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  min-width: ${({ size }) =>
    size === "small" ? "28px" : size === "large" ? "56px" : "44px"};
  height: ${({ size }) =>
    size === "small" ? "16px" : size === "large" ? "26px" : "22px"};
  line-height: ${({ size }) =>
    size === "small" ? "16px" : size === "large" ? "26px" : "22px"};
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  background-color: ${({ checked, disabled }) =>
    checked
      ? disabled
        ? "#a6d0f8"
        : "#1890ff"
      : disabled
      ? "#f5f5f5"
      : "#bfbfbf"};
  border: 0;
  border-radius: ${({ size }) =>
    size === "small" ? "8px" : size === "large" ? "13px" : "11px"};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s;
  outline: ${({ hasError }) => (hasError ? "1px solid #ff4d4f" : "none")};
  box-shadow: ${({ hasError }) =>
    hasError ? "0 0 0 2px rgba(255, 77, 79, 0.2)" : "none"};

  &:focus {
    outline: 0;
    box-shadow: ${({ hasError }) =>
      hasError
        ? "0 0 0 2px rgba(255, 77, 79, 0.2)"
        : "0 0 0 2px rgba(24, 144, 255, 0.2)"};
  }

  &:hover:not(:disabled) {
    background-color: ${({ checked }) => (checked ? "#40a9ff" : "#999")};
  }
`;

interface SwitchHandleProps {
  checked: boolean;
  size: "small" | "default" | "large";
}

const SwitchHandle = styled.span<SwitchHandleProps>`
  position: absolute;
  top: 2px;
  left: ${({ checked, size }) =>
    checked
      ? size === "small"
        ? "calc(100% - 12px - 2px)"
        : size === "large"
        ? "calc(100% - 22px - 2px)"
        : "calc(100% - 18px - 2px)"
      : "2px"};
  width: ${({ size }) =>
    size === "small" ? "12px" : size === "large" ? "22px" : "18px"};
  height: ${({ size }) =>
    size === "small" ? "12px" : size === "large" ? "22px" : "18px"};
  background-color: #fff;
  border-radius: 50%;
  transition: all 0.3s;
  box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0.2);
`;

interface SwitchTextProps {
  checked: boolean;
  size: "small" | "default" | "large";
}

const SwitchText = styled.span<SwitchTextProps>`
  display: block;
  margin: 0
    ${({ size }) =>
      size === "small" ? "7px" : size === "large" ? "12px" : "9px"};
  color: #fff;
  font-size: ${({ size }) =>
    size === "small" ? "10px" : size === "large" ? "14px" : "12px"};
  text-align: ${({ checked }) => (checked ? "left" : "right")};
`;

/**
 * 开关组件
 */
const Switch = forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => {
  const {
    name,
    checked = false,
    label,
    error,
    disabled = false,
    required = false,
    hidden = false,
    onChange,
    className,
    style,
    checkedText,
    uncheckedText,
    size = "default",
    ...rest
  } = props;

  const [isChecked, setIsChecked] = useState(checked);

  // 同步外部传入的值
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  // 处理开关点击
  const handleClick = () => {
    if (disabled) return;

    const newChecked = !isChecked;
    setIsChecked(newChecked);

    if (onChange) {
      onChange(newChecked);
    }
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  // 是否有错误
  const hasError = !!error;

  if (hidden) return null;

  // 是否显示文本
  const showText = (checkedText || uncheckedText) && size !== "small";

  return (
    <SwitchContainer
      ref={ref}
      type="button"
      role="switch"
      aria-checked={isChecked}
      className={className}
      style={style}
      checked={isChecked}
      disabled={disabled}
      hasError={hasError}
      size={size}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <SwitchHandle checked={isChecked} size={size} />

      {showText && (
        <SwitchText checked={isChecked} size={size}>
          {isChecked ? checkedText : uncheckedText}
        </SwitchText>
      )}
    </SwitchContainer>
  );
});

Switch.displayName = "Switch";

export default Switch;

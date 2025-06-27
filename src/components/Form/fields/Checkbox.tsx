/**
 * 复选框组件
 * 提供勾选功能，支持中间状态
 */
import React, { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import { CheckboxProps } from "../types";

interface CheckboxWrapperProps {
  disabled: boolean;
}

const CheckboxWrapper = styled.label<CheckboxWrapperProps>`
  display: inline-flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  user-select: none;
`;

interface CheckboxInputContainerProps {
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  hasError: boolean;
}

const CheckboxInputContainer = styled.span<CheckboxInputContainerProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: 1px solid
    ${({ checked, indeterminate, hasError, disabled }) =>
      hasError
        ? "#ff4d4f"
        : checked || indeterminate
        ? "#1890ff"
        : disabled
        ? "#d9d9d9"
        : "#d9d9d9"};
  border-radius: 2px;
  background-color: ${({ checked, indeterminate, disabled }) =>
    checked || indeterminate
      ? disabled
        ? "#a6d0f8"
        : "#1890ff"
      : disabled
      ? "#f5f5f5"
      : "#fff"};
  transition: all 0.3s;

  &:hover {
    border-color: ${({ hasError, disabled }) =>
      hasError ? "#ff4d4f" : disabled ? "#d9d9d9" : "#40a9ff"};
  }
`;

const HiddenInput = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  cursor: inherit;
  opacity: 0;
  margin: 0;
`;

const CheckIcon = styled.span`
  color: #fff;
  font-size: 12px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IndeterminateIcon = styled.span`
  width: 8px;
  height: 8px;
  background-color: #fff;
  display: block;
`;

const CheckboxLabel = styled.span<{ disabled: boolean }>`
  padding-left: 8px;
  font-size: 14px;
  color: ${({ disabled }) =>
    disabled ? "rgba(0, 0, 0, 0.25)" : "rgba(0, 0, 0, 0.85)"};
`;

/**
 * 复选框组件
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
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
    indeterminate = false,
    ...rest
  } = props;

  const [isChecked, setIsChecked] = useState(checked);

  // 同步外部传入的值
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  // 处理复选框变更
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);

    if (onChange) {
      onChange(newChecked);
    }
  };

  // 是否有错误
  const hasError = !!error;

  if (hidden) return null;

  return (
    <CheckboxWrapper className={className} style={style} disabled={disabled}>
      <CheckboxInputContainer
        checked={isChecked}
        indeterminate={indeterminate}
        disabled={disabled}
        hasError={hasError}
      >
        <HiddenInput
          ref={ref}
          type="checkbox"
          name={name}
          checked={isChecked}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          {...rest}
        />
        {isChecked && !indeterminate && <CheckIcon>✓</CheckIcon>}
        {indeterminate && <IndeterminateIcon />}
      </CheckboxInputContainer>

      {label && <CheckboxLabel disabled={disabled}>{label}</CheckboxLabel>}
    </CheckboxWrapper>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;

/**
 * 单选框组件
 * 提供单选功能
 */
import React, { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import { RadioProps } from "../types";

interface RadioWrapperProps {
  disabled: boolean;
}

const RadioWrapper = styled.label<RadioWrapperProps>`
  display: inline-flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  user-select: none;
`;

interface RadioInputContainerProps {
  checked: boolean;
  disabled: boolean;
  hasError: boolean;
}

const RadioInputContainer = styled.span<RadioInputContainerProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: 1px solid
    ${({ checked, hasError, disabled }) =>
      hasError
        ? "#ff4d4f"
        : checked
        ? "#1890ff"
        : disabled
        ? "#d9d9d9"
        : "#d9d9d9"};
  border-radius: 50%;
  background-color: #fff;
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

const RadioInner = styled.span<{ checked: boolean; disabled: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ checked, disabled }) =>
    checked ? (disabled ? "#a6d0f8" : "#1890ff") : "transparent"};
  transition: all 0.3s;
`;

const RadioLabel = styled.span<{ disabled: boolean }>`
  padding-left: 8px;
  font-size: 14px;
  color: ${({ disabled }) =>
    disabled ? "rgba(0, 0, 0, 0.25)" : "rgba(0, 0, 0, 0.85)"};
`;

/**
 * 单选框组件
 */
const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const {
    name,
    value,
    checked = false,
    label,
    error,
    disabled = false,
    required = false,
    hidden = false,
    onChange,
    className,
    style,
    ...rest
  } = props;

  const [isChecked, setIsChecked] = useState(checked);

  // 同步外部传入的值
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  // 处理单选框变更
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);

    if (onChange && newChecked) {
      onChange(value);
    }
  };

  // 是否有错误
  const hasError = !!error;

  if (hidden) return null;

  return (
    <RadioWrapper className={className} style={style} disabled={disabled}>
      <RadioInputContainer
        checked={isChecked}
        disabled={disabled}
        hasError={hasError}
      >
        <HiddenInput
          ref={ref}
          type="radio"
          name={name}
          value={value}
          checked={isChecked}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          {...rest}
        />
        <RadioInner checked={isChecked} disabled={disabled} />
      </RadioInputContainer>

      {label && <RadioLabel disabled={disabled}>{label}</RadioLabel>}
    </RadioWrapper>
  );
});

Radio.displayName = "Radio";

export default Radio;

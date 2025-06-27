/**
 * 文本输入框组件
 * 提供基础的文本输入功能，支持不同类型的输入
 */
import React, { forwardRef, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { TextFieldProps, FormFieldValue } from "../types";

const InputContainer = styled.div<{ hasError: boolean; disabled: boolean }>`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${({ disabled }) => (disabled ? "#f5f5f5" : "#fff")};
  border: 1px solid
    ${({ hasError, disabled }) =>
      hasError ? "#ff4d4f" : disabled ? "#d9d9d9" : "#d9d9d9"};
  border-radius: 4px;
  transition: all 0.3s;

  &:hover {
    border-color: ${({ hasError, disabled }) =>
      hasError ? "#ff4d4f" : disabled ? "#d9d9d9" : "#40a9ff"};
  }

  &:focus-within {
    border-color: ${({ hasError }) => (hasError ? "#ff4d4f" : "#40a9ff")};
    box-shadow: ${({ hasError }) =>
      hasError
        ? "0 0 0 2px rgba(255, 77, 79, 0.2)"
        : "0 0 0 2px rgba(24, 144, 255, 0.2)"};
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 32px;
  padding: 4px 11px;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  background-color: transparent;
  border: none;
  outline: none;

  &:disabled {
    cursor: not-allowed;
    color: rgba(0, 0, 0, 0.25);
  }

  &::placeholder {
    color: #bfbfbf;
  }
`;

const PrefixContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 11px;
  color: rgba(0, 0, 0, 0.45);
`;

const SuffixContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 11px;
  color: rgba(0, 0, 0, 0.45);
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0 8px 0 0;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.25);
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: rgba(0, 0, 0, 0.45);
  }
`;

const CountContainer = styled.span`
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  margin-left: 4px;
`;

/**
 * 文本输入框组件
 */
const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const {
    name,
    value,
    label,
    error,
    disabled = false,
    required = false,
    placeholder,
    autoComplete = "off",
    hidden = false,
    onChange,
    className,
    style,
    type = "text",
    maxLength,
    minLength,
    prefix,
    suffix,
    allowClear = false,
    showCount = false,
    onAutofill,
    ...rest
  } = props;

  const [inputValue, setInputValue] = useState<string>(
    value !== undefined && value !== null ? String(value) : ""
  );
  const inputRef = useRef<HTMLInputElement>(null);

  // 同步外部传入的值
  useEffect(() => {
    if (value !== undefined && value !== null) {
      setInputValue(String(value));
    } else {
      setInputValue("");
    }
  }, [value]);

  // 处理输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // 调用外部的onChange
    if (onChange) {
      // 根据类型转换值
      let typedValue: FormFieldValue = newValue;
      if (type === "number" && newValue !== "") {
        typedValue = parseFloat(newValue);
      }
      onChange(typedValue);
    }
  };

  // 处理清除按钮点击
  const handleClear = () => {
    setInputValue("");
    if (onChange) {
      onChange("");
    }
    // 聚焦输入框
    inputRef.current?.focus();
  };

  // 处理自动填充
  const handleAnimationStart = (e: React.AnimationEvent) => {
    if (onAutofill && e.animationName.includes("autofill")) {
      onAutofill(e.animationName);
    }
  };

  // 是否显示清除按钮
  const showClearButton = allowClear && inputValue && !disabled;

  // 显示字数统计
  const renderCount = () => {
    if (!showCount || !maxLength) return null;
    return (
      <CountContainer>
        {inputValue.length}/{maxLength}
      </CountContainer>
    );
  };

  // 是否有错误
  const hasError = !!error;

  if (hidden) return null;

  return (
    <InputContainer
      className={className}
      style={style}
      hasError={hasError}
      disabled={disabled}
    >
      {prefix && <PrefixContainer>{prefix}</PrefixContainer>}

      <StyledInput
        ref={inputRef}
        name={name}
        value={inputValue}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        type={type}
        maxLength={maxLength}
        minLength={minLength}
        onAnimationStart={handleAnimationStart}
        {...rest}
      />

      {showClearButton && (
        <ClearButton type="button" onClick={handleClear} tabIndex={-1}>
          ✕
        </ClearButton>
      )}

      {showCount && renderCount()}

      {suffix && <SuffixContainer>{suffix}</SuffixContainer>}
    </InputContainer>
  );
});

TextField.displayName = "TextField";

export default TextField;

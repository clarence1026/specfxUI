/**
 * 文本域组件
 * 提供多行文本输入功能，支持自动调整高度
 */
import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import styled from "styled-components";
import { TextAreaProps } from "../types";

interface TextAreaContainerProps {
  hasError: boolean;
  disabled: boolean;
}

const TextAreaContainer = styled.div<TextAreaContainerProps>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
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

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 32px;
  padding: 4px 11px;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  background-color: transparent;
  border: none;
  outline: none;
  resize: vertical;

  &:disabled {
    cursor: not-allowed;
    color: rgba(0, 0, 0, 0.25);
    resize: none;
  }

  &::placeholder {
    color: #bfbfbf;
  }
`;

const CountContainer = styled.div`
  text-align: right;
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  padding: 0 11px 4px;
`;

/**
 * 文本域组件
 */
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
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
      rows = 3,
      autoSize = false,
      maxLength,
      showCount = false,
      ...rest
    } = props;

    const [inputValue, setInputValue] = useState<string>(
      value !== undefined && value !== null ? String(value) : ""
    );
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    // 将内部ref暴露给外部ref
    useImperativeHandle(ref, () => textAreaRef.current as HTMLTextAreaElement);

    // 同步外部传入的值
    useEffect(() => {
      if (value !== undefined && value !== null) {
        setInputValue(String(value));
      } else {
        setInputValue("");
      }
    }, [value]);

    // 处理输入变化
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      // 调用外部的onChange
      if (onChange) {
        onChange(newValue);
      }

      // 如果启用了自动调整高度，则调整高度
      if (autoSize && textAreaRef.current) {
        adjustHeight();
      }
    };

    // 调整高度
    const adjustHeight = () => {
      const textArea = textAreaRef.current;
      if (!textArea) return;

      // 重置高度以获取正确的scrollHeight
      textArea.style.height = "auto";

      // 计算新高度
      let newHeight = textArea.scrollHeight;

      // 如果设置了最小行数和最大行数
      if (typeof autoSize === "object") {
        const lineHeight = 21; // 估计的行高
        const minHeight = (autoSize.minRows || 1) * lineHeight;
        const maxHeight = autoSize.maxRows
          ? autoSize.maxRows * lineHeight
          : Infinity;

        newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));
      }

      textArea.style.height = `${newHeight}px`;
    };

    // 初始化时调整高度
    useEffect(() => {
      if (autoSize && textAreaRef.current) {
        adjustHeight();
      }
    }, [autoSize, inputValue]);

    // 是否有错误
    const hasError = !!error;

    if (hidden) return null;

    return (
      <TextAreaContainer
        className={className}
        style={style}
        hasError={hasError}
        disabled={disabled}
      >
        <StyledTextArea
          ref={textAreaRef}
          name={name}
          value={inputValue}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          rows={rows}
          maxLength={maxLength}
          {...rest}
        />

        {showCount && maxLength && (
          <CountContainer>
            {inputValue.length}/{maxLength}
          </CountContainer>
        )}
      </TextAreaContainer>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;

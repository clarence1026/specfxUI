/**
 * 单选框组组件
 * 提供一组单选框的管理功能
 */
import React, { forwardRef, useState, useEffect } from "react";
import styled from "styled-components";
import { RadioGroupProps, RadioOption, FormFieldChangeHandler } from "../types";
import Radio from "./Radio";

interface RadioGroupContainerProps {
  direction: "horizontal" | "vertical";
  disabled: boolean;
}

const RadioGroupContainer = styled.div<RadioGroupContainerProps>`
  display: flex;
  flex-direction: ${({ direction }) =>
    direction === "horizontal" ? "row" : "column"};
  gap: ${({ direction }) => (direction === "horizontal" ? "16px" : "8px")};
  opacity: ${({ disabled }) => (disabled ? 0.65 : 1)};
`;

/**
 * 单选框组组件
 */
const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const {
    name,
    value,
    label,
    error,
    disabled = false,
    required = false,
    hidden = false,
    onChange,
    className,
    style,
    options = [],
    direction = "horizontal",
    ...rest
  } = props;

  const [selectedValue, setSelectedValue] = useState<
    string | number | undefined
  >(value);

  // 同步外部传入的值
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  // 处理单选框变更
  const handleRadioChange = (optionValue: string | number) => {
    setSelectedValue(optionValue);

    if (onChange) {
      onChange(optionValue);
    }
  };

  // 创建一个适配FormFieldChangeHandler类型的处理函数
  const handleRadioChangeAdapter: FormFieldChangeHandler = (value) => {
    // 由于RadioGroup只支持string|number类型的值，这里进行类型断言
    if (typeof value === "string" || typeof value === "number") {
      handleRadioChange(value);
    }
  };

  if (hidden) return null;

  return (
    <RadioGroupContainer
      ref={ref}
      className={className}
      style={style}
      direction={direction}
      disabled={disabled}
    >
      {options.map((option: RadioOption, index: number) => (
        <Radio
          key={`${name}-${index}`}
          name={name}
          value={option.value}
          label={option.label}
          checked={selectedValue === option.value}
          disabled={disabled || option.disabled}
          required={required}
          error={error}
          onChange={handleRadioChangeAdapter}
        />
      ))}
    </RadioGroupContainer>
  );
});

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;

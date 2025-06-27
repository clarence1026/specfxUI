/**
 * 选择框组件
 * 提供单选和多选功能，支持搜索和自定义选项
 */
import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import styled from "styled-components";
import { SelectProps, SelectOption, FormFieldValue } from "../types";

interface SelectContainerProps {
  hasError: boolean;
  disabled: boolean;
  isOpen: boolean;
}

const SelectContainer = styled.div<SelectContainerProps>`
  position: relative;
  width: 100%;
  background-color: ${({ disabled }) => (disabled ? "#f5f5f5" : "#fff")};
  border: 1px solid
    ${({ hasError, disabled, isOpen }) =>
      hasError
        ? "#ff4d4f"
        : isOpen
        ? "#40a9ff"
        : disabled
        ? "#d9d9d9"
        : "#d9d9d9"};
  border-radius: 4px;
  transition: all 0.3s;

  &:hover {
    border-color: ${({ hasError, disabled, isOpen }) =>
      hasError
        ? "#ff4d4f"
        : isOpen
        ? "#40a9ff"
        : disabled
        ? "#d9d9d9"
        : "#40a9ff"};
  }

  ${({ isOpen, hasError }) =>
    isOpen &&
    !hasError &&
    `
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  `}

  ${({ isOpen, hasError }) =>
    isOpen &&
    hasError &&
    `
    box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
  `}
`;

const SelectHeader = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 32px;
  padding: 4px 11px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const ValueContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

const Placeholder = styled.div`
  color: #bfbfbf;
`;

const SelectedValue = styled.div`
  font-size: 14px;
  line-height: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MultiValueContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 2px;
  padding: 0 4px;
  margin: 2px;
`;

const MultiValueLabel = styled.span`
  font-size: 12px;
  line-height: 20px;
`;

const MultiValueRemove = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-left: 4px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.45);
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: rgba(0, 0, 0, 0.65);
  }
`;

const ArrowIcon = styled.div<{ isOpen: boolean }>`
  margin-left: 8px;
  color: rgba(0, 0, 0, 0.25);
  transition: transform 0.3s;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
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

const DropdownContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 250px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  margin-top: 4px;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 8px 12px;
  border-bottom: 1px solid #f0f0f0;
`;

const OptionsList = styled.div`
  padding: 4px 0;
`;

const OptionItem = styled.div<{
  isSelected: boolean;
  isDisabled: boolean;
  isGroupTitle: boolean;
}>`
  padding: 8px 12px;
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
  background-color: ${({ isSelected }) =>
    isSelected ? "#e6f7ff" : "transparent"};
  color: ${({ isDisabled }) => (isDisabled ? "rgba(0, 0, 0, 0.25)" : "#333")};

  ${({ isGroupTitle }) =>
    isGroupTitle &&
    `
    font-weight: 500;
    color: rgba(0, 0, 0, 0.45);
    cursor: default;
    padding-top: 12px;
  `}

  &:hover {
    background-color: ${({ isDisabled, isGroupTitle, isSelected }) =>
      !isDisabled && !isGroupTitle && !isSelected
        ? "#f5f5f5"
        : isSelected
        ? "#e6f7ff"
        : "transparent"};
  }
`;

const NoOptions = styled.div`
  padding: 8px 12px;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
`;

const LoadingText = styled.div`
  padding: 8px 12px;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
`;

/**
 * 选择框组件
 */
const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    name,
    value,
    label,
    error,
    disabled = false,
    required = false,
    placeholder = "请选择",
    hidden = false,
    onChange,
    className,
    style,
    options = [],
    searchable = false,
    multiple = false,
    clearable = false,
    creatable = false,
    loading = false,
    noOptionsMessage = "无数据",
    loadingMessage = "加载中...",
    ...rest
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<any>(value);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // 将内部ref暴露给外部ref
  useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  // 同步外部传入的值
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 打开下拉框时聚焦搜索框
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // 处理下拉框切换
  const handleToggleDropdown = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    setSearchValue("");
  };

  // 处理选项点击
  const handleOptionClick = (option: SelectOption) => {
    if (option.disabled || option.groupTitle) return;

    let newValue: FormFieldValue;

    if (multiple) {
      const currentValue = Array.isArray(selectedValue) ? selectedValue : [];
      const optionIndex = currentValue.findIndex(
        (item) => item === option.value
      );

      if (optionIndex > -1) {
        // 移除已选项
        newValue = [
          ...currentValue.slice(0, optionIndex),
          ...currentValue.slice(optionIndex + 1),
        ];
      } else {
        // 添加新选项
        newValue = [...currentValue, option.value];
      }

      setSelectedValue(newValue);
      onChange?.(newValue);
    } else {
      newValue = option.value;
      setSelectedValue(newValue);
      onChange?.(newValue);
      setIsOpen(false);
    }
  };

  // 处理清除按钮点击
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue: FormFieldValue = multiple ? [] : undefined;
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  // 处理多选项移除
  const handleRemoveMultiValue = (
    optionValue: string | number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (Array.isArray(selectedValue)) {
      const newValue = selectedValue.filter((item) => item !== optionValue);
      setSelectedValue(newValue);
      onChange?.(newValue);
    }
  };

  // 处理搜索输入
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // 过滤选项
  const filteredOptions = searchValue
    ? options.filter(
        (option) =>
          option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
          option.groupTitle ||
          (option.children &&
            option.children.some((child) =>
              child.label.toLowerCase().includes(searchValue.toLowerCase())
            ))
      )
    : options;

  // 渲染选项
  const renderOptions = () => {
    if (loading) {
      return <LoadingText>{loadingMessage}</LoadingText>;
    }

    if (filteredOptions.length === 0) {
      return <NoOptions>{noOptionsMessage}</NoOptions>;
    }

    return (
      <OptionsList>
        {filteredOptions.map((option, index) => {
          if (option.children) {
            // 渲染分组
            return (
              <React.Fragment key={`group-${index}`}>
                <OptionItem
                  isSelected={false}
                  isDisabled={false}
                  isGroupTitle={true}
                >
                  {option.label}
                </OptionItem>
                {option.children.map((child, childIndex) => {
                  const isSelected = multiple
                    ? Array.isArray(selectedValue) &&
                      selectedValue.includes(child.value)
                    : selectedValue === child.value;

                  return (
                    <OptionItem
                      key={`child-${index}-${childIndex}`}
                      isSelected={isSelected}
                      isDisabled={!!child.disabled}
                      isGroupTitle={false}
                      onClick={() => handleOptionClick(child)}
                    >
                      {child.label}
                    </OptionItem>
                  );
                })}
              </React.Fragment>
            );
          } else {
            // 渲染普通选项
            const isSelected = multiple
              ? Array.isArray(selectedValue) &&
                selectedValue.includes(option.value)
              : selectedValue === option.value;

            return (
              <OptionItem
                key={`option-${index}`}
                isSelected={isSelected}
                isDisabled={!!option.disabled}
                isGroupTitle={!!option.groupTitle}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </OptionItem>
            );
          }
        })}
      </OptionsList>
    );
  };

  // 渲染选中的值
  const renderValue = () => {
    if (
      !selectedValue ||
      (Array.isArray(selectedValue) && selectedValue.length === 0)
    ) {
      return <Placeholder>{placeholder}</Placeholder>;
    }

    if (multiple && Array.isArray(selectedValue)) {
      return (
        <ValueContainer>
          {selectedValue.map((val) => {
            const option =
              options.find((opt) => opt.value === val) ||
              options
                .flatMap((opt) => opt.children || [])
                .find((child) => child.value === val);

            if (!option) return null;

            return (
              <MultiValueContainer key={val}>
                <MultiValueLabel>{option.label}</MultiValueLabel>
                {!disabled && (
                  <MultiValueRemove
                    onClick={(e) => handleRemoveMultiValue(val, e)}
                    tabIndex={-1}
                  >
                    ✕
                  </MultiValueRemove>
                )}
              </MultiValueContainer>
            );
          })}
        </ValueContainer>
      );
    }

    // 单选
    const option =
      options.find((opt) => opt.value === selectedValue) ||
      options
        .flatMap((opt) => opt.children || [])
        .find((child) => child.value === selectedValue);

    return option ? <SelectedValue>{option.label}</SelectedValue> : null;
  };

  // 是否显示清除按钮
  const showClearButton =
    clearable &&
    !disabled &&
    ((multiple && Array.isArray(selectedValue) && selectedValue.length > 0) ||
      (!multiple && selectedValue !== undefined && selectedValue !== null));

  // 是否有错误
  const hasError = !!error;

  if (hidden) return null;

  return (
    <SelectContainer
      ref={containerRef}
      className={className}
      style={style}
      hasError={hasError}
      disabled={disabled}
      isOpen={isOpen}
    >
      <SelectHeader onClick={handleToggleDropdown} disabled={disabled}>
        {renderValue()}

        <div style={{ display: "flex", alignItems: "center" }}>
          {showClearButton && (
            <ClearButton type="button" onClick={handleClear} tabIndex={-1}>
              ✕
            </ClearButton>
          )}
          <ArrowIcon isOpen={isOpen}>▼</ArrowIcon>
        </div>
      </SelectHeader>

      <DropdownContainer isOpen={isOpen}>
        {searchable && (
          <SearchInput
            ref={searchInputRef}
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="搜索..."
            onClick={(e) => e.stopPropagation()}
          />
        )}
        {renderOptions()}
      </DropdownContainer>
    </SelectContainer>
  );
});

Select.displayName = "Select";

export default Select;

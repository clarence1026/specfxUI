/**
 * 表单组件样式
 * 使用主题系统中定义的颜色和样式规范
 */
import { css } from "styled-components";
import { defaultTheme } from "../../styles/theme";

// 从主题中获取颜色
const { primary, error, disabled, lightGray, white, black } =
  defaultTheme.colors;

// 从主题中获取边框样式
const { radius } = defaultTheme.border;

/**
 * 表单容器样式
 */
export const formContainerStyles = css`
  &.form-horizontal {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &.form-vertical {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &.form-inline {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
    align-items: flex-start;
  }
`;

/**
 * 表单项样式
 */
export const formItemStyles = css`
  &.form-item {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &.form-item-horizontal {
    flex-direction: row;
    align-items: flex-start;
  }

  &.form-item-vertical {
    flex-direction: column;
  }

  &.form-item-inline {
    width: auto;
    margin-right: 16px;
    margin-bottom: 0;
  }

  &.form-item-has-error .form-item-label {
    color: ${error.hex};
  }

  & .form-item-label {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    color: ${black.hex};
  }

  &.form-item-horizontal .form-item-label {
    margin-right: 16px;
    margin-bottom: 0;
    padding-top: 7px;
  }

  &.form-item-required .form-item-label::before {
    content: "*";
    color: ${error.hex};
    margin-right: 4px;
  }

  & .form-item-control {
    flex: 1;
    min-width: 0;
  }

  & .form-item-error {
    color: ${error.hex};
    font-size: 12px;
    margin-top: 4px;
    min-height: 18px;
  }
`;

/**
 * 表单字段基础样式
 */
export const formFieldBaseStyles = css`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid ${lightGray.hex};
  border-radius: ${radius};
  background-color: ${white.hex};
  transition: all 0.3s;

  &:hover {
    border-color: ${primary.hex};
  }

  &:focus {
    border-color: ${primary.hex};
    outline: none;
    box-shadow: 0 0 0 2px
      rgba(${primary.rgb[0]}, ${primary.rgb[1]}, ${primary.rgb[2]}, 0.2);
  }

  &.field-disabled {
    background-color: ${disabled.hex};
    cursor: not-allowed;
    opacity: 0.7;
  }

  &.field-error {
    border-color: ${error.hex};
  }

  &.field-error:focus {
    box-shadow: 0 0 0 2px
      rgba(${error.rgb[0]}, ${error.rgb[1]}, ${error.rgb[2]}, 0.2);
  }
`;

/**
 * 文本输入框样式
 */
export const textFieldStyles = css`
  ${formFieldBaseStyles}
  height: 36px;
`;

/**
 * 文本域样式
 */
export const textAreaStyles = css`
  ${formFieldBaseStyles}
  min-height: 80px;
  resize: vertical;
`;

/**
 * 选择框样式
 */
export const selectStyles = css`
  ${formFieldBaseStyles}
  height: 36px;
  appearance: none;
  padding-right: 30px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 8.825L1.175 4 2.05 3.125 6 7.075 9.95 3.125 10.825 4z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
`;

/**
 * 复选框样式
 */
export const checkboxStyles = css`
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  & input[type="checkbox"] {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    cursor: pointer;
  }

  &.checkbox-disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &.checkbox-disabled input[type="checkbox"] {
    cursor: not-allowed;
  }
`;

/**
 * 单选框样式
 */
export const radioStyles = css`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-right: 16px;

  & input[type="radio"] {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    cursor: pointer;
  }

  &.radio-disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &.radio-disabled input[type="radio"] {
    cursor: not-allowed;
  }
`;

/**
 * 单选框组样式
 */
export const radioGroupStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

/**
 * 开关样式
 */
export const switchStyles = css`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;

  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  & .switch-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${lightGray.hex};
    transition: 0.4s;
    border-radius: 34px;
  }

  & .switch-slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 2px;
    bottom: 2px;
    background-color: ${white.hex};
    transition: 0.4s;
    border-radius: 50%;
  }

  & input:checked + .switch-slider {
    background-color: ${primary.hex};
  }

  & input:focus + .switch-slider {
    box-shadow: 0 0 1px ${primary.hex};
  }

  & input:checked + .switch-slider:before {
    transform: translateX(22px);
  }

  &.switch-disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &.switch-disabled .switch-slider {
    cursor: not-allowed;
  }
`;

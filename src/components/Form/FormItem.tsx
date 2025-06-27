/**
 * 表单项组件
 * 提供表单字段的布局、标签、错误信息展示等功能
 */
import React, {
  useContext,
  useCallback,
  cloneElement,
  isValidElement,
  ReactElement,
} from "react";
import classNames from "classnames";
import { FormItemProps, FormFieldBaseProps } from "./types";
import { FormContext } from "./Form";
import styles from "./Form.module.scss";

// 扩展表单字段属性，添加onBlur属性
interface ExtendedFormFieldProps extends FormFieldBaseProps {
  onBlur?: () => void;
}

const FormItem: React.FC<FormItemProps> = ({
  name,
  label,
  labelId,
  labelValues,
  required = false,
  error,
  help,
  helpId,
  validator,
  children,
  className,
  style,
}) => {
  const {
    values,
    errors,
    touched,
    disabled,
    layout,
    labelWidth,
    labelAlign,
    requiredMark,
    setFieldValue,
    setFieldError,
    setFieldTouched,
  } = useContext(FormContext);

  // 判断是否显示错误信息
  const showError = name ? !!errors[name] && touched[name] : !!error;

  // 获取错误信息
  const errorMessage = name ? errors[name] : error;

  // 处理字段值变更
  const handleChange = useCallback(
    (value: any) => {
      if (!name) return;

      setFieldValue(name, value);
      setFieldTouched(name, true);

      // 如果有验证器，则进行验证
      if (validator) {
        const validationError = validator(value);
        setFieldError(name, validationError);
      }
    },
    [name, setFieldError, setFieldTouched, setFieldValue, validator]
  );

  // 渲染子组件
  const renderChildren = () => {
    if (!isValidElement(children)) return children;

    // 获取字段值
    const value = name ? values[name] : undefined;

    // 克隆子组件并注入属性
    const childProps = (children as ReactElement<ExtendedFormFieldProps>).props;
    const childDisabled = childProps.disabled;
    const childRequired = childProps.required;
    const childOnChange = childProps.onChange;
    const childOnBlur = childProps.onBlur;

    const newProps: Partial<ExtendedFormFieldProps> = {
      name,
      value,
      error: errorMessage,
      disabled: disabled || childDisabled,
      required: required || childRequired,
    };

    if (childOnChange) {
      newProps.onChange = (val: any) => {
        handleChange(val);
        childOnChange(val);
      };
    } else {
      newProps.onChange = handleChange;
    }

    if (name) {
      newProps.onBlur = () => {
        setFieldTouched(name, true);
        if (childOnBlur) childOnBlur();
      };
    } else if (childOnBlur) {
      newProps.onBlur = childOnBlur;
    }

    return cloneElement(children as ReactElement, newProps);
  };

  // 是否显示必填标记
  const showRequired =
    requiredMark &&
    (required ||
      (children as ReactElement<ExtendedFormFieldProps>)?.props?.required ||
      false);

  // 构建类名
  const formItemClassNames = classNames(
    styles.formItem,
    styles[`${layout}`],
    {
      [styles.hasError]: showError,
      [styles.required]: showRequired,
    },
    className
  );

  // 标签样式
  const labelStyle = {
    ...(labelWidth && {
      width: typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth,
    }),
    ...(labelAlign && { textAlign: labelAlign }),
  };

  return (
    <div className={formItemClassNames} style={style}>
      {label && (
        <label className={styles.formItemLabel} style={labelStyle}>
          {label}
        </label>
      )}
      <div className={styles.formItemControl}>
        {renderChildren()}
        {showError && typeof errorMessage === "string" && (
          <div className={styles.formItemError}>{errorMessage}</div>
        )}
        {help && <div className={styles.formItemHelp}>{help}</div>}
      </div>
    </div>
  );
};

export default FormItem;

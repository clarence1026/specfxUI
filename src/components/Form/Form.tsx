/**
 * 表单组件
 * 提供表单数据管理、验证和提交功能
 */
import React, { createContext, useState, useCallback, useMemo } from "react";
import classNames from "classnames";
import { FormProps, FormFieldError } from "./types";
import styles from "./Form.module.scss";

interface FormContextValue {
  values: Record<string, any>;
  errors: Record<string, FormFieldError>;
  touched: Record<string, boolean>;
  disabled: boolean;
  layout: "horizontal" | "vertical" | "inline";
  labelWidth?: number | string;
  labelAlign?: "left" | "right";
  requiredMark: boolean;
  setFieldValue: (name: string, value: any) => void;
  setFieldError: (name: string, error: FormFieldError) => void;
  setFieldTouched: (name: string, isTouched: boolean) => void;
  validateField: (name: string) => FormFieldError | null;
  resetForm: () => void;
}

export const FormContext = createContext<FormContextValue>({
  values: {},
  errors: {},
  touched: {},
  disabled: false,
  layout: "horizontal",
  requiredMark: true,
  setFieldValue: () => {},
  setFieldError: () => {},
  setFieldTouched: () => {},
  validateField: () => null,
  resetForm: () => {},
});

const Form: React.FC<FormProps> = ({
  initialValues = {},
  onSubmit,
  onValidateFailed,
  layout = "horizontal",
  labelWidth,
  labelAlign = "left",
  disabled = false,
  requiredMark = true,
  children,
  className,
  style,
}) => {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, FormFieldError>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const setFieldValue = useCallback((name: string, value: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const setFieldError = useCallback((name: string, error: FormFieldError) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  }, []);

  const setFieldTouched = useCallback((name: string, isTouched: boolean) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: isTouched,
    }));
  }, []);

  const validateField = useCallback(
    (name: string) => {
      // 验证逻辑将在表单项中实现
      return errors[name] || null;
    },
    [errors]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      // 检查是否有错误
      const hasErrors = Object.values(errors).some((error) => !!error);

      if (hasErrors) {
        onValidateFailed?.(errors);
        return;
      }

      onSubmit?.(values);
    },
    [errors, onSubmit, onValidateFailed, values]
  );

  const contextValue = useMemo(
    () => ({
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
      validateField,
      resetForm,
    }),
    [
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
      validateField,
      resetForm,
    ]
  );

  const formClassNames = classNames(
    styles.formContainer,
    styles[layout],
    className
  );

  return (
    <FormContext.Provider value={contextValue}>
      <form className={formClassNames} style={style} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;

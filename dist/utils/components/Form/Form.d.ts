/**
 * 表单组件
 * 提供表单数据管理、验证和提交功能
 */
import React from "react";
import { FormProps, FormFieldError } from "./types";
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
export declare const FormContext: React.Context<FormContextValue>;
declare const Form: React.FC<FormProps>;
export default Form;

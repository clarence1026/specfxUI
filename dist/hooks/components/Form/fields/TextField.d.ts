/**
 * 文本输入框组件
 * 提供基础的文本输入功能，支持不同类型的输入
 */
import React from "react";
import { TextFieldProps } from "../types";
/**
 * 文本输入框组件
 */
declare const TextField: React.ForwardRefExoticComponent<TextFieldProps & React.RefAttributes<HTMLInputElement>>;
export default TextField;

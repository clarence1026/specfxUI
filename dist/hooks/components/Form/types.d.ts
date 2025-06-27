/**
 * 表单组件类型定义
 */
import { ReactNode } from "react";
/**
 * 表单字段错误类型
 */
export type FormFieldError = string | string[] | Record<string, any> | boolean | null;
/**
 * 表单字段值类型
 */
export type FormFieldValue = string | number | boolean | null | undefined | Array<string | number>;
/**
 * 表单字段变更处理函数
 */
export type FormFieldChangeHandler = (value: FormFieldValue) => void;
/**
 * 表单字段验证函数
 */
export type FormFieldValidator = (value: FormFieldValue) => FormFieldError | null;
/**
 * 表单字段基础属性
 */
export interface FormFieldBaseProps {
    /**
     * 字段名称
     */
    name: string;
    /**
     * 字段值
     */
    value?: FormFieldValue;
    /**
     * 字段标签
     */
    label?: string;
    /**
     * 字段标签国际化ID
     */
    labelId?: string;
    /**
     * 字段标签国际化值
     */
    labelValues?: Record<string, any>;
    /**
     * 字段错误信息
     */
    error?: FormFieldError;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 是否必填
     */
    required?: boolean;
    /**
     * 占位符文本
     */
    placeholder?: string;
    /**
     * 自动完成属性
     */
    autoComplete?: string;
    /**
     * 是否隐藏
     */
    hidden?: boolean;
    /**
     * 是否加载中
     */
    loading?: boolean;
    /**
     * 字段变更处理函数
     */
    onChange: FormFieldChangeHandler;
    /**
     * 自定义类名
     */
    className?: string;
    /**
     * 自定义样式
     */
    style?: React.CSSProperties;
    /**
     * 帮助文本
     */
    help?: ReactNode;
    /**
     * 帮助文本国际化ID
     */
    helpId?: string;
    /**
     * 验证器
     */
    validator?: FormFieldValidator;
    /**
     * 自动填充处理函数
     */
    onAutofill?: (animationName: string) => void;
}
/**
 * 文本输入框属性
 */
export interface TextFieldProps extends FormFieldBaseProps {
    /**
     * 输入框类型
     */
    type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search" | "date";
    /**
     * 最大长度
     */
    maxLength?: number;
    /**
     * 最小长度
     */
    minLength?: number;
    /**
     * 前缀
     */
    prefix?: ReactNode;
    /**
     * 后缀
     */
    suffix?: ReactNode;
    /**
     * 是否允许清除
     */
    allowClear?: boolean;
    /**
     * 是否显示字数统计
     */
    showCount?: boolean;
}
/**
 * 文本域属性
 */
export interface TextAreaProps extends Omit<TextFieldProps, "type" | "prefix" | "suffix"> {
    /**
     * 行数
     */
    rows?: number;
    /**
     * 是否自动调整高度
     */
    autoSize?: boolean | {
        minRows?: number;
        maxRows?: number;
    };
}
/**
 * 选择框选项
 */
export interface SelectOption {
    /**
     * 选项值
     */
    value: string | number;
    /**
     * 选项标签
     */
    label: string;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 分组标题
     */
    groupTitle?: boolean;
    /**
     * 子选项
     */
    children?: SelectOption[];
}
/**
 * 选择框属性
 */
export interface SelectProps extends FormFieldBaseProps {
    /**
     * 选项列表
     */
    options: SelectOption[];
    /**
     * 是否支持搜索
     */
    searchable?: boolean;
    /**
     * 是否支持多选
     */
    multiple?: boolean;
    /**
     * 是否支持清除
     */
    clearable?: boolean;
    /**
     * 是否支持创建新选项
     */
    creatable?: boolean;
    /**
     * 加载状态
     */
    loading?: boolean;
    /**
     * 无数据文本
     */
    noOptionsMessage?: string;
    /**
     * 加载中文本
     */
    loadingMessage?: string;
}
/**
 * 复选框属性
 */
export interface CheckboxProps extends Omit<FormFieldBaseProps, "value"> {
    /**
     * 是否选中
     */
    checked?: boolean;
    /**
     * 中间状态
     */
    indeterminate?: boolean;
}
/**
 * 单选框属性
 */
export interface RadioProps extends Omit<FormFieldBaseProps, "value"> {
    /**
     * 是否选中
     */
    checked?: boolean;
    /**
     * 单选框值
     */
    value: string | number;
}
/**
 * 单选组选项
 */
export interface RadioOption {
    /**
     * 选项值
     */
    value: string | number;
    /**
     * 选项标签
     */
    label: string;
    /**
     * 是否禁用
     */
    disabled?: boolean;
}
/**
 * 单选组属性
 */
export interface RadioGroupProps extends Omit<FormFieldBaseProps, "onChange"> {
    /**
     * 选项列表
     */
    options: RadioOption[];
    /**
     * 选中值
     */
    value?: string | number;
    /**
     * 变更处理函数
     */
    onChange: (value: string | number) => void;
    /**
     * 排列方向
     */
    direction?: "horizontal" | "vertical";
}
/**
 * 开关属性
 */
export interface SwitchProps extends Omit<FormFieldBaseProps, "value"> {
    /**
     * 是否选中
     */
    checked?: boolean;
    /**
     * 选中文本
     */
    checkedText?: string;
    /**
     * 非选中文本
     */
    uncheckedText?: string;
    /**
     * 尺寸
     */
    size?: "small" | "default" | "large";
}
/**
 * 日期选择器属性
 */
export interface DatePickerProps extends Omit<FormFieldBaseProps, "value" | "onChange"> {
    /**
     * 日期值
     */
    value?: Date | string | null;
    /**
     * 变更处理函数
     */
    onChange: (date: Date | null) => void;
    /**
     * 日期格式
     */
    format?: string;
    /**
     * 是否显示今天按钮
     */
    showToday?: boolean;
    /**
     * 是否显示时间选择
     */
    showTime?: boolean;
    /**
     * 最小日期
     */
    minDate?: Date | string;
    /**
     * 最大日期
     */
    maxDate?: Date | string;
}
/**
 * 日期范围选择器属性
 */
export interface DateRangePickerProps extends Omit<FormFieldBaseProps, "value" | "onChange"> {
    /**
     * 日期范围值
     */
    value?: [Date | string | null, Date | string | null];
    /**
     * 变更处理函数
     */
    onChange: (dates: [Date | null, Date | null]) => void;
    /**
     * 日期格式
     */
    format?: string;
    /**
     * 是否显示时间选择
     */
    showTime?: boolean;
    /**
     * 最小日期
     */
    minDate?: Date | string;
    /**
     * 最大日期
     */
    maxDate?: Date | string;
    /**
     * 开始日期占位符
     */
    startPlaceholder?: string;
    /**
     * 结束日期占位符
     */
    endPlaceholder?: string;
}
/**
 * 文件上传属性
 */
export interface FileUploadProps extends Omit<FormFieldBaseProps, "value" | "onChange"> {
    /**
     * 文件列表
     */
    fileList?: File[];
    /**
     * 变更处理函数
     */
    onChange: (fileList: File[]) => void;
    /**
     * 是否支持多选
     */
    multiple?: boolean;
    /**
     * 接受的文件类型
     */
    accept?: string;
    /**
     * 最大文件大小(字节)
     */
    maxSize?: number;
    /**
     * 最大文件数量
     */
    maxCount?: number;
    /**
     * 上传按钮文本
     */
    uploadText?: string;
    /**
     * 上传按钮图标
     */
    uploadIcon?: ReactNode;
    /**
     * 自定义上传请求
     */
    customRequest?: (options: any) => void;
    /**
     * 文件列表类型
     */
    listType?: "text" | "picture" | "picture-card";
}
/**
 * 表单属性
 */
export interface FormProps {
    /**
     * 表单初始值
     */
    initialValues?: Record<string, any>;
    /**
     * 表单提交处理函数
     */
    onSubmit?: (values: Record<string, any>) => void;
    /**
     * 表单验证失败处理函数
     */
    onValidateFailed?: (errors: Record<string, FormFieldError>) => void;
    /**
     * 表单布局
     */
    layout?: "horizontal" | "vertical" | "inline";
    /**
     * 标签宽度
     */
    labelWidth?: number | string;
    /**
     * 标签对齐方式
     */
    labelAlign?: "left" | "right";
    /**
     * 是否禁用所有字段
     */
    disabled?: boolean;
    /**
     * 是否显示必填星号
     */
    requiredMark?: boolean;
    /**
     * 表单内容
     */
    children?: ReactNode;
    /**
     * 自定义类名
     */
    className?: string;
    /**
     * 自定义样式
     */
    style?: React.CSSProperties;
}
/**
 * 表单项属性
 */
export interface FormItemProps {
    /**
     * 字段名称
     */
    name?: string;
    /**
     * 字段标签
     */
    label?: string;
    /**
     * 字段标签国际化ID
     */
    labelId?: string;
    /**
     * 字段标签国际化值
     */
    labelValues?: Record<string, any>;
    /**
     * 是否必填
     */
    required?: boolean;
    /**
     * 字段错误信息
     */
    error?: FormFieldError;
    /**
     * 帮助文本
     */
    help?: ReactNode;
    /**
     * 帮助文本国际化ID
     */
    helpId?: string;
    /**
     * 验证器
     */
    validator?: FormFieldValidator;
    /**
     * 表单项内容
     */
    children?: ReactNode;
    /**
     * 自定义类名
     */
    className?: string;
    /**
     * 自定义样式
     */
    style?: React.CSSProperties;
}

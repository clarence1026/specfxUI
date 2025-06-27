/**
 * Modal组件
 * 基于原始speccapitals-crm项目中的BasicModal组件进行改进
 * 提供可定制的模态对话框功能
 */
import React from "react";
export interface ModalProps {
    /**
     * 是否显示关闭按钮
     */
    showClose?: boolean;
    /**
     * 模态框是否打开
     */
    isOpen: boolean;
    /**
     * 标题文本
     */
    title?: string;
    /**
     * 标题国际化ID
     */
    titleId?: string;
    /**
     * 标题国际化值
     */
    titleValues?: Record<string, any>;
    /**
     * 描述文本
     */
    description?: string | string[];
    /**
     * 描述国际化ID
     */
    descriptionId?: string;
    /**
     * 关闭模态框的回调函数
     */
    onClose: () => void;
    /**
     * 模态框内容
     */
    children?: React.ReactNode;
    /**
     * 是否为错误模态框
     */
    error?: boolean;
    /**
     * 遮罩层的自定义类名
     */
    overlayClassName?: string;
    /**
     * 模态框的自定义类名
     */
    modalClassName?: string;
    /**
     * 模态框宽度
     */
    width?: string | number;
    /**
     * 模态框最大高度
     */
    maxHeight?: string | number;
    /**
     * 模态框内边距
     */
    padding?: string | number;
    /**
     * 是否居中显示
     */
    centered?: boolean;
    /**
     * 是否允许点击遮罩层关闭
     */
    closeOnOverlayClick?: boolean;
    /**
     * 是否允许按ESC键关闭
     */
    closeOnEsc?: boolean;
    /**
     * 模态框打开后的回调
     */
    afterOpen?: () => void;
    /**
     * 模态框关闭后的回调
     */
    afterClose?: () => void;
    /**
     * 模态框大小，可选值：sm, md, lg, xl
     */
    size?: "sm" | "md" | "lg" | "xl";
    /**
     * 确认按钮文本
     */
    confirmText?: string;
    /**
     * 取消按钮文本
     */
    cancelText?: string;
    /**
     * 确认按钮回调函数
     */
    onConfirm?: () => void;
    /**
     * 是否显示底部按钮
     */
    showFooter?: boolean;
    /**
     * 自定义底部内容
     */
    footer?: React.ReactNode;
    /**
     * 是否显示确认按钮
     */
    showConfirmButton?: boolean;
    /**
     * 是否显示取消按钮
     */
    showCancelButton?: boolean;
    /**
     * 确认按钮是否为主要按钮
     */
    confirmButtonPrimary?: boolean;
    /**
     * 确认按钮是否为危险按钮
     */
    confirmButtonDanger?: boolean;
    /**
     * 确认按钮是否禁用
     */
    confirmButtonDisabled?: boolean;
    /**
     * 取消按钮是否为主要按钮
     */
    cancelButtonPrimary?: boolean;
    /**
     * 自定义样式
     */
    className?: string;
    /**
     * 是否为全屏模态框
     */
    fullScreen?: boolean;
    /**
     * 是否为静态模态框（点击遮罩层不关闭）
     */
    static?: boolean;
    /**
     * 是否为可拖动模态框
     */
    draggable?: boolean;
    /**
     * 是否为可调整大小的模态框
     */
    resizable?: boolean;
    /**
     * 模态框层级
     */
    zIndex?: number;
    /**
     * 模态框动画持续时间
     */
    animationDuration?: number;
    /**
     * 模态框打开动画
     */
    openAnimation?: string;
    /**
     * 模态框关闭动画
     */
    closeAnimation?: string;
    /**
     * 模态框位置
     */
    position?: "top" | "center" | "bottom";
    /**
     * 是否为警告模态框
     */
    isWarning?: boolean;
    /**
     * 是否为成功模态框
     */
    isSuccess?: boolean;
    /**
     * 是否为信息模态框
     */
    isInfo?: boolean;
}
/**
 * Modal组件
 * 提供可定制的模态对话框功能
 */
export declare const Modal: React.FC<ModalProps>;
export default Modal;

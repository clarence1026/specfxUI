/**
 * 确认模态框组件
 * 基于Modal组件，提供确认/取消操作的模态框
 */
import React from "react";
import { ModalProps } from "./Modal";
export interface ConfirmModalProps extends Omit<ModalProps, "children"> {
    /**
     * 确认消息内容
     */
    message: React.ReactNode;
    /**
     * 确认按钮文本
     */
    confirmText?: string;
    /**
     * 取消按钮文本
     */
    cancelText?: string;
    /**
     * 确认回调函数
     */
    onConfirm?: () => void;
    /**
     * 取消回调函数
     */
    onCancel?: () => void;
    /**
     * 是否为危险操作确认
     */
    danger?: boolean;
    /**
     * 是否禁用确认按钮
     */
    confirmDisabled?: boolean;
}
/**
 * 确认模态框组件
 */
export declare const ConfirmModal: React.FC<ConfirmModalProps>;
export default ConfirmModal;

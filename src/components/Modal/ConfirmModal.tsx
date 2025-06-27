/**
 * 确认模态框组件
 * 基于Modal组件，提供确认/取消操作的模态框
 */
import React, { useCallback } from "react";
import { Modal, ModalProps } from "./Modal";
import { Button } from "../Button";
import { confirmModalStyles } from "./styles";

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
export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = "确认操作",
  message,
  confirmText = "确认",
  cancelText = "取消",
  onConfirm,
  onCancel,
  onClose,
  danger = false,
  confirmDisabled = false,
  ...rest
}) => {
  const handleConfirm = useCallback(() => {
    if (onConfirm) {
      onConfirm();
    }
  }, [onConfirm]);

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
    if (onClose) {
      onClose();
    }
  }, [onCancel, onClose]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        title={title}
        onClose={handleCancel}
        className={`confirm-modal ${danger ? "danger-modal" : ""}`}
        {...rest}
      >
        <div className="confirm-modal-body">
          <p className="confirm-modal-message">{message}</p>
        </div>
        <div className="confirm-modal-footer">
          <Button onClick={handleCancel} buttonType="secondary">
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            buttonType="primary"
            color={danger ? "danger" : undefined}
            disabled={confirmDisabled}
          >
            {confirmText}
          </Button>
        </div>
      </Modal>
      {React.createElement("style", {
        dangerouslySetInnerHTML: { __html: confirmModalStyles.toString() },
      })}
    </>
  );
};

export default ConfirmModal;

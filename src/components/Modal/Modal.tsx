/**
 * Modal组件
 * 基于原始speccapitals-crm项目中的BasicModal组件进行改进
 * 提供可定制的模态对话框功能
 */
import React, { useState, useEffect, useCallback } from "react";
import ReactModal from "react-modal";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { useTheme } from "../../styles/theme";
import { modalStyles } from "./styles";
import { Button } from "../Button";

// 确保在浏览器环境中设置Modal的根元素
if (typeof window !== "undefined") {
  ReactModal.setAppElement("#root");
}

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
export const Modal: React.FC<ModalProps> = ({
  showClose = true,
  isOpen,
  title,
  titleId,
  titleValues,
  description,
  descriptionId,
  onClose,
  children,
  error = false,
  overlayClassName = "",
  modalClassName = "",
  width = "auto",
  maxHeight = "calc(100vh - 80px)",
  padding = "30px",
  centered = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  afterOpen,
  afterClose,
  size = "md",
  confirmText = "确认",
  cancelText = "取消",
  onConfirm,
  showFooter = true,
  footer,
  showConfirmButton = true,
  showCancelButton = true,
  confirmButtonPrimary = true,
  confirmButtonDanger = false,
  confirmButtonDisabled = false,
  cancelButtonPrimary = false,
  className = "",
  fullScreen = false,
  static: isStatic = false,
  draggable = true,
  resizable = true,
  zIndex,
  animationDuration,
  openAnimation,
  closeAnimation,
  position = "center",
  isWarning = false,
  isSuccess = false,
  isInfo = false,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);
  const theme = useTheme();

  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const handleConfirm = useCallback(() => {
    if (onConfirm) {
      onConfirm();
    }
  }, [onConfirm]);

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "modal-sm";
      case "lg":
        return "modal-lg";
      case "xl":
        return "modal-xl";
      default:
        return "";
    }
  };

  const getStatusClass = () => {
    if (error) return "modal-error";
    if (isWarning) return "modal-warning";
    if (isSuccess) return "modal-success";
    if (isInfo) return "modal-info";
    return "";
  };

  const modalClasses = [
    "modal-content",
    getSizeClass(),
    getStatusClass(),
    fullScreen ? "modal-fullscreen" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const overlayClasses = [
    "modal-overlay",
    centered ? "modal-centered" : "",
    !closeOnOverlayClick ? "modal-no-overlay" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // 创建符合 react-modal 的样式对象
  const modalStyles = {
    content: {
      width: typeof width === "number" ? `${width}px` : width,
      maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
      padding: typeof padding === "number" ? `${padding}px` : padding,
    },
  };

  return (
    <>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={isStatic ? undefined : handleClose}
        className={modalClasses}
        overlayClassName={overlayClasses}
        shouldCloseOnOverlayClick={!isStatic && closeOnOverlayClick}
        shouldCloseOnEsc={!isStatic && closeOnEsc}
        onAfterOpen={afterOpen}
        onAfterClose={afterClose}
        style={modalStyles}
      >
        {showClose && (
          <button
            className="modal-close-button"
            type="button"
            onClick={handleClose}
            aria-label="关闭"
          >
            ×
          </button>
        )}

        {(title || titleId) && (
          <h2 className="modal-title">
            {title ||
              (titleId && (
                <FormattedMessage id={titleId} defaultMessage={titleId} />
              ))}
          </h2>
        )}

        {description &&
          (Array.isArray(description) ? (
            description.map((desc, index) => (
              <p
                key={`sc-modal-description-${index}`}
                className="sc-modal-description"
              >
                {desc}
              </p>
            ))
          ) : (
            <p className="sc-modal-description">{description}</p>
          ))}

        {descriptionId && (
          <p className="sc-modal-description">
            <FormattedMessage id={descriptionId} />
          </p>
        )}

        <div className="modal-body">{children}</div>

        {showFooter &&
          (footer || (
            <div className="modal-footer">
              {showCancelButton && (
                <Button
                  onClick={handleClose}
                  buttonType={cancelButtonPrimary ? "primary" : "secondary"}
                >
                  {cancelText}
                </Button>
              )}
              {showConfirmButton && (
                <Button
                  onClick={handleConfirm}
                  buttonType={confirmButtonPrimary ? "primary" : "secondary"}
                  color={confirmButtonDanger ? "danger" : undefined}
                  disabled={confirmButtonDisabled}
                >
                  {confirmText}
                </Button>
              )}
            </div>
          ))}
      </ReactModal>

      {React.createElement("style", {
        dangerouslySetInnerHTML: { __html: modalStyles.toString() },
      })}
    </>
  );
};

export default Modal;

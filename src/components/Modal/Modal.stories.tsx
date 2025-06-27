/**
 * 模态框组件的故事书示例
 */
import React, { useState } from "react";
import { Story, Meta } from "@storybook/react";
import { Modal, ModalProps } from "./Modal";
import { ConfirmModal } from "./ConfirmModal";
import { Button } from "../Button";

export default {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    docs: {
      description: {
        component:
          "模态框组件，用于创建模态对话框，在当前页面打开一个浮层，承载相关操作或信息展示。",
      },
    },
  },
} as Meta;

// 基础模态框模板
const BasicModalTemplate: Story<ModalProps & { buttonText: string }> = ({
  buttonText,
  ...args
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{buttonText}</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

// 基础模态框
export const Basic = BasicModalTemplate.bind({});
Basic.args = {
  buttonText: "打开基础模态框",
  title: "基础模态框",
  description: "这是一个基础的模态框示例，可以包含任意内容。",
  children: (
    <div style={{ padding: "20px 0" }}>
      <p>模态框内容区域</p>
    </div>
  ),
};
Basic.parameters = {
  docs: {
    description: {
      story: "基础模态框示例，展示标题、描述和内容。",
    },
  },
};

// 错误模态框
export const Error = BasicModalTemplate.bind({});
Error.args = {
  buttonText: "打开错误模态框",
  title: "错误提示",
  description: "操作失败，请重试",
  error: true,
  children: (
    <div style={{ padding: "20px 0" }}>
      <p>详细错误信息...</p>
    </div>
  ),
};
Error.parameters = {
  docs: {
    description: {
      story: "错误模态框示例，用于展示错误信息。",
    },
  },
};

// 自定义尺寸模态框
export const CustomSize = BasicModalTemplate.bind({});
CustomSize.args = {
  buttonText: "打开自定义尺寸模态框",
  title: "自定义尺寸",
  width: "800px",
  maxHeight: "600px",
  padding: "40px",
  children: (
    <div style={{ padding: "20px 0" }}>
      <p>宽度为800px的模态框</p>
      <p>可以通过width、maxHeight和padding属性自定义模态框的尺寸和内边距</p>
    </div>
  ),
};
CustomSize.parameters = {
  docs: {
    description: {
      story: "自定义尺寸的模态框示例。",
    },
  },
};

// 确认模态框
const ConfirmModalTemplate: Story<any> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{args.buttonText}</Button>
      <ConfirmModal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOk={() => {
          console.log("确认操作");
          setIsOpen(false);
        }}
      />
    </>
  );
};

export const Confirm = ConfirmModalTemplate.bind({});
Confirm.args = {
  buttonText: "打开确认模态框",
  title: "确认操作",
  description: "确定要执行此操作吗？",
  okText: "确定",
  cancelText: "取消",
  content: (
    <div style={{ padding: "20px 0" }}>
      <p>这是一个确认操作的模态框，包含确认和取消按钮。</p>
    </div>
  ),
};
Confirm.parameters = {
  docs: {
    description: {
      story: "确认模态框示例，包含确认和取消按钮。",
    },
  },
};

// 危险操作确认模态框
export const DangerConfirm = ConfirmModalTemplate.bind({});
DangerConfirm.args = {
  buttonText: "删除",
  title: "确认删除",
  description: "确定要删除这条记录吗？此操作不可撤销。",
  okButtonType: "danger",
  okText: "删除",
  cancelText: "取消",
};
DangerConfirm.parameters = {
  docs: {
    description: {
      story: "危险操作确认模态框示例，用于确认危险操作如删除。",
    },
  },
};

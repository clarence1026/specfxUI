# Modal 模态框组件

Modal 组件用于创建模态对话框，在当前页面打开一个浮层，承载相关操作或信息展示。

## 功能特点

- 支持自定义标题和内容
- 支持国际化
- 提供错误模态框样式
- 支持自定义宽度和高度
- 支持自定义关闭行为
- 提供确认模态框（ConfirmModal）快捷组件

## 基础用法

```jsx
import React, { useState } from 'react';
import { Modal, Button } from 'speccapitals-common';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Button onClick={openModal}>打开模态框</Button>
      
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="基础模态框"
        description="这是一个基础的模态框示例"
      >
        <p>模态框内容区域</p>
      </Modal>
    </>
  );
};
```

## 使用国际化

```jsx
<Modal
  isOpen={isOpen}
  onClose={closeModal}
  titleId="modal.title"
  titleValues={{ name: '用户' }}
  descriptionId="modal.description"
>
  <p>模态框内容区域</p>
</Modal>
```

## 错误模态框

```jsx
<Modal
  isOpen={isOpen}
  onClose={closeModal}
  title="错误提示"
  description="操作失败，请重试"
  error={true}
>
  <p>详细错误信息...</p>
</Modal>
```

## 自定义宽度和高度

```jsx
<Modal
  isOpen={isOpen}
  onClose={closeModal}
  title="自定义尺寸"
  width="800px"
  maxHeight="600px"
  padding="40px"
>
  <p>宽度为800px的模态框</p>
</Modal>
```

## 确认模态框

```jsx
import React, { useState } from 'react';
import { ConfirmModal, Button } from 'speccapitals-common';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
  const handleOk = () => {
    console.log('确认操作');
    closeModal();
  };

  return (
    <>
      <Button onClick={openModal}>删除</Button>
      
      <ConfirmModal
        isOpen={isOpen}
        onClose={closeModal}
        onOk={handleOk}
        title="确认删除"
        description="确定要删除这条记录吗？此操作不可撤销。"
        okButtonType="danger"
        okText="删除"
        cancelText="取消"
      />
    </>
  );
};
```

## API

### Modal

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| isOpen | 模态框是否可见 | `boolean` | - |
| onClose | 关闭模态框的回调函数 | `() => void` | - |
| title | 标题文本 | `string` | - |
| titleId | 标题国际化ID | `string` | - |
| titleValues | 标题国际化值 | `Record<string, any>` | - |
| description | 描述文本 | `string \| string[]` | - |
| descriptionId | 描述国际化ID | `string` | - |
| children | 模态框内容 | `ReactNode` | - |
| error | 是否为错误模态框 | `boolean` | `false` |
| showClose | 是否显示关闭按钮 | `boolean` | `true` |
| width | 模态框宽度 | `string \| number` | `'auto'` |
| maxHeight | 模态框最大高度 | `string \| number` | `'calc(100vh - 80px)'` |
| padding | 模态框内边距 | `string \| number` | `'30px'` |
| centered | 是否居中显示 | `boolean` | `true` |
| closeOnOverlayClick | 是否允许点击遮罩层关闭 | `boolean` | `true` |
| closeOnEsc | 是否允许按ESC键关闭 | `boolean` | `true` |
| afterOpen | 模态框打开后的回调 | `() => void` | - |
| afterClose | 模态框关闭后的回调 | `() => void` | - |
| overlayClassName | 遮罩层的自定义类名 | `string` | - |
| modalClassName | 模态框的自定义类名 | `string` | - |

### ConfirmModal

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| okText | 确认按钮文本 | `string` | - |
| okTextId | 确认按钮国际化ID | `string` | `'common.ok'` |
| cancelText | 取消按钮文本 | `string` | - |
| cancelTextId | 取消按钮国际化ID | `string` | `'common.cancel'` |
| okButtonType | 确认按钮类型 | `'primary' \| 'secondary' \| 'ghost' \| 'link' \| 'danger'` | `'primary'` |
| cancelButtonType | 取消按钮类型 | `'primary' \| 'secondary' \| 'ghost' \| 'link' \| 'danger'` | `'secondary'` |
| onOk | 确认按钮点击回调 | `() => void` | - |
| onCancel | 取消按钮点击回调 | `() => void` | - |
| showCancel | 是否显示取消按钮 | `boolean` | `true` |
| okLoading | 确认按钮加载状态 | `boolean` | `false` |
| okDisabled | 确认按钮禁用状态 | `boolean` | `false` |
| content | 模态框内容 | `ReactNode` | - |

此外，ConfirmModal 还支持 Modal 组件的所有属性（除了 children）。 
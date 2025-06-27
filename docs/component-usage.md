# 组件使用指南

## 组件导入方式

SpeccCapitals 组件库支持多种导入方式，您可以根据项目需求选择合适的方式。

### 导入整个组件库

```jsx
// 导入所有组件
import { Button, Table, Modal, Tooltip } from 'speccapitals-common';

// 使用组件
<Button type="primary">点击我</Button>
```

### 按需导入单个组件

```jsx
// 只导入需要的组件
import { Button } from 'speccapitals-common';
// 或者
import Button from 'speccapitals-common/Button';

// 使用组件
<Button type="primary">点击我</Button>
```

## 核心组件

### Button 按钮

Button 组件用于触发操作。

```jsx
import { Button } from 'speccapitals-common';

// 基础按钮
<Button>默认按钮</Button>

// 主要按钮
<Button type="primary">主要按钮</Button>

// 次要按钮
<Button type="secondary">次要按钮</Button>

// 危险按钮
<Button type="danger">危险按钮</Button>

// 禁用状态
<Button disabled>禁用按钮</Button>

// 加载状态
<Button loading>加载中</Button>

// 图标按钮
<Button icon="plus">添加</Button>

// 块级按钮
<Button block>块级按钮</Button>
```

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | 'default' \| 'primary' \| 'secondary' \| 'danger' | 'default' | 按钮类型 |
| size | 'small' \| 'medium' \| 'large' | 'medium' | 按钮大小 |
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否显示加载状态 |
| block | boolean | false | 是否为块级按钮 |
| icon | string | - | 图标名称 |
| onClick | (e: React.MouseEvent) => void | - | 点击事件回调 |

### Table 表格

Table 组件用于展示数据列表。

```jsx
import { Table } from 'speccapitals-common';

const columns = [
  {
    Header: '姓名',
    accessor: 'name',
  },
  {
    Header: '年龄',
    accessor: 'age',
  },
  {
    Header: '地址',
    accessor: 'address',
  },
];

const data = [
  { name: '张三', age: 25, address: '北京市' },
  { name: '李四', age: 30, address: '上海市' },
];

// 基础表格
<Table columns={columns} data={data} />

// 带分页的表格
<Table 
  columns={columns} 
  data={data} 
  pagination={{
    total: 100,
    current: 1,
    pageSize: 10,
    onChange: (page) => console.log(page)
  }}
/>

// 可选择的表格
<Table 
  columns={columns} 
  data={data} 
  selectable
  onSelect={(selectedRows) => console.log(selectedRows)}
/>
```

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| columns | Array | [] | 表格列配置 |
| data | Array | [] | 表格数据 |
| loading | boolean | false | 是否显示加载状态 |
| pagination | object | - | 分页配置 |
| selectable | boolean | false | 是否可选择 |
| onSelect | (selectedRows: any[]) => void | - | 选择回调 |

### Modal 弹窗

Modal 组件用于创建对话框和弹出层。

```jsx
import { Modal, Button } from 'speccapitals-common';
import { useState } from 'react';

function Example() {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Button onClick={() => setVisible(true)}>打开弹窗</Button>
      
      <Modal
        title="弹窗标题"
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={() => {
          console.log('确认');
          setVisible(false);
        }}
      >
        <p>这是弹窗内容</p>
      </Modal>
    </>
  );
}
```

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | ReactNode | - | 弹窗标题 |
| visible | boolean | false | 是否可见 |
| onClose | () => void | - | 关闭回调 |
| onConfirm | () => void | - | 确认回调 |
| width | string \| number | '500px' | 弹窗宽度 |
| centered | boolean | false | 是否居中显示 |
| closable | boolean | true | 是否显示关闭按钮 |
| confirmText | string | '确认' | 确认按钮文字 |
| cancelText | string | '取消' | 取消按钮文字 |
| footer | ReactNode | - | 自定义页脚 |

### Tooltip 文字提示

Tooltip 组件用于显示简短的提示信息。

```jsx
import { Tooltip, Button } from 'speccapitals-common';

// 基础提示
<Tooltip content="这是一个提示">
  <Button>鼠标悬停</Button>
</Tooltip>

// 不同位置的提示
<Tooltip content="上方提示" placement="top">
  <Button>上方</Button>
</Tooltip>

<Tooltip content="下方提示" placement="bottom">
  <Button>下方</Button>
</Tooltip>

<Tooltip content="左侧提示" placement="left">
  <Button>左侧</Button>
</Tooltip>

<Tooltip content="右侧提示" placement="right">
  <Button>右侧</Button>
</Tooltip>
```

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| content | ReactNode | - | 提示内容 |
| placement | 'top' \| 'bottom' \| 'left' \| 'right' | 'top' | 提示位置 |
| trigger | 'hover' \| 'click' | 'hover' | 触发方式 |
| visible | boolean | - | 是否可见（受控） |
| onVisibleChange | (visible: boolean) => void | - | 可见状态变化回调 |

## 表单组件

### Form 表单

Form 组件用于创建表单，支持表单验证。

```jsx
import { Form, Button } from 'speccapitals-common';

function Example() {
  const handleSubmit = (values) => {
    console.log('表单值:', values);
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item 
        label="用户名" 
        name="username" 
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Form.Input placeholder="请输入用户名" />
      </Form.Item>
      
      <Form.Item 
        label="密码" 
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Form.Input type="password" placeholder="请输入密码" />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  );
}
```

#### Form 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| initialValues | object | {} | 表单初始值 |
| onSubmit | (values: any) => void | - | 提交回调 |
| layout | 'horizontal' \| 'vertical' | 'horizontal' | 表单布局 |

#### Form.Item 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| label | ReactNode | - | 标签 |
| name | string | - | 字段名 |
| rules | Array | [] | 校验规则 |
| required | boolean | false | 是否必填 |
| valuePropName | string | 'value' | 子组件值的属性名 |
| trigger | string | 'onChange' | 子组件触发验证的事件名 |

## 更多组件

请参考 Storybook 文档查看更多组件的使用方法和示例。

## 自定义组件

如果需要自定义组件，可以使用组件库提供的基础组件和样式系统进行扩展。

```jsx
import { Button } from 'speccapitals-common';
import styled from 'styled-components';

// 自定义按钮样式
const CustomButton = styled(Button)`
  border-radius: 20px;
  background: linear-gradient(to right, #1890ff, #52c41a);
  color: white;
  
  &:hover {
    opacity: 0.8;
  }
`;

// 使用自定义按钮
<CustomButton>自定义按钮</CustomButton>
``` 
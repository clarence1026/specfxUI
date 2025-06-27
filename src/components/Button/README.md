# Button 按钮组件

按钮组件用于触发操作，如提交表单、打开对话框、取消操作或执行删除操作。

## 功能特点

- 支持多种按钮类型：主按钮、次按钮、虚线按钮、文本按钮、危险按钮
- 支持三种尺寸：小、中、大
- 支持加载状态
- 支持禁用状态
- 支持自定义图标（加号、箭头）
- 支持自定义颜色
- 支持自适应内容宽度

## 基础用法

```jsx
import React from 'react';
import { Button } from 'speccapitals-common';

const App = () => {
  return (
    <>
      <Button buttonType="primary">主按钮</Button>
      <Button buttonType="secondary">次按钮</Button>
      <Button buttonType="ghost">幽灵按钮</Button>
      <Button buttonType="link">链接按钮</Button>
      <Button buttonType="danger">危险按钮</Button>
    </>
  );
};
```

## 按钮尺寸

```jsx
<Button size="small">小按钮</Button>
<Button size="medium">中按钮</Button>
<Button size="large">大按钮</Button>
```

## 加载状态

```jsx
<Button buttonType="primary" loading={true}>加载中</Button>
```

## 禁用状态

```jsx
<Button buttonType="primary" disabled={true}>禁用按钮</Button>
```

## 带图标的按钮

```jsx
<Button plus>添加按钮</Button>
<Button arrow>下一步</Button>
```

## 自定义颜色

```jsx
<Button color="#722ed1">紫色按钮</Button>
<Button color="#13c2c2">青色按钮</Button>
<Button color="#fa8c16">橙色按钮</Button>
```

## 自适应内容宽度

```jsx
<Button fitContent>自适应宽度</Button>
```

## API

### Button

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| buttonType | 按钮类型 | `'primary' \| 'secondary' \| 'ghost' \| 'link' \| 'danger'` | `'secondary'` |
| size | 按钮大小 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| filled | 是否填充样式 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| plus | 是否显示加号图标 | `boolean` | `false` |
| arrow | 是否显示箭头图标 | `boolean` | `false` |
| next | 是否为下一步按钮 | `boolean` | `false` |
| previous | 是否为上一步按钮 | `boolean` | `false` |
| noBorder | 是否无边框 | `boolean` | `false` |
| selected | 是否选中状态 | `boolean` | `false` |
| fitContent | 是否自适应内容宽度 | `boolean` | `false` |
| isUpperCase | 是否使用大写文本 | `boolean` | `false` |
| color | 自定义按钮颜色 | `string` | - |
| children | 按钮内容 | `React.ReactNode` | - |

此外，Button 组件还支持所有原生 button 元素的属性。 
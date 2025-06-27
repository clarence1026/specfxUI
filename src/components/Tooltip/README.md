# Tooltip 文字提示组件

Tooltip 组件用于在鼠标悬停、聚焦或点击元素时显示简短的提示信息。

## 功能特点

- 支持多个位置：上、下、左、右
- 支持多种触发方式：悬停、点击、聚焦
- 可自定义显示和隐藏的延迟时间
- 支持箭头指示
- 支持禁用状态
- 支持自定义样式

## 基础用法

```jsx
import React from 'react';
import { Tooltip } from 'speccapitals-common';

const App = () => {
  return (
    <Tooltip title="这是一个提示文本">
      <span>鼠标悬停在这里</span>
    </Tooltip>
  );
};
```

## 不同位置

```jsx
<Tooltip title="顶部提示" placement="top">
  <span>顶部</span>
</Tooltip>

<Tooltip title="底部提示" placement="bottom">
  <span>底部</span>
</Tooltip>

<Tooltip title="左侧提示" placement="left">
  <span>左侧</span>
</Tooltip>

<Tooltip title="右侧提示" placement="right">
  <span>右侧</span>
</Tooltip>
```

## 不同触发方式

```jsx
<Tooltip title="悬停触发" trigger="hover">
  <span>悬停触发</span>
</Tooltip>

<Tooltip title="点击触发" trigger="click">
  <button>点击触发</button>
</Tooltip>

<Tooltip title="聚焦触发" trigger="focus">
  <input placeholder="聚焦触发" />
</Tooltip>
```

## 无箭头模式

```jsx
<Tooltip title="无箭头提示" arrow={false}>
  <span>无箭头</span>
</Tooltip>
```

## 延迟显示和隐藏

```jsx
<Tooltip 
  title="延迟显示和隐藏" 
  mouseEnterDelay={500}
  mouseLeaveDelay={500}
>
  <span>延迟效果</span>
</Tooltip>
```

## 禁用状态

```jsx
<Tooltip title="禁用状态" disabled={true}>
  <span>禁用状态</span>
</Tooltip>
```

## API

### Tooltip

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 提示文本内容 | `ReactNode` | - |
| placement | 提示框位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| children | 子元素 | `ReactNode` | - |
| arrow | 是否显示箭头 | `boolean` | `true` |
| className | 自定义类名 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| trigger | 触发方式 | `'hover' \| 'click' \| 'focus'` | `'hover'` |
| style | 自定义样式 | `React.CSSProperties` | - |
| mouseEnterDelay | 显示延迟(毫秒) | `number` | `100` |
| mouseLeaveDelay | 隐藏延迟(毫秒) | `number` | `100` |
``` 
# Table 表格组件

表格组件用于展示结构化数据，支持排序、筛选、分页、响应式等功能。该组件基于 react-table-6 进行封装，并添加了响应式支持。

## 功能特点

- 支持自定义列渲染
- 支持分页功能
- 支持排序功能
- 支持响应式布局（在移动设备上自动切换为卡片式布局）
- 支持导出功能（XLS、CSV）
- 支持自定义样式和主题

## 基础用法

```jsx
import React from 'react';
import { Table } from 'speccapitals-common';

const App = () => {
  const dataSource = [
    { id: 1, name: '张三', age: 32, address: '北京市朝阳区' },
    { id: 2, name: '李四', age: 42, address: '上海市浦东新区' },
    { id: 3, name: '王五', age: 28, address: '广州市天河区' },
  ];

  const columns = [
    {
      key: 'name',
      title: '姓名',
      dataIndex: 'name',
    },
    {
      key: 'age',
      title: '年龄',
      dataIndex: 'age',
    },
    {
      key: 'address',
      title: '地址',
      dataIndex: 'address',
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};
```

## 带分页的表格

```jsx
<Table 
  dataSource={dataSource} 
  columns={columns} 
  pagination={{
    current: 1,
    pageSize: 10,
    total: 100,
    onChange: (page, pageSize) => {
      console.log(`切换到第 ${page} 页，每页显示 ${pageSize} 条`);
    },
  }}
/>
```

## 自定义渲染

```jsx
const columns = [
  // ...其他列
  {
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    render: (value, record) => (
      <span style={{ color: value === 'active' ? 'green' : 'red' }}>
        {value === 'active' ? '活跃' : '不活跃'}
      </span>
    ),
  },
];
```

## 响应式表格

```jsx
const columns = [
  {
    key: 'name',
    title: '姓名',
    dataIndex: 'name',
    responsive: {
      alwaysShow: true, // 在移动视图中始终显示
    },
  },
  // ...其他列
];

<Table dataSource={dataSource} columns={columns} isResponsive={true} />
```

## API

### Table

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataSource | 数据数组 | `T[]` | `[]` |
| columns | 表格列的配置描述 | `TableColumn<T>[]` | `[]` |
| bordered | 是否显示边框 | `boolean` | `true` |
| size | 表格大小 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| loading | 页面是否加载中 | `boolean` | `false` |
| pagination | 分页器，设为 false 时不展示分页 | `TablePagination \| false` | - |
| rowKey | 表格行 key 的取值 | `string \| ((record: T) => string)` | `'id'` |
| onRowClick | 行点击事件 | `(record: T, index: number, event: React.MouseEvent) => void` | - |
| exportOptions | 导出选项 | `object` | - |
| isResponsive | 是否启用响应式布局 | `boolean` | `true` |

### TableColumn

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 列的唯一标识 | `string` | - |
| title | 列头显示文字 | `ReactNode` | - |
| dataIndex | 列数据在数据项中对应的路径 | `string` | - |
| width | 列宽度 | `number \| string` | - |
| render | 生成复杂数据的渲染函数 | `(value: any, record: T, index: number) => ReactNode` | - |
| sortable | 是否可排序 | `boolean` | `false` |
| responsive | 响应式配置 | `{ alwaysShow?: boolean }` | - | 
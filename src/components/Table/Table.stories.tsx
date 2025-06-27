/**
 * 表格组件的故事书示例
 */
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Table } from './Table';
import { TableProps } from './types';

export default {
  title: 'Components/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: '表格组件，用于展示结构化数据，支持排序、筛选、分页等功能。',
      },
    },
  },
} as Meta;

// 创建模板
const Template: Story<TableProps> = (args) => <Table {...args} />;

// 基础表格
export const Basic = Template.bind({});
Basic.args = {
  dataSource: [
    { id: 1, name: '张三', age: 32, address: '北京市朝阳区', status: 'active' },
    { id: 2, name: '李四', age: 42, address: '上海市浦东新区', status: 'inactive' },
    { id: 3, name: '王五', age: 28, address: '广州市天河区', status: 'active' },
    { id: 4, name: '赵六', age: 35, address: '深圳市南山区', status: 'inactive' },
  ],
  columns: [
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
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      render: (value) => (
        <span style={{ color: value === 'active' ? 'green' : 'red' }}>
          {value === 'active' ? '活跃' : '不活跃'}
        </span>
      ),
    },
  ],
};
Basic.parameters = {
  docs: {
    description: {
      story: '基础表格示例，展示简单的数据列表。',
    },
  },
};

// 带分页的表格
export const WithPagination = Template.bind({});
WithPagination.args = {
  ...Basic.args,
  pagination: {
    current: 1,
    pageSize: 2,
    total: 4,
    onChange: (page, pageSize) => {
      console.log(`切换到第 ${page} 页，每页显示 ${pageSize} 条`);
    },
    showSizeChanger: true,
    pageSizeOptions: ['2', '4', '10'],
    showQuickJumper: true,
    showTotal: (total) => `共 ${total} 条`,
  },
};
WithPagination.parameters = {
  docs: {
    description: {
      story: '带分页功能的表格示例。',
    },
  },
};

// 带边框的表格
export const Bordered = Template.bind({});
Bordered.args = {
  ...Basic.args,
  bordered: true,
};
Bordered.parameters = {
  docs: {
    description: {
      story: '带边框的表格示例。',
    },
  },
};

// 带加载状态的表格
export const Loading = Template.bind({});
Loading.args = {
  ...Basic.args,
  loading: true,
};
Loading.parameters = {
  docs: {
    description: {
      story: '加载状态的表格示例。',
    },
  },
};

// 可排序的表格
export const Sortable = Template.bind({});
Sortable.args = {
  ...Basic.args,
  columns: [
    {
      key: 'name',
      title: '姓名',
      dataIndex: 'name',
    },
    {
      key: 'age',
      title: '年龄',
      dataIndex: 'age',
      sortable: true,
    },
    {
      key: 'address',
      title: '地址',
      dataIndex: 'address',
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      render: (value) => (
        <span style={{ color: value === 'active' ? 'green' : 'red' }}>
          {value === 'active' ? '活跃' : '不活跃'}
        </span>
      ),
    },
  ],
};
Sortable.parameters = {
  docs: {
    description: {
      story: '可排序的表格示例，点击表头可进行排序。',
    },
  },
};

// 响应式表格
export const Responsive = Template.bind({});
Responsive.args = {
  ...Basic.args,
  isResponsive: true,
  columns: [
    {
      key: 'name',
      title: '姓名',
      dataIndex: 'name',
      responsive: {
        alwaysShow: true,
      },
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
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      render: (value) => (
        <span style={{ color: value === 'active' ? 'green' : 'red' }}>
          {value === 'active' ? '活跃' : '不活跃'}
        </span>
      ),
    },
  ],
};
Responsive.parameters = {
  docs: {
    description: {
      story: '响应式表格示例，在移动设备上会自动切换为卡片式布局。',
    },
  },
}; 
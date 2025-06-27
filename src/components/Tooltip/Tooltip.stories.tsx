/**
 * Tooltip组件故事
 */
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '提示文本内容',
    },
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: '提示框位置',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'top' },
      },
    },
    arrow: {
      control: { type: 'boolean' },
      description: '是否显示箭头',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    trigger: {
      control: { type: 'select' },
      options: ['hover', 'click', 'focus'],
      description: '触发方式',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'hover' },
      },
    },
    children: {
      control: 'text',
      description: '子元素',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    title: '这是一个提示',
    children: <span style={{ color: '#1890ff', cursor: 'pointer' }}>悬停查看提示</span>,
  },
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Tooltip title="顶部提示" placement="top">
        <Button>顶部</Button>
      </Tooltip>
      <Tooltip title="底部提示" placement="bottom">
        <Button>底部</Button>
      </Tooltip>
      <Tooltip title="左侧提示" placement="left">
        <Button>左侧</Button>
      </Tooltip>
      <Tooltip title="右侧提示" placement="right">
        <Button>右侧</Button>
      </Tooltip>
    </div>
  ),
};

export const NoArrow: Story = {
  args: {
    title: '没有箭头的提示',
    arrow: false,
    children: <Button>没有箭头</Button>,
  },
};

export const Triggers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Tooltip title="悬停触发" trigger="hover">
        <Button>悬停</Button>
      </Tooltip>
      <Tooltip title="点击触发" trigger="click">
        <Button>点击</Button>
      </Tooltip>
      <Tooltip title="聚焦触发" trigger="focus">
        <Button>聚焦</Button>
      </Tooltip>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    title: '禁用的提示',
    disabled: true,
    children: <Button>禁用提示</Button>,
  },
}; 
/**
 * Button组件故事
 */
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    buttonType: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'link', 'danger'],
      description: '按钮类型',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '按钮大小',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    filled: {
      control: { type: 'boolean' },
      description: '是否填充样式',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    loading: {
      control: { type: 'boolean' },
      description: '是否加载中',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
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
    plus: {
      control: { type: 'boolean' },
      description: '是否显示加号图标',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    arrow: {
      control: { type: 'boolean' },
      description: '是否显示箭头图标',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    fitContent: {
      control: { type: 'boolean' },
      description: '是否自适应内容宽度',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    children: {
      control: 'text',
      description: '按钮内容',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '默认按钮',
  },
};

export const Primary: Story = {
  args: {
    buttonType: 'primary',
    children: '主要按钮',
  },
};

export const Secondary: Story = {
  args: {
    buttonType: 'secondary',
    children: '次要按钮',
  },
};

export const Ghost: Story = {
  args: {
    buttonType: 'ghost',
    children: '幽灵按钮',
  },
};

export const Link: Story = {
  args: {
    buttonType: 'link',
    children: '链接按钮',
  },
};

export const Danger: Story = {
  args: {
    buttonType: 'danger',
    children: '危险按钮',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: '小按钮',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: '大按钮',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: '加载中',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '禁用按钮',
  },
};

export const WithPlus: Story = {
  args: {
    plus: true,
    children: '添加按钮',
  },
};

export const WithArrow: Story = {
  args: {
    arrow: true,
    children: '箭头按钮',
  },
};

export const FitContent: Story = {
  args: {
    fitContent: true,
    children: '自适应宽度',
  },
};

export const CustomColor: Story = {
  args: {
    color: '#f50',
    children: '自定义颜色',
  },
}; 
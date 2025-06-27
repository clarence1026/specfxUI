/**
 * 组件生成脚本
 * 用于快速创建新组件
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 组件模板
const componentTemplate = (componentName) => `/**
 * ${componentName}组件
 */
import React from 'react';
import styled from 'styled-components';
import { ${componentName}Props } from './types';

const StyledComponent = styled.div\`
  // 在这里添加样式
\`;

/**
 * ${componentName}组件
 */
export const ${componentName}: React.FC<${componentName}Props> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <StyledComponent className={\`sc-${componentName.toLowerCase()} \${className || ''}\`} {...rest}>
      {children}
    </StyledComponent>
  );
};

export default ${componentName};
`;

// 类型定义模板
const typesTemplate = (componentName) => `/**
 * ${componentName}组件类型定义
 */
import { HTMLAttributes, ReactNode } from 'react';

export interface ${componentName}Props extends HTMLAttributes<HTMLDivElement> {
  /**
   * 子元素
   */
  children?: ReactNode;
  
  /**
   * 自定义类名
   */
  className?: string;
}
`;

// 索引文件模板
const indexTemplate = (componentName) => `/**
 * ${componentName}组件入口文件
 */
export * from './${componentName}';
export * from './types';
`;

// 故事书模板
const storiesTemplate = (componentName) => `/**
 * ${componentName}组件故事
 */
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: {
    children: '这是一个${componentName}组件',
  },
};
`;

// 测试文件模板
const testTemplate = (componentName) => `/**
 * ${componentName}组件测试
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName} Component', () => {
  test('renders correctly', () => {
    render(<${componentName}>Test</${componentName}>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
`;

// 创建组件
const createComponent = (componentName) => {
  const componentDir = path.join(__dirname, '../src/components', componentName);
  
  // 创建组件目录
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }
  
  // 创建组件文件
  fs.writeFileSync(
    path.join(componentDir, `${componentName}.tsx`),
    componentTemplate(componentName)
  );
  
  // 创建类型定义文件
  fs.writeFileSync(
    path.join(componentDir, 'types.ts'),
    typesTemplate(componentName)
  );
  
  // 创建索引文件
  fs.writeFileSync(
    path.join(componentDir, 'index.ts'),
    indexTemplate(componentName)
  );
  
  // 创建故事书文件
  fs.writeFileSync(
    path.join(componentDir, `${componentName}.stories.tsx`),
    storiesTemplate(componentName)
  );
  
  // 创建测试文件
  fs.writeFileSync(
    path.join(componentDir, `${componentName}.test.tsx`),
    testTemplate(componentName)
  );
  
  console.log(`✅ 组件 ${componentName} 创建成功！`);
  
  // 更新组件索引文件
  updateComponentsIndex(componentName);
};

// 更新组件索引文件
const updateComponentsIndex = (componentName) => {
  const indexFilePath = path.join(__dirname, '../src/components/index.ts');
  
  // 如果索引文件不存在，则创建它
  if (!fs.existsSync(indexFilePath)) {
    fs.writeFileSync(
      indexFilePath,
      `/**
 * 组件模块入口文件
 * 从这里导出所有UI组件
 */
`
    );
  }
  
  // 读取当前索引文件内容
  let indexContent = fs.readFileSync(indexFilePath, 'utf8');
  
  // 添加新组件的导出语句
  if (!indexContent.includes(`export * from './${componentName}'`)) {
    indexContent += `export * from './${componentName}';\n`;
    fs.writeFileSync(indexFilePath, indexContent);
    console.log(`✅ 组件 ${componentName} 已添加到索引文件`);
  }
};

// 主函数
const main = () => {
  rl.question('请输入组件名称（使用PascalCase，如Button）: ', (componentName) => {
    if (!componentName) {
      console.error('❌ 组件名称不能为空');
      rl.close();
      return;
    }
    
    // 确保组件名称使用PascalCase
    const formattedName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
    
    createComponent(formattedName);
    rl.close();
  });
};

// 运行主函数
main(); 
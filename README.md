# SpeccCapitals Common UI

SpeccCapitals Common UI 是一个 React 组件库，提供了一套统一的 UI 组件和样式系统，用于构建 SpeccCapitals 相关项目的用户界面。

## 特性

- 📦 开箱即用的高质量 React 组件
- 🎨 统一的设计系统和主题支持
- 🌐 国际化支持
- 📱 响应式设计，适配各种屏幕尺寸
- 🔄 与现有项目平滑集成
- 🎭 支持多种样式方案（CSS Modules、CSS变量）
- 🌙 支持亮色/暗色主题切换

## 安装

```bash
# 使用 npm
npm install speccapitals-common

# 使用 yarn
yarn add speccapitals-common

# 使用 pnpm
pnpm add speccapitals-common
```

## 快速开始

```jsx
import React from 'react';
import { Button, ThemeProvider } from 'speccapitals-common';

// 导入全局样式
import 'speccapitals-common/dist/styles/global.css';

const App = () => (
  <ThemeProvider>
    <Button type="primary">点击我</Button>
  </ThemeProvider>
);

export default App;
```

## 样式系统

组件库提供了多种样式使用方式，适用于不同的项目需求：

### 1. 在Sass项目中使用

```scss
// 导入变量和混合
@import 'speccapitals-common/src/styles/variables.scss';
@import 'speccapitals-common/src/styles/mixins.scss';

.my-component {
  color: $primary;
  padding: $spacing-md;
  
  @include respond-to(md) {
    padding: $spacing-sm;
  }
}
```

### 2. 在非Sass项目中使用CSS变量

```css
/* 导入CSS变量 */
@import 'speccapitals-common/dist/styles/variables.css';

.my-component {
  color: var(--sc-color-primary);
  padding: var(--sc-spacing-md);
  border-radius: var(--sc-border-radius);
}
```

### 3. 在JavaScript中使用CSS变量

```jsx
import { cssVariables } from 'speccapitals-common/styles';

const MyComponent = () => (
  <div style={{ 
    color: cssVariables.colors.primary,
    padding: cssVariables.spacing.md,
    borderRadius: cssVariables.border.radius.default
  }}>
    使用CSS变量
  </div>
);
```

### 4. 主题切换

```jsx
// 切换到暗色主题
document.documentElement.classList.add('sc-dark-theme');

// 切换回亮色主题
document.documentElement.classList.remove('sc-dark-theme');
```

## 组件

组件库提供了以下常用组件：

- 基础组件：Button、Icon、Typography
- 布局组件：Grid、Layout、Space
- 表单组件：Form、Input、Select、Checkbox、Radio
- 数据展示：Table、List、Card、Tooltip
- 反馈组件：Modal、Notification、Message
- 导航组件：Menu、Tabs、Pagination

详细的组件文档请参考 [组件文档](./docs/components)。

## 文档

- [快速开始](./docs/quick-start.md)
- [样式系统](./docs/styles.md)
- [集成指南](./docs/integration-guide.md)

## 开发

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

### 构建CSS变量

```bash
pnpm build:css-vars
```

### 运行测试

```bash
pnpm test
```

### 运行 Storybook

```bash
pnpm storybook
```

## 贡献

欢迎贡献代码、报告问题或提出建议。请参阅 [贡献指南](./CONTRIBUTING.md) 了解更多信息。

## 许可证

[MIT](./LICENSE)

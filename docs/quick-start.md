# 快速开始

本文档提供了 SpeccCapitals 组件库的快速入门指南，帮助您快速上手使用和开发组件库。

## 目录

- [安装](#安装)
- [基本使用](#基本使用)
- [开发指南](#开发指南)
- [构建与发布](#构建与发布)
- [样式系统](#样式系统)

## 安装

### 在项目中安装组件库

```bash
# 使用 npm
npm install speccapitals-common

# 使用 yarn
yarn add speccapitals-common

# 使用 pnpm
pnpm add speccapitals-common
```

### 安装开发依赖

如果您要参与组件库的开发，需要先克隆仓库并安装依赖：

```bash
# 克隆仓库
git clone <repository-url>

# 进入目录
cd speccapitals-common

# 安装依赖
pnpm install
```

## 基本使用

### 导入组件

```jsx
import { Button, Table } from 'speccapitals-common';

// 使用组件
function App() {
  return (
    <div>
      <Button type="primary">点击我</Button>
      <Table data={data} columns={columns} />
    </div>
  );
}
```

### 导入样式

```jsx
// 导入全局样式
import 'speccapitals-common/dist/styles/global.css';

// 使用主题提供者
import { ThemeProvider } from 'speccapitals-common';

function App() {
  return (
    <ThemeProvider>
      {/* 您的应用 */}
    </ThemeProvider>
  );
}
```

## 开发指南

### 开发命令

组件库提供了以下开发命令：

```bash
# 启动完整开发环境（推荐）
# 同时启动webpack开发服务器和CSS变量监视
pnpm dev:all

# 仅启动webpack开发服务器
pnpm dev

# 仅监视CSS变量变化
pnpm build:css-vars:watch
```

### 创建新组件

使用组件生成器快速创建新组件：

```bash
pnpm generate-component
```

这将提示您输入组件名称，然后创建组件目录结构、样式文件和测试文件。

## 构建与发布

### 构建命令

```bash
# 完整构建（包括CSS变量生成）
pnpm build

# 仅构建CSS变量
pnpm build:css-vars

# 清理构建目录
pnpm clean
```

### 构建产物

构建后的文件位于 `dist` 目录：

- `dist/index.js` - CommonJS 格式
- `dist/index.esm.js` - ES Module 格式
- `dist/index.d.ts` - TypeScript 类型定义
- `dist/styles/` - 样式文件
  - `variables.css` - CSS变量
  - `global.css` - 全局样式

### 发布流程

组件库使用 Lerna 管理发布流程：

```bash
# 更新版本号
pnpm lerna:version

# 发布到GitHub
# 详细步骤请参考 publishing.md 文档
```

## 样式系统

组件库提供了两种样式使用方式：

### 使用 Sass 变量和混合

```scss
// 导入变量和混合
@import 'speccapitals-common/src/styles/variables.scss';
@import 'speccapitals-common/src/styles/mixins.scss';

// 使用变量和混合
.my-component {
  color: $primary;
  padding: $spacing-md;
  
  @include respond-to(md) {
    padding: $spacing-sm;
  }
}
```

### 使用 CSS 变量

对于不使用 Sass 的项目，可以使用组件库提供的 CSS 变量：

```css
.my-component {
  color: var(--sc-color-primary);
  padding: var(--sc-spacing-md);
}
```

详细的样式系统文档请参考 [样式系统](./style-system.md)。

## 下一步

- 查看[集成指南](./integration-guide.md)了解如何在现有项目中集成组件库
- 查看[样式系统](./style-system.md)了解更多关于样式系统的信息 
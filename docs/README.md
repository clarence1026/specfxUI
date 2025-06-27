# SpeccCapitals 组件库文档

## 简介

SpeccCapitals 组件库是一个从 crm-front 项目中提取的通用 React 组件库，旨在提供一致的 UI 组件，可在多个项目中复用。该组件库基于 TypeScript 开发，支持 React 16.8 及以上版本。

## 文档目录

- [快速开始](./quick-start.md) - 快速上手组件库的使用
- [组件使用指南](./component-usage.md) - 详细的组件 API 和使用示例
- [样式系统](./style-system.md) - 样式变量、主题和定制指南
- [本地开发](./local-development.md) - 开发环境设置和组件开发流程
- [发布指南](./publishing.md) - 版本管理和发布流程
- [集成指南](./integration-guide.md) - 如何在现有项目中集成组件库

## 核心特性

- 基于 TypeScript 开发，提供完善的类型定义
- 支持 CommonJS 和 ES Module 两种模块格式
- 提供统一的主题和样式系统
- 兼容 React 16.8+ 版本
- 支持多种 Node.js 版本（v14 - v22）
- 使用 pnpm 作为包管理器，结合 Lerna 进行版本管理

## 技术栈

- React
- TypeScript
- Styled Components
- Rollup / Webpack
- Storybook
- Jest
- pnpm
- Lerna

## 许可证

MIT

## 目录

### 基础文档

- [快速开始](./quick-start.md) - 组件库快速入门指南，包含安装、使用、开发和构建说明
- [样式系统](./styles.md) - 详细说明组件库的样式系统，包括变量、混合和CSS变量支持
- [集成指南](./integration-guide.md) - 如何在现有项目和新项目中集成组件库

### 核心特性

- **组件系统** - 基于React的组件系统，提供丰富的UI组件
- **样式系统** - 基于CSS Modules的样式系统，确保样式隔离
- **主题系统** - 可定制的主题系统，支持亮色/暗色主题切换
- **CSS变量支持** - 提供CSS变量版本，支持非Sass项目使用

### 开发与构建

#### 开发命令

- **`pnpm dev:all`** - 启动完整开发环境（推荐）
- **`pnpm dev`** - 仅启动webpack开发服务器
- **`pnpm build:css-vars:watch`** - 监视CSS变量变化
- **`pnpm sync:styles:watch`** - 监视样式文件变化并同步

#### 构建命令

- **`pnpm build`** - 完整构建（包括CSS变量生成）
- **`pnpm build:css-vars`** - 仅构建CSS变量
- **`pnpm clean`** - 清理构建目录

#### 发布命令

- **`pnpm lerna:version`** - 更新版本号
- **`pnpm lerna:publish`** - 发布到npm

### 样式使用方式

组件库提供了多种样式使用方式：

1. **Sass变量和混合** - 适用于使用Sass的项目
2. **CSS变量** - 适用于所有项目，包括不使用Sass的项目
3. **JavaScript中的样式对象** - 通过导入`cssVariables`在JS中使用样式变量

### 集成场景

- **在原项目中集成** - 如何在原项目中使用组件库
- **在新项目中集成** - 如何在新项目中使用组件库
- **在非Sass项目中集成** - 如何在不使用Sass的项目中使用组件库

## 开发指南

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 同步样式到原项目
pnpm sync:styles

# 监视样式变化并自动同步
pnpm sync:styles:watch
```

## 组件列表

### 基础组件
- Button 按钮
- Icon 图标

### 表单组件
- Form 表单
- Input 输入框
- Select 选择器

### 数据展示
- Table 表格
- Modal 对话框
- Tooltip 文字提示

## 常见问题

如果您在使用组件库时遇到问题，请参阅各文档中的"常见问题"部分，或提交Issue。 
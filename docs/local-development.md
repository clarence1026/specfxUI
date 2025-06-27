# 本地开发指南

本文档详细介绍如何在本地开发环境中开发组件库，以及如何让使用组件库的项目实时更新组件库的变更。

## 开发环境设置

### 1. 克隆仓库

```bash
git clone https://github.com/your-username/speccapitals-common.git
cd speccapitals-common
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动开发服务

```bash
# 启动开发模式，监视文件变化并重新构建
pnpm dev

# 启动 Storybook 开发环境
pnpm storybook
```

## 组件开发流程

### 创建新组件

我们提供了一个脚本来快速创建新组件：

```bash
pnpm generate-component
```

这将提示您输入组件名称，并自动生成以下文件：

- `src/components/YourComponent/YourComponent.tsx` - 组件实现
- `src/components/YourComponent/types.ts` - 类型定义
- `src/components/YourComponent/index.ts` - 导出文件
- `src/components/YourComponent/YourComponent.stories.tsx` - Storybook 故事
- `src/components/YourComponent/YourComponent.test.tsx` - 测试文件

## 使用 yalc 实现实时开发

[yalc](https://github.com/wclr/yalc) 是一个优秀的工具，可以在本地模拟 npm 包的发布和安装，非常适合组件库的实时开发。以下是详细的使用步骤：

### 1. 安装 yalc

首先，需要全局安装 yalc：

```bash
pnpm add -g yalc
```

### 2. 配置组件库项目

在组件库的 `package.json` 中添加以下脚本：

```json
{
  "scripts": {
    "build": "webpack --mode production",
    "dev": "webpack --mode development --watch",
    "yalc:publish": "yalc publish",
    "yalc:push": "yalc push",
    "dev:yalc": "concurrently \"pnpm dev\" \"nodemon --watch dist --delay 1 --exec pnpm yalc:push\""
  }
}
```

安装所需的依赖：

```bash
pnpm add -D concurrently nodemon
```

### 3. 初始发布

首次使用时，需要构建并发布组件库到 yalc 本地仓库：

```bash
# 在组件库目录下
pnpm build
pnpm yalc:publish
```

这会将组件库发布到 yalc 的本地存储中（通常在 `~/.yalc` 目录）。

### 4. 在使用项目中添加本地组件库

在需要使用组件库的项目中执行：

```bash
# 在使用项目目录下
yalc add speccapitals-common
pnpm install  # 或 npm install，取决于使用项目的包管理器
```

这会在项目的 `package.json` 中添加对本地组件库的引用，类似于：

```json
{
  "dependencies": {
    "speccapitals-common": "file:.yalc/speccapitals-common"
  }
}
```

同时，会在项目根目录创建 `yalc.lock` 文件，记录依赖信息。

### 5. 启动实时开发模式

在组件库目录下，启动开发模式：

```bash
pnpm dev:yalc
```

这将同时执行两个任务：
- `pnpm dev`：监视源文件变化并重新构建
- `nodemon --watch dist --delay 1 --exec pnpm yalc:push`：监视 dist 目录变化，自动推送更新到使用项目

### 6. 在使用项目中自动更新

每次组件库发生变化并推送后，使用项目需要重新安装依赖才能看到变化。为了自动化这一过程，可以：

#### 方法一：使用 yalc-watch

安装 yalc-watch：

```bash
pnpm add -g yalc-watch
```

在使用项目的 `package.json` 中添加：

```json
{
  "scripts": {
    "dev:watch": "yalc-watch"
  }
}
```

然后启动监视：

```bash
pnpm dev:watch
```

#### 方法二：在使用项目中配置 nodemon

在使用项目中安装 nodemon：

```bash
pnpm add -D nodemon
```

添加脚本：

```json
{
  "scripts": {
    "yalc:update": "yalc update",
    "dev:yalc": "nodemon --watch .yalc --watch yalc.lock --delay 1 --exec pnpm yalc:update"
  }
}
```

然后启动监视：

```bash
pnpm dev:yalc
```

### 7. 完整的开发流程示例

**组件库项目：**

```bash
# 初始设置
pnpm add -g yalc
pnpm add -D concurrently nodemon

# 修改 package.json 添加脚本
# ...

# 首次发布
pnpm build
pnpm yalc:publish

# 开发模式
pnpm dev:yalc
```

**使用项目：**

```bash
# 初始设置
yalc add speccapitals-common
pnpm install  # 或使用项目的包管理器

# 启动监视更新
pnpm dev:yalc  # 或使用 yalc-watch
```

### 8. 移除 yalc 链接

开发完成后，可以移除 yalc 链接，恢复使用正式版本：

```bash
# 在使用项目中
yalc remove speccapitals-common
pnpm install  # 或使用项目的包管理器
```

## 其他本地开发方法

除了推荐的 yalc 方法外，还有其他几种方法可以实现本地开发：

### 使用 pnpm link

```bash
# 在组件库目录下
pnpm link --global

# 在使用项目目录下
pnpm link --global speccapitals-common
```

注意：link 方法可能会导致 React 多实例问题，特别是当组件库和使用项目都有自己的 React 副本时。 
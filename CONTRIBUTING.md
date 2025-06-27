# 开发贡献指南

本文档提供了如何参与 speccapitals-common 组件库开发的详细指南。

## 开发环境设置

### 前提条件

- Node.js >= 14.0.0
- pnpm >= 7.0.0

### 安装步骤

1. 克隆仓库

```bash
git clone <repository-url>
cd speccapitals-common
```

2. 安装依赖

```bash
pnpm install
```

3. 启动开发模式

```bash
pnpm dev
```

## 项目结构

```
speccapitals-common/
├── dist/                 # 构建输出目录
├── src/                  # 源代码
│   ├── components/       # UI组件
│   ├── hooks/            # React Hooks
│   ├── utils/            # 工具函数
│   ├── styles/           # 样式系统
│   └── index.ts          # 主入口文件
├── .eslintrc.js          # ESLint配置
├── .prettierrc           # Prettier配置
├── rollup.config.js      # Rollup配置
├── tsconfig.json         # TypeScript配置
└── package.json          # 项目配置
```

## 开发规范

### 组件开发规范

1. **目录结构**：每个组件应该有自己的目录，包含以下文件：
   - `index.ts` - 导出组件
   - `ComponentName.tsx` - 组件实现
   - `ComponentName.test.tsx` - 组件测试
   - `types.ts` - 类型定义（可选）
   - `styles.ts` - 样式定义（如果使用styled-components）

2. **命名规范**：
   - 组件文件名和组件名使用 PascalCase
   - 工具函数、Hooks 使用 camelCase
   - 常量使用 UPPER_SNAKE_CASE

3. **类型定义**：
   - 所有组件必须有完整的 TypeScript 类型定义
   - 导出的类型应该以组件名为前缀，如 `ButtonProps`

4. **样式规范**：
   - 使用 styled-components 进行样式管理
   - 主题相关的样式应该使用主题变量

### 代码质量

1. **测试**：
   - 每个组件都应该有单元测试
   - 测试覆盖率应该达到 80% 以上

2. **文档**：
   - 每个组件都应该有详细的文档注释
   - 使用 JSDoc 格式编写文档

3. **代码风格**：
   - 遵循 ESLint 和 Prettier 配置
   - 提交前运行 `pnpm lint` 检查代码风格

## 组件迁移指南

从 speccapitals-crm 项目迁移组件到组件库时，请遵循以下步骤：

1. **分析组件**：
   - 确认组件是否具有通用性
   - 检查组件的依赖关系

2. **创建组件目录**：
   - 在 `src/components/` 下创建组件目录
   - 添加必要的文件（index.ts, ComponentName.tsx 等）

3. **转换为 TypeScript**：
   - 添加类型定义
   - 使用接口替代 PropTypes

4. **样式迁移**：
   - 将 styled-jsx 转换为 styled-components
   - 使用主题系统替代硬编码的颜色值

5. **测试**：
   - 编写单元测试
   - 确保组件在不同环境下正常工作

## 提交规范

使用 Conventional Commits 规范进行提交：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码风格修改（不影响功能）
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

示例：

```
feat(button): 添加新的按钮尺寸选项
```

## 发布流程

1. 更新版本号：
   ```bash
   pnpm version [patch|minor|major]
   ```

2. 构建项目：
   ```bash
   pnpm build
   ```

3. 发布到 npm：
   ```bash
   pnpm publish
   ```

## 本地开发与联调

### 方法 1：使用 yalc（推荐）

```bash
# 安装 yalc
npm install -g yalc

# 在组件库目录发布到本地仓库
pnpm link-local

# 在使用该组件库的项目中添加
yalc add speccapitals-common

# 每次修改组件库后，在组件库目录执行
pnpm link-local
```

### 方法 2：使用 pnpm link

```bash
# 在组件库目录中执行
pnpm link --global

# 在使用该组件库的项目中执行
pnpm link --global speccapitals-common
```

### 方法 3：配置本地路径

在使用组件库的项目 package.json 中：

```json
{
  "dependencies": {
    "speccapitals-common": "file:../path/to/speccapitals-common"
  }
}
```

## 常见问题

### 如何添加新组件？

1. 在 `src/components/` 下创建新的组件目录
2. 实现组件并添加测试
3. 在 `src/components/index.ts` 中导出组件
4. 更新文档

### 如何处理组件间的依赖关系？

- 尽量减少组件间的依赖
- 如果必须依赖，使用明确的导入路径
- 避免循环依赖

### 如何确保兼容性？

- 使用 TypeScript 的目标设置为 ES5
- 使用 Babel 进行转译
- 提供 CommonJS 和 ESM 两种格式
- 测试在不同 Node 版本下的行为 
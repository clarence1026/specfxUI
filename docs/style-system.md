# 样式系统

SpeccCapitals 组件库提供了一套完整的样式系统，包括主题变量、全局样式、混合器等。本文档将介绍如何在不同类型的项目中使用组件库的样式系统。

## 样式架构

组件库的样式系统主要由以下几部分组成：

1. **CSS变量**：定义在`:root`选择器中的全局CSS变量
2. **Sass变量**：用于内部组件开发的Sass变量
3. **主题系统**：支持亮色/暗色主题切换
4. **全局样式**：基础样式重置和通用样式
5. **混合器(mixins)**：常用的样式片段

## 在不同项目中使用样式系统

### 原项目（crm-front）使用

如果您正在将组件从原项目迁移到组件库，并且希望保持样式一致性，可以按照以下步骤操作：

1. 安装组件库
```bash
npm install speccapitals-common --save
```

2. 在项目入口文件中导入全局样式
```jsx
// src/index.js 或 App.js
import 'speccapitals-common/styles';
```

3. 使用组件库中的组件，它们会自动应用正确的样式
```jsx
import { Button, Table } from 'speccapitals-common';

function App() {
  return (
    <div className="app">
      <Button type="primary">按钮</Button>
    </div>
  );
}
```

### 新项目使用

对于全新的项目，可以完全依赖组件库的样式系统：

1. 安装组件库
```bash
npm install speccapitals-common --save
```

2. 在项目入口文件中导入全局样式
```jsx
// src/index.js 或 App.js
import 'speccapitals-common/styles';
```

3. 创建主题配置（可选）
```jsx
// src/theme.js
import { createTheme } from 'speccapitals-common/styles';

// 自定义主题变量
const customTheme = createTheme({
  colors: {
    primary: '#1890ff',
    secondary: '#52c41a',
    danger: '#f5222d',
    // 更多颜色...
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
    // 更多间距...
  },
  // 更多主题变量...
});

export default customTheme;
```

4. 应用自定义主题
```jsx
// src/App.js
import { ThemeProvider } from 'speccapitals-common/styles';
import customTheme from './theme';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* 应用内容 */}
    </ThemeProvider>
  );
}
```

### Sass 项目使用

如果您的项目使用 Sass，可以直接使用组件库提供的 Sass 变量和混合器：

1. 安装组件库
```bash
npm install speccapitals-common --save
```

2. 在 Sass 文件中导入变量和混合器
```scss
// 导入变量
@import '~speccapitals-common/styles/variables';

// 导入混合器
@import '~speccapitals-common/styles/mixins';

// 使用变量和混合器
.my-component {
  color: $sc-color-primary;
  @include sc-box-shadow;
  
  &:hover {
    background-color: $sc-color-primary-light;
  }
}
```

3. 在项目入口文件中导入全局样式
```jsx
import 'speccapitals-common/styles';
```

### 非 Sass 项目使用

对于不使用 Sass 的项目（如使用纯 CSS、CSS-in-JS 等），可以使用组件库提供的 CSS 变量：

1. 安装组件库
```bash
npm install speccapitals-common --save
```

2. 在项目入口文件中导入 CSS 变量
```jsx
// src/index.js 或 App.js
import 'speccapitals-common/styles/variables.css';
```

3. 在 CSS 或 CSS-in-JS 中使用变量
```css
/* 纯 CSS */
.my-component {
  color: var(--sc-color-primary);
  box-shadow: var(--sc-shadow-medium);
}
```

```jsx
// Styled Components
import styled from 'styled-components';

const MyComponent = styled.div`
  color: var(--sc-color-primary);
  box-shadow: var(--sc-shadow-medium);
  
  &:hover {
    background-color: var(--sc-color-primary-light);
  }
`;
```

4. 也可以使用组件库提供的 TypeScript 接口获取类型提示
```tsx
// 导入 CSS 变量接口
import { cssVariables } from 'speccapitals-common/styles';

const MyComponent = styled.div`
  color: ${cssVariables.color.primary};
  padding: ${cssVariables.spacing.medium};
`;
```

## 主题切换

组件库支持亮色/暗色主题切换：

```jsx
import { ThemeProvider, ThemeToggle } from 'speccapitals-common/styles';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <ThemeToggle /> {/* 主题切换按钮 */}
        {/* 应用内容 */}
      </div>
    </ThemeProvider>
  );
}
```

手动切换主题：

```jsx
import { useTheme } from 'speccapitals-common/styles';

function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        切换到{theme === 'light' ? '暗色' : '亮色'}主题
      </button>
    </div>
  );
}
```

## 样式变量参考

### 颜色变量

| 变量名 | 默认值 (亮色主题) | 说明 |
| --- | --- | --- |
| --sc-color-primary | #1890ff | 主色 |
| --sc-color-primary-light | #40a9ff | 主色浅色 |
| --sc-color-primary-dark | #096dd9 | 主色深色 |
| --sc-color-secondary | #52c41a | 次要色 |
| --sc-color-success | #52c41a | 成功色 |
| --sc-color-warning | #faad14 | 警告色 |
| --sc-color-danger | #f5222d | 危险色 |
| --sc-color-info | #1890ff | 信息色 |
| --sc-color-text-primary | rgba(0, 0, 0, 0.85) | 主要文本色 |
| --sc-color-text-secondary | rgba(0, 0, 0, 0.65) | 次要文本色 |
| --sc-color-text-disabled | rgba(0, 0, 0, 0.25) | 禁用文本色 |
| --sc-color-bg-base | #f0f2f5 | 基础背景色 |
| --sc-color-bg-container | #ffffff | 容器背景色 |

### 间距变量

| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| --sc-spacing-xs | 4px | 超小间距 |
| --sc-spacing-sm | 8px | 小间距 |
| --sc-spacing-md | 16px | 中间距 |
| --sc-spacing-lg | 24px | 大间距 |
| --sc-spacing-xl | 32px | 超大间距 |

### 字体变量

| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| --sc-font-family | -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, ... | 字体族 |
| --sc-font-size-xs | 12px | 超小字号 |
| --sc-font-size-sm | 14px | 小字号 |
| --sc-font-size-md | 16px | 中字号 |
| --sc-font-size-lg | 18px | 大字号 |
| --sc-font-size-xl | 20px | 超大字号 |
| --sc-font-weight-light | 300 | 细体 |
| --sc-font-weight-normal | 400 | 常规 |
| --sc-font-weight-medium | 500 | 中粗 |
| --sc-font-weight-bold | 600 | 粗体 |

### 阴影变量

| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| --sc-shadow-sm | 0 1px 2px rgba(0, 0, 0, 0.05) | 小阴影 |
| --sc-shadow-md | 0 4px 6px rgba(0, 0, 0, 0.1) | 中阴影 |
| --sc-shadow-lg | 0 10px 15px rgba(0, 0, 0, 0.1) | 大阴影 |

### 圆角变量

| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| --sc-border-radius-sm | 2px | 小圆角 |
| --sc-border-radius-md | 4px | 中圆角 |
| --sc-border-radius-lg | 8px | 大圆角 |
| --sc-border-radius-circle | 50% | 圆形 |

## 混合器(Mixins)参考

在 Sass 项目中，可以使用组件库提供的混合器：

```scss
// 导入混合器
@import '~speccapitals-common/styles/mixins';

.my-component {
  // 盒子阴影
  @include sc-box-shadow($level: 'medium');
  
  // 文本截断
  @include sc-text-truncate;
  
  // 弹性布局
  @include sc-flex($direction: 'row', $justify: 'center', $align: 'center');
  
  // 响应式
  @include sc-media-breakpoint-up('md') {
    // 中等屏幕及以上样式
  }
  
  // 渐变
  @include sc-gradient($start-color: $sc-color-primary, $end-color: $sc-color-secondary);
}
```

## 全局样式

组件库提供了一套全局样式重置，确保在不同浏览器中的一致性：

```jsx
// 导入全局样式
import 'speccapitals-common/styles/global.css';
```

全局样式包括：

- 盒模型重置为 `border-box`
- 移除默认外边距和内边距
- 设置基础字体和行高
- 链接样式重置
- 表单元素样式统一
- 响应式规则 
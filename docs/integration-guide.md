# 组件库集成指南

本文档提供了详细的指南，说明如何在现有项目和新项目中集成和使用 speccapitals-common 组件库。

## 目录

- [在老项目 (crm-front) 中替换样式和组件](#在老项目-crm-front-中替换样式和组件)
- [在新项目中使用组件库](#在新项目中使用组件库)
- [最佳实践与注意事项](#最佳实践与注意事项)

## 在老项目 (crm-front) 中替换样式和组件

### 1. 分析老项目结构

老项目 crm-front 的样式主要位于以下位置：
- `src/common/styling/` - 全局样式和变量
- 各组件目录中的样式文件

### 2. 替换样式的步骤

#### 2.1 同步全局样式

首先运行样式同步脚本，将组件库的样式同步到老项目中：

```bash
# 在组件库目录下执行
npm run sync:styles
```

这会将组件库的 `variables.scss`、`mixins.scss` 和 `global.scss` 同步到 `crm-front/src/common/styling/` 目录，并创建一个 `_index.scss` 文件用于统一导入。

#### 2.2 修改老项目的样式引用

在 `crm-front/src/index.js` 或主入口文件中，确保引入全局样式：

```jsx
// 引入组件库的全局样式
import 'speccapitals-common/dist/styles';
```

#### 2.3 更新样式引用路径

对于使用了原有样式变量和混合的文件，更新引用路径：

```scss
/* 修改前 */
@import '../../common/styling/theme';
@import '../../common/styling/_mixins-scss';

/* 修改后 */
@import '../../common/styling/variables.scss';
@import '../../common/styling/mixins.scss';
```

### 3. 替换组件的步骤

#### 3.1 安装组件库

```bash
# 在老项目目录下执行
npm install --save ../speccapitals-common
# 或者如果已发布到npm
npm install --save speccapitals-common
```

#### 3.2 替换共通组件

以 Button 组件为例：

```jsx
/* 修改前 */
import Button from '../../common/components/Button';

/* 修改后 */
import { Button } from 'speccapitals-common';
```

#### 3.3 渐进式替换策略

对于复杂项目，建议采用渐进式替换策略：

```jsx
// 在 crm-front/src/common/components/index.js 中创建兼容层
import { Button as SCButton, Table as SCTable } from 'speccapitals-common';
import OldForm from './Form';

// 导出组件库组件，保持原接口不变
export const Button = SCButton;
export const Table = SCTable;
// 暂时保留未迁移的组件
export const Form = OldForm;
```

这样其他代码可以继续使用原来的导入路径，但实际使用的是组件库中的组件。

#### 3.4 处理特殊组件

对于有特殊定制的组件，可能需要额外的适配：

```jsx
// 例如在 crm-front/src/common/components/Button/index.js 中
import { Button as BaseButton } from 'speccapitals-common';

// 创建包装组件，添加特殊逻辑
const Button = (props) => {
  // 添加老项目特有的逻辑
  const enhancedProps = { ...props };
  if (props.specialProp) {
    enhancedProps.className = `${props.className || ''} special-class`;
  }
  
  return <BaseButton {...enhancedProps} />;
};

export default Button;
```

## 在新项目中使用组件库

### 1. 安装组件库

```bash
npm install --save speccapitals-common
# 或
yarn add speccapitals-common
# 或
pnpm add speccapitals-common
```

### 2. 配置全局样式

#### 2.1 在项目入口文件中引入全局样式

```jsx
// 在 src/index.js 中
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// 引入组件库的全局样式
import 'speccapitals-common/dist/styles';

ReactDOM.render(<App />, document.getElementById('root'));
```

#### 2.2 配置 webpack 支持 SCSS

```js
// webpack.config.js
module.exports = {
  // ...其他配置
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                './node_modules/speccapitals-common/src/styles/variables.scss',
                './node_modules/speccapitals-common/src/styles/mixins.scss',
              ],
            },
          },
        ],
      },
    ],
  },
};
```

这样配置后，所有 SCSS 文件都可以直接使用组件库中的变量和混合，无需手动导入。

#### 2.3 使用主题提供者

```jsx
// 在 src/App.js 中
import React from 'react';
import { ThemeProvider } from 'speccapitals-common';

const App = () => {
  return (
    <ThemeProvider>
      {/* 应用内容 */}
    </ThemeProvider>
  );
};

export default App;
```

### 3. 使用组件库组件

#### 3.1 基本组件使用

```jsx
import React from 'react';
import { Button, Table, Form } from 'speccapitals-common';

const MyComponent = () => {
  return (
    <div>
      <h1>我的组件</h1>
      <Button type="primary">点击我</Button>
      
      <Form>
        <Form.Item label="用户名">
          <Form.Input placeholder="请输入用户名" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default MyComponent;
```

#### 3.2 使用组件库的样式变量

```scss
// src/components/MyComponent/style.module.scss
.container {
  padding: $spacing-md;
  background-color: $body-background;
  border-radius: $border-radius;
  
  // 使用响应式混合
  @include respond-to(md) {
    padding: $spacing-sm;
  }
}

.title {
  color: $primary;
  margin-bottom: $spacing-md;
}
```

```jsx
// src/components/MyComponent/index.jsx
import React from 'react';
import { Button } from 'speccapitals-common';
import styles from './style.module.scss';

const MyComponent = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>我的组件</h1>
      <Button type="primary">点击我</Button>
    </div>
  );
};

export default MyComponent;
```

#### 3.3 覆盖组件库的默认样式

```scss
// src/styles/overrides.scss
:global {
  // 覆盖 Button 组件样式
  .sc-button {
    border-radius: 8px;
    
    &.sc-button-primary {
      background-color: #1890ff;
    }
  }
  
  // 覆盖 Table 组件样式
  .sc-table {
    .sc-table-header {
      background-color: #f0f2f5;
    }
  }
}
```

在入口文件中引入：

```jsx
// src/index.js
import './styles/overrides.scss';
```

#### 3.4 自定义主题

```jsx
// src/App.js
import React from 'react';
import { ThemeProvider } from 'speccapitals-common';

// 自定义主题
const customTheme = {
  colors: {
    primary: { hex: '#1890ff', rgb: [24, 144, 255] },
    secondary: { hex: '#52c41a', rgb: [82, 196, 26] },
  },
  spacing: {
    md: '20px',
  },
};

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      {/* 应用内容 */}
    </ThemeProvider>
  );
};

export default App;
```

## 最佳实践与注意事项

### 1. 渐进式替换

- 不要一次性替换所有组件，而是从简单的开始，逐步替换
- 可以先替换全局样式系统，再替换具体组件
- 建议按照以下顺序进行替换：
  1. 全局样式变量和混合
  2. 基础组件（Button、Input 等）
  3. 表单组件
  4. 复杂组件（Table、Modal 等）

### 2. 兼容性处理

- 对于有特殊定制的组件，可以创建包装组件进行适配
- 使用组件库的 API 可能与原有组件有差异，需要仔细检查
- 可以在替换过程中创建临时的兼容层，保持原有 API 不变

### 3. 样式隔离

- 组件库使用 CSS Modules 进行样式隔离，避免样式冲突
- 在老项目中使用时，注意全局样式可能的冲突问题
- 使用 `:global` 选择器时要特别小心，避免影响其他组件

### 4. 性能优化

- 使用组件库可以减少重复代码，提高性能
- 考虑使用按需加载，减少打包体积
- 可以使用 `babel-plugin-import` 实现组件按需加载

```js
// .babelrc
{
  "plugins": [
    ["import", { "libraryName": "speccapitals-common", "style": true }]
  ]
}
```

### 5. 测试与回归

- 每替换一个组件，都需要进行充分测试
- 特别关注样式和交互行为是否与原有组件一致
- 建议编写自动化测试，确保组件行为符合预期

## 常见问题与解决方案

### 1. 样式变量不生效

**问题**：在组件中使用组件库的样式变量，但变量不生效。

**解决方案**：
- 确保已正确配置 sass-resources-loader
- 检查变量名是否正确，变量名区分大小写
- 尝试手动导入变量文件：`@import 'speccapitals-common/src/styles/variables.scss';`

### 2. 组件样式与设计不符

**问题**：使用组件库的组件，但样式与设计稿不一致。

**解决方案**：
- 使用组件的样式覆盖功能，自定义样式
- 检查是否正确传递了样式相关的 props
- 考虑使用自定义主题

### 3. 打包体积过大

**问题**：引入组件库后，打包体积明显增大。

**解决方案**：
- 使用按需加载，只引入需要的组件
- 配置 tree shaking，移除未使用的代码
- 考虑拆分打包，将组件库代码单独打包

### 4. 与老项目组件冲突

**问题**：组件库组件与老项目中的组件发生冲突。

**解决方案**：
- 使用别名导入，避免命名冲突
- 创建适配层，处理 API 差异
- 确保样式隔离，避免样式冲突

# 集成指南

本文档提供了在不同项目中集成 SpeccCapitals 组件库的详细指南。

## 目录

- [在原项目中集成](#在原项目中集成)
- [在新项目中集成](#在新项目中集成)
- [在非Sass项目中集成](#在非sass项目中集成)
- [样式系统集成](#样式系统集成)
- [主题定制](#主题定制)
- [常见问题](#常见问题)

## 在原项目中集成

### 步骤 1: 安装依赖

在原项目的根目录下运行：

```bash
npm install --save ../speccapitals-common
# 或
yarn add ../speccapitals-common
```

### 步骤 2: 导入组件

```jsx
// 导入组件
import { Button, Table } from 'speccapitals-common';

// 使用组件
const MyComponent = () => (
  <div>
    <Button type="primary">按钮</Button>
    <Table data={data} columns={columns} />
  </div>
);
```

### 步骤 3: 配置样式

在原项目中使用组件库的样式有两种方式：

#### 方式一：直接引用 SCSS 变量和混合

```scss
// 在 SCSS 文件中引入变量和混合
@import '~speccapitals-common/src/styles/variables.scss';
@import '~speccapitals-common/src/styles/mixins.scss';

// 使用变量和混合
.my-component {
  color: $primary;
  padding: $spacing-md;
  
  @include respond-to(md) {
    padding: $spacing-sm;
  }
}
```

#### 方式二：使用 CSS 变量

```css
/* 在 CSS 文件中使用 CSS 变量 */
.my-component {
  color: var(--sc-color-primary);
  padding: var(--sc-spacing-md);
}

@media (max-width: 768px) {
  .my-component {
    padding: var(--sc-spacing-sm);
  }
}
```

#### 方式三：使用样式同步脚本

组件库提供了样式同步脚本，可以将组件库的样式同步到原项目中：

```bash
# 在组件库目录下运行
npm run sync:styles -- --target ../your-project/src/styles
```

### 步骤 4: 配置主题

```jsx
// 在应用入口处配置主题
import { ThemeProvider } from 'speccapitals-common';

const App = () => (
  <ThemeProvider>
    <YourApp />
  </ThemeProvider>
);
```

## 在新项目中集成

### 步骤 1: 安装依赖

```bash
npm install --save speccapitals-common
# 或
yarn add speccapitals-common
```

### 步骤 2: 配置构建工具

#### 对于 webpack：

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
};
```

#### 对于 Create React App：

```bash
# 安装 CRACO
npm install @craco/craco --save-dev

# 创建 craco.config.js
```

```js
// craco.config.js
module.exports = {
  style: {
    modules: {
      localIdentName: '[name]__[local]--[hash:base64:5]',
    },
    sass: {
      loaderOptions: {
        additionalData: `
          @import "speccapitals-common/src/styles/variables.scss";
          @import "speccapitals-common/src/styles/mixins.scss";
        `,
      },
    },
  },
};
```

### 步骤 3: 导入组件和样式

```jsx
// 在应用入口导入全局样式
import 'speccapitals-common/src/styles/global.scss';

// 在组件中使用
import { Button, Table } from 'speccapitals-common';
import { ThemeProvider } from 'speccapitals-common';

const App = () => (
  <ThemeProvider>
    <div>
      <Button type="primary">按钮</Button>
      <Table data={data} columns={columns} />
    </div>
  </ThemeProvider>
);
```

## 在非Sass项目中集成

对于不使用Sass的项目（如使用纯CSS、CSS-in-JS或其他CSS预处理器的项目），SpeccCapitals组件库提供了CSS变量支持。

### 步骤 1: 安装依赖

```bash
npm install --save speccapitals-common
# 或
yarn add speccapitals-common
```

### 步骤 2: 导入CSS变量

```jsx
// 在应用入口导入CSS变量
import 'speccapitals-common/dist/styles/variables.css';

// 导入组件
import { Button, Table } from 'speccapitals-common';
```

### 步骤 3: 在CSS中使用变量

#### 纯CSS项目

```css
/* 在CSS文件中使用变量 */
.my-button {
  background-color: var(--sc-color-primary);
  color: var(--sc-color-white);
  padding: var(--sc-spacing-xs) var(--sc-spacing-md);
  border-radius: var(--sc-border-radius);
}
```

#### CSS-in-JS项目（Styled Components）

```jsx
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: var(--sc-color-primary);
  color: var(--sc-color-white);
  padding: var(--sc-spacing-xs) var(--sc-spacing-md);
  border-radius: var(--sc-border-radius);
`;
```

#### CSS-in-JS项目（Emotion）

```jsx
import { css } from '@emotion/react';

const buttonStyle = css`
  background-color: var(--sc-color-primary);
  color: var(--sc-color-white);
  padding: var(--sc-spacing-xs) var(--sc-spacing-md);
  border-radius: var(--sc-border-radius);
`;
```

### 步骤 4: 在JavaScript中使用CSS变量

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

### 步骤 5: 主题切换

```jsx
// 切换到暗色主题
document.documentElement.classList.add('sc-dark-theme');

// 切换回亮色主题
document.documentElement.classList.remove('sc-dark-theme');
```

## 样式系统集成

### 使用变量

#### Sass变量（适用于Sass项目）

```scss
@import '~speccapitals-common/src/styles/variables.scss';

.my-component {
  color: $primary;
  padding: $spacing-md;
  border-radius: $border-radius;
}
```

#### CSS变量（适用于所有项目）

```css
.my-component {
  color: var(--sc-color-primary);
  padding: var(--sc-spacing-md);
  border-radius: var(--sc-border-radius);
}
```

### 使用混合

```scss
@import '~speccapitals-common/src/styles/mixins.scss';

.my-component {
  @include respond-to(md) {
    padding: $spacing-sm;
  }
  
  @include ellipsis;
  @include rem(margin, 10px 15px);
}
```

### 单独使用变量

如果只需要使用组件库的变量，而不需要引入整个组件库，可以：

#### 对于Sass项目

```scss
// 只导入变量
@import '~speccapitals-common/src/styles/variables.scss';
```

#### 对于非Sass项目

```jsx
// 只导入CSS变量
import 'speccapitals-common/dist/styles/variables.css';

// 或者在JavaScript中使用
import { cssVariables } from 'speccapitals-common/styles';
```

## 主题定制

### 自定义主题

```jsx
import { ThemeProvider } from 'speccapitals-common';

// 自定义主题
const customTheme = {
  colors: {
    primary: { hex: '#1890ff', rgb: [24, 144, 255] },
    secondary: { hex: '#52c41a', rgb: [82, 196, 26] },
  },
  border: {
    radius: '8px',
  },
};

// 应用自定义主题
const App = () => (
  <ThemeProvider theme={customTheme}>
    <YourApp />
  </ThemeProvider>
);
```

### 使用CSS变量覆盖主题

```css
/* 在项目的根样式文件中 */
:root {
  --sc-color-primary: #1890ff;
  --sc-spacing-md: 20px;
}
```

## 常见问题

### 1. 样式冲突问题

**问题**: 组件库的样式与项目中的其他样式冲突。

**解决方案**:
- 使用 CSS Modules 进行样式隔离
- 使用更具体的选择器提高优先级
- 使用 `!important` 标记（不推荐）

### 2. 样式不生效问题

**问题**: 引入的样式变量或混合不生效。

**解决方案**:
- 确保正确配置了 Sass loader
- 检查导入路径是否正确
- 检查变量名是否正确（区分大小写）

### 3. 非Sass项目中使用组件库

**问题**: 项目不使用Sass，无法使用组件库的样式变量。

**解决方案**:
- 使用组件库提供的CSS变量
- 导入 `variables.css` 而不是 `variables.scss`
- 使用 `cssVariables` JavaScript对象

### 4. 构建错误

**问题**: 集成后出现构建错误。

**解决方案**:
- 确保安装了所有必要的依赖
- 检查构建工具的配置是否正确
- 查看构建日志，定位具体错误

### 5. 主题定制问题

**问题**: 自定义主题不生效。

**解决方案**:
- 确保 `ThemeProvider` 正确包裹应用
- 检查自定义主题对象的结构是否正确
- 尝试使用CSS变量覆盖方式 
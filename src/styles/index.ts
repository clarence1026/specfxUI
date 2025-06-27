/**
 * 样式模块入口文件
 * 导出所有样式相关内容，便于其他项目使用
 */

// 导出样式相关内容
import "./global.scss";
import "./variables.scss";
import "./mixins.scss";
import "./variables.css";

// 导出主题和CSS变量
export { defaultTheme as theme } from "./theme/index";
export { cssVariables } from "./cssVariables";

// 命名导出
export * from "./theme/index";
export * from "./cssVariables";

// 注意：SCSS变量和混合不能直接通过JS导出，但通过CSS变量可以在非Sass项目中使用

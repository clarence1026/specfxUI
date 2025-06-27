/**
 * SCSS 模块声明文件
 * 使 TypeScript 能够识别 SCSS 模块导入
 */
declare module "*.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

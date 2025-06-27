/**
 * CSS变量构建脚本
 *
 * 此脚本将Sass变量编译为CSS变量文件，并复制到dist目录
 * 这样非Sass项目也能使用组件库的变量系统
 */

import fs from "fs";
import path from "path";
import * as sass from "sass";
import chalk from "chalk";
import { fileURLToPath } from "url";

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 路径配置
const SOURCE_PATH = path.resolve(__dirname, "../src/styles/variables.scss");
const DEST_DIR = path.resolve(__dirname, "../dist/styles");
const DEST_PATH = path.join(DEST_DIR, "variables.css");

// 确保目标目录存在
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

/**
 * 编译Sass文件为CSS
 * @param {string} source Sass文件路径
 * @returns {string} 编译后的CSS
 */
function compileSass(source) {
  try {
    const result = sass.compile(source, {
      style: "expanded",
      loadPaths: [path.dirname(source)],
      quietDeps: true,
      logger: {
        warn: () => {}, // 静默警告
        debug: () => {},
      },
      legacyFileVisitor: false,
    });
    return result.css.toString();
  } catch (error) {
    console.error(chalk.red("Sass编译错误:"), error);
    process.exit(1);
  }
}

/**
 * 提取并只保留CSS变量部分
 * @param {string} css 完整的CSS内容
 * @returns {string} 只包含CSS变量的内容
 */
function extractCssVars(css) {
  // 查找:root部分
  const rootMatch = css.match(/:root\s*{([^}]*)}/);
  if (!rootMatch) {
    console.error(chalk.red("错误: 未找到CSS变量定义(:root)"));
    process.exit(1);
  }

  // 提取:root内容
  const rootContent = rootMatch[1].trim();

  // 提取暗色主题部分
  const darkThemeMatch = css.match(/\.sc-dark-theme\s*{([^}]*)}/);
  const darkThemeContent = darkThemeMatch ? darkThemeMatch[1].trim() : "";

  // 构建最终CSS
  let finalCss = `/**
 * SpeccCapitals 组件库 CSS 变量
 * 自动从Sass变量生成
 */

:root {
${rootContent}
}`;

  // 如果有暗色主题，添加到最终CSS
  if (darkThemeContent) {
    finalCss += `

/* 暗色主题变量 */
.sc-dark-theme {
${darkThemeContent}
}`;
  }

  return finalCss;
}

/**
 * 创建TypeScript接口文件
 * @param {string} css CSS变量内容
 */
function createTsInterface(css) {
  // 提取变量名
  const varRegex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;
  const variables = {};
  let match;

  while ((match = varRegex.exec(css)) !== null) {
    const name = match[1];
    const value = match[2].trim();

    // 按前缀分组
    const parts = name.split("-");
    if (parts.length >= 3) {
      const prefix = parts[1]; // sc-color, sc-spacing等
      const varName = parts.slice(2).join("-");

      if (!variables[prefix]) {
        variables[prefix] = {};
      }

      variables[prefix][varName] = `var(--sc-${prefix}-${varName})`;
    }
  }

  // 生成TypeScript接口
  let tsContent = `/**
 * 自动生成的CSS变量TypeScript接口
 * 不要手动修改此文件
 */

`;

  // 为每个前缀创建接口
  Object.keys(variables).forEach((prefix) => {
    const interfaceName = `${prefix.charAt(0).toUpperCase()}${prefix.slice(
      1
    )}Variables`;
    tsContent += `export interface ${interfaceName} {\n`;

    Object.keys(variables[prefix]).forEach((varName) => {
      tsContent += `  ${varName}: string;\n`;
    });

    tsContent += `}\n\n`;
  });

  // 创建主接口
  tsContent += `export interface CssVariables {\n`;
  Object.keys(variables).forEach((prefix) => {
    tsContent += `  ${prefix}: ${prefix.charAt(0).toUpperCase()}${prefix.slice(
      1
    )}Variables;\n`;
  });
  tsContent += `}\n\n`;

  // 创建变量对象
  tsContent += `export const cssVariables: CssVariables = {\n`;
  Object.keys(variables).forEach((prefix) => {
    tsContent += `  ${prefix}: {\n`;
    Object.keys(variables[prefix]).forEach((varName) => {
      tsContent += `    ${varName}: '${variables[prefix][varName]}',\n`;
    });
    tsContent += `  },\n`;
  });
  tsContent += `};\n\n`;

  tsContent += `export default cssVariables;\n`;

  // 写入文件
  fs.writeFileSync(path.join(DEST_DIR, "cssVariables.ts"), tsContent, {
    encoding: "utf8",
  });
  console.log(
    chalk.green("✓"),
    "生成TypeScript接口文件:",
    chalk.cyan("cssVariables.ts")
  );
}

// 主函数
function main() {
  console.log(chalk.blue("开始构建CSS变量文件..."));

  // 1. 编译Sass文件
  console.log("编译Sass文件:", chalk.cyan(SOURCE_PATH));
  const compiledCss = compileSass(SOURCE_PATH);

  // 2. 提取CSS变量
  console.log("提取CSS变量...");
  const cssVars = extractCssVars(compiledCss);

  // 3. 写入目标文件
  fs.writeFileSync(DEST_PATH, cssVars, { encoding: "utf8" });
  console.log(chalk.green("✓"), "生成CSS变量文件:", chalk.cyan(DEST_PATH));

  // 4. 创建TypeScript接口
  console.log("生成TypeScript接口...");
  createTsInterface(cssVars);

  console.log(chalk.green("\n✓ 完成!"), "所有CSS变量文件已生成");
}

// 执行主函数
main();

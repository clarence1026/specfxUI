import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { createRequire } from "module";

// 使用createRequire导入JSON文件
const require = createRequire(import.meta.url);
const pkg = require("./package.json");

// 构建配置生成函数
const createConfig = (input, output) => ({
  input,
  output,
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    commonjs(),
    postcss({
      extensions: [".css", ".scss"],
      minimize: true,
      extract: true,
      modules: true,
      autoModules: true,
      namedExports: true,
      inject: false,
      use: ["sass"],
    }),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist",
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      presets: [
        ["@babel/preset-env", { targets: { node: "14" } }],
        "@babel/preset-react",
        "@babel/preset-typescript",
      ],
    }),
    terser(),
  ],
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.dependencies || {}),
    "react/jsx-runtime",
  ],
});

export default [
  // 主入口
  createConfig("src/index.ts", [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
  ]),

  // utils 入口
  createConfig("src/utils/index.ts", [
    {
      file: "dist/utils/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/utils/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ]),

  // styles 入口
  createConfig("src/styles/index.ts", [
    {
      file: "dist/styles/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/styles/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ]),

  // hooks 入口
  createConfig("src/hooks/index.ts", [
    {
      file: "dist/hooks/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/hooks/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ]),
];

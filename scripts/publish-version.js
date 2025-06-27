/**
 * 自动化发布脚本
 *
 * 此脚本简化了组件库的发布流程，自动执行以下步骤：
 * 1. 检查代码是否干净（无未提交更改）
 * 2. 构建项目
 * 3. 更新版本号
 * 4. 提交版本更新
 * 5. 创建Git标签
 * 6. 推送到远程仓库
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import chalk from "chalk";
import readline from "readline";

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// 创建readline接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 版本类型
const VERSION_TYPES = {
  patch: "修复版本 (0.1.0 -> 0.1.1)",
  minor: "功能版本 (0.1.0 -> 0.2.0)",
  major: "主要版本 (0.1.0 -> 1.0.0)",
};

/**
 * 执行命令并打印输出
 * @param {string} command 要执行的命令
 * @param {boolean} silent 是否静默执行
 * @returns {string} 命令输出
 */
function execCommand(command, silent = false) {
  try {
    if (!silent) console.log(chalk.blue(`执行命令: ${command}`));
    const output = execSync(command, { encoding: "utf8", cwd: rootDir });
    if (!silent && output.trim()) console.log(output);
    return output;
  } catch (error) {
    console.error(chalk.red(`命令执行失败: ${command}`));
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

/**
 * 检查工作区是否干净
 */
function checkWorkingDir() {
  console.log(chalk.blue("检查工作区状态..."));
  const status = execCommand("git status --porcelain", true);

  if (status.trim()) {
    console.error(chalk.red("错误: 工作区不干净，请先提交或暂存所有更改"));
    console.error(status);
    process.exit(1);
  }

  console.log(chalk.green("✓ 工作区干净"));
}

/**
 * 更新版本号
 * @param {string} type 版本类型：patch, minor, major
 * @returns {string} 新版本号
 */
function updateVersion(type) {
  console.log(chalk.blue(`更新${VERSION_TYPES[type]}...`));

  // 读取package.json
  const packageJsonPath = path.join(rootDir, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const currentVersion = packageJson.version;

  // 拆分版本号
  const [major, minor, patch] = currentVersion.split(".").map(Number);

  // 根据类型更新版本号
  let newVersion;
  switch (type) {
    case "major":
      newVersion = `${major + 1}.0.0`;
      break;
    case "minor":
      newVersion = `${major}.${minor + 1}.0`;
      break;
    case "patch":
    default:
      newVersion = `${major}.${minor}.${patch + 1}`;
      break;
  }

  // 更新package.json
  packageJson.version = newVersion;
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + "\n"
  );

  console.log(chalk.green(`✓ 版本已更新: ${currentVersion} -> ${newVersion}`));
  return newVersion;
}

/**
 * 构建项目
 */
function buildProject() {
  console.log(chalk.blue("构建项目..."));
  execCommand("pnpm clean");
  execCommand("pnpm build");
  console.log(chalk.green("✓ 项目构建成功"));
}

/**
 * 提交版本更新并创建标签
 * @param {string} version 版本号
 */
function commitAndTag(version) {
  const tagName = `v${version}`;

  console.log(chalk.blue("提交版本更新..."));
  execCommand("git add package.json");
  execCommand(`git commit -m "chore: 更新版本至 ${version}"`);

  console.log(chalk.blue(`创建标签 ${tagName}...`));
  execCommand(`git tag -a ${tagName} -m "Release version ${version}"`);

  console.log(chalk.green("✓ 提交和标签创建成功"));
}

/**
 * 推送到远程仓库
 * @param {string} version 版本号
 */
function pushToRemote(version) {
  const tagName = `v${version}`;

  console.log(chalk.blue("推送到远程仓库..."));
  execCommand("git push origin main");
  execCommand(`git push origin ${tagName}`);

  console.log(chalk.green("✓ 推送成功"));
}

/**
 * 显示发布完成信息
 * @param {string} version 版本号
 */
function showCompletionInfo(version) {
  const tagName = `v${version}`;

  console.log(chalk.green(`\n✅ 版本 ${version} 发布成功!`));
  console.log(chalk.blue("\n后续步骤:"));
  console.log("1. 在GitHub上创建Release:");
  console.log(
    `   https://github.com/your-username/speccapitals-common/releases/new?tag=${tagName}`
  );
  console.log("2. 填写发布说明");
  console.log('3. 点击"Publish release"按钮');
}

/**
 * 主函数
 */
function main() {
  console.log(chalk.blue("===== SpeccCapitals 组件库发布工具 =====\n"));

  // 询问版本类型
  rl.question(
    `请选择要发布的版本类型:
1. ${VERSION_TYPES.patch}
2. ${VERSION_TYPES.minor}
3. ${VERSION_TYPES.major}

请输入选项 (1-3): `,
    (answer) => {
      let versionType;
      switch (answer.trim()) {
        case "1":
          versionType = "patch";
          break;
        case "2":
          versionType = "minor";
          break;
        case "3":
          versionType = "major";
          break;
        default:
          console.error(chalk.red("无效的选项"));
          rl.close();
          process.exit(1);
      }

      rl.question(
        `\n您选择了: ${VERSION_TYPES[versionType]}\n确认继续发布? (y/n): `,
        (confirm) => {
          if (confirm.toLowerCase() !== "y") {
            console.log(chalk.yellow("发布已取消"));
            rl.close();
            return;
          }

          try {
            // 执行发布流程
            checkWorkingDir();
            buildProject();
            const newVersion = updateVersion(versionType);
            commitAndTag(newVersion);
            pushToRemote(newVersion);
            showCompletionInfo(newVersion);
          } catch (error) {
            console.error(chalk.red("发布过程中出错:"), error);
          } finally {
            rl.close();
          }
        }
      );
    }
  );
}

// 执行主函数
main();

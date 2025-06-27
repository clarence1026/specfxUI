# 发布指南

本文档详细介绍如何发布 SpeccCapitals 组件库到 GitHub。

## 版本管理

SpeccCapitals 组件库使用语义化版本（[Semantic Versioning](https://semver.org/lang/zh-CN/)）进行版本管理：

- **主版本号（Major）**：当进行不兼容的 API 修改时
- **次版本号（Minor）**：当添加功能但保持向后兼容时
- **修订号（Patch）**：当进行向后兼容的缺陷修复时

例如：从 `1.2.3` 到 `2.0.0` 表示有不兼容的 API 变更。

## 详细的发布流程

本项目使用 Lerna 进行版本管理，并结合 Git 标签和 GitHub Releases 进行发布。以下是详细的步骤：

### 1. 确保代码已提交

在开始发布流程之前，确保所有代码更改已经提交到 Git 仓库：

```bash
# 查看有无未提交的更改
git status

# 如有更改，提交它们
git add .
git commit -m "feat: 准备发布新版本"

# 拉取最新的远程代码
git checkout main
git pull origin main
```

### 2. 使用 Lerna 更新版本号

Lerna 提供了强大的版本管理功能。在项目中，我们已经配置了 `lerna:version` 脚本来简化这个过程：

```bash
# 更新补丁版本 (0.1.0 -> 0.1.1)
pnpm lerna:version patch

# 或者更新次要版本 (0.1.0 -> 0.2.0)
pnpm lerna:version minor

# 或者更新主要版本 (0.1.0 -> 1.0.0)
pnpm lerna:version major
```

当你运行这个命令时，Lerna 会：

1. 检测自上次发布以来的更改
2. 提示你确认版本号变更
3. 更新 `package.json` 和 `lerna.json` 中的版本号
4. 创建一个包含这些更改的提交
5. 创建一个新的 Git 标签（如 `v0.2.0`）
6. **自动推送**这些更改和标签到远程仓库（默认是 `origin`）

例如，运行 `pnpm lerna:version patch` 的输出可能如下：

```
lerna notice cli v7.1.4
lerna info versioning independent
lerna info Looking for changed packages since v0.1.0
? Select a new version (currently 0.1.0) (Use arrow keys)
❯ Patch (0.1.1)
  Minor (0.2.0)
  Major (1.0.0)
  Prepatch (0.1.1-alpha.0)
  Preminor (0.2.0-alpha.0)
  Premajor (1.0.0-alpha.0)
  Custom Prerelease
  Custom Version
```

选择适当的版本后，Lerna 会执行上述步骤。

> **注意**：如果你不想自动推送到远程仓库，可以添加 `--no-push` 参数：
> ```bash
> pnpm lerna version patch --no-push
> ```

### 3. 手动推送（如果使用了 --no-push）

如果你在上一步使用了 `--no-push` 参数，现在需要手动推送更改：

```bash
# 推送提交
git push origin main

# 推送标签
git push origin v0.1.1  # 替换为实际的版本标签
```

### 4. 更新 CHANGELOG（可选）

Lerna 可以通过 `conventionalCommits` 选项自动生成变更日志，但如果你需要手动更新或补充 CHANGELOG.md：

```bash
# 编辑 CHANGELOG.md
code CHANGELOG.md  # 或使用你喜欢的编辑器

# 提交更改
git add CHANGELOG.md
git commit -m "docs: update changelog for v0.1.1"
git push origin main
```

### 5. 构建项目

确保项目能够成功构建：

```bash
# 清理旧的构建文件
pnpm clean

# 构建项目
pnpm build
```

### 6. 创建 GitHub Release

1. 在浏览器中打开你的 GitHub 仓库页面
2. 点击 "Releases" 选项卡（通常在仓库名称下方）
3. 点击 "Draft a new release" 按钮
4. 在 "Choose a tag" 下拉菜单中，选择刚刚创建的标签（如 `v0.1.1`）
5. 填写发布标题，通常与标签名称相同（如 "v0.1.1"）
6. 在描述框中添加详细的更新日志
7. 如果需要，可以上传构建后的文件（如 zip 格式的 dist 目录）
8. 点击 "Publish release" 按钮发布

### 7. 在其他项目中使用新版本

在需要使用组件库的项目中，通过 Git URL 安装特定版本：

```bash
# 安装特定版本
pnpm add git+https://github.com/your-username/speccapitals-common.git#v0.1.1

# 或者安装最新版本
pnpm add git+https://github.com/your-username/speccapitals-common.git
```

在 `package.json` 中的依赖项将显示为：

```json
"dependencies": {
  "speccapitals-common": "git+https://github.com/your-username/speccapitals-common.git#v0.1.1"
}
```

## 发布检查清单

每次发布前，请检查以下事项：

- [ ] 所有测试是否通过 (`pnpm test`)
- [ ] 文档是否更新
- [ ] CHANGELOG.md 是否更新
- [ ] 构建是否成功 (`pnpm build`)
- [ ] 示例项目是否能正常使用新版本

## 常见问题

### 如果 Lerna 版本更新失败怎么办？

如果 `lerna version` 命令执行失败，可以尝试：

1. 确保 Git 工作区是干净的（没有未提交的更改）
2. 确保你有权限推送到远程仓库
3. 尝试使用 `--no-push` 参数，然后手动推送

```bash
pnpm lerna:version patch --no-push
git push origin main
git push origin v0.1.1  # 替换为实际版本
```

### 如何回滚版本？

如果需要回滚版本，可以：

1. 删除错误的标签
2. 恢复 package.json 和 lerna.json 中的版本号
3. 创建新的提交

```bash
# 删除本地标签
git tag -d v0.1.1

# 删除远程标签
git push origin --delete v0.1.1

# 编辑 package.json 和 lerna.json 恢复版本号
# ...

# 提交更改
git add .
git commit -m "revert: restore version to 0.1.0"
git push origin main
```

### 如何查看所有已发布的版本？

```bash
# 查看所有标签
git tag -l

# 查看特定版本的详细信息
git show v0.1.0
```
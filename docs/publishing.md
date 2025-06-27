# 发布指南

本文档详细介绍如何发布 SpeccCapitals 组件库到 GitHub。

## 版本管理

SpeccCapitals 组件库使用语义化版本（[Semantic Versioning](https://semver.org/lang/zh-CN/)）进行版本管理：

- **主版本号（Major）**：当进行不兼容的 API 修改时
- **次版本号（Minor）**：当添加功能但保持向后兼容时
- **修订号（Patch）**：当进行向后兼容的缺陷修复时

例如：从 `1.2.3` 到 `2.0.0` 表示有不兼容的 API 变更。

## 简化的发布流程（推荐）

我们提供了一个自动化脚本来简化发布流程。只需运行以下命令：

```bash
pnpm release
```

脚本会引导您完成整个发布过程，包括：

1. 选择版本类型（patch/minor/major）
2. 检查工作区是否干净
3. 构建项目
4. 更新版本号
5. 提交版本更新
6. 创建Git标签
7. 推送到远程仓库
8. 提示您在GitHub上创建Release

完成后，您只需要在GitHub上创建Release，填写发布说明即可。

## 详细的手动发布流程

如果您想手动控制发布流程的每个步骤，可以按照以下详细步骤操作：

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

### 2. 更新版本号

手动更新 `package.json` 中的版本号：

```bash
# 编辑 package.json 文件
code package.json  # 或使用你喜欢的编辑器
```

根据语义化版本规则更新版本号：
- 修复bug：0.1.0 -> 0.1.1 (patch)
- 新功能：0.1.0 -> 0.2.0 (minor)
- 破坏性变更：0.1.0 -> 1.0.0 (major)

### 3. 提交版本更新并创建标签

```bash
# 提交版本更新
git add package.json
git commit -m "chore: bump version to x.y.z"

# 创建标签
git tag -a vx.y.z -m "Release version x.y.z"

# 推送提交和标签
git push origin main
git push origin vx.y.z
```

### 4. 更新 CHANGELOG（可选）

如果需要手动更新或补充 CHANGELOG.md：

```bash
# 编辑 CHANGELOG.md
code CHANGELOG.md  # 或使用你喜欢的编辑器

# 提交更改
git add CHANGELOG.md
git commit -m "docs: update changelog for vx.y.z"
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
4. 在 "Choose a tag" 下拉菜单中，选择刚刚创建的标签（如 `vx.y.z`）
5. 填写发布标题，通常与标签名称相同（如 "vx.y.z"）
6. 在描述框中添加详细的更新日志
7. 如果需要，可以上传构建后的文件（如 zip 格式的 dist 目录）
8. 点击 "Publish release" 按钮发布

### 7. 在其他项目中使用新版本

在需要使用组件库的项目中，通过 Git URL 安装特定版本：

```bash
# 安装特定版本
pnpm add git+https://github.com/your-username/speccapitals-common.git#vx.y.z

# 或者安装最新版本
pnpm add git+https://github.com/your-username/speccapitals-common.git
```

在 `package.json` 中的依赖项将显示为：

```json
"dependencies": {
  "speccapitals-common": "git+https://github.com/your-username/speccapitals-common.git#vx.y.z"
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

### 如何回滚版本？

如果需要回滚版本，可以：

1. 删除错误的标签
2. 恢复 package.json 中的版本号
3. 创建新的提交

```bash
# 删除本地标签
git tag -d vx.y.z

# 删除远程标签
git push origin --delete vx.y.z

# 编辑 package.json 恢复版本号
# ...

# 提交更改
git add .
git commit -m "revert: restore version to a.b.c"
git push origin main
```

### 如何查看所有已发布的版本？

```bash
# 查看所有标签
git tag -l

# 查看特定版本的详细信息
git show vx.y.z
```
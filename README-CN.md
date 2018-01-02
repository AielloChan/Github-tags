![Github-tags](https://raw.githubusercontent.com/AielloChan/Github-tags/master/README/banner.png)

# Github-tags

> 一个让你能够给 Github 项目贴标签的 Chrome 插件。

![Github-tags 预览](https://raw.githubusercontent.com/AielloChan/Github-tags/master/README/preview.gif)

**提醒：** 此项目还处于初级开发阶段，正在重构中！

## 简单使用

1. 首先你需要安装有一个 Google Chrome 浏览器；
2. 下载[最新发布的版本](https://github.com/AielloChan/Github-tags/releases)中的 zip 文档，解压后双击安装 crx 插件；
3. 安装完成后，插件会自动打开一个配置页面，按照说明操作即可。

## 构建项目

``` bash
# 安装依赖
npm install

# 在本地运行热跟新开发环境（仅适用于 Option 页面开发） localhost:8080
npm run dev

# 完整项目构建
npm run build
```

构建完成后，**dist** 目录则为生成的 Chrome 浏览器插件。

## 如何使用构建出来的文件
1. 你需要 [Fork 一个 Github 仓库](https://github.com/AielloChan/Tags)，将其作为你的数据仓库；
2. 创建一个新的授权 [token](https://github.com/settings/tokens)，保持 **Repo** 权限为选中状态，这样插件才能保存数据到你的 **data.json** 文件中；
3. 按照上文中的 **构建项目** 的说明构建插件;
4. 打开 Chrome 浏览器的[插件管理](chrome://extensions/)页面，勾选 **开发者模式**，点击 **加载未压缩插件** 按钮并选择 **dist** 文件夹，到此 **Github-tags** 加载完成；
5. 一旦你加载成功，插件会自动打开配置页面，在其中填好你之前创建的项目地址（如 AielloChan/tags），填入第 2 步中创建的 Token 并点击 **Save**；
6. 搞定！现在所有的 Github 项目页面都会新增一个名为 **Tags** 的按钮，还不赶快试试看！


# 待开发的功能

1. 基础功能强化
2. README.md 展示 Tag 结构
3. 配置页面能够显示并管理 Tag 数据
4. ~~其他相关的琐碎事情，如图标、简介等（目前为止，已经实现最小可用程序）~~
5. 将这个项目标准化（增加测试以及详尽的文档）
6. Github-pages 展示 Tag 页面
7. Github-pages 能够实现管理 Tag 数据
8. 多语言支持
9. 多浏览器支持
10. 更多有用的附加功能
![Github-tags](https://raw.githubusercontent.com/AielloChan/Github-tags/master/README/banner.png)

# Github-tags

> A chrome extension can save you from github star mess.

![Github-tags preview](https://raw.githubusercontent.com/AielloChan/Github-tags/master/README/preview.gif)

**Warning:** In reconstruction.

[中文说明](https://github.com/AielloChan/Github-tags/blob/master/README-CN.md)

## Quick use

1. Make sure you have installed a Google Chrome browser;
2. Download zip in [Latest release](https://github.com/AielloChan/Github-tags/releases), and unzip it, then double click the **Github-tags_xx.xx.crx** file to install it.
3. When you install it successed, this extension will open a option page automatically, follow the help to config it.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

Then the dist folder is your chrome browser extension.

## How to use the build file
1. You should [fork a repository](https://github.com/AielloChan/Tags) to be your data repository;
2. Generate a new [token](https://github.com/settings/tokens) with **Repo** checked;(therefor Ext can update your tag data);
3. Build Extensions (with Build Setup);
4. Open [Extensions](chrome://extensions/) in your google chrome, and checked **Developer mode**, then click **Load unpacked extension..** button and choose **dist** folder, now **Github-tags** loaded;
5. One web page will be opened automaticly, fill in your repository address(e.g. AielloChan/tags), token and click **Save**;
6. Here we go!! Every github repository page will be added a button named **Tags**, try it out!


# TODO Features

1. Base functional enhance
2. README.md shows data
3. Options page shows & manage data
4. ~~Other around mess, e.g. icon, brief (till now Minimum Viable Product was done)~~
5. Standard this project (test, docs etc.)
6. Github-pages shows data
7. Github-pages manage data
8. More language support
9. More browser support
10. More new useness function
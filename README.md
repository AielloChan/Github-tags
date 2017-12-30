# Github-tags

> A chrome extension can save you from github star mess.

**Warning:** This proj is initial developing.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

Then the dist folder is your extension.

## How to use
1. You should create a new git-repository which are used for store your tags data(e.g. tags), add a new file named **data.json** with content below:
    ```json
    {"version":"1.0","global_tag_index":0,"tags":{},"repos":{}}
    ```
2. Generate a new [tocken](https://github.com/settings/tokens) with **Repo** checked;(therefor Ext can update your tag data);
3. Build Extensions (with Build Setup);
4. Open [Extensions](chrome://extensions/) in your google chrome, and checked **Developer mode**, then click **Load unpacked extension..** button and choose **disk** folder, now **Github-tags** loaded;
5. One web page will be opened automaticly, fill in your repository address(e.g. AielloChan/tags), token and click **Save**;
6. Here we go!! Every github repository page will be added a button named **Tags**, try it out!


# TODO Features

1. Base functional enhance
2. README.md shows data
3. Options page shows & manage data
4. Other around mess, e.g. icon, brief (till now Minimum Viable Product was done)
5. Standard this project (test, docs etc.)
6. Github-pages shows data
7. Github-pages manage data
8. More language support
9. More browser support
10. More new useness function
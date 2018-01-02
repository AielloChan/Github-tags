<template>
    <div clss="github-tags_help" id="help">
        <h3>How to use</h3>
        <ol>
            <li>
                <h4>Fork a data repository</h4>
                <p>
                    Click <a target="_blank" href="https://github.com/AielloChan/Tags">here</a>,
                    to Open my data template repository, <strong>fork it to your github</strong> 
                    by click the "Fork" button in the right corner.
                </p>
            </li>
            <li>
                <h4>Get a token</h4>
                <p>
                    In order to write your tag data to <b>data.json</b> file, you 
                    should authorize this extension to access your repo. <br/>
                    Open this <a target="_blank" href="https://github.com/settings/tokens">page</a>,
                    click the "Generate new token" button, and make sure the "repo" 
                    checkbox was checked. Then click "Generate token" at the end of 
                    this page. There was a new token  generated, copy it!
                </p>
            </li>
            <li>
                <h4>One more step</h4>
                <p>
                    Paste the token into "Github token" input field on top first(avoid forget), and 
                    then, Type your forked repository's full name (it looks like: YOUR_GITHUB_NAME/Tags, 
                    e.g.: AielloChan/Tags), Click "Save". <br/>
                    Boom! All done! Open a <a href="https://github.com/AielloChan/Github-tags">Github 
                    page</a> to try it out!
                </p>
            </li>
        </ol>
        <h3>如何使用</h3>
        <ol>
            <li>
                <h4>Fork 一个数据仓库</h4>
                <p>
                    点击 <a target="_blank" href="https://github.com/AielloChan/Tags">这里</a>，
                    将会打开我建好的数据仓库， <strong>fork 它到你自己的 Github</strong>（点击右上角的 
                    Fork 按钮即可）。
                </p>
            </li>
            <li>
                <h4>创建一个授权 Token</h4>
                <p>
                    为了能让本插件将你的标签数据写入 <b>data.json</b> 文件， 你需要给予它访问仓库的权限。<br/>
                    打开这个 <a target="_blank" href="https://github.com/settings/tokens">页面</a>，
                    点击 “Generate new token” 按钮，保证 “repo” 这个选项是勾选了的。然后点击页面最下方的 
                    "Generate token"。然后就生成了一个新的授权码，把它复制下来！
                </p>
            </li>
            <li>
                <h4>最后一步</h4>
                <p>
                    先把复制的授权码粘贴到上面的 “Github token” 输入框（防止忘记），然后在另一个输入框中键入你之前 
                    Fork 的仓库的完整名称（它看起来像这样：你Github的名字/Tags，比如我的就是：AielloChan/Tags），
                    点击 “Save”。 <br/>
                    一切都已完成！打开一个 <a href="https://github.com/AielloChan/Github-tags">Github 页面</a>
                    试试吧！
                </p>
            </li>
        </ol>
    </div>
</template>

<script>
export default {
    name:"help"
};
</script>

<style>
.github-tags_help {
  padding: 20px 50px 0 50px;
}
</style>

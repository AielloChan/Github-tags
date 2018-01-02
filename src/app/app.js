import Vue from 'vue';
import Config from './config.js';
import SendMsg from './sendMsg.js';
import ActionButton from './components/action-button.vue';
import MenuModal from './components/menu-modal.vue';

var AppDomNode = null,
    App = null;


// Inject vue app root node
function injectAppRootNode(selStr, nodeStr) {
    var bar = document.querySelector(selStr);
    bar.innerHTML = nodeStr + bar.innerHTML;
}

// listing mask click
function addModalClickHook(selStr, callback) {
    var mask = document.querySelector(selStr);
    mask.onclick = callback;
}

// When all prepared, run it :)
function startApp(mountPoint) {
    return new Vue({
        el: mountPoint,
        data: Bag.data,
        methods: Bag.methods,
        components: {
            ActionButton,
            MenuModal
        },
        mounted: mounted,
        render: render
    });
}

// appMounted callback
function mounted() {
    // get & store app node
    AppDomNode = document.getElementById(Config.APP_DOM_NODE_ID);

    // get current repo path
    // e.g. AielloChan/blog
    this.env.currentRepo = (function () {
        var path = window.location.pathname
        var results = /([^\/]+\/[^\/]+)/.exec(path);
        if (results.length > 0) {
            return results[0];
        } else {
            return '';
        }
    })();

    this.fetch();
}


// render
function render(createElement) {
    return createElement(
        'li', {
            class: "select-menu float-left",
            attrs: {
                id: Config.APP_DOM_NODE_ID
            }
        }, [
            createElement(ActionButton, {
                props: {
                    open: this.state.open,
                    count: this.data.usedTags.length,
                    saving: this.state.saving,
                    fetching: this.state.fetching,
                    currentRepo: this.env.currentRepo,
                    actionButtonClick: this.actionButtonClick
                }
            }),

            createElement(MenuModal, {
                props: {
                    showModal: this.state.open,
                    fetching: this.state.fetching,
                    usedTags: this.data.usedTags,
                    unusedTags: this.data.unusedTags,
                    useTag: this.useTag,
                    addTag: this.addTag,
                    unuseTag: this.unuseTag,
                    removeAll: this.removeAll,
                    hightLightTag: this.state.hightLightTag
                }
            })
        ]
    )
}


// Data bag
// Avoid new Vue looks too mess
var Bag = {
    data: {
        env: {
            currentRepo: ''
        },
        state: {
            open: false,
            saving: false,
            fetching: false,
            hightLightTag: -1
        },
        data: {
            tagsCount: 0,
            usedTags: [],
            unusedTags: []
        }
    },
    methods: {
        useTag: function (tagId) {
            for (var i = 0,
                len = this.data.unusedTags.length; i < len; i++) {
                if (this.data.unusedTags[i].id == tagId) {
                    var tag = this.data.unusedTags[i];
                    this.data.unusedTags.splice(i, 1);
                    this.data.usedTags.push(tag);
                    break;
                }
            }
        },
        unuseTag: function (tagId) {
            for (var i = 0,
                len = this.data.usedTags.length; i < len; i++) {
                if (this.data.usedTags[i].id == tagId) {
                    var tag = this.data.usedTags[i];
                    this.data.usedTags.splice(i, 1);
                    this.data.unusedTags.unshift(tag);
                    break;
                }
            }
        },
        addTag: function (tagName) {
            var tagNameLower = tagName.toLowerCase();
            for (var i = 0,
                len = this.data.usedTags.length; i < len; i++) {
                if (this.data.usedTags[i].name.toLowerCase() ==
                    tagNameLower) {
                    this.hightLightTag(this.data.usedTags[i].id);
                    return;
                }
            }
            for (var i = 0,
                len = this.data.unusedTags.length; i < len; i++) {
                if (this.data.unusedTags[i].name.toLowerCase() ==
                    tagNameLower) {
                    this.useTag(this.data.unusedTags[i].id);
                    return;
                }
            }
            this.data.usedTags.push({
                id: this.data.tagsCount++,
                name: tagName
            });
        },
        removeAll: function () {
            this.data.unusedTags =
                this.data.usedTags.concat(this.data.unusedTags)
            this.data.usedTags = [];
        },
        hightLightTag: function (tagId) {
            this.state.hightLightTag = tagId;
            setTimeout(() => {
                this.state.hightLightTag = -1;
            }, 2000);
        },
        closeModal: function () {
            if (/active/.test(AppDomNode.className)) {
                // Modal is closing
                this.save();
            } else {
                // just closing others, don't care ¯\_(ツ)_/¯
            }
        },
        actionButtonClick: function () {
            if (this.state.open) {
                // Modal is closing
                this.save();
                this.state.open = false;
            } else {
                // Openning Modal
                this.fetch();
                this.state.open = true;
            }
        },
        save: function () {
            this.state.saving = true;

            SendMsg('save', {
                currentRepo: this.env.currentRepo,
                content: {
                    usedTags: this.data.usedTags,
                    unusedTags: this.data.unusedTags
                }
            }, (response) => {
                if (response.code == 200) {
                    this.state.saving = false;
                } else {
                    console.error(response.error)
                }
            });
        },
        fetch: function () {
            this.state.fetching = true;

            SendMsg('fetch', {
                currentRepo: this.env.currentRepo
            }, (response) => {
                if (response.code == 200) {
                    this.data.usedTags = response.data.usedTags;
                    this.data.unusedTags = response.data.unusedTags;
                    this.data.tagsCount = response.data.tagsCount;
                    this.state.fetching = false;
                } else {
                    console.error(response.error)
                }
            });
        }
    }
}

// Inject app root node for vue
injectAppRootNode(Config.INJECT_POINT_SELECTOR, Config.BASE_INJECT_NODE)

// Init app
App = startApp(Config.VUE_MOUNT_POINT);

// Inject mask hook
App.$on('close_modal', App.closeModal);
addModalClickHook(
    Config.MODAL_HOOK_SELECTOR,
    function () {
        App.$emit('close_modal');
    }
)
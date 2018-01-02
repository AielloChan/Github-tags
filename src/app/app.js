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
            class: "select-menu js-menu-container " +
                "js-select-menu float-left",
            attrs: {
                id: Config.APP_DOM_NODE_ID
            }
        }, [
            createElement(ActionButton, {
                props: {
                    count: this.data.used_tags.length,
                    saving: this.state.saving,
                    fetching: this.state.fetching,
                    currentRepo: this.env.currentRepo,
                    actionButtonClick: this.actionButtonClick
                }
            }),

            createElement(MenuModal, {
                props: {
                    fetching: this.state.fetching,
                    used_tags: this.data.used_tags,
                    unused_tags: this.data.unused_tags,
                    useTag: this.useTag,
                    addTag: this.addTag,
                    unuseTag: this.unuseTag,
                    removeAll: this.removeAll,
                    hight_light_tag: this.state.hight_light_tag
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
            saving: false,
            fetching: false,
            hight_light_tag: -1
        },
        data: {
            tags_count: 0,
            used_tags: [],
            unused_tags: []
        }
    },
    methods: {
        useTag: function (tag_id) {
            for (var i = 0,
                len = this.data.unused_tags.length; i < len; i++) {
                if (this.data.unused_tags[i].id == tag_id) {
                    var tag = this.data.unused_tags[i];
                    this.data.unused_tags.splice(i, 1);
                    this.data.used_tags.push(tag);
                    break;
                }
            }
        },
        unuseTag: function (tag_id) {
            for (var i = 0,
                len = this.data.used_tags.length; i < len; i++) {
                if (this.data.used_tags[i].id == tag_id) {
                    var tag = this.data.used_tags[i];
                    this.data.used_tags.splice(i, 1);
                    this.data.unused_tags.unshift(tag);
                    break;
                }
            }
        },
        addTag: function (tag_name) {
            var tag_name_lower = tag_name.toLowerCase();
            for (var i = 0,
                len = this.data.used_tags.length; i < len; i++) {
                if (this.data.used_tags[i].name.toLowerCase() ==
                    tag_name_lower) {
                    this.hightLightTag(this.data.used_tags[i].id);
                    return;
                }
            }
            for (var i = 0,
                len = this.data.unused_tags.length; i < len; i++) {
                if (this.data.unused_tags[i].name.toLowerCase() ==
                    tag_name_lower) {
                    this.useTag(this.data.unused_tags[i].id);
                    return;
                }
            }
            this.data.used_tags.push({
                id: this.data.tags_count++,
                name: tag_name
            });
        },
        removeAll: function () {
            this.data.unused_tags =
                this.data.used_tags.concat(this.data.unused_tags)
            this.data.used_tags = [];
        },
        hightLightTag: function (tag_id) {
            this.state.hight_light_tag = tag_id;
            setTimeout(() => {
                this.state.hight_light_tag = -1;
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
            if (/active/.test(AppDomNode.className)) {
                // Modal is closing
                this.save();
            } else {
                // Openning Modal
                this.fetch();
            }
        },
        save: function () {
            this.state.saving = true;

            SendMsg('save', {
                currentRepo: this.env.currentRepo,
                content: {
                    used_tags: this.data.used_tags,
                    unused_tags: this.data.unused_tags
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
                    this.data.used_tags = response.data.used_tags;
                    this.data.unused_tags = response.data.unused_tags;
                    this.data.tags_count = response.data.tags_count;
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
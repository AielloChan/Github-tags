<script>
import Vue from "vue";
import Config from "./config.vue";
import DataStore from "./dataStore.vue";
import ActionButton from "./components/action-button.vue";
import MenuModal from "./components/menu-modal.vue";

var AppDomNode = null,
  App = null;

// Inject vue app root node
function injectAppRootNode(selStr, nodeStr) {
  var bar = document.querySelector(selStr);
  bar.innerHTML = nodeStr + bar.innerHTML;
}

// When all prepared, run it :)
function startApp(mountPoint) {
  return new Vue({
    el: mountPoint,
    data: DataStore.data,
    methods: DataStore.methods,
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
  this.env.currentRepo = (function() {
    var path = window.location.pathname;
    var results = /([^\/]+\/[^\/]+)/.exec(path);
    if (results.length > 0) {
      return results[0];
    } else {
      return "";
    }
  })();

  this.fetch();
}

// render
function render(createElement) {
  return createElement(
    "li",
    {
      class: "select-menu float-left",
      attrs: {
        id: Config.APP_DOM_NODE_ID
      }
    },
    [
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
  );
}



// Inject app root node for vue
injectAppRootNode(Config.INJECT_POINT_SELECTOR, Config.BASE_INJECT_NODE);

// Init app
App = startApp(Config.VUE_MOUNT_POINT);

</script>

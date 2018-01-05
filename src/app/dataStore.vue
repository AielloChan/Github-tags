<script>
import SendMsg from "./sendMsg.vue";

// Data bag
// Avoid new Vue looks too mess
export default {
  data: {
    env: {
      currentRepo: ""
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
    useTag: function(tagId) {
      for (var i = 0, len = this.data.unusedTags.length; i < len; i++) {
        if (this.data.unusedTags[i].id == tagId) {
          var tag = this.data.unusedTags[i];
          this.data.unusedTags.splice(i, 1);
          this.data.usedTags.push(tag);
          break;
        }
      }
    },
    unuseTag: function(tagId) {
      for (var i = 0, len = this.data.usedTags.length; i < len; i++) {
        if (this.data.usedTags[i].id == tagId) {
          var tag = this.data.usedTags[i];
          this.data.usedTags.splice(i, 1);
          this.data.unusedTags.unshift(tag);
          break;
        }
      }
    },
    addTag: function(tagName) {
      var tagNameLower = tagName.toLowerCase();
      for (var i = 0, len = this.data.usedTags.length; i < len; i++) {
        if (this.data.usedTags[i].name.toLowerCase() == tagNameLower) {
          this.hightLightTag(this.data.usedTags[i].id);
          return;
        }
      }
      for (var i = 0, len = this.data.unusedTags.length; i < len; i++) {
        if (this.data.unusedTags[i].name.toLowerCase() == tagNameLower) {
          this.useTag(this.data.unusedTags[i].id);
          return;
        }
      }
      this.data.usedTags.push({
        id: this.data.tagsCount++,
        name: tagName
      });
    },
    removeAll: function() {
      this.data.unusedTags = this.data.usedTags.concat(this.data.unusedTags);
      this.data.usedTags = [];
    },
    hightLightTag: function(tagId) {
      this.state.hightLightTag = tagId;
      setTimeout(() => {
        this.state.hightLightTag = -1;
      }, 2000);
    },
    actionButtonClick: function() {
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
    save: function() {
      this.state.saving = true;

      SendMsg(
        "save",
        {
          currentRepo: this.env.currentRepo,
          content: {
            usedTags: this.data.usedTags,
            unusedTags: this.data.unusedTags
          }
        },
        response => {
          if (response.code == 200) {
            this.state.saving = false;
          } else {
            console.error(response.error);
          }
        }
      );
    },
    fetch: function() {
      this.state.fetching = true;

      SendMsg(
        "fetch",
        {
          currentRepo: this.env.currentRepo
        },
        response => {
          if (response.code == 200) {
            this.data.usedTags = response.data.usedTags;
            this.data.unusedTags = response.data.unusedTags;
            this.data.tagsCount = response.data.tagsCount;
            this.state.fetching = false;
          } else {
            console.error(response.error);
          }
        }
      );
    }
  }
};
</script>

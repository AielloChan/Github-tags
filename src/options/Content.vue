<template>
  <form>
    <div class="form-group">
      <label for="repo_addr">Repository Address</label>
      <input type="text" class="form-control" id="repo_addr" placeholder="e.g. AielloChan/tags" v-model.trim="repo_addr">
    </div>
    <div class="form-group">
      <label for="github_token">Github Token</label>
      <input type="text" class="form-control" id="github_token" placeholder="Your github token..." v-model.trim="token">
    </div>
    <div class="alert" :class="msg_class" role="alert" v-show="is_show_msg">
      {{msg}}
    </div>
    <button type="button" class="btn btn-primary form-control" @click="save">Save</button>
  </form>
</template>

<script>
export default {
  data: function () {
    return {
      repo_addr: "",
      token: "",
      is_show_msg: false,
      msg_class: "",
      msg: ""
    }
  },
  mounted: function () {
    this.resume();
  },
  methods: {
    show_msg: function (msg, msg_class) {
      this.msg = msg || "";
      this.msg_class = msg_class || "alert-success";
      this.is_show_msg = true;
      setTimeout(function () {
        if (this.is_show_msg) {
          this.is_show_msg = false;
        }
      }.bind(this), 3000);
    },
    save: function () {
      if (this.repo_addr !== "" && this.token !== "") {
        chrome.storage.local.set({
          "repo_addr": this.repo_addr,
          "token": this.token
        }, function () {
          this.show_msg("Save successed!");
        }.bind(this));
      } else {
        this.show_msg("Repo Addr or Token can't be empty!", "alert-danger");
      }
    },
    resume: function () {
      chrome.storage.local.get([
        "repo_addr",
        "token"], function (data) {
          if (data) {
            this.repo_addr = data.repo_addr;
            this.token = data.token;
          }
        }.bind(this));
    }
  }
}
</script>

<style>
.msg {
  margin: 10px 0;
  padding: 10px 10px;
}
</style>

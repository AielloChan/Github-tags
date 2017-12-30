<template>
    <div class="container">
        <div class="row title">
            <a href="https://github.com/AielloChan/Github-tags">
                <img class="logo" src="../assets/img/icon.png" alt="Github-tags">
            </a>
            <h1>Github-tags</h1>
        </div>
        
        <div class="row">
            <div class="col-xs-4 col-xs-offset-4">
                <Content></Content>
            </div>
        </div>
    </div>
</template>

<script>
import Content from "./Content.vue";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    Content
  }
};
</script>

<style>
.container {
  padding-top: 40px;
}
.title {
  text-align: center;
  margin-bottom: 40px;
}
.center-block {
  margin: 0 auto;
}
.logo {
  width: 72px;
  height: 72px;
}
</style>

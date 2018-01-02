<template>
  <div class="githubTags-mask"></div>
</template>

<script>
export default {
  name: 'mask-layer',
  data: function() {
    return {};
  }
};
</script>

<style>
.githubTags-mask {
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  z-index: 20;
  width: 100vw;
  height: 100vh;
  user-select: none;
}
</style>


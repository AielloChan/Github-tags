<template>
    <div class="github-tags_tags-container_wrapper" v-show="is_show">
        <span class="github-tags_tags-container_label">{{label||default_label}}</span>
        <div class="github-tags_tags-container">
            <slot>
                <div class="github-tags_tags-container_try"> {{msg||default_msg}} </div>
            </slot>
            <div style="clear:both"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: "tags-container",
  props: ["label", "msg"],
  data: function() {
    return {
      is_show: !!this.$children,
      default_msg: "Try add some tag",
      default_label: "Common tags:"
    };
  }
};
</script>

<style>
.github-tags_tags-container {
  width: 100%;
  padding: 4px;
  border-bottom: 1px solid #dfe2e5;
  max-height: 110px;
  overflow-y: auto;
}

.github-tags_tags-container_try {
  width: 100%;
  height: 100%;
  font-size: 17px;
  color: rgba(25, 25, 25, 0.3);
  text-align: center;
  font-weight: bold;
}

.github-tags_tags-container_label {
  margin-left: 6px;
}

.github-tags_tags-container_wrapper {
  width: 100%;
  padding-top: 4px;
}
</style>


<template>
    <div class="GT--tags-container--wrapper" v-show="isShow">
        <span class="GT--tags-container--label">{{label||defaultLabel}}</span>
        <div class="GT--tags-container">
            <slot>
                <div class="GT--tags-container--try"> {{msg||defaultMsg}} </div>
            </slot>
            <div style="clear:both"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: "tagsContainer",
  props: ["label", "msg"],
  data: function() {
    return {
      isShow: !!this.$children,
      defaultMsg: "Try add some tag",
      defaultLabel: "Common tags:"
    };
  }
};
</script>

<style>
.GT--tags-container {
  width: 100%;
  padding: 4px;
  border-bottom: 1px solid #dfe2e5;
  max-height: 110px;
  overflow-y: auto;
}

.GT--tags-container--try {
  width: 100%;
  height: 100%;
  font-size: 17px;
  color: rgba(25, 25, 25, 0.3);
  text-align: center;
  font-weight: bold;
}

.GT--tags-container--label {
  margin-left: 6px;
}

.GT--tags-container--wrapper {
  width: 100%;
  padding-top: 4px;
}
</style>


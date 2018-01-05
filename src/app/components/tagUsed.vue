<template>
    <span class="GT--tag-used">
        {{tagName}}
        <span class="GT--tag-used--remove" title="Remove this tag"
                @click.stop="removeTag(tagId)"
                aria-label='Close'>
            <svg class="GT--tag-used--remove--svg" viewBox="0 0 1024 1024" version="1.1">
                <use :xlink:href="'#'+svgId" />
            </svg>
        </span>
    </span>
</template>
<script>
import Cancel from "assets/svg/cancel.svg";

export default {
  name: "tagUsed",
  props: ["tagId", "tagName"],
  data: function() {
    return {
      svgId: Cancel.id
    };
  },
  methods: {
    removeTag: function(tagId) {
      this.$emit("removeTag", tagId);
    }
  }
};
</script>
<style>
.GT--tag-used {
  color: #fff;
  padding: 4px;
  background: #24292e;
  border-radius: 3px;
  margin: 2px;
  float: left;
}

.GT--tag-used.active {
  animation: blink 0.5s linear infinite alternate;
}

.GT--tag-used--remove {
  margin-left: 4px;
  cursor: pointer;
  height: 12px;
  width: 12px;
}

.GT--tag-used--remove--svg {
  fill: #fff;
  width: 8px;
  height: 8px;
}

.GT--tag-used--remove--svg:hover {
  fill: #d73a49;
}

@keyframes blink {
  to {
    color: #24292e;
    background: #c3c3c3;
  }
}
</style>



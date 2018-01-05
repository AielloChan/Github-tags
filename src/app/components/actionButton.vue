<template>
  <div class="" aria-expanded="false" @click="actionButtonClick">
    <mask-layer v-show="open"></mask-layer>

    <div accept-charset="UTF-8" class="btn-with-count">
      <button type="button" :title="title" :aria-label="title"
          :class="{'btn-primary':saving,'selected':open}"
          class="btn btn-sm btn-with-count GT--action-button">
        <svg class="GT--action-button--svg" viewBox="0 0 1024 1024" version="1.1"
            :class="{'saving':this.state==1,'fetching':this.state==-1}">
          <use :xlink:href="'#'+svgId" />
        </svg>
        <span>{{label}}</span>
      </button>
    </div>
    <a class="social-count" :aria-label="countAriaLabel">
      {{count}}
    </a>
  </div>
</template>

<script>
import MaskLayer from "components/maskLayer.vue";
import RefreshSVG from "assets/svg/refresh.svg";
import UploadSVG from "assets/svg/upload.svg";
import TagsSVG from "assets/svg/tags.svg";

export default {
  name: "actionButton",
  props: [
    "open",
    "count",
    "saving",
    "fetching",
    "currentRepo",
    "actionButtonClick"
  ],
  data: function() {
    return {};
  },
  computed: {
    countAriaLabel: function() {
      return (
        this.count +
        " tag" +
        (this.count > 1 ? "s" : "") +
        " on this repository"
      );
    },
    title: function() {
      return "Set your own tag(s) on " + this.currentRepo;
    },
    state: function() {
      if (this.saving) {
        return 1;
      } else if (this.fetching) {
        return -1;
      } else {
        return 0;
      }
    },
    label: function() {
      switch (this.state) {
        case -1:
          return "Fetching";
        case 0:
          return "Tags";
        case 1:
          return "Saving";
      }
    },
    svgId: function() {
      switch (this.state) {
        case -1:
          return RefreshSVG.id;
        case 0:
          return TagsSVG.id;
        case 1:
          return UploadSVG.id;
      }
    }
  },
  components: {
    MaskLayer
  }
};
</script>

<style>
.GT--action-button {
  overflow: hidden;
  z-index: 20;
}
.GT--action-button--svg {
  width: 15px;
  height: 15px;
  vertical-align: middle;
  fill: #24292e;
}

.GT--action-button--svg.saving {
  fill: #fff;
  animation: upload 1s ease-out 0s infinite;
}

.GT--action-button--svg.fetching {
  animation: fresh 1s ease-out 0s infinite;
}

@keyframes upload {
  0% {
    margin-bottom: -40px;
  }
  50% {
    margin-bottom: 4px;
  }
  100% {
    margin-bottom: 4px;
  }
}

@keyframes fresh {
  to {
    transform: rotate(-180deg);
  }
}

.social-count {
  user-select: none;
}
</style>

<template>
  <div class="" aria-expanded="false" @click="actionButtonClick">
    <mask-layer v-show="open"></mask-layer>
    <div accept-charset="UTF-8" class="btn-with-count">
      <button type="button" :class="{'btn-primary':saving,'selected':open}" class="btn btn-sm btn-with-count" :title="title" :aria-label="title">
        <svg v-show="!saving&&!fetching" class="github-tags_action-button_svg" version='1.1' viewBox="0 0 1088 1024" aria-hidden="true">
          <path d="M0 384l0-237.568q0-29.696 21.504-51.2t51.2-22.528l238.592 0q29.696 0 66.56 15.36t58.368 36.864l408.576 408.576q20.48 21.504 20.48 51.2 0 30.72-20.48 52.224l-280.576 280.576q-22.528 21.504-52.224 21.504-30.72 0-51.2-21.504l-408.576-408.576q-21.504-21.504-36.864-58.368t-15.36-66.56zM109.568 256q0 30.72 21.504 51.2t52.224 21.504 51.2-21.504 21.504-51.2-21.504-52.224-51.2-20.48-52.224 20.48-21.504 52.224zM402.432 72.704l128 0q29.696 0 66.56 15.36t58.368 36.864l408.576 408.576q21.504 21.504 21.504 51.2 0 30.72-21.504 52.224l-280.576 280.576q-22.528 21.504-52.224 21.504-20.48 0-33.792-8.192t-29.696-25.6l268.288-268.288q21.504-21.504 21.504-52.224 0-29.696-21.504-51.2l-408.576-408.576q-21.504-21.504-58.368-36.864t-66.56-15.36z"></path>
        </svg>
        <svg v-show="saving" class="github-tags_action-button_svg saving" viewBox="0 0 1024 1024" version="1.1">
          <path d="M147.442 465.186 512.004 100l364.554 365.186-167.65 0 0 136.76L315.096 601.946l0-136.76L147.442 465.186zM708.908 663.946 315.096 663.946l0 112 393.812 0L708.908 663.946zM315.096 833.946 315.096 924l393.812 0 0-90.054L315.096 833.946z"></path>
        </svg>
        <svg v-show="!saving&&fetching" class="github-tags_action-button_svg fetching" viewBox="0 0 1025 1024" version="1.1">
          <path d="M1017.856 460.8L832.512 227.328c-20.48-25.6-58.368-25.6-78.848 0L569.344 460.8c-14.336 17.408-1.024 44.032 21.504 44.032h72.704c-2.048 136.192-2.048 309.248-240.64 447.488-6.144 4.096-3.072 13.312 4.096 12.288C883.712 893.952 920.576 587.776 921.6 505.856h75.776c22.528-1.024 34.816-27.648 20.48-45.056zM434.176 519.168h-72.704c2.048-136.192 2.048-309.248 240.64-447.488 6.144-4.096 3.072-13.312-4.096-12.288-456.704 70.656-493.568 377.856-494.592 458.752H27.648c-22.528 0-35.84 26.624-21.504 44.032l185.344 233.472c20.48 25.6 58.368 25.6 78.848 0L455.68 562.176c13.312-16.384 1.024-43.008-21.504-43.008z"></path>
        </svg>
        <span>{{label}}</span>
      </button>
    </div>
    <a class="social-count" :aria-label="count_aria_label">
      {{count}}
    </a>
  </div>
</template>

<script>
import MaskLayer from "./mask-layer.vue";

export default {
  name: "action-button",
  props: [
    "open",
    "count",
    "saving",
    "fetching",
    "currentRepo",
    "actionButtonClick"
  ],
  data: function() {
    return {
      count_aria_label:
        this.count +
        " tag" +
        (this.count > 1 ? "s" : "") +
        " on this repository"
    };
  },
  computed: {
    title: function() {
      return "Set your own tag(s) on " + this.currentRepo;
    },
    label: function() {
      if (this.saving) {
        return "Saving";
      } else if (this.fetching) {
        return "Fetching";
      } else {
        return "Tags";
      }
    }
  },
  components: {
    MaskLayer
  }
};
</script>

<style>
.github-tags_action-button_svg {
  margin-right: 1px;
  width: 15px;
  height: 14px;
  vertical-align: middle;
  fill: currentColor;
}

.github-tags_action-button_svg.saving {
  margin-bottom: 4px;
  animation: upload 1s ease-out 0s infinite;
}

.github-tags_action-button_svg.fetching {
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

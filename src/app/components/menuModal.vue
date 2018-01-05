<template>
  <div class="GT--menu-modal" aria-expanded="false" v-show="showModal">
    <div class="select-menu-modal" v-show="!fetching">
      <div class="select-menu-header">
        <!--<div class='octicon octicon-x' title="Reset modification">
                        <svg aria-label='Close' class='GT--menu-modal_reset' role='img' version='1.1' viewBox='0 0 1089 1024' width='12'>
                          <path d="M576.180056 15.684902c-152.431635 0-292.699469 68.053267-386.360738 184.825758L82.777868 93.469209 37.515724 410.30422l316.899031-45.262144L258.576805 269.268146C334.056393 170.101157 449.740544 111.714911 576.180056 111.714911c220.612942 0 400.125039 179.512098 400.125039 400.125039s-179.512098 400.125039-400.125039 400.125039c-154.416255 0-296.604689-90.332229-362.353235-230.151922-11.331541-24.007502-39.884464-34.378743-63.891966-22.983182-24.007502 11.267521-34.314723 39.884464-23.047202 63.891966C208.38512 896.024008 384.760238 1007.994998 576.180056 1007.994998c273.557487 0 496.155048-222.597562 496.155048-496.155048S849.737543 15.684902 576.180056 15.684902z"></path>
                        </svg>
                      </div>-->
        <span class="select-menu-title">Add tags</span>
      </div>
  
      <tagsContainer :label="'Used tags('+usedTags.length+'):'" :msg="'Try add/select some tag'">
        <tagUsed v-for="tag in usedTags" :class="{active:hightLightTag==tag.id}" :key="tag.id" :tagId="tag.id" :tagName="tag.name" @removeTag="unuseTag"></tagUsed>
      </tagsContainer>
  
      <addTag @addNewTag="addTag"></addTag>
  
      <tagsContainer :label="'Common tags('+unusedTags.length+'):'" :msg="'Try add a new tag'">
        <tagUnused v-for="tag in unusedTags" :key="tag.id" :tagId="tag.id" :tagName="tag.name" @removeTag="useTag"></tagUnused>
      </tagsContainer>
  
      <removeAll @removeAllTags="removeAll"></removeAll>
    </div>
    <div class="select-menu-modal" v-show="fetching">
      <div class="GT--menu-modal--fetch">
        <div>Fetching</div>
        <svg viewBox="0 0 44 44" class="GT--menu-modal--fetch--svg">
          <use :xlink:href="'#'+svgId" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import TagsContainer from "./tagsContainer.vue";
import LoadingSVG from "assets/svg/loading.svg";
import RemoveAll from "./removeAll.vue";
import TagUnused from "./tagUnused.vue";
import TagUsed from "./tagUsed.vue";
import AddTag from "./addTag.vue";

export default {
  name: "menuModal",
  props: [
    "showModal",
    "fetching",
    "usedTags",
    "unusedTags",
    "useTag",
    "addTag",
    "unuseTag",
    "removeAll",
    "hightLightTag"
  ],
  data: function() {
    return {
      svgId: LoadingSVG.id
    };
  },
  components: {
    TagsContainer,
    TagUnused,
    RemoveAll,
    TagUsed,
    AddTag
  }
};
</script>

<style>
.GT--menu-modal {
  position: absolute;
  z-index: 30;
  top: 100%;
}

.GT--menu-modal--fetch {
  width: 100%;
  height: 100%;
  padding: 20px 20px 10px;
  text-align: center;
  font-size: 36px;
}

.GT--menu-modal--fetch--svg {
  width: 44px;
  height: 44px;
  stroke: #000;
}
</style>

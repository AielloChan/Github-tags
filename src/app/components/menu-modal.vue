<template>
  <div class="select-menu-modal-holder js-menu-content js-navigation-container github-tags_menu-modal" aria-expanded="false">
    <div class="select-menu-modal" v-show="!fetching">
      <div class="select-menu-header">
        <!--<div class='octicon octicon-x' title="Reset modification">
                        <svg aria-label='Close' class='github-tags_menu-modal_reset' role='img' version='1.1' viewBox='0 0 1089 1024' width='12'>
                          <path d="M576.180056 15.684902c-152.431635 0-292.699469 68.053267-386.360738 184.825758L82.777868 93.469209 37.515724 410.30422l316.899031-45.262144L258.576805 269.268146C334.056393 170.101157 449.740544 111.714911 576.180056 111.714911c220.612942 0 400.125039 179.512098 400.125039 400.125039s-179.512098 400.125039-400.125039 400.125039c-154.416255 0-296.604689-90.332229-362.353235-230.151922-11.331541-24.007502-39.884464-34.378743-63.891966-22.983182-24.007502 11.267521-34.314723 39.884464-23.047202 63.891966C208.38512 896.024008 384.760238 1007.994998 576.180056 1007.994998c273.557487 0 496.155048-222.597562 496.155048-496.155048S849.737543 15.684902 576.180056 15.684902z"></path>
                        </svg>
                      </div>-->
        <span class="select-menu-title">Add tags</span>
      </div>
  
      <tags-container :label="'Used tags('+used_tags.length+'):'" :msg="'Try add/select some tag'">
        <tag-used v-for="tag in used_tags" :class="{active:hight_light_tag==tag.id}" :key="tag.id" :tag_id="tag.id" :tag_name="tag.name" @remove-tag="unuseTag"></tag-used>
      </tags-container>
  
      <add-tag @add-new-tag="addTag"></add-tag>
  
      <tags-container :label="'Common tags('+unused_tags.length+'):'" :msg="'Try add a new tag'">
        <tag-unused v-for="tag in unused_tags" :key="tag.id" :tag_id="tag.id" :tag_name="tag.name" @remove-tag="useTag"></tag-unused>
      </tags-container>
  
      <remove-all @remove-all-tags="removeAll"></remove-all>
    </div>
    <div class="select-menu-modal" v-show="fetching">
      <div class="github-tags_menu-modal_fetch">
        <div>Fetching</div>
        <svg viewBox="0 0 44 44" class="github-tags_menu-modal_fetch_svg">
          <g fill="none" fill-rule="evenodd" stroke-width="2">
            <circle cx="22" cy="22" r="6.93477">
              <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate>
              <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate>
            </circle>
            <circle cx="22" cy="22" r="18.9516">
              <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate>
              <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate>
            </circle>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import TagsContainer from './tags-container.vue';
import AddTag from './add-tag.vue';
import RemoveAll from './remove-all.vue';
import TagUsed from './tag-used.vue';
import TagUnused from './tag-unused.vue';

export default {
  name: 'menu-modal',
  props: ['fetching', 'used_tags', 'unused_tags', 'useTag', 'addTag', 'unuseTag', 'removeAll', 'hight_light_tag'],
  components: {
    TagsContainer,
    TagUsed,
    AddTag,
    TagUnused,
    RemoveAll
  }
}
</script>

<style>
/*.github-tags_menu-modal_reset {
  width: 16px;
  height: 16px;
}*/

.github-tags_menu-modal {
  right: -202px;
}

.github-tags_menu-modal_fetch {
  width: 100%;
  height: 100%;
  padding: 20px 20px 10px;
  text-align: center;
  font-size: 36px;
}

.github-tags_menu-modal_fetch_svg {
  width: 44px;
  height: 44px;
  stroke: #000;
}
</style>

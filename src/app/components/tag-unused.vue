<template>
    <span class="github-tags_tag-unused" title="Add this tag" @click.stop="removeTag(tag_id)">
        {{tag_name}}
    </span>
</template>

<script>
export default {
    name: 'tag-unused',
    props: ['tag_id', 'tag_name'],
    methods: {
        removeTag: function (tag_id) {
            this.$emit('remove-tag', tag_id)
        }
    }
}
</script>

<style>
.github-tags_tag-unused {
    color: #000;
    padding: 4px;
    background: rgba(27, 31, 35, .3);
    border-radius: 3px;
    margin: 2px;
    float: left;
    cursor: pointer;
}
</style>



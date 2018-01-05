<template>
    <span class="GT--tag-unused" title="Add this tag" @click.stop="removeTag(tagId)">
        {{tagName}}
    </span>
</template>

<script>
export default {
    name: 'tagUnused',
    props: ['tagId', 'tagName'],
    methods: {
        removeTag: function (tagId) {
            this.$emit('removeTag', tagId)
        }
    }
}
</script>

<style>
.GT--tag-unused {
    color: #000;
    padding: 4px;
    background: rgba(27, 31, 35, .3);
    border-radius: 3px;
    margin: 2px;
    float: left;
    cursor: pointer;
}
</style>



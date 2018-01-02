<template>
    <span class="github-tags_tag-used">
        {{tagName}}
        <span class="github-tags_tag-used_remove" title="Remove this tag" @click.stop="removeTag(tagId)">
            <svg aria-label='Close' class='octicon octicon-x' height='16' role='img' version='1.1' viewBox='0 0 12 16' width='12'>
                <path fill-rule='evenodd' d='M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z'></path>
            </svg>
        </span>
    </span>
</template>
<script>
export default {
    name: 'tag-used',
    props: ['tagId', 'tagName'],
    methods: {
        removeTag: function (tagId) {
            this.$emit('remove-tag', tagId)
        }
    }
}
</script>
<style>
.github-tags_tag-used {
    color: #fff;
    padding: 4px;
    background: #24292e;
    border-radius: 3px;
    margin: 2px;
    float: left
}

.github-tags_tag-used_remove {
    margin-left: 4px;
    cursor: pointer;
    height: 12px;
    width: 12px
}

.github-tags_tag-used_remove:hover {
    color: #d73a49;
}

.github-tags_tag-used.active {
    animation: blink .5s linear infinite alternate;
}

@keyframes blink {
    to {
        color: #24292e;
        background: #c3c3c3;
    }
}
</style>



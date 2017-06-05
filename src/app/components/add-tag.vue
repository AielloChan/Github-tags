<template>
    <div class="github-tags_add-tag">
        <input type="text" aria-label="Input custom tag and press enter" class="form-control github-tags_add-tag_input" placeholder="Input custom tag and press enter" v-model.trim="new_tag" @keyup.enter="addNewTag">
    </div>
</template>
<script>
export default {
    name: 'add-tag',
    data: function () {
        return {
            new_tag: ''
        }
    },
    methods: {
        addNewTag: function () {
            if (this.new_tag.length > 0) {
                this.$emit('add-new-tag', this.new_tag);
                this.new_tag = '';
            }
        }
    }
}
</script>
<style>
.github-tags_add-tag {
    padding: 10px;
    border-bottom: 1px solid #dfe2e5;
}

.github-tags_add-tag_input {
    display: block;
    width: 100%;
    max-width: 100%;
    padding: 5px;
    border: 1px solid #dfe2e5;
    border-radius: 3px;
}
</style>

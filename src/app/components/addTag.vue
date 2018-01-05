<template>
    <div class="GT--add-tag">
        <input type="text" aria-label="Input custom tag and press enter"
                class="form-control GT--add-tag--input"
                placeholder="Input custom tag and press enter"
                v-model.trim="newTag" @keyup.enter="addNewTag">
    </div>
</template>
<script>
export default {
    name: 'addTag',
    data: function () {
        return {
            newTag: ''
        }
    },
    methods: {
        addNewTag: function () {
            if (this.newTag.length > 0) {
                this.$emit('addNewTag', this.newTag);
                this.newTag = '';
            }
        }
    }
}
</script>
<style>
.GT--add-tag {
    padding: 10px;
    border-bottom: 1px solid #dfe2e5;
}

.GT--add-tag--input {
    display: block;
    width: 100%;
    max-width: 100%;
    padding: 5px;
    border: 1px solid #dfe2e5;
    border-radius: 3px;
}
</style>

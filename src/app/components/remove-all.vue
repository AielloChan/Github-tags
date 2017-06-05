<template>
    <div class="github-tags_remove-all" @click="showConfirm">
        <div @click.stop="cancel" class="github-tags_remove-all_mask" v-show="is_show_confirm">
            <div class="github-tags_remove-all_confirm">
                <p>
                    Remove all tags will
                    <br> remove all tags on this repository and
                    <br>
                    <span class="github-tags_remove-all_warning">
                        remove this repository from your git-tag list
                    </span>!
                </p>
                <button class="btn btn-sm" @click.stop="removeAllTags">Remove</button>
                <button class="btn btn-sm" @click.stop="cancel">Cancel</button>
            </div>
        </div>
        <div class="github-tags_remove-all_btn">
            Remove all tags
        </div>
    </div>
</template>

<script>
export default {
    name: 'remove-all',
    data: function () {
        return {
            is_show_confirm: false
        };
    },
    methods: {
        showConfirm: function () {
            this.is_show_confirm = true;
        },
        hideConfirm: function () {
            this.is_show_confirm = false;
        },
        removeAllTags: function () {
            this.$emit('remove-all-tags');
            this.hideConfirm();
        },
        cancel: function () {
            this.hideConfirm();
        }
    }
}
</script>

<style>
.github-tags_remove-all {
    text-align: center
}

.github-tags_remove-all_mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(33, 33, 33, .9);
}

.github-tags_remove-all_confirm {
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #FFF;
    text-align: center;
    padding: 10px 15px 40px 15px;
}

.github-tags_remove-all_warning {
    color: rgb(215, 58, 73);
}

.github-tags_remove-all_btn {
    padding: 8px 5px;
    color: #fff;
    background-color: #d73a49;
    cursor: pointer;
}
</style>

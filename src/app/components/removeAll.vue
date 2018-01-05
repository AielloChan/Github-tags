<template>
    <div class="GT--remove-all" @click="showConfirm">
        <div @click.stop="cancel" class="GT--remove-all--mask" v-show="isShowConfirm">
            <div class="GT--remove-all--confirm">
                <p>
                    Remove all tags will
                    <br> remove all tags on this repository and
                    <br>
                    <span class="GT--remove-all--warning">
                        remove this repository from your git-tag list
                    </span>!
                </p>
                <button class="btn btn-sm" @click.stop="removeAllTags">Remove</button>
                <button class="btn btn-sm" @click.stop="cancel">Cancel</button>
            </div>
        </div>
        <div class="GT--remove-all--btn">
            Remove all tags
        </div>
    </div>
</template>

<script>
export default {
    name: 'removeAll',
    data: function () {
        return {
            isShowConfirm: false
        };
    },
    methods: {
        showConfirm: function () {
            this.isShowConfirm = true;
        },
        hideConfirm: function () {
            this.isShowConfirm = false;
        },
        removeAllTags: function () {
            this.$emit('removeAllTags');
            this.hideConfirm();
        },
        cancel: function () {
            this.hideConfirm();
        }
    }
}
</script>

<style>
.GT--remove-all {
    text-align: center
}

.GT--remove-all--mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(33, 33, 33, .9);
}

.GT--remove-all--confirm {
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #FFF;
    text-align: center;
    padding: 10px 15px 40px 15px;
}

.GT--remove-all--warning {
    color: rgb(215, 58, 73);
}

.GT--remove-all--btn {
    padding: 8px 5px;
    color: #fff;
    background-color: #d73a49;
    cursor: pointer;
}
</style>

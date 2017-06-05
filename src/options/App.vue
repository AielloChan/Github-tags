<template>
    <div class="container">
        <div class="col-xs-4 col-xs-offset-4">
            <Content></Content>
        </div>
    </div>
</template>

<script>
import Content from './Content.vue'

export default {
    name: 'app',
    data() {
        return {

        }
    },
    components: {
        Content
    }
}
</script>

<style>
.container {
    padding-top: 40px;
}
</style>

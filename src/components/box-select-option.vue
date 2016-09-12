<template>
    <div class="item"
         @click="select(option,!option._selected)"
         :class="[option._selected && 'active']">
        <slot></slot>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>

<script>
    export default {
        props: {
            option: {
                type: Object
            }
        },

        created() {
            this.$dispatch('boxSelect:init', this.option)
        },

        components: {},

        watch: {},

        methods: {
            select(item, selected) {
                this.$dispatch('boxSelect:select', item, selected)
            }
        },

        data() {
            return {}
        }
    }
</script>
